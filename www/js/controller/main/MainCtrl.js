var MainCtrl = function($scope, $ionicModal, $ionicPopup, Persons, Users,$ionicScrollDelegate) {
    $scope.activeButton = 'recent';

    $scope.persons = []
    Persons.all().then(function(results) {
        $scope.persons = Persons.convertToJsonArray(results);
    });

    $scope.remove = function(person) {
        Persons.remove(person);
    };
    $scope.tabSelected = function(tab) {
        console.log(tab + ' Tab Selected');
    };
    // 触发一个按钮点击，或一些其他目标
    $scope.showPopup = function() {
        $scope.data = {}

        // 一个精心制作的自定义弹窗
        var myPopup = $ionicPopup.show({
            template: '<h2>关注后才能聊天</h2><h2>是否现在关注？</h2>',

            scope: $scope,
            buttons: [
                { text: '取消' }, {
                    text: '<b class="button-clover active">关注</b>',

                    onTap: function(e) {
                        /*if (!$scope.data.wifi) {
                          //不允许用户关闭，除非他键入wifi密码
                          e.preventDefault();
                        } else {
                          return $scope.data.wifi;
                        }*/
                        return "";
                    }
                }
            ]
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        $timeout(function() {
            myPopup.close(); //由于某种原因3秒后关闭弹出
        }, 3000);
    };

    // 一个确认对话框
    $scope.showConfirm = function(person) {
        var confirmPopup = $ionicPopup.confirm({

            template: '关注后才能聊天是否现在关注?',
            buttons: [
                { text: '取消', type: 'button-red-none' }, {
                    text: '<b>关注</b>',
                    type: 'button-red-none active',
                    onTap: function(e) {
                        /*if (!$scope.data.wifi) {
                          //不允许用户关闭，除非他键入wifi密码
                          e.preventDefault();
                        } else {
                          return $scope.data.wifi;
                        }*/
                        console.log(person);
                        Users.subscribe(person);
                        return "";
                    }
                }
            ]
        });
        confirmPopup.then(function(res) {
            if (res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });
    };

    // 一个提示对话框
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Don\'t eat that!',
            template: 'It might taste good'
        });
        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };


    $ionicModal.fromTemplateUrl('filter.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //当我们用到模型时，清除它！
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // 当隐藏的模型时执行动作
    $scope.$on('modal.hide', function() {
        // 执行动作
    });
    // 当移动模型时执行动作
    $scope.$on('modal.removed', function() {
        // 执行动作
    });


    $scope.filterSwitch = function(filter) {
        $scope.activeButton = filter;

        switch (filter) {
            case 'recent':
                Persons.allSortBy('createdAt').then(function(results) {
                    $scope.persons = Persons.convertToJsonArray(results);
                });
                //$scope.persons = Persons.allSortBy('createdAt');
                break;
            case 'hot':
                Persons.allSortBy('createdAt').then(function(results) {
                    $scope.persons = Persons.convertToJsonArray(results);
                });
                //$scope.persons = Persons.allSortBy('createdAt');
                break;
            case 'filter':
                this.openModal();
                break;
        }

    };

//    滑动事件监听
    $scope.mainScroll = function(){
        //main到260左右头部完全被隐藏，这时候要是main还有向上的滑动的话要将滑动事件传递给list
        $scope.mainScrollPosition = $ionicScrollDelegate.getScrollPosition().top;
        console.log('main:'+$scope.mainScrollPosition);
    };
    $scope.lastListScrollPosition = 0;
    $scope.mainScrollPosition = 0;
//    list 滑动事件监听
    $scope.listScroll = function(){
        height = $ionicScrollDelegate.$getByHandle('list').getScrollPosition().top;
        if(height <= 0 && $scope.mainScrollPosition) {
            delatY = height - $scope.lastListScrollPosition;
            if(delatY>0)
                delatY = - delatY;
            $ionicScrollDelegate.$getByHandle('main').scrollTop(true);
        }
        $scope.lastListScrollPosition = height;
        console.log('list:'+height);
    }
};
