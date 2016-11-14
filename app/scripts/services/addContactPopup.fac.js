(function () {

    'use strict';

    angular.module('translateApp')
        .factory('addContactPopup', function ($modal) {
            var _this = this;

            _this.show = function (product, id) {


                var modalInstance = $modal.open({
                    windowClass: 'help-modal',
                    templateUrl: 'views/displayPhoto.html',
                    controller: function ($scope, $modalInstance) {


                        $scope.GetSelectedSizes = function () {
                            $scope.strSizes = document.getElementById("sizes").value;
                        };
                        $scope.GetSelectedQuan = function () {
                            $scope.strQuan = document.getElementById("quan").value;
                        };


                        if (product == null) {
                            _this.product = new product();
                            _this.product.p_id = id;
                            _this.product.type = productType;
                            _this.product.email = null;
                        } else {
                            //_this.product = product;
                            _this.product = angular.copy(product);
                        }

                        $scope.product = _this.product;

                        $scope.modalCancel = function () {
                            $modalInstance.dismiss('cancel');
                        }


                        $scope.resetErrors = function () {
                            $scope.duplicateRecipient = false;
                            $scope.duplicateSender = false;
                            $scope.otherContactExists = false;
                        }

                    }
                })

                return modalInstance.result;
            }

            return _this;
        });

})();