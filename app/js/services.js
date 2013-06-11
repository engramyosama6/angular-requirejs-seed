define(['angular'], function (angular) {
    'use strict';
	
    var appServices = angular.module('myApp.services', [])
    .value('version', '0.1');
    
    appServices.factory('cordovaReady', function() {
        return function (fn) {

            var queue = [];

            var impl = function () {
                queue.push(Array.prototype.slice.call(arguments));
            };

            document.addEventListener('deviceready', function () {
                queue.forEach(function (args) {
                    fn.apply(this, args);
                });
                impl = fn;
            }, false);

            return function () {
                return impl.apply(this, arguments);
            };
        };
    })
    
    appServices.factory('user', function ($rootScope, cordovaReady) {
        var user =  {
            accessToken : null,
            links : null,
            logins : null,
            clients : null,
            defaultClient : null,
            _getClients : function(){
                var that = this;
                $.post(that.links.profile)
                .success(function(data){
                    console.log(data);
                    that.logins = data.account.links.manageableClients;
                    that._getDefaultClient();
                })
                .error(function(data, status, headers, config){
                    console.log('Failed to recieve response from the server.');
                });
            },
            _getDefaultClient : function(){
                var that = this;
                $.post(that.logins)
                .success(function(data){
                    console.log(data);
                    that.defaultClient = data.logins[0].login.client;
                    that.clients = data.logins;
                    that._setDefaultClient(data.logins[0].login.client.link);
                })
                .error(function(data, status, headers, config){
                    console.log('Failed to recieve response from the server.');
                });
            },
            _setDefaultClient : function(url){
                var that = this;
                $.get(url)
                .success(function(data){
                    console.log(data);
                    that.defaultClient = data.client;
                })
                .error(function(data, status, headers, config){
                    console.log('Failed to recieve response from the server.');
                });
            }
        };
        return user;
    });
    
    appServices.factory('geolocation', function ($rootScope, cordovaReady) {
        return {
            getCurrentPosition: cordovaReady(function (onSuccess, onError, options) {
                navigator.geolocation.getCurrentPosition(function () {
                    var that = this,
                    args = arguments;

                    if (onSuccess) {
                        $rootScope.$apply(function () {
                            onSuccess.apply(that, args);
                        });
                    }
                }, function () {
                    var that = this,
                    args = arguments;

                    if (onError) {
                        $rootScope.$apply(function () {
                            onError.apply(that, args);
                        });
                    }
                },
                options);
            })
        };
    });
});