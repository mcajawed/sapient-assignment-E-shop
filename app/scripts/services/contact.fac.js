(function () {

    'use strict';

    angular.module('translateApp')
        .factory('contactFactory', function ($http) {
            var _this = this;
            _this.getShopData = function () {
                var jsonUrl = 'https://json2jsonp.com/?url=https://api.myjson.com/bins/19ynm&callback=JSON_CALLBACK';
                return $http.jsonp(jsonUrl);
            }

            return _this;
        });

})();
