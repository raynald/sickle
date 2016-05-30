angular.module('starter.controllers', ['ngCordova'])

    .controller('SubscribeCtrl', function ($scope, Persons) {
        $scope.persons = Persons.getSubscribe();
        $scope.remove = function (person) {
            Persons.remove(person);
        };
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })
    .controller('PersonDetailCtrl', function ($scope, $stateParams, Persons) {
        $scope.person = Persons.get($stateParams.personId);
    }).controller('PersonDetailTest',function($scope,$ionicScrollDelegate){
        var setTagFlag = function(to){
            for(var i=0;i<4;i++){
                if(to == i){
                    $scope.tagState[i] = true;
                }else{
                    $scope.tagState[i] = false;
                }
            }
        };
        $scope.customScrollTo =  function(to){
            /*获取当前滑动的高度*/
            //$scope.currentHeight = $ionicScrollDelegate.getScrollPosition().top;
            var deletate = $ionicScrollDelegate;
                setTagFlag(to);
            switch(to){
                case 0:
                    deletate.scrollTo(0,$scope.tagHeight.tag0,true);
                    break;
                case 1:
                    deletate.scrollTo(0,$scope.tagHeight.tag1,true);
                    break;
                case 2:
                    deletate.scrollTo(0,$scope.tagHeight.tag2,true);
                    break;
                case 3:
                    deletate.scrollTo(0,$scope.tagHeight.tag3,true);
                    break;
            }
        };


            /*function(to){
            $timeout($ionicScrollDelegate.$getByHandle('baseInfo').scrollTop());
            console.log(to);
              switch(to){
                     case 0:
                        break;
                     case 1:
                         break;
                     case 2:
                         break;
                     case 3:
                         break;
             }
        };*/

        $scope.person = {
            job:'国企银行职员',
            include:'张先生的女儿  26岁 167cm',
            face:'img/mike.png',
            tag:{
                group1:{
                    ta1l:"五百强",
                    tat2:"上市公司",
                    tag3:"名校毕业"
                },
                group2:{
                    ta1l:"会做饭",
                    tat2:"会撒娇",
                    tag3:"会打游戏"
                }
            }
        };
        $scope.filterDatas = {
            userAge:{
                info:"年龄",
                value:"不限"
            },
            userHeight: {
                info: "身高",
                value:"不限"
            },
            userEducation: {
                value:"不限",
                info: "学历"
            },
            userHouseholdegister: {
                value:"不限",
                info: "户籍"
            },
            userHousing: {
                value:"不限",
                info: "住房情况"
            },
            userMonthlyIncome: {
                value:"不限",
                info: "月收入"
            },
            userMaritalStatus: {
                value:"不限",
                info: "婚姻状况"
            }
        };

        $scope.datas = {
            userNum:{
                value: 1024,
                info:"亲家号"
            },
            userHome: {
                value: "上海杨浦",
                info: "居住地"
            },
            userHouseholdegister: {
                value: "上海市",
                info: "户籍"
            },
            userHousing: {
                value: "以购房（无贷款）",
                info: "住房情况"
            },
            userEducation: {
                value: "硕士",
                info: "学历"
            },
            userMonthlyIncome: {
                value: "10000以上",
                info: "月收入"
            },
            userMaritalStatus: {
                value: "未婚",
                info: "婚姻状况"
            }
        };
        //用于改变左侧的tag的样式
        $scope.tagState = [true,false,false,false];

        $scope.tagHeight = {
            tag0:0,
            tag1:380,
            tag2:560,
            tag3:950
        };

        var staticColumn = document.getElementById("staticColum");
        $scope.checkTag = function(){
            $scope.height = $ionicScrollDelegate.getScrollPosition().top;
            console.log($scope.height);
            if($scope.height<380){
                //console.log('before---------'+$scope.tagState);
                if(!$scope.tagState[0])
                    setTagFlag(0);
               //console.log('after---------'+$scope.tagState);
            }else if(380<=$scope.height<560){
                if(!$scope.tagState[1])
                    setTagFlag(1);
            }else if(560<=$scope.height<950){
                if(!$scope.tagState[2])
                    setTagFlag(2);
            }else if($scope.height>=950){
                if(!$scope.tagState[3])
                 setTagFlag(3);
            }

        }

    })
    .controller('UserMessagesCtrl', ['$scope', '$rootScope', '$state',
        '$stateParams', 'MockService', '$ionicActionSheet',
        '$ionicPopup', '$ionicScrollDelegate', '$timeout', '$interval',
        function ($scope, $rootScope, $state, $stateParams, MockService,
                  $ionicActionSheet,
                  $ionicPopup, $ionicScrollDelegate, $timeout, $interval) {

            // mock acquiring data via $stateParams
            $scope.toUser = {
                _id: '534b8e5aaa5e7afc1b23e69b',
                pic: 'http://ionicframework.com/img/docs/venkman.jpg',
                username: 'Venkman'
            };

            // this could be on $rootScope rather than in $stateParams
            $scope.user = {
                _id: '534b8fb2aa5e7afc1b23e69c',
                pic: 'http://ionicframework.com/img/docs/mcfly.jpg',
                username: 'Marty'
            };

            $scope.input = {
                message: localStorage['userMessage-' + $scope.toUser._id] || ''
            };

            var messageCheckTimer;

            var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
            var footerBar; // gets set in $ionicView.enter
            var txtInput; // ^^^

            $scope.$on('$ionicView.enter', function () {
                console.log('UserMessages $ionicView.enter');

                getMessages();

                $timeout(function () {
                    footerBar = document.body.querySelector('#userMessagesView .bar-footer');
                    txtInput = angular.element(footerBar.querySelector('textarea'));
                }, 0);

                messageCheckTimer = $interval(function () {
                    // here you could check for new messages if your app doesn't use push notifications or user disabled them
                }, 20000);
            });

            $scope.$on('$ionicView.leave', function () {
                console.log('leaving UserMessages view, destroying interval');
                // Make sure that the interval is destroyed
                if (angular.isDefined(messageCheckTimer)) {
                    $interval.cancel(messageCheckTimer);
                    messageCheckTimer = undefined;
                }
            });

            $scope.$on('$ionicView.beforeLeave', function () {
                if (!$scope.input.message || $scope.input.message === '') {
                    localStorage.removeItem('userMessage-' + $scope.toUser._id);
                }
            });

            function getMessages() {
                // the service is mock but you would probably pass the toUser's GUID here
                MockService.getUserMessages({
                    toUserId: $scope.toUser._id
                }).then(function (data) {
                    $scope.doneLoading = true;
                    $scope.messages = data.messages;

                    $timeout(function () {
                        viewScroll.scrollBottom();
                    }, 0);
                });
            }

            $scope.$watch('input.message', function (newValue, oldValue) {
                console.log('input.message $watch, newValue ' + newValue);
                if (!newValue) newValue = '';
                localStorage['userMessage-' + $scope.toUser._id] = newValue;
            });

            $scope.sendMessage = function (sendMessageForm) {
                var message = {
                    toId: $scope.toUser._id,
                    text: $scope.input.message
                };

                // if you do a web service call this will be needed as well as before the viewScroll calls
                // you can't see the effect of this in the browser it needs to be used on a real device
                // for some reason the one time blur event is not firing in the browser but does on devices
                keepKeyboardOpen();

                //MockService.sendMessage(message).then(function(data) {
                $scope.input.message = '';

                message._id = new Date().getTime(); // :~)
                message.date = new Date();
                message.username = $scope.user.username;
                message.userId = $scope.user._id;
                message.pic = $scope.user.picture;

                $scope.messages.push(message);

                $timeout(function () {
                    keepKeyboardOpen();
                    viewScroll.scrollBottom(true);
                }, 0);

                $timeout(function () {
                    $scope.messages.push(MockService.getMockMessage());
                    keepKeyboardOpen();
                    viewScroll.scrollBottom(true);
                }, 2000);

                //});
            };

            // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
            function keepKeyboardOpen() {
                console.log('keepKeyboardOpen');
                txtInput.one('blur', function () {
                    console.log('textarea blur, focus back on it');
                    txtInput[0].focus();
                });
            }

            $scope.onMessageHold = function (e, itemIndex, message) {
                console.log('onMessageHold');
                console.log('message: ' + JSON.stringify(message, null, 2));
                $ionicActionSheet.show({
                    buttons: [{
                        text: 'Copy Text'
                    }, {
                        text: 'Delete Message'
                    }],
                    buttonClicked: function (index) {
                        switch (index) {
                            case 0: // Copy Text
                                //cordova.plugins.clipboard.copy(message.text);

                                break;
                            case 1: // Delete
                                // no server side secrets here :~)
                                $scope.messages.splice(itemIndex, 1);
                                $timeout(function () {
                                    viewScroll.resize();
                                }, 0);

                                break;
                        }

                        return true;
                    }
                });
            };

            // this prob seems weird here but I have reasons for this in my app, secret!
            $scope.viewProfile = function (msg) {
                if (msg.userId === $scope.user._id) {
                    // go to your profile
                } else {
                    // go to other users profile
                }
            };

            // I emit this event from the monospaced.elastic directive, read line 477
            $scope.$on('taResize', function (e, ta) {
                console.log('taResize');
                if (!ta) return;

                var taHeight = ta[0].offsetHeight;
                console.log('taHeight: ' + taHeight);

                if (!footerBar) return;

                var newFooterHeight = taHeight + 10;
                newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

                footerBar.style.height = newFooterHeight + 'px';
            });

        }]).controller("GetPicCtrl", function ($scope, $cordovaCamera) {
        $scope.takePicture = function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                // An error occured. Show a message to the user
            });
        }
    })
    .controller('PersonsCtrl', function ($scope, Persons) {

    })

    .controller('MainCtrl', function ($scope, Persons) {
        $scope.persons = Persons.all();
        $scope.remove = function (person) {
            Persons.remove(person);
        };
    })
    /*radioBox控制器-----jiefly*/
    .controller('RadioCtrl', function ($scope) {
        $scope.Check = false;
        $scope.nonCheck = true;
        $scope.check = function () {
            $scope.Check = !$scope.Check;
            $scope.nonCheck = !$scope.nonCheck;
        };
    })
    /*基本资料输入项--------------jiefly*/
    .controller('InputCtrl', function ($scope, $ionicPopup, ionicDatePicker) {
        $scope.datas = {
            userHeight: {
                value: null,
                info: "*身高",
                isFilled: false,
                functionId: 0
            },
            userBorn: {
                value: null,
                info: "*出生年月",
                isFilled: false,
                functionId: 1
            },
            userHome: {
                value: null,
                info: "*居住地",
                isFilled: false,
                functionId: 2
            },
            userHouseholdegister: {
                value: null,
                info: "*户籍",
                isFilled: false,
                functionId: 3
            },
            userHousing: {
                value: null,
                info: "*住房情况",
                isFilled: false,
                functionId: 4
            },
            userEducation: {
                value: null,
                info: "*学历",
                isFilled: false,
                functionId: 5
            },
            userJobCategory: {
                value: null,
                info: "*单位性质",
                isFilled: false,
                functionId: 6
            },
            userJob: {
                value: null,
                info: "*职业职务",
                isFilled: false,
                functionId: 7
            },
            userMonthlyIncome: {
                value: null,
                info: "*月收入",
                isFilled: false,
                functionId: 8
            },
            userMaritalStatus: {
                value: null,
                info: "*婚姻状况",
                isFilled: false,
                functionId: 9
            }
        };
        $scope.do = function (id) {

            switch (id) {
                case 0:
                    $scope.showSetHeightPopup();
                    break;
                case 1:
                    $scope.openDatePicker();
                    break;
                case 2:
                    $scope.showHomePopup();
                    break;
                case 7:
                    $scope.showJobPopup();
                    break;
                default :
                    console.log(id);
                    break;
            }
        };
        /*******************************居住地填写*****************************/
        $scope.showHomePopup = function () {
            var HomePopup = $ionicPopup.show({

                template: '<input type="text" ng-model="datas.userHome.value" style="background-color: #6E6E6E !important;border-radius: 1em;height: 3em!important;font-size: 1.5em;text-align: center;">',

                title: '请输入个人居住地',

                scope: $scope,

                buttons: [{text: '取消', type: 'button-red-none'}, {

                    text: '<b>确定</b>',

                    type: 'button-red-none',

                    onTap: function (e) {

                        if (!$scope.datas.userHome.value) {
                            e.preventDefault();

                        } else {
                            return $scope.datas.userHome;
                        }
                    }
                }
                ]
            });

            HomePopup.then(function () {

                if ($scope.datas.userHome.value != null) {
                    console.log($scope.datas.userHome.value);
                    /*$scope.datas.userHeight.value +='cm';*/
                    $scope.datas.userHome.isFilled = true;
                    console.log($scope.datas.userHome.isFilled);
                }
            });
        }
        /*******************************居住地填写*****************************/
        /*******************************职位填写*****************************/
        $scope.showJobPopup = function () {
            var JobPopup = $ionicPopup.show({

                template: '<input type="text" ng-model="datas.userJob.value" style="background-color: #6E6E6E !important;border-radius: 1em;height: 3em!important;font-size: 1.5em;text-align: center;">',

                title: '请输入个人职业',

                scope: $scope,

                buttons: [{text: '取消', type: 'button-red-none'}, {

                    text: '<b>确定</b>',

                    type: 'button-red-none',

                    onTap: function (e) {

                        if (!$scope.datas.userJob.value) {
                            e.preventDefault();

                        } else {
                            return $scope.datas.userJob;
                        }
                    }
                }
                ]
            });

            JobPopup.then(function () {

                if ($scope.datas.userJob.value != null) {
                    console.log($scope.datas.userJob.value);
                    /*$scope.datas.userHeight.value +='cm';*/
                    $scope.datas.userJob.isFilled = true;
                    console.log($scope.datas.userJob.isFilled);
                }
            });
        }
        /*******************************职位填写*****************************/
        /*******************************身高填写*****************************/
        $scope.showSetHeightPopup = function () {

            var HeightPopup = $ionicPopup.show({

                template: '<input type="number" ng-model="datas.userHeight.value" style="background-color: #6E6E6E !important;border-radius: 1em;height: 3em!important;font-size: 1.5em;text-align: center;">',

                title: '请输入个人身高',

                scope: $scope,

                buttons: [{text: '取消', type: 'button-red-none'}, {

                    text: '<b>确定</b>',

                    type: 'button-red-none',

                    onTap: function (e) {

                        if (!$scope.datas.userHeight.value) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();

                        } else {
                            return $scope.datas.userHeight;
                        }
                    }
                }
                ]
            });

            HeightPopup.then(function () {

                if ($scope.datas.userHeight.value != null) {
                    console.log($scope.datas.userHeight.value);
                    /*$scope.datas.userHeight.value +='cm';*/
                    console.log($scope.datas.userHeight.isFilled);
                    $scope.datas.userHeight.isFilled = true;
                    console.log($scope.datas.userHeight.isFilled);
                }
            });

        };
        /*******************************身高填写*****************************/
        /*******************************时间选择器*****************************/
        $scope.openDatePicker = function () {
            ionicDatePicker.openDatePicker(ipObj1);
        };
        var ipObj1 = {
            callback: function (val) {  //Mandatory
                console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                var date = new Date(val);
                $scope.datas.userBorn.value = date.getUTCFullYear() + "/" + date.getUTCMonth() + "/" + date.getUTCDay();
                /*date.getFullYear+"/"+date.getMonth+"/"+date.getDay;*/
                $scope.datas.userBorn.isFilled = true;
            },
            disabledDates: [
                //在这里定义不能够选择的日期
                /*
                 new Date(2016, 2, 16),
                 new Date(2015, 3, 16),
                 new Date(2015, 4, 16),
                 new Date(2015, 5, 16),
                 new Date('Wednesday, August 12, 2015'),
                 new Date("08-16-2016"),
                 new Date(1439676000000)
                 */
            ],
            from: new Date(1949, 1, 1), //Optional
            to: new Date(2018, 1, 1), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            closeOnSelect: false,       //Optional
            templateType: 'modal',       //Optional
        };
        /*******************************时间选择器*****************************/

    })
    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    }).controller('cityCtrl', function ($scope) {
    var vm = $scope.vm = {};
    vm.cb = function () {
        console.log(vm.CityPickData1.areaData)
        console.log(vm.CityPickData2.areaData)
        console.log(vm.CityPickData3.areaData)
        console.log(vm.CityPickData4.areaData)
    }
    //例1
    vm.CityPickData1 = {
        areaData: [],
        backdrop: true,
        backdropClickToClose: true,
        defaultAreaData: ['江苏', '无锡', '江阴市'],
        buttonClicked: function () {
            vm.cb()
        },
        tag: '-',
        iconClass: 'ion-location',
        title: '有icon的数据'
    }
    //例2
    vm.CityPickData2 = {
        areaData: ['请选择城市'],
        title: '没有初始城市',
        hardwareBackButtonClose: false
    }
    //例3
    vm.CityPickData3 = {
        areaData: [],
        defaultAreaData: ['江苏', '无锡', '江阴市'],
        title: '初始城市江苏无锡江阴市'
    }
    //例4
    vm.CityPickData4 = {
        areaData: [],
        title: '外部更改值',
        watchChange: true
    }
    vm.change = function () {
        console.log('change')
        vm.CityPickData4.areaData = ['上海', '徐汇区']
    }
    vm.sync = function () {
        console.log('sync')
        vm.CityPickData4.areaData = vm.CityPickData2.areaData
    }
})
;
