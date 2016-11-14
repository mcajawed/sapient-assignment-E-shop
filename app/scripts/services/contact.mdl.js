(function () {

    'use strict';

    angular.module('translateApp').factory('Contact', function () {
        function Contact() {
            this.id = null;
        }

        Contact.prototype.getId = function () {
            return this.id ? this.id : null;
        }

        Contact.prototype.init = function (response) {
            for (var key in response) {
                if (this.hasOwnProperty(key))
                    this[key] = response[key];
            }


            return this;
        }


        return Contact;
    });

})();