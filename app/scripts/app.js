'use strict';

angular
    .module('translateApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'ngSanitize',
        'ngTouch',
        'pascalprecht.translate',
        'tmh.dynamicLocale'
    ])

    .constant('DEBUG_MODE', /*DEBUG_MODE*/true/*DEBUG_MODE*/)
    .constant('VERSION_TAG', /*VERSION_TAG_START*/new Date().getTime()/*VERSION_TAG_END*/)
    .constant('LOCALES', {
        'locales': {
            'ru_RU': 'Русский',
            'en_US': 'English'
        },
        'preferredLocale': 'en_US'
    })
    // Router
    .config(function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('/home', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl as mainctrl'
            })


    })
    // Angular debug info
    .config(function ($compileProvider, DEBUG_MODE) {
        if (!DEBUG_MODE) {
            $compileProvider.debugInfoEnabled(false);// disables AngularJS debug info
        }
    })
    // Angular Translate
    .config(function ($translateProvider, DEBUG_MODE, LOCALES) {
        if (DEBUG_MODE) {
            $translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
        }

        $translateProvider.useStaticFilesLoader({
            prefix: 'resources/locale-',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage(LOCALES.preferredLocale);
        $translateProvider.useLocalStorage();
    })
    // Angular Dynamic Locale
    .config(function (tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
    });
 

