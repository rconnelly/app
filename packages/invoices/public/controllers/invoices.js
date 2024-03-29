'use strict';

angular.module('mean.invoices').controller('InvoicesController', ['$scope', '$stateParams', '$state', '$filter', 'lodash',  'Global', 'Customers', 'Items',
  'InvoiceTerms','Invoices', 'ngTableParams',
    function($scope, $stateParams, $state, $filter, _, Global, Customers, Items, InvoiceTerms, Invoices, TableParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'invoices'
        };

      $scope.format = 'shortDate';
      $scope.invoices = [];
      $scope.invoice = {items:[], startDate: new Date()};
      $scope.pageTitle = ($stateParams.invoiceId) ? 'Edit Invoice' : 'Create Invoice';

      /****** Init **********/

      $scope.initView = function() {
        this.initInvoice();
        this.initItems();
      };

      $scope.initEdit = function() {
        this.initInvoice();
        this.initItems();
        this.initTerms();
      };

      $scope.initList = function() {
      };

      $scope.initInvoice = function() {
        if(!$stateParams.invoiceId)
          return;

        Invoices.get({invoiceId: $stateParams.invoiceId}, function(invoice){
          $scope.invoice = invoice;
          $scope.itemListData.reload();
        });
      };

      $scope.initTerms = function() {
        InvoiceTerms.query(function(s){
          $scope.termsList = s;
        });
      };

      $scope.initItems = function() {
        Items.query(function(s){
          $scope.items = s;
        });
      };

      /****** Create / Edit / View **********/

      $scope.save = function(invoice){
        if (this.invoiceForm.$valid) {
          var i = new Invoices(invoice);
          if(angular.isDefined($stateParams.invoiceId)) {
            i._id = $stateParams.invoiceId;
            i.$update(function(response){
              $state.go('invoices.list');
            });
          } else {
            i.$save(function (response) {
              $state.go('invoices.list');
            });
          }
        } else {
          $scope.submitted = true;
        }
      };

      $scope.findCustomers = function(value){
        return Customers.query({companyName: value}).$promise.then(function(results) {
          var customers = [];
          angular.forEach(results, function (customer) {
            customers.push(customer);
          });
          return customers;
        });
      };

      $scope.openStartDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
        $scope.dueDateOpened = false;
      };

      $scope.openDueDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = false;
        $scope.dueDateOpened = true;
      };

      $scope.removeItem = function(item) {
        this.invoice.items = _.reject(this.invoice.items,function(itm){
          return itm === item;
        },this);
        this.itemListData.reload();
      };

      $scope.editItem = function(item) {
        item.$edit = true;
      };

      $scope.doneEdit = function(item) {
        item.$edit = false;
      };

      $scope.saveEdit = function(item) {
        item.$edit = false;
      };

      $scope.addItem = function(item) {
        if(!item)
          return;

        var existingItem = _.find(this.invoice.items,function(itm){
          return (itm._id === item._id);
        },this);

        if(!!existingItem) {
          existingItem.qty++;
        } else {
          item.qty = 1;
          this.invoice.items.push(item);
        }

        $scope.updateTotals($scope.invoice,function(){
          if(!existingItem)
            $scope.itemListData.reload();
        });

      };

      $scope.$watch('invoice.items', function() {
          $scope.updateTotals($scope.invoice);
        }, true);

      $scope.updateTotals = function(invoice,cb) {
        Invoices.calculateTotals(invoice, function(result){
          // copy over total and extended only
          $scope.invoice.total = result.total;
          for(var i = 0; i < $scope.invoice.items.length; i++){
            if(angular.isDefined(result.items[i]))
              $scope.invoice.items[i].extended = result.items[i].extended;
          }
          if(!!cb)
            cb();
        });
      };

      $scope.itemListData = new TableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
          name: 'asc'     // initial sorting
        }
      }, {
        counts: 0,
        total: 0,
        getData: function($defer, params) {
          var orderedData = $scope.invoice.items;
          params.total(orderedData.length);
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });

      /****** View **********/

      $scope.itemViewListData = new TableParams({
        page: 1            // show first page
      }, {
        counts: 0,
        total: 0,
        getData: function($defer, params) {
          var orderedData = $scope.invoice.items;
          params.total(orderedData.length);
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });

      /****** Common ********/

      $scope.cancel = function($event) {
        $state.go('invoices.list');
      };

      /****** List **********/

      $scope.editInvoice = function(invoice){
        $state.go('invoices.edit', {invoiceId: invoice._id });
      };

      $scope.viewInvoice = function(invoice) {
        $state.go('invoices.view', {invoiceId: invoice._id });
      };

      $scope.invoiceListData = new TableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
          name: 'asc'     // initial sorting
        }
      }, {
        counts: 0,
        total: 0,
        getData: function($defer, params) {
          Invoices.query(function(invoices) {
            // update table params
            $scope.invoices = invoices;

            params.total(invoices.length);
            var filteredData = params.filter() ? $filter('filter')(invoices,params.filter()) : invoices;

            var orderedData = params.sorting() ?
              $filter('orderBy')(filteredData, params.orderBy()) : filteredData;


            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          });
        }
      });
    }
]);
