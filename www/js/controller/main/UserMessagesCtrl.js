var UserMessagesCtrl=function($scope, $rootScope, $state, $stateParams,
            $ionicActionSheet,
            $ionicPopup, $ionicScrollDelegate, $timeout, $interval) {

            // mock acquiring data via $stateParams
            $scope.toUser = {
                _id: '534b8e5aaa5e7afc1b23e69b',
                username: 'reniku_liang',
                id: '0HyWSSSe'
            };

            // this could be on $rootScope rather than in $stateParams
            $scope.user = {
                nickname: '哪个是你',
                id: 'hRkuBBBF',
                _id: '534b8fb2aa5e7afc1b23e69c',
                pic: 'http://ionicframework.com/img/docs/mcfly.jpg',
                username: 'root',
                avatar: 'http://file.bmob.cn/M02/5D/F7/oYYBAFakpIKAKEMcAAFdEtDsVNU776.png'
            };

            $scope.input = {
                message: localStorage['userMessage-' + $scope.toUser._id] || ''
            };

            var messageCheckTimer;

            // var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
            var footerBar; // gets set in $ionicView.enter
            var txtInput; // ^^^

            $scope.$on('$ionicView.enter', function() {
                console.log('UserMessages $ionicView.enter');

                getMessages();

                $timeout(function() {
                    footerBar = document.body.querySelector('#userMessagesView .bar-footer');
                    txtInput = angular.element(footerBar.querySelector('textarea'));
                }, 0);

                messageCheckTimer = $interval(function() {
                    // here you could check for new messages if your app doesn't use push notifications or user disabled them
                }, 20000);
            });

            $scope.$on('$ionicView.leave', function() {
                console.log('leaving UserMessages view, destroying interval');
                // Make sure that the interval is destroyed
                if (angular.isDefined(messageCheckTimer)) {
                    $interval.cancel(messageCheckTimer);
                    messageCheckTimer = undefined;
                }
            });

            $scope.$on('$ionicView.beforeLeave', function() {
                if (!$scope.input.message || $scope.input.message === '') {
                    localStorage.removeItem('userMessage-' + $scope.toUser._id);
                }
            });

            function getMessages() {
                // the service is mock but you would probably pass the toUser's GUID here
                MockService.getUserMessages({
                    toUserId: $scope.toUser._id
                }).then(function(data) {
                    $scope.doneLoading = true;
                    $scope.messages = data.messages;

                    $timeout(function() {
                        viewScroll.scrollBottom();
                    }, 0);
                });
            }

            $scope.$watch('input.message', function(newValue, oldValue) {
                if (!newValue) newValue = '';
                localStorage['userMessage-' + $scope.toUser._id] = newValue;
            });

            $scope.sendMessage = function(sendMessageForm) {
                var message = {
                    belongNick: $scope.user.nickname,
                    content: $scope.input.message,
                    status: 1,
                    toId: $scope.toUser.id,
                    belongId: $scope.user.id,
                    belongUsername: $scope.user.username,
                    isReaded: 0,
                    msgType: 1,
                    beongAvatar: $scope.user.avatar
                };

                message.msgTime = String(new Date().getTime()); // :~)
                message.createdAt = new Date();

                var table_name = "BmobMsg";
                var BmobMsg = new Bmob.Object.extend(table_name);
                var msg = new BmobMsg();
                for(key in message) {
                    msg.set(key, message[key]);
                }
                msg.save();

                // if you do a web service call this will be needed as well as before the viewScroll calls
                // you can't see the effect of this in the browser it needs to be used on a real device
                // for some reason the one time blur event is not firing in the browser but does on devices
                // keepKeyboardOpen();

                //MockService.sendMessage(message).then(function(data) {
                $scope.input.message = '';

                /*
                message.username = $scope.user.username;
                message.userId = $scope.user._id;
                message.pic = $scope.user.picture;
                */

                // $scope.messages.push(message);

//                $timeout(function() {
//                    keepKeyboardOpen();
//                    viewScroll.scrollBottom(true);
//                }, 0);

//                $timeout(function() {
//                    $scope.messages.push(MockService.getMockMessage());
//                    keepKeyboardOpen();
//                    viewScroll.scrollBottom(true);
//                }, 2000);

                //});
            };

            // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
            function keepKeyboardOpen() {
                console.log('keepKeyboardOpen');
                txtInput.one('blur', function() {
                    console.log('textarea blur, focus back on it');
                    txtInput[0].focus();
                });
            }

            $scope.onMessageHold = function(e, itemIndex, message) {
                console.log('onMessageHold');
                console.log('message: ' + JSON.stringify(message, null, 2));
                $ionicActionSheet.show({
                    buttons: [{
                        text: 'Copy Text'
                    }, {
                        text: 'Delete Message'
                    }],
                    buttonClicked: function(index) {
                        switch (index) {
                            case 0: // Copy Text
                                //cordova.plugins.clipboard.copy(message.text);

                                break;
                            case 1: // Delete
                                // no server side secrets here :~)
                                $scope.messages.splice(itemIndex, 1);
                                $timeout(function() {
                                    viewScroll.resize();
                                }, 0);

                                break;
                        }

                        return true;
                    }
                });
            };

            // this prob seems weird here but I have reasons for this in my app, secret!
            $scope.viewProfile = function(msg) {
                if (msg.userId === $scope.user._id) {
                    // go to your profile
                } else {
                    // go to other users profile
                }
            };

            // I emit this event from the monospaced.elastic directive, read line 477
            $scope.$on('taResize', function(e, ta) {
                console.log('taResize');
                if (!ta) return;

                var taHeight = ta[0].offsetHeight;
                console.log('taHeight: ' + taHeight);

                if (!footerBar) return;

                var newFooterHeight = taHeight + 10;
                newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

                footerBar.style.height = newFooterHeight + 'px';
            });

        }
    