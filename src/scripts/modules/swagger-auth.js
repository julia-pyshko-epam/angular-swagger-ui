/*
 * Orange angular-swagger-ui - v0.4.4
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

window.swaggerOAuth = window.swaggerOAuth || {};

angular
	.module('swaggerUiAuthorization', ['swaggerUi', 'ui.bootstrap.modal'])
	.service('swaggerUiAuth', function($q, $uibModal) {

		/**
		 * Module entry point
		 */
		this.execute = function(operation, auth) {
			var deferred = $q.defer(),
				modalInstance = $uibModal.open({
					templateUrl: 'templates/auth/modal-auth.html',
					controller: 'SwaggerUiModalAuthCtrl',
					backdrop: true,
					resolve: {
						auth: function() {
							return auth;
						},
						operation: function() {
							return operation;
						}
					}
				});

			modalInstance.result.then(function() {
				// validated, do nothing
			}, function() {
				// dismissed, do nothing
			});

			deferred.resolve(true);
			return deferred.promise;
		};

	})
	.controller('SwaggerUiModalAuthCtrl', function($scope, $rootScope, operation, auth, $http) {

		$scope.form = {};
		$scope.auth = auth;
		$scope.tab = 0;
		if (window.swaggerOAuth.interactiveDocAppKey) 
			$scope.InteractiveDocAppKey = window.swaggerOAuth.interactiveDocAppKey;
		else $scope.InteractiveDocAppKey = '<ask support for interactive docs key>';

		$scope.onTokenReceived = function(token) {			
			auth[$scope.tab].valid = true;
			authParams.bearer = token;			
			$scope.$close();			
			$rootScope.$apply();
		};	

		window.swaggerOAuth.tokenReceived = window.swaggerOAuth.tokenReceived || (function(token){
			if($scope.onTokenReceived){
				$scope.onTokenReceived(token);
			}
		});	

		var authParams = operation.authParams || auth[0];

		if (authParams) {
			switch (authParams.type) {
				case 'apiKey':
					$scope.form.apiKey = authParams.apiKey;
					break;
				case 'basic':
					$scope.form.basicLogin = authParams.login;
					$scope.form.basicPassword = authParams.password;
					break;
				case 'oauth2':
					break;
			}
		}

		$scope.authorize = function() {
			var valid = false,
				authParams = operation.authParams = auth[$scope.tab];

			switch (authParams.type) {
				case 'apiKey':
					if ($scope.form.apiKey) {
						authParams.apiKey = $scope.form.apiKey;
						valid = true;
					} else {
						delete operation.authParams;
					}

					auth[$scope.tab].valid = valid;
					$scope.$close();
					break;
				case 'basic':
					if ($scope.form.basicLogin === '' && $scope.form.basicPassword === '') {
						delete operation.authParams;
					} else {
						authParams.login = $scope.form.basicLogin;
						authParams.password = $scope.form.basicPassword;
						valid = true;
					}

					auth[$scope.tab].valid = valid;
					$scope.$close();
					break;
				case 'oauth2':
					var scopes = ''
					for (var scope in $scope.form.scopes) {
						scopes += scope + ','
					}

					if (scopes.length > 0)
						scopes = scopes.substring(0, scopes.length - 1);
					
				 	var oauthWindow = window.open(window.swaggerOAuth.authorizeUrl, "OAuth", "width=600,height=700");
					$scope.$close();
					break;
			}
		};

		$scope.setTab = function(index) {
			$scope.tab = index;
		};

	})
	.run(function(swaggerModules, swaggerUiAuth) {
		swaggerModules.add(swaggerModules.AUTH, swaggerUiAuth);
	});
