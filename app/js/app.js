define([
	'angular',
        'angularui',
	'filters',
	'services',
	'directives',
	'controllers'
	], function (angular,angularui, filters, services, directives, controllers) {
		'use strict';

		return angular.module('myApp', ['ui.compat','myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives']);
});
