define(['angular', 'app'], function(angular, app) {
    'use strict';

    return app.config(['$stateProvider','$routeProvider', function($stateProvider,$routeProvider) {
        /*$routeProvider.when('/view1', {
			templateUrl: 'app/partials/partial1.html',
			controller: 'MyCtrl1'
		});
		$routeProvider.when('/view2', {
			templateUrl: 'app/partials/partial2.html',
			controller: 'MyCtrl2'
		});
		$routeProvider.otherwise({redirectTo: '/view1'});*/
        $stateProvider
        .state('index', {
            url: "", // root route
            views: {
                "viewA": {
                    templateUrl: "app/partials/partial1.html",
                    
                    controller : 'MyCtrl1'
                }
            }
        })
        .state('mainPanel', {
            url: "/mainPanel", // root route
            views: {
                "viewA": {
                    templateUrl: "app/partials/partial2.html",
                    
                    controller : 'MyCtrl2'
                }
            }
        })
    }]);

});