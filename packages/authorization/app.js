'use strict';

/*
 * Defining the Package
 */
var mean = require('meanio');
var Module = mean.Module;
var Acl = require('acl');
var redis = require('redis');
var Authorization = new Module('authorization');
var config = mean.loadConfig();

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Authorization.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Authorization.routes(app, auth, database);
    var redisClient = redis.createClient(config.redis.port, config.redis.host, config.redis.options);
    var acl = new Acl(new Acl.redisBackend(redisClient, config.acl.prefix));

  require('./server/config/acl')(acl);

  mean.register('acl', function() {
    return acl;
  });

    return Authorization;
});
