require.config({
	paths: {
		jquery: 'lib/jquery/jquery',
		angular: 'lib/angular/angular',
                angularui: 'lib/angular/angular-ui-router.min',
		text: 'lib/require/text',
                bootstrap: 'lib/bootstrap/bootstrap.min'
	},
	baseUrl: '/angular-requirejs-seed/app/js',
	shim: {
		'angular' : {'exports' : 'angular'},
                'angularui' : {'deps':['angular']},
		'angularMocks': {deps:['angular'], 'exports':'angular.mock'}
	},
	priority: [
		"angular"
	]
});

require( [
	'jquery',
	'angular',
        'angularui',
	'app',
	'routes'
], function($, angular,angularui, app, routes) {
	'use strict';
	$(document).ready(function () {
		var $html = $('html');
		angular.bootstrap($html, [app['name']]);
		// Because of RequireJS we need to bootstrap the app app manually
		// and Angular Scenario runner won't be able to communicate with our app
		// unless we explicitely mark the container as app holder
		// More info: https://groups.google.com/forum/#!msg/angular/yslVnZh9Yjk/MLi3VGXZLeMJ
		$html.addClass('ng-app');
	});
});
