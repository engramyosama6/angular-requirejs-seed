define(['angular', 'services','angularui'], function (angular) {
	'use strict';

	return angular.module('myApp.controllers', ['myApp.services','ui.compat'])
		.controller('MyCtrl1', ['$scope', 'version','$state','user', function ($scope, version,$state,user) {
			require(['controllers/myctrl1'], function(myctrl1) {
				angular.injector(['ng']).invoke(myctrl1, this, {'$scope': $scope,'version':version,'$state': $state,'user':user});
			})
		}])
		.controller('MyCtrl2', ['$scope','user', function($scope,user) {
			require(['controllers/myctrl2'], function(myctrl2) {
				angular.injector(['ng']).invoke(myctrl2, this, {'$scope': $scope,'user' : user});
			});
		}]);
});