/*
 * Orange angular-swagger-ui - v0.4.4
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

window.swaggerOAuth = window.swaggerOAuth || {};
window.swaggerOAuth.credentials = window.swaggerOAuth.credentials || {};
window.swaggerOAuth.credentials.appKey = window.swaggerOAuth.credentials.appKey || 'EDJAGUKCeoTsG7BGJe17e0vFlRrl9ViQ';
window.swaggerOAuth.credentials.appSecret = window.swaggerOAuth.credentials.appSecret || '10wl1cqd24StP2pN';

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
	.controller('SwaggerUiModalAuthCtrl', function($scope, operation, auth, $http) {

		$scope.form = {};
		$scope.auth = auth;
		$scope.tab = 0;

		$scope.onCodeReceived = null;

		window.swaggerOAuth.codeReceived = window.swaggerOAuth.codeReceived || (function(code){
			if($scope.onCodeReceived){
				$scope.onCodeReceived(oauthCode);
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

					var authUrl = authParams.authorizationUrl + '?response_type=code&client_id=' + swaggerOAuth.credentials.appKey + '&scope=' + scopes;
				 	var oauthWindow = window.open(authUrl, "OAuth", "width=600,height=600");
					$scope.$close();

					$scope.onCodeReceived = function(oauthCode){
						var config = {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'Authorization': 'Basic ' + btoa(window.swaggerOAuth.credentials.appKey + ':' + window.swaggerOAuth.credentials.appSecret)
							}
						}
						var body = 'grant_type=authorization_code&response_type=code&code=' + oauthCode;

						$http.post(authParams.tokenUrl, body, config).then(function(response) {
								var oauthData = response.data;
								auth[$scope.tab].valid = true;
								authParams.bearer = oauthData.access_token;
								console.log('[OAUTH20] Bearer token has been set to %s', authParams.bearer);

								$scope.onCodeReceived = null;
							}, function(response) {
								$scope.$close();
						});
					};

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
