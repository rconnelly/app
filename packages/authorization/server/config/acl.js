'use strict';

module.exports = function(acl) {

  acl.allow([
    {
      roles:['admin'],
      allows:[
        {resources:'customers', permissions:['get','put','post','delete']}
      ]
    }
  ]);
};
