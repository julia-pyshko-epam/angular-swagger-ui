/*
 * Orange angular-swagger-ui - v0.4.4
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular
	.module('swaggerUi')
	.config(function(swaggerTranslatorProvider) {

		swaggerTranslatorProvider
			.addTranslations('en', {
				infoContactCreatedBy: 'Created by {{name}}',
				infoContactUrl: 'See more at',
				infoContactEmail: 'Contact the developer',
				infoLicense: 'License: ',
				infoBaseUrl: 'BASE URL',
				infoApiVersion: 'API VERSION',
				infoHost: 'HOST',
				endPointToggleOperations: 'Open/Hide',
				endPointListOperations: 'List operations',
				endPointExpandOperations: 'Expand operations',
				operationDeprected: 'Warning: Deprecated',
				operationImplementationNotes: 'Implementation notes',
				externalDocs: 'External docs',
				headers: 'Response headers',
				headerName: 'Header',
				headerDescription: 'Description',
				headerType: 'Type',
				parameters: 'Parameters',
				parameterName: 'Parameter',
				parameterValue: 'Value',
				parameterDescription: 'Description',
				parameterType: 'Parameter type',
				parameterDataType: 'Data type',
				parameterOr: ' or ',
				parameterRequired: '(required)',
				parameterModel: 'Model',
				parameterSchema: 'Example value',
				parameterContentType: 'Parameter content type',
				parameterDefault: '{{default}} (default)',
				parameterSetValue: 'Click to set as parameter value',
				responseClass: 'Response class (status {{status}})',
				responseModel: 'Model',
				responseSchema: 'Example value',
				responseContentType: 'Response content type',
				responses: 'Response messages',
				responseCode: 'HTTP status code',
				responseReason: 'Reason',
				responseHide: 'Hide response',
				modelOptional: 'optional',
				modelOr: ' or ',
				explorerUrl: 'Request URL',
				explorerBody: 'Response body',
				explorerCode: 'Response code',
				explorerHeaders: 'Response headers',
				explorerLoading: 'Loading...',
				explorerTryIt: 'Try it out!',
				errorNoParserFound: 'No parser found for Swagger specification of type {{type}} and version {{version}}',
				errorParseFailed: 'Failed to parse Swagger specification: {{message}}',
				errorJsonParse: 'Failed to parse JSON',
				errorNoYamlParser: 'No YAML parser found, please make sure to include js-yaml library',
				authRequired: 'Authorization required',
				authAvailable: 'Authorize This Application',
				apiKey: 'API key authorization',
				authParamName: 'Name',
				authParamType: 'In',
				authParamValue: 'Value',
				basic: 'Basic authorization',
				authLogin: 'Login',
				authPassword: 'Password',
				oauth2: 'oAuth2 authorization',
				authOAuthDesc: 'Making Syncplicity API requests requires you to grant access to this app. You will be directed to Syncplicity web site to approve the use of your credentials and then returned to this page. You can revoke these permissions at any time.',
				oauthNoteTitle: 'Note',
				oauthNoteBodyBeforeLink: 'if your company has enabled Application Whitelisting feature, you should also whitelist this application as described in ',
				oauthNoteBodyAfterLink: ' using application key ',
				oauthNoteLinkTitle: 'this article',
				authAuthorizationUrl: 'Authorization URL',
				authFlow: 'Flow',
				authTokenUrl: 'Token URL',
				authScopes: 'Scopes',
				authCancel: 'Cancel',
				authAuthorize: 'Authorize'
			});

	});