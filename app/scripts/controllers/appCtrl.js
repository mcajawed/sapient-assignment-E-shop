'use strict';

angular.module('translateApp')
    .controller('AppCtrl', function ($scope, $rootScope, $translate, $interval, VERSION_TAG, $state) {
        /**
         * Cache busting
         */
        $rootScope.VERSION_TAG = VERSION_TAG;

        /**
         * Translations for the view
         */
        var pageTitleTranslationId = 'PAGE_TITLE';
        var pageContentTranslationId = 'PAGE_CONTENT';
        $scope.currentPath = '/home';
        $state.go('/home');
        $translate(pageTitleTranslationId, pageContentTranslationId)
            .then(function (translatedPageTitle, translatedPageContent) {
                $rootScope.pageTitle = translatedPageTitle;
                $rootScope.pageContent = translatedPageContent;
            });

        /**
         * $scope.locale
         */
        $scope.locale = $translate.use();

        /**
         * Provides info about current route path
         */

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $scope.currentPath = toState.name;
        });

        /**
         * Current time
         */
        $scope.currentTime = Date.now();
        $interval(function () {
            $scope.currentTime = Date.now();
        }, 1000);


        /**
         * EVENTS
         */
        $rootScope.$on('$translateChangeSuccess', function (event, data) {
            $scope.locale = data.language;
            $rootScope.pageTitle = $translate.instant(pageTitleTranslationId);
            $rootScope.pageContent = $translate.instant(pageContentTranslationId);
        });
    });
