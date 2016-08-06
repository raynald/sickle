angular.module('starter.controllers', ['ngCordova'])
.controller('SubscribeCtrl', SubscribeCtrl)
.controller('ChatsCtrl', ChatsCtrl)
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })
    .controller('PersonDetailCtrl', function($scope, $stateParams, Persons) {
        $scope.person = Persons.get($stateParams.personId);
    })
    .controller('PersonDetailTest', PersonDetailTest)
    .controller('UserMessagesCtrl', ['$scope', '$rootScope', '$state',
        '$stateParams', 'MockService', '$ionicActionSheet',
        '$ionicPopup', '$ionicScrollDelegate', '$timeout', '$interval', UserMessagesCtrl
    ])
    .controller("GetPicCtrl", function($scope, $cordovaCamera, guideData) {
        $scope.takePicture = function() {
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

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
                guideData.photoUri = $scope.imgURI;
            }, function(err) {
                // An error occured. Show a message to the user
            });
        }
    })
    .controller('PersonsCtrl', function($scope, Persons) {

    })
    .controller('MainCtrl', MainCtrl)
    /*radioBox控制器-----jiefly*/
    .controller('RadioCtrl', function($scope, guideData) {
        $scope.check = function(type, index) {
            if (type == 8) {
                guideData.guide08RadioButton[index] = !guideData.guide08RadioButton[index];
                $scope.Check = guideData.guide08RadioButton[index];
                console.log(guideData.guide08RadioButton);
            } else if (type == 9) {
                if (guideData.guide09checkedButtonNum >= 9) {
                    if (!guideData.guide09RadioButton[index]) {
                        return;
                    }
                }
                guideData.guide09RadioButton[index] = !guideData.guide09RadioButton[index];
                if (guideData.guide09RadioButton[index]) {
                    guideData.guide09checkedButtonNum++;
                } else {
                    guideData.guide09checkedButtonNum--;
                }
                $scope.Check = guideData.guide09RadioButton[index];
                console.log(guideData.guide09RadioButton);
            }
        };
    })
    /*基本资料输入项--------------jiefly*/
    .controller('InputCtrl', InputCtrl)
    .controller('GuideExtraInfoCtrl', function($scope, guideData) {
        $scope.guide08ExtraText = null;
        $scope.guide09ExtraText = null;
        $scope.Log = function() {
            guideData.guide08ExtraText = $scope.guide08ExtraText;
            guideData.guide09ExtraText = $scope.guide09ExtraText;
            console.log("8:" + guideData.guide08ExtraText + "9:" + guideData.guide09ExtraText);
        }
    })
    .controller('AccountCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    }).controller('cityCtrl', function($scope) {
        var vm = $scope.vm = {};
        vm.cb = function() {
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
                buttonClicked: function() {
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
        vm.change = function() {
            console.log('change')
            vm.CityPickData4.areaData = ['上海', '徐汇区']
        }
        vm.sync = function() {
            console.log('sync')
            vm.CityPickData4.areaData = vm.CityPickData2.areaData
        }
    });
