angular.module('translateApp')
    .controller('MainCtrl', function ($scope, $modal, contactFactory, $state, addContactPopup) {

        var _this = this;
        $scope.dataArray = null;
        _this.addtoCartArray = [];
        _this.subtotal = 0;
        _this.discount = 0;
        _this.total = 0;
        _this.count = 0;
        contactFactory.getShopData().success(
            function (response) {
                console.log('test' + response.productsInCart);
                $scope.dataArray = response.productsInCart;

                //console.log('Data'+_this.dataArray);
            },
            function (error) {

            });


        $scope.editItem = function (product, id) {
            // show popUp and edit after popup close or done
            addContactPopup.show(product, id).then(
                function (productItem) {
                    processEditResult(productItem, id);
                },
                function (cancel) {

                });
        };

        $scope.addtoCart = function (product, id) {
            _this.addtoCartArray.push(product);
            // subtotal  of buyed items
            _this.subtotal = 0;
            // return badges count toatal item in basket
            _this.count = _this.addtoCartArray.length;
            for (i = 0; i < _this.addtoCartArray.length; i++) {
                _this.subtotal += _this.addtoCartArray[i].p_price;
            }
            console.log('subtotal' + _this.subtotal)
        };

        $scope.applyPromotion = function () {
            if (_this.addtoCartArray.length <= 3) {
                _this.discount = _this.subtotal * 0.05;
            }
            else if (_this.addtoCartArray.length <= 6) {
                _this.discount = _this.subtotal * 0.10;
            }
            else if (_this.addtoCartArray.length > 10) {
                _this.discount = _this.subtotal * 0.25;
            }
        };


    });
