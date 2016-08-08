angular.module('starter.controllers', ['ngCordova'])

    .controller('SubscribeCtrl', function ($scope, Persons) {
        $scope.activeButton="subscribing";
        $scope.persons = [];
        $scope.remove = function (person) {
            Persons.remove(person);
        };
        $scope.filterSwitch =  function(filter){
            $scope.activeButton=filter;
            switch(filter){
                case 'subscribing':
                    $scope.persons=[];
                    break;
                case 'subscribed':
                    $scope.persons=[];
                    break;
               
            }
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
    }).controller('PersonDetailTest',function($scope,$ionicScrollDelegate,$timeout){
        //用于改变左侧的tag的样式
        $scope.tagState = [true,false,false,false];
        //通过设置这个属性来切换是自己和别人的相亲页面的样式

        //true：自己的相亲名片，false：别人的相亲名片
        $scope.isSelfPersonDetail = true;
        var setTagFlag = function(to){
            for(var i=0;i<4;i++){
                if(i==to){
                    $scope.tagState[to] = true;
                }else{
                    $scope.tagState[i] = false;
                }
            }
            console.log($scope.tagState);
        };
        $scope.customScrollTo =  function(flag,to){
            /*获取当前滑动的高度*/
            if(flag ==0){
                setTagFlag(to);
                $ionicScrollDelegate.scrollTo(0,$scope.tagHeight[to],true);
            }else{

            }
        };
        $scope.person = {
            job:'国企银行职员',
            include:'张先生的女儿  26岁 167cm',
            id:666666,
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

        $scope.tagHeight = [0,380,560,950];

        $scope.checkTag = function(){
            $scope.height = $ionicScrollDelegate.getScrollPosition().top;
            console.log($scope.height);
            //设置一个定时器，看200ms的高度和当前高度是否相同，相同的话则认定为滑动停止
            var height = $scope.height;
            $timeout(
                function(){
                    if(height == $scope.height){
                        console.log("没滑动");
                        if(height<200){
                            setTagFlag(0);
                        }else if(height>=200&&height<480){
                            setTagFlag(1)
                        }else if(height>=480&&height<860){
                            setTagFlag(2)
                        }else if(height>=860){
                            setTagFlag(3)
                        }
                    }
                    //手动刷新数据
                    $scope.$apply();

                },500,false);
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

        }]).controller("GetPicCtrl", function ($scope, $cordovaCamera,guideData) {
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
                guideData.photoUri = $scope.imgURI;
            }, function (err) {
                // An error occured. Show a message to the user
            });
        }
    })
    .controller('PersonsCtrl', function ($scope, Persons) {

    })

    .controller('MainCtrl', function ($scope, $ionicModal,$ionicPopup,Persons,Users) {
        $scope.activeButton='recent';
       
        $scope.persons = Persons.all();
        $scope.remove = function (person) {
            Persons.remove(person);
        };

                 // 触发一个按钮点击，或一些其他目标
        $scope.showPopup = function() {
           $scope.data = {}

           // 一个精心制作的自定义弹窗
           var myPopup = $ionicPopup.show({
             template: '<h2>关注后才能聊天</h2><h2>是否现在关注？</h2>',
             
             scope: $scope,
             buttons: [
               { text: '取消' },
               {
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
               },
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
               { text: '取消', type:'button-red-none'},
               {
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
               },
             ]
             });
             confirmPopup.then(function(res) {
               if(res) {
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

       
        $scope.filterSwitch =  function(filter){
            $scope.activeButton = filter;

            switch(filter){
                case 'recent':
                    $scope.persons=Persons.allSortBy('createdAt');
                    break;
                case 'hot':
                    $scope.persons=Persons.allSortBy('createdAt');
                    break;
                case 'filter':
                    this.openModal();
                    break;
            }
          
        };
    })
<<<<<<< HEAD
=======
    .controller("RegisterCtrl",function($scope,$http){
        $scope.sendMsg = function(userphone){
            console.log( userphone);
           var url = 'http://106.veesing.com/webservice/sms.php?method=Submit&account=cf_wxhdcs789&password=wxhdcs123&mobile='+userphone+'&content=您的验证码是：4526。请不要把验证码泄露给其他人。';
              $http.get(url).success(function(data,status){
 //                 console.log(status);
              })
        }
    })
    /*省市区三级联动 ----by Annabel*/
    .controller("MycityCtrl",['$scope',function($scope){
        $scope.your = {
            province: '',
            city: '',
            area: ''
        };
        $scope.chinaCities = [
            { py: 'sh', province: '上海', cities: [{city:'上海',areas:["黄浦区","卢湾区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区","杨浦区","宝山区","闵行区","嘉定区","松江区","金山区","青浦区","南汇区","奉贤区","浦东新区","崇明县","其他"]}] },
            { py: 'bj', province: '北京', cities: [{city:'北京',areas:["东城区","西城区","崇文区","宣武区","朝阳区","丰台区","石景山区","海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","平谷区","怀柔区","密云县","延庆县"]}] },
            { py: 'hb', province: '湖北', cities: [{city:'武汉',areas:["江岸区","武昌区","江汉区","硚口区","汉阳区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区","其他"]},
                                                    {city:"黄石", areas:["黄石港区","西塞山区","下陆区","铁山区","大冶市","阳新县","其他"]},
                                                    {city:"十堰", areas:["张湾区","茅箭区","丹江口市","郧县","竹山县","房县","郧西县","竹溪县","其他"]},
                                                    {city:"荆州", areas:["沙市区","荆州区","洪湖市","石首市","松滋市","监利县","公安县","江陵县","其他"]},
                                                    {city:"宜昌", areas:["西陵区","伍家岗区","点军区","猇亭区","夷陵区","宜都市","当阳市","枝江市","秭归县","远安县","兴山县","五峰土家族自治县","长阳土家族自治县","其他"]},
                                                    {city:"襄樊", areas:["襄城区","樊城区","襄阳区","老河口市","枣阳市","宜城市","南漳县","谷城县","保康县","其他"]},
                                                    {city:"鄂州", areas:["鄂城区","华容区","梁子湖区","其他"]},
                                                    {city:"荆门", areas:["东宝区","掇刀区","钟祥市","京山县","沙洋县","其他"]},
                                                    {city:"孝感", areas:["孝南区","应城市","安陆市","汉川市","云梦县","大悟县","孝昌县","其他"]},
                                                    {city:"黄冈", areas:["黄州区","麻城市","武穴市","红安县","罗田县","浠水县","蕲春县","黄梅县","英山县","团风县","其他"]},
                                                    {city:"咸宁", areas:["咸安区","赤壁市","嘉鱼县","通山县","崇阳县","通城县","其他"]},
                                                    {city:"随州", areas:["曾都区","广水市","其他"]},
                                                    {city:"恩施土家族苗族自治州", areas:["恩施市","利川市","建始县","来凤县","巴东县","鹤峰县","宣恩县","咸丰县","其他"]},
                                                    {city:"仙桃", areas:["仙桃"]},
                                                    {city:"天门", areas:["天门"]},
                                                    {city:"潜江", areas:["潜江"]},
                                                    {city:"神农架林区", areas:["神农架林区"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'tj', province: '天津', cities: [{city:'天津',areas:["和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区","大港区","东丽区","西青区","津南区","北辰区","武清区","宝坻区","宁河县","静海县","蓟  县"]}] },
            { py: 'heb', province: '河北', cities: [{city:'石家庄',areas:['长安区',"桥东区","桥西区","新华区","郊  区","井陉矿区","井陉县","正定县","栾城县","行唐县","灵寿县","高邑县","深泽县","赞皇县","无极县","平山县","元氏县","赵  县","辛集市","藁","晋州市","新乐市","鹿泉市"]},
                                                   {city:'秦皇岛',areas:['海港区',"山海关区","北戴河区","青龙满族自治县","昌黎县","抚宁县","卢龙县"]},
                                                   {city:'唐山',areas:["路南区","路北区","古冶区","开平区","新  区","丰润县","滦  县","滦南县","乐亭县","迁西县","玉田县","唐海县","遵化市","丰南市","迁安市"]},
                                                   {city:'邯郸',areas:["邯山区","丛台区","复兴区","峰峰矿区","邯郸县","临漳县","成安县","大名县","涉  县","磁  县","肥乡县","永年县","邱  县","鸡泽县","广平县","馆陶县","魏  县","曲周县","武安市"]},
                                                   {city:'邢台',areas:["桥东区","桥西区","邢台县","临城县","内丘县","柏乡县","隆尧县","任  县","南和县","宁晋县","巨鹿县","新河县","广宗县","平乡县","威  县","清河县","临西县","南宫市","沙河市"]},
                                                   {city:'保定',areas:["新市区","北市区","南市区","满城县","清苑县","涞水县","阜平县","徐水县","定兴县","唐  县","高阳县","容城县","涞源县","望都县","安新县","易  县","曲阳县","蠡  县","顺平县","博野","雄县","涿州市","定州市","安国市","高碑店市"]},
                                                   {city:'张家口',areas:["桥东区","桥西区","宣化区","下花园区","宣化县","张北县","康保县","沽源县","尚义县","蔚  县","阳原县","怀安县","万全县","怀来县","涿鹿县","赤城县","崇礼县"]},
                                                   {city:"承德", areas:["双桥区","双滦区","鹰手营子矿区","承德县","兴隆县","平泉县","滦平县","隆化县","丰宁满族自治县","宽城满族自治县","围场满族蒙古族自治县"]},
                                                   {city:"沧州", areas:["新华区","运河区","沧  县","青  县","东光县","海兴县","盐山县","肃宁县","南皮县","吴桥县","献  县","孟村回族自治县","泊头市","任丘市","黄骅市","河间市"]},
                                                   {city:"廊坊", areas:["安次区","固安县","永清县","香河县","大城县","文安县","大厂回族自治县","霸州市","三河市"]},
                                                   {city:"衡水", areas:["桃城区","枣强县","武邑县","武强县","饶阳县","安平县","故城县","景  县","阜城县","冀州市","深州市"]}] },
            { py: 'shx', province: '山西', cities: [{city:"太原", areas:['小店区',"迎泽区","杏花岭区","尖草坪区","万柏林区","晋源区","清徐县","阳曲县","娄烦县","古交市"]},
                                                    {city:"大同", areas:["城  区","矿  区","南郊区","新荣区","阳高县","天镇县","广灵县","灵丘县","浑源县","左云县","大同县"]},
                                                    {city:"阳泉", areas:["城  区","矿  区","郊  区","平定县","盂  县"]},
                                                    {city:"长治", areas:["城  区","郊  区","长治县","襄垣县","屯留县","平顺县","黎城县","壶关县","长子县","武乡县","沁  县","沁源县","潞城市"]},
                                                    {city:"晋城", areas:["城  区","沁水县","阳城县","陵川县","泽州县","高平市"]},
                                                    {city:"朔州", areas:["朔城区","平鲁区","山阴县","应  县","右玉县","怀仁县"]},
                                                    {city:"忻州", areas:["忻府区","原平市","定襄县","五台县","代  县","繁峙县","宁武县","静乐县","神池县","五寨县","岢岚县","河曲县","保德县","偏关县"]},
                                                    {city:"吕梁", areas:["离石区","孝义市","汾阳市","文水县","交城县","兴  县","临  县","柳林县","石楼县","岚  县","方山县","中阳县","交口县"]},
                                                    {city:"晋中", areas:["榆次市","介休市","榆社县","左权县","和顺县","昔阳县","寿阳县","太谷县","祁  县","平遥县","灵石县"]},
                                                    {city:"临汾", areas:["临汾市","侯马市","霍州市","曲沃县","翼城县","襄汾县","洪洞县","古  县","安泽县","浮山县","吉  县","乡宁县","蒲  县","大宁县","永和县","隰  县","汾西县"]},
                                                    {city:"运城", areas:['运城市',"永济市","河津市","芮城县","临猗县","万荣县","新绛县","稷山县","闻喜县","夏  县","绛  县","平陆县","垣曲县"]}]},
            { py: 'nmg', province: '内蒙古', cities: [{city:"呼和浩特", areas:["新城区","回民区","玉泉区","郊  区","土默特左旗","托克托县","和林格尔县","清水河县","武川县"]},
                                                    {city:"包头", areas:["东河区","昆都伦区","青山区","石拐矿区","白云矿区","郊  区","土默特右旗","固阳县","达尔罕茂明安联合旗"]},
                                                    {city:"乌海", areas:["海勃湾区","海南区","乌达区"]},
                                                    {city:"赤峰", areas:["红山区","元宝山区","松山区","阿鲁科尔沁旗","巴林左旗","巴林右旗","林西县","克什克腾旗","翁牛特旗","喀喇沁旗","宁城县","敖汉旗"]},
                                                    {city:"呼伦@bale@", areas:["海拉尔市","满洲里市","扎兰屯市","牙克石市","根河市","额尔古纳市","阿荣旗","莫力达瓦达斡尔族自治旗","鄂伦春自治旗","鄂温克族自治旗","新巴尔虎右旗","新巴尔虎左旗","陈巴尔虎旗"]},
                                                    {city:"兴安盟", areas:["乌兰浩特市","阿尔山市","科尔沁右翼前旗","科尔沁右翼中旗","扎赉特旗","突泉县"]},
                                                    {city:"通辽", areas:["科尔沁区","霍林郭勒市","科尔沁左翼中旗","科尔沁左翼后旗","开鲁县","库伦旗","奈曼旗","扎鲁特旗"]},
                                                    {city:"锡林郭勒盟", areas:["二连浩特市","锡林浩特市","阿巴嘎旗","苏尼特左旗","苏尼特右旗","东乌珠穆沁旗","西乌珠穆沁旗","太仆寺旗","镶黄旗","正镶白旗","正蓝旗","多伦县"]},
                                                    {city:"乌兰察布盟", areas:["集宁市","丰镇市","卓资县","化德县","商都县","兴和县","凉城县","察哈尔右翼前旗","察哈尔右翼中旗","察哈尔右翼后旗","四子王旗"]},
                                                    {city:"伊克昭盟", areas:["东胜市","达拉特旗","准格尔旗","鄂托克前旗","鄂托克旗","杭锦旗","乌审旗","伊金霍洛旗"]},
                                                    {city:"巴彦淖尔盟", areas:["临河市","五原县","磴口县","乌拉特前旗","乌拉特中旗","乌拉特后旗","杭锦后旗"]},
                                                    {city:"阿拉善盟", areas:["阿拉善左旗","阿拉善右旗","额济纳旗"]}] },
            { py: 'ln', province: '辽宁', cities: [{city:"沈阳", areas:["沈河区","皇姑区","和平区","大东区","铁西区","苏家屯区","东陵区","于洪区","新民市","法库县","辽中县","康平县","新城子区","其他"]},
                                                    {city:"大连", areas:["西岗区","中山区","沙河口区","甘井子区","旅顺口区","金州区","瓦房店市","普兰店市","庄河市","长海县","其他"]},
                                                    {city:"鞍山", areas:["铁东区","铁西区","立山区","千山区","海城市","台安县","岫岩满族自治县","其他"]},
                                                    {city:"抚顺",areas:["顺城区","新抚区","东洲区","望花区","抚顺县","清原满族自治县","新宾满族自治县","其他"]},
                                                    {city:"本溪", areas:["平山区","明山区","溪湖区","南芬区","本溪满族自治县","桓仁满族自治县","其他"]},
                                                    {city:"丹东", areas:["振兴区","元宝区","振安区","东港市","凤城市","宽甸满族自治县","其他"]},
                                                    {city:"锦州", areas:["太和区","古塔区","凌河区","凌海市","黑山县","义县","北宁市","其他"]},
                                                    {city:"营口", areas:["站前区","西市区","鲅鱼圈区","老边区","大石桥市","盖州市","其他"]},
                                                    {city:"阜新", areas:["海州区","新邱区","太平区","清河门区","细河区","彰武县","阜新蒙古族自治县","其他"]},
                                                    {city:"辽阳", areas:["白塔区","文圣区","宏伟区","太子河区","弓长岭区","灯塔市","辽阳县","其他"]},
                                                    {city:"盘锦", areas:["双台子区","兴隆台区","盘山县","大洼县","其他"]},
                                                    {city:"铁岭", areas:["银州区","清河区","调兵山市","开原市","铁岭县","昌图县","西丰县","其他"]},
                                                    {city:"朝阳", areas:["双塔区","龙城区","凌源市","北票市","朝阳县","建平县","喀喇沁左翼蒙古族自治县","其他"]},
                                                    {city:"葫芦岛", areas:["龙港区","南票区","连山区","兴城市","绥中县","建昌县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'jl', province: '吉林', cities: [{city:"长春", areas:["朝阳区","宽城区","二道区","南关区","绿园区","双阳区","九台市","榆树市","德惠市","农安县","其他"]},
                                                    {city:"吉林", areas:["船营区","昌邑区","龙潭区","丰满区","舒兰市","桦甸市","蛟河市","磐石市","永吉县","其他"]},
                                                    {city:"四平", areas:["铁西区","铁东区","公主岭市","双辽市","梨树县","伊通满族自治县","其他"]},
                                                    {city:"辽源", areas:["龙山区","西安区","东辽县","东丰县","其他"]},
                                                    {city:"通化", areas:["东昌区","二道江区","梅河口市","集安市","通化县","辉南县","柳河县","其他"]},
                                                    {city:"白山", areas:["八道江区","江源区","临江市","靖宇县","抚松县","长白朝鲜族自治县","其他"]},
                                                    {city:"松原", areas:["宁江区","乾安县","长岭县","扶余县","前郭尔罗斯蒙古族自治县","其他"]},
                                                    {city:"白城", areas:["洮北区","大安市","洮南市","镇赉县","通榆县","其他"]},
                                                    {city:"延边朝鲜族自治州", areas:["延吉市","图们市","敦化市","龙井市","珲春市","和龙市","安图县","汪清县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'hlj', province: '黑龙江', cities: [{city:"哈尔滨", areas:["松北区","道里区","南岗区","平房区","香坊区","道外区","呼兰区","阿城区","双城市","尚志市","五常市","宾县","方正县","通河县","巴彦县","延寿县","木兰县","依兰县","其他"]},
                                                    {city:"齐齐哈尔", areas:["龙沙区","昂昂溪区","铁锋区","建华区","富拉尔基区","碾子山区","梅里斯达斡尔族区","讷河市","富裕县","拜泉县","甘南县","依安县","克山县","泰来县","克东县","龙江县","其他"]},
                                                    {city:"鹤岗", areas:["兴山区","工农区","南山区","兴安区","向阳区","东山区","萝北县","绥滨县","其他"]},
                                                    {city:"双鸭山", areas:["尖山区","岭东区","四方台区","宝山区","集贤县","宝清县","友谊县","饶河县","其他"]},
                                                    {city:"鸡西", areas:["鸡冠区","恒山区","城子河区","滴道区","梨树区","麻山区","密山市","虎林市","鸡东县","其他"]},
                                                    {city:"大庆", areas:["萨尔图区","红岗区","龙凤区","让胡路区","大同区","林甸县","肇州县","肇源县","杜尔伯特蒙古族自治县","其他"]},
                                                    {city:"伊春", areas:["伊春区","带岭区","南岔区","金山屯区","西林区","美溪区","乌马河区","翠峦区","友好区","上甘岭区","五营区","红星区","新青区","汤旺河区","乌伊岭区","铁力市","嘉荫县","其他"]},
                                                    {city:"牡丹江", areas:["爱民区","东安区","阳明区","西安区","绥芬河市","宁安市","海林市","穆棱市","林口县","东宁县","其他"]},
                                                    {city:"佳木斯", areas:["向阳区","前进区","东风区","郊区","同江市","富锦市","桦川县","抚远县","桦南县","汤原县","其他"]},
                                                    {city:"七台河", areas:["桃山区","新兴区","茄子河区","勃利县","其他"]},
                                                    {city:"黑河", areas:["爱辉区","北安市","五大连池市","逊克县","嫩江县","孙吴县","其他"]},
                                                    {city:"绥化", areas:["北林区","安达市","肇东市","海伦市","绥棱县","兰西县","明水县","青冈县","庆安县","望奎县","其他"]},
                                                    {city:"大兴安岭地区", areas:["呼玛县","塔河县","漠河县","大兴安岭辖区","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'js', province: '江苏', cities: [{city:"南京", areas:["玄武区","白下区","秦淮区","建邺区","鼓楼区","下关区","栖霞区","雨花台区","浦口区","江宁区","六合区","溧水县","高淳县","其他"]},
                                                    {city:"苏州", areas:["金阊区","平江区","沧浪区","虎丘区","吴中区","相城区","常熟市","张家港市","昆山市","吴江市","太仓市","其他"]},
                                                    {city:"无锡", areas:["崇安区","南长区","北塘区","滨湖区","锡山区","惠山区","江阴市","宜兴市","其他"]},
                                                    {city:"常州", areas:["钟楼区","天宁区","戚墅堰区","新北区","武进区","金坛市","溧阳市","其他"]},
                                                    {city:"镇江", areas:["京口区","润州区","丹徒区","丹阳市","扬中市","句容市","其他"]},
                                                    {city:"南通", areas:["崇川区","港闸区","通州市","如皋市","海门市","启东市","海安县","如东县","其他"]},
                                                    {city:"泰州", areas:["海陵区","高港区","姜堰市","泰兴市","靖江市","兴化市","其他"]},
                                                    {city:"扬州", areas:["广陵区","维扬区","邗江区","江都市","仪征市","高邮市","宝应县","其他"]},
                                                    {city:"盐城", areas:["亭湖区","盐都区","大丰市","东台市","建湖县","射阳县","阜宁县","滨海县","响水县","其他"]},
                                                    {city:"连云港", areas:["新浦区","海州区","连云区","东海县","灌云县","赣榆县","灌南县","其他"]},
                                                    {city:"徐州", areas:["云龙区","鼓楼区","九里区","泉山区","贾汪区","邳州市","新沂市","铜山县","睢宁县","沛县","丰县","其他"]},
                                                    {city:"淮安", areas:["清河区","清浦区","楚州区","淮阴区","涟水县","洪泽县","金湖县","盱眙县","其他"]},
                                                    {city:"宿迁", areas:["宿城区","宿豫区","沭阳县","泗阳县","泗洪县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'zhj', province: '浙江', cities: [{city:"杭州", areas:["拱墅区","西湖区","上城区","下城区","江干区","滨江区","余杭区","萧山区","建德市","富阳市","临安市","桐庐县","淳安县","其他"]},
                                                    {city:"宁波", areas:["海曙区","江东区","江北区","镇海区","北仑区","鄞州区","余姚市","慈溪市","奉化市","宁海县","象山县","其他"]},
                                                    {city:"温州", areas:["鹿城区","龙湾区","瓯海区","瑞安市","乐清市","永嘉县","洞头县","平阳县","苍南县","文成县","泰顺县","其他"]},
                                                    {city:"嘉兴", areas:["秀城区","秀洲区","海宁市","平湖市","桐乡市","嘉善县","海盐县","其他"]},
                                                    {city:"湖州", areas:["吴兴区","南浔区","长兴县","德清县","安吉县","其他"]},
                                                    {city:"绍兴", areas:["越城区","诸暨市","上虞市","嵊州市","绍兴县","新昌县","其他"]},
                                                    {city:"金华", areas:["婺城区","金东区","兰溪市","义乌市","东阳市","永康市","武义县","浦江县","磐安县","其他"]},
                                                    {city:"衢州", areas:["柯城区","衢江区","江山市","龙游县","常山县","开化县","其他"]},
                                                    {city:"舟山", areas:["定海区","普陀区","岱山县","嵊泗县","其他"]},
                                                    {city:"台州", areas:["椒江区","黄岩区","路桥区","临海市","温岭市","玉环县","天台县","仙居县","三门县","其他"]},
                                                    {city:"丽水", areas:["莲都区","龙泉市","缙云县","青田县","云和县","遂昌县","松阳县","庆元县","景宁畲族自治县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'anh', province: '安徽', cities: [{city:"合肥", areas:["庐阳区","瑶海区","蜀山区","包河区","长丰县","肥东县","肥西县","其他"]},
                                                    {city:"芜湖", areas:["镜湖区","弋江区","鸠江区","三山区","芜湖县","南陵县","繁昌县","其他"]},
                                                    {city:"蚌埠", areas:["蚌山区","龙子湖区","禹会区","淮上区","怀远县","固镇县","五河县","其他"]},
                                                    {city:"淮南", areas:["田家庵区","大通区","谢家集区","八公山区","潘集区","凤台县","其他"]},
                                                    {city:"马鞍山", areas:["雨山区","花山区","金家庄区","当涂县","其他"]},
                                                    {city:"淮北", areas:["相山区","杜集区","烈山区","濉溪县","其他"]},
                                                    {city:"铜陵", areas:["铜官山区","狮子山区","郊区","铜陵县","其他"]},
                                                    {city:"安庆", areas:["迎江区","大观区","宜秀区","桐城市","宿松县","枞阳县","太湖县","怀宁县","岳西县","望江县","潜山县","其他"]},
                                                    {city:"黄山", areas:["屯溪区","黄山区","徽州区","休宁县","歙县","祁门县","黟县","其他"]},
                                                    {city:"滁州", areas:["琅琊区","南谯区","天长市","明光市","全椒县","来安县","定远县","凤阳县","其他"]},
                                                    {city:"阜阳", areas:["颍州区","颍东区","颍泉区","界首市","临泉县","颍上县","阜南县","太和县","其他"]},
                                                    {city:"宿州", areas:["埇桥区","萧县","泗县","砀山县","灵璧县","其他"]}, {"name":"巢湖", "area":["居巢区","含山县","无为县","庐江县","和县","其他"]},
                                                    {city:"六安", areas:["金安区","裕安区","寿县","霍山县","霍邱县","舒城县","金寨县","其他"]},
                                                    {city:"亳州", areas:["谯城区","利辛县","涡阳县","蒙城县","其他"]},
                                                    {city:"池州", areas:["贵池区","东至县","石台县","青阳县","其他"]},
                                                    {city:"宣城", areas:["宣州区","宁国市","广德县","郎溪县","泾县","旌德县","绩溪县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'fj', province: '福建', cities: [{city:"福州", areas:["鼓楼区","台江区","仓山区","马尾区","晋安区","福清市","长乐市","闽侯县","闽清县","永泰县","连江县","罗源县","平潭县","其他"]},
                                                    {city:"厦门", areas:["思明区","海沧区","湖里区","集美区","同安区","翔安区","其他"]},
                                                    {city:"莆田", areas:["城厢区","涵江区","荔城区","秀屿区","仙游县","其他"]},
                                                    {city:"三明", areas:["梅列区","三元区","永安市","明溪县","将乐县","大田县","宁化县","建宁县","沙县","尤溪县","清流县","泰宁县","其他"]},
                                                    {city:"泉州", areas:["鲤城区","丰泽区","洛江区","泉港区","石狮市","晋江市","南安市","惠安县","永春县","安溪县","德化县","金门县","其他"]},
                                                    {city:"漳州", areas:["芗城区","龙文区","龙海市","平和县","南靖县","诏安县","漳浦县","华安县","东山县","长泰县","云霄县","其他"]},
                                                    {city:"南平", areas:["延平区","建瓯市","邵武市","武夷山市","建阳市","松溪县","光泽县","顺昌县","浦城县","政和县","其他"]},
                                                    {city:"龙岩", areas:["新罗区","漳平市","长汀县","武平县","上杭县","永定县","连城县","其他"]},
                                                    {city:"宁德", areas:["蕉城区","福安市","福鼎市","寿宁县","霞浦县","柘荣县","屏南县","古田县","周宁县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'jx', province: '江西', cities: [{city:"南昌", areas:["东湖区","西湖区","青云谱区","湾里区","青山湖区","新建县","南昌县","进贤县","安义县","其他"]},
                                                    {city:"景德镇", areas:["珠山区","昌江区","乐平市","浮梁县","其他"]},
                                                    {city:"萍乡", areas:["安源区","湘东区","莲花县","上栗县","芦溪县","其他"]},
                                                    {city:"九江", areas:["浔阳区","庐山区","瑞昌市","九江县","星子县","武宁县","彭泽县","永修县","修水县","湖口县","德安县","都昌县","其他"]},
                                                    {city:"新余", areas:["渝水区","分宜县","其他"]},
                                                    {city:"鹰潭", areas:["月湖区","贵溪市","余江县","其他"]},
                                                    {city:"赣州", areas:["章贡区","瑞金市","南康市","石城县","安远县","赣县","宁都县","寻乌县","兴国县","定南县","上犹县","于都县","龙南县","崇义县","信丰县","全南县","大余县","会昌县","其他"]},
                                                    {city:"吉安", areas:["吉州区","青原区","井冈山市","吉安县","永丰县","永新县","新干县","泰和县","峡江县","遂川县","安福县","吉水县","万安县","其他"]},
                                                    {city:"宜春", areas:["袁州区","丰城市","樟树市","高安市","铜鼓县","靖安县","宜丰县","奉新县","万载县","上高县","其他"]},
                                                    {city:"抚州", areas:["临川区","南丰县","乐安县","金溪县","南城县","东乡县","资溪县","宜黄县","广昌县","黎川县","崇仁县","其他"]},
                                                    {city:"上饶", areas:["信州区","德兴市","上饶县","广丰县","鄱阳县","婺源县","铅山县","余干县","横峰县","弋阳县","玉山县","万年县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'shd', province: '山东', cities: [{city:"济南", areas:["市中区","历下区","天桥区","槐荫区","历城区","长清区","章丘市","平阴县","济阳县","商河县","其他"]},
                                                    {city:"青岛", areas:["市南区","市北区","城阳区","四方区","李沧区","黄岛区","崂山区","胶南市","胶州市","平度市","莱西市","即墨市","其他"]},
                                                    {city:"淄博", areas:["张店区","临淄区","淄川区","博山区","周村区","桓台县","高青县","沂源县","其他"]},
                                                    {city:"枣庄", areas:["市中区","山亭区","峄城区","台儿庄区","薛城区","滕州市","其他"]},
                                                    {city:"东营", areas:["东营区","河口区","垦利县","广饶县","利津县","其他"]},
                                                    {city:"烟台", areas:["芝罘区","福山区","牟平区","莱山区","龙口市","莱阳市","莱州市","招远市","蓬莱市","栖霞市","海阳市","长岛县","其他"]},
                                                    {city:"潍坊", areas:["潍城区","寒亭区","坊子区","奎文区","青州市","诸城市","寿光市","安丘市","高密市","昌邑市","昌乐县","临朐县","其他"]},
                                                    {city:"济宁", areas:["市中区","任城区","曲阜市","兖州市","邹城市","鱼台县","金乡县","嘉祥县","微山县","汶上县","泗水县","梁山县","其他"]},
                                                    {city:"泰安", areas:["泰山区","岱岳区","新泰市","肥城市","宁阳县","东平县","其他"]},
                                                    {city:"威海", areas:["环翠区","乳山市","文登市","荣成市","其他"]},
                                                    {city:"日照", areas:["东港区","岚山区","五莲县","莒县","其他"]},
                                                    {city:"莱芜", areas:["莱城区","钢城区","其他"]},
                                                    {city:"临沂", areas:["兰山区","罗庄区","河东区","沂南县","郯城县","沂水县","苍山县","费县","平邑县","莒南县","蒙阴县","临沭县","其他"]},
                                                    {city:"德州", areas:["德城区","乐陵市","禹城市","陵县","宁津县","齐河县","武城县","庆云县","平原县","夏津县","临邑县","其他"]},
                                                    {city:"聊城", areas:["东昌府区","临清市","高唐县","阳谷县","茌平县","莘县","东阿县","冠县","其他"]},
                                                    {city:"滨州", areas:["滨城区","邹平县","沾化县","惠民县","博兴县","阳信县","无棣县","其他"]},
                                                    {city:"菏泽", areas:["牡丹区","鄄城县","单县","郓城县","曹县","定陶县","巨野县","东明县","成武县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'hn', province: '河南', cities: [{city:"郑州", areas:["中原区","金水区","二七区","管城回族区","上街区","惠济区","巩义市","新郑市","新密市","登封市","荥阳市","中牟县","其他"]},
                                                    {city:"开封", areas:["鼓楼区","龙亭区","顺河回族区","禹王台区","金明区","开封县","尉氏县","兰考县","杞县","通许县","其他"]},
                                                    {city:"洛阳", areas:["西工区","老城区","涧西区","瀍河回族区","洛龙区","吉利区","偃师市","孟津县","汝阳县","伊川县","洛宁县","嵩县","宜阳县","新安县","栾川县","其他"]},
                                                    {city:"平顶山", areas:["新华区","卫东区","湛河区","石龙区","汝州市","舞钢市","宝丰县","叶县","郏县","鲁山县","其他"]},
                                                    {city:"安阳", areas:["北关区","文峰区","殷都区","龙安区","林州市","安阳县","滑县","内黄县","汤阴县","其他"]},
                                                    {city:"鹤壁", areas:["淇滨区","山城区","鹤山区","浚县","淇县","其他"]},
                                                    {city:"新乡", areas:["卫滨区","红旗区","凤泉区","牧野区","卫辉市","辉县市","新乡县","获嘉县","原阳县","长垣县","封丘县","延津县","其他"]},
                                                    {city:"焦作", areas:["解放区","中站区","马村区","山阳区","沁阳市","孟州市","修武县","温县","武陟县","博爱县","其他"]},
                                                    {city:"濮阳", areas:["华龙区","濮阳县","南乐县","台前县","清丰县","范县","其他"]},
                                                    {city:"许昌", areas:["魏都区","禹州市","长葛市","许昌县","鄢陵县","襄城县","其他"]},
                                                    {city:"漯河", areas:["源汇区","郾城区","召陵区","临颍县","舞阳县","其他"]},
                                                    {city:"三门峡", areas:["湖滨区","义马市","灵宝市","渑池县","卢氏县","陕县","其他"]},
                                                    {city:"南阳", areas:["卧龙区","宛城区","邓州市","桐柏县","方城县","淅川县","镇平县","唐河县","南召县","内乡县","新野县","社旗县","西峡县","其他"]},
                                                    {city:"商丘", areas:["梁园区","睢阳区","永城市","宁陵县","虞城县","民权县","夏邑县","柘城县","睢县","其他"]},
                                                    {city:"信阳", areas:["浉河区","平桥区","潢川县","淮滨县","息县","新县","商城县","固始县","罗山县","光山县","其他"]},
                                                    {city:"周口", areas:["川汇区","项城市","商水县","淮阳县","太康县","鹿邑县","西华县","扶沟县","沈丘县","郸城县","其他"]},
                                                    {city:"驻马店", areas:["驿城区","确山县","新蔡县","上蔡县","西平县","泌阳县","平舆县","汝南县","遂平县","正阳县","其他"]},
                                                    {city:"焦作", areas:["济源市","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'hn', province: '湖南', cities: [{city:"长沙", areas:["岳麓区","芙蓉区","天心区","开福区","雨花区","浏阳市","长沙县","望城县","宁乡县","其他"]},
                                                    {city:"株洲", areas:["天元区","荷塘区","芦淞区","石峰区","醴陵市","株洲县","炎陵县","茶陵县","攸县","其他"]},
                                                    {city:"湘潭", areas:["岳塘区","雨湖区","湘乡市","韶山市","湘潭县","其他"]},
                                                    {city:"衡阳", areas:["雁峰区","珠晖区","石鼓区","蒸湘区","南岳区","耒阳市","常宁市","衡阳县","衡东县","衡山县","衡南县","祁东县","其他"]},
                                                    {city:"邵阳", areas:["双清区","大祥区","北塔区","武冈市","邵东县","洞口县","新邵县","绥宁县","新宁县","邵阳县","隆回县","城步苗族自治县","其他"]},
                                                    {city:"岳阳", areas:["岳阳楼区","云溪区","君山区","临湘市","汨罗市","岳阳县","湘阴县","平江县","华容县","其他"]},
                                                    {city:"常德", areas:["武陵区","鼎城区","津市市","澧县","临澧县","桃源县","汉寿县","安乡县","石门县","其他"]},
                                                    {city:"张家界", areas:["永定区","武陵源区","慈利县","桑植县","其他"]},
                                                    {city:"益阳", areas:["赫山区","资阳区","沅江市","桃江县","南县","安化县","其他"]},
                                                    {city:"郴州", areas:["北湖区","苏仙区","资兴市","宜章县","汝城县","安仁县","嘉禾县","临武县","桂东县","永兴县","桂阳县","其他"]},
                                                    {city:"永州", areas:["冷水滩区","零陵区","祁阳县","蓝山县","宁远县","新田县","东安县","江永县","道县","双牌县","江华瑶族自治县","其他"]},
                                                    {city:"怀化", areas:["鹤城区","洪江市","会同县","沅陵县","辰溪县","溆浦县","中方县","新晃侗族自治县","芷江侗族自治县","通道侗族自治县","靖州苗族侗族自治县","麻阳苗族自治县","其他"]},
                                                    {city:"娄底", areas:["娄星区","冷水江市","涟源市","新化县","双峰县","其他"]},
                                                    {city:"湘西土家族苗族自治州", areas:["吉首市","古丈县","龙山县","永顺县","凤凰县","泸溪县","保靖县","花垣县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'gd', province: '广东', cities: [{city:"广州", areas:["越秀区","荔湾区","海珠区","天河区","白云区","黄埔区","番禺区","花都区","南沙区","萝岗区","增城市","从化市","其他"]},
                                                    {city:"深圳", areas:["福田区","罗湖区","南山区","宝安区","龙岗区","盐田区","其他"]},
                                                    {city:"东莞", areas:["莞城","常平","塘厦","塘厦","塘厦","其他"]},
                                                    {city:"中山", areas:["中山"]},
                                                    {city:"潮州", areas:["湘桥区","潮安县","饶平县","其他"]},
                                                    {city:"揭阳", areas:["榕城区","揭东县","揭西县","惠来县","普宁市","其他"]},
                                                    {city:"云浮", areas:["云城区","新兴县","郁南县","云安县","罗定市","其他"]},
                                                    {city:"珠海", areas:["香洲区","斗门区","金湾区","其他"]},
                                                    {city:"汕头", areas:["金平区","濠江区","龙湖区","潮阳区","潮南区","澄海区","南澳县","其他"]},
                                                    {city:"韶关", areas:["浈江区","武江区","曲江区","乐昌市","南雄市","始兴县","仁化县","翁源县","新丰县","乳源瑶族自治县","其他"]},
                                                    {city:"佛山", areas:["禅城区","南海区","顺德区","三水区","高明区","其他"]},
                                                    {city:"江门", areas:["蓬江区","江海区","新会区","恩平市","台山市","开平市","鹤山市","其他"]},
                                                    {city:"湛江", areas:["赤坎区","霞山区","坡头区","麻章区","吴川市","廉江市","雷州市","遂溪县","徐闻县","其他"]},
                                                    {city:"茂名", areas:["茂南区","茂港区","化州市","信宜市","高州市","电白县","其他"]},
                                                    {city:"肇庆", areas:["端州区","鼎湖区","高要市","四会市","广宁县","怀集县","封开县","德庆县","其他"]},
                                                    {city:"惠州", areas:["惠城区","惠阳区","博罗县","惠东县","龙门县","其他"]},
                                                    {city:"梅州", areas:["梅江区","兴宁市","梅县","大埔县","丰顺县","五华县","平远县","蕉岭县","其他"]},
                                                    {city:"汕尾", areas:["城区","陆丰市","海丰县","陆河县","其他"]},
                                                    {city:"河源", areas:["源城区","紫金县","龙川县","连平县","和平县","东源县","其他"]},
                                                    {city:"阳江", areas:["江城区","阳春市","阳西县","阳东县","其他"]},
                                                    {city:"清远", areas:["清城区","英德市","连州市","佛冈县","阳山县","清新县","连山壮族瑶族自治县","连南瑶族自治县","其他"]}] },
            { py: 'gx', province: '广西', cities: [{city:"南宁", areas:["青秀区","兴宁区","西乡塘区","良庆区","江南区","邕宁区","武鸣县","隆安县","马山县","上林县","宾阳县","横县","其他"]},
                                                    {city:"柳州", areas:["城中区","鱼峰区","柳北区","柳南区","柳江县","柳城县","鹿寨县","融安县","融水苗族自治县","三江侗族自治县","其他"]},
                                                    {city:"桂林", areas:["象山区","秀峰区","叠彩区","七星区","雁山区","阳朔县","临桂县","灵川县","全州县","平乐县","兴安县","灌阳县","荔浦县","资源县","永福县","龙胜各族自治县","恭城瑶族自治县","其他"]},
                                                    {city:"梧州", areas:["万秀区","蝶山区","长洲区","岑溪市","苍梧县","藤县","蒙山县","其他"]},
                                                    {city:"北海", areas:["海城区","银海区","铁山港区","合浦县","其他"]},
                                                    {city:"防城港", areas:["港口区","防城区","东兴市","上思县","其他"]},
                                                    {city:"钦州", areas:["钦南区","钦北区","灵山县","浦北县","其他"]},
                                                    {city:"贵港", areas:["港北区","港南区","覃塘区","桂平市","平南县","其他"]},
                                                    {city:"玉林", areas:["玉州区","北流市","容县","陆川县","博白县","兴业县","其他"]},
                                                    {city:"百色", areas:["右江区","凌云县","平果县","西林县","乐业县","德保县","田林县","田阳县","靖西县","田东县","那坡县","隆林各族自治县","其他"]},
                                                    {city:"贺州", areas:["八步区","钟山县","昭平县","富川瑶族自治县","其他"]},
                                                    {city:"河池", areas:["金城江区","宜州市","天峨县","凤山县","南丹县","东兰县","都安瑶族自治县","罗城仫佬族自治县","巴马瑶族自治县","环江毛南族自治县","大化瑶族自治县","其他"]},
                                                    {city:"来宾", areas:["兴宾区","合山市","象州县","武宣县","忻城县","金秀瑶族自治县","其他"]},
                                                    {city:"崇左", areas:["江州区","凭祥市","宁明县","扶绥县","龙州县","大新县","天等县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'chq', province: '重庆', cities: [{city:"重庆", areas:["渝中区","大渡口区","江北区","南岸区","北碚区","渝北区","巴南区","长寿区","双桥区","沙坪坝区","万盛区","万州区","涪陵区","黔江区","永川区","合川区","江津区","九龙坡区","南川区","綦江县","潼南县","荣昌县","璧山县","大足县","铜梁县","梁平县","开县","忠县","城口县","垫江县","武隆县","丰都县","奉节县","云阳县","巫溪县","巫山县","石柱土家族自治县","秀山土家族苗族自治县","酉阳土家族苗族自治县","彭水苗族土家族自治县","其他"]}] },
            { py: 'sch', province: '四川', cities: [{city:"成都", areas:["青羊区","锦江区","金牛区","武侯区","成华区","龙泉驿区","青白江区","新都区","温江区","都江堰市","彭州市","邛崃市","崇州市","金堂县","郫县","新津县","双流县","蒲江县","大邑县","其他"]},
                                                    {city:"自贡", areas:["大安区","自流井区","贡井区","沿滩区","荣县","富顺县","其他"]},
                                                    {city:"攀枝花", areas:["仁和区","米易县","盐边县","东区","西区","其他"]},
                                                    {city:"泸州", areas:["江阳区","纳溪区","龙马潭区","泸县","合江县","叙永县","古蔺县","其他"]},
                                                    {city:"德阳", areas:["旌阳区","广汉市","什邡市","绵竹市","罗江县","中江县","其他"]},
                                                    {city:"绵阳", areas:["涪城区","游仙区","江油市","盐亭县","三台县","平武县","安县","梓潼县","北川羌族自治县","其他"]},
                                                    {city:"广元", areas:["元坝区","朝天区","青川县","旺苍县","剑阁县","苍溪县","市中区","其他"]},
                                                    {city:"遂宁", areas:["船山区","安居区","射洪县","蓬溪县","大英县","其他"]},
                                                    {city:"内江", areas:["市中区","东兴区","资中县","隆昌县","威远县","其他"]},
                                                    {city:"乐山", areas:["市中区","五通桥区","沙湾区","金口河区","峨眉山市","夹江县","井研县","犍为县","沐川县","马边彝族自治县","峨边彝族自治县","其他"]},
                                                    {city:"南充", areas:["顺庆区","高坪区","嘉陵区","阆中市","营山县","蓬安县","仪陇县","南部县","西充县","其他"]},
                                                    {city:"眉山", areas:["东坡区","仁寿县","彭山县","洪雅县","丹棱县","青神县","其他"]},
                                                    {city:"宜宾", areas:["翠屏区","宜宾县","兴文县","南溪县","珙县","长宁县","高县","江安县","筠连县","屏山县","其他"]},
                                                    {city:"广安", areas:["广安区","华蓥市","岳池县","邻水县","武胜县","其他"]},
                                                    {city:"达州", areas:["通川区","万源市","达县","渠县","宣汉县","开江县","大竹县","其他"]},
                                                    {city:"雅安", areas:["雨城区","芦山县","石棉县","名山县","天全县","荥经县","宝兴县","汉源县","其他"]},
                                                    {city:"巴中", areas:["巴州区","南江县","平昌县","通江县","其他"]},
                                                    {city:"资阳", areas:["雁江区","简阳市","安岳县","乐至县","其他"]},
                                                    {city:"阿坝藏族羌族自治州", areas:["马尔康县","九寨沟县","红原县","汶川县","阿坝县","理县","若尔盖县","小金县","黑水县","金川县","松潘县","壤塘县","茂县","其他"]},
                                                    {city:"甘孜藏族自治州", areas:["康定县","丹巴县","炉霍县","九龙县","甘孜县","雅江县","新龙县","道孚县","白玉县","理塘县","德格县","乡城县","石渠县","稻城县","色达县","巴塘县","泸定县","得荣县","其他"]},
                                                    {city:"凉山彝族自治州", areas:["西昌市","美姑县","昭觉县","金阳县","甘洛县","布拖县","雷波县","普格县","宁南县","喜德县","会东县","越西县","会理县","盐源县","德昌县","冕宁县","木里藏族自治县","其他"]},
                                                    {city:"其他", areas:["其他"]} ] },
            { py: 'gzh', province: '贵州', cities: [{city:"贵阳", areas:["南明区","云岩区","花溪区","乌当区","白云区","小河区","清镇市","开阳县","修文县","息烽县","其他"]},
                                                    {city:"六盘水", areas:["钟山区","水城县","盘县","六枝特区","其他"]},
                                                    {city:"遵义", areas:["红花岗区","汇川区","赤水市","仁怀市","遵义县","绥阳县","桐梓县","习水县","凤冈县","正安县","余庆县","湄潭县","道真仡佬族苗族自治县","务川仡佬族苗族自治县","其他"]},
                                                    {city:"安顺", areas:["西秀区","普定县","平坝县","镇宁布依族苗族自治县","紫云苗族布依族自治县","关岭布依族苗族自治县","其他"]},
                                                    {city:"铜仁地区", areas:["铜仁市","德江县","江口县","思南县","石阡县","玉屏侗族自治县","松桃苗族自治县","印江土家族苗族自治县","沿河土家族自治县","万山特区","其他"]},
                                                    {city:"毕节地区", areas:["毕节市","黔西县","大方县","织金县","金沙县","赫章县","纳雍县","威宁彝族回族苗族自治县","其他"]},
                                                    {city:"黔西南布依族苗族自治州", areas:["兴义市","望谟县","兴仁县","普安县","册亨县","晴隆县","贞丰县","安龙县","其他"]},
                                                    {city:"黔东南苗族侗族自治州", areas:["凯里市","施秉县","从江县","锦屏县","镇远县","麻江县","台江县","天柱县","黄平县","榕江县","剑河县","三穗县","雷山县","黎平县","岑巩县","丹寨县","其他"]},
                                                    {city:"黔南布依族苗族自治州", areas:["都匀市","福泉市","贵定县","惠水县","罗甸县","瓮安县","荔波县","龙里县","平塘县","长顺县","独山县","三都水族自治县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'yn', province: '云南', cities: [{city:"昆明", areas:["盘龙区","五华区","官渡区","西山区","东川区","安宁市","呈贡县","晋宁县","富民县","宜良县","嵩明县","石林彝族自治县","禄劝彝族苗族自治县","寻甸回族彝族自治县","其他"]},
                                                    {city:"曲靖", areas:["麒麟区","宣威市","马龙县","沾益县","富源县","罗平县","师宗县","陆良县","会泽县","其他"]},
                                                    {city:"玉溪", areas:["红塔区","江川县","澄江县","通海县","华宁县","易门县","峨山彝族自治县","新平彝族傣族自治县","元江哈尼族彝族傣族自治县","其他"]},
                                                    {city:"保山", areas:["隆阳区","施甸县","腾冲县","龙陵县","昌宁县","其他"]},
                                                    {city:"昭通", areas:["昭阳区","鲁甸县","巧家县","盐津县","大关县","永善县","绥江县","镇雄县","彝良县","威信县","水富县","其他"]},
                                                    {city:"丽江", areas:["古城区","永胜县","华坪县","玉龙纳西族自治县","宁蒗彝族自治县","其他"]},
                                                    {city:"普洱", areas:["思茅区","普洱哈尼族彝族自治县","墨江哈尼族自治县","景东彝族自治县","景谷傣族彝族自治县","镇沅彝族哈尼族拉祜族自治县","江城哈尼族彝族自治县","孟连傣族拉祜族佤族自治县","澜沧拉祜族自治县","西盟佤族自治县","其他"]},
                                                    {city:"临沧", areas:["临翔区","凤庆县","云县","永德县","镇康县","双江拉祜族佤族布朗族傣族自治县","耿马傣族佤族自治县","沧源佤族自治县","其他"]},
                                                    {city:"德宏傣族景颇族自治州", areas:["潞西市","瑞丽市","梁河县","盈江县","陇川县","其他"]},
                                                    {city:"怒江傈僳族自治州", areas:["泸水县","福贡县","贡山独龙族怒族自治县","兰坪白族普米族自治县","其他"]},
                                                    {city:"迪庆藏族自治州", areas:["香格里拉县","德钦县","维西傈僳族自治县","其他"]},
                                                    {city:"大理白族自治州", areas:["大理市","祥云县","宾川县","弥渡县","永平县","云龙县","洱源县","剑川县","鹤庆县","漾濞彝族自治县","南涧彝族自治县","巍山彝族回族自治县","其他"]},
                                                    {city:"楚雄彝族自治州", areas:["楚雄市","双柏县","牟定县","南华县","姚安县","大姚县","永仁县","元谋县","武定县","禄丰县","其他"]},
                                                    {city:"红河哈尼族彝族自治州", areas:["蒙自县","个旧市","开远市","绿春县","建水县","石屏县","弥勒县","泸西县","元阳县","红河县","金平苗族瑶族傣族自治县","河口瑶族自治县","屏边苗族自治县","其他"]},
                                                    {city:"文山壮族苗族自治州", areas:["文山县","砚山县","西畴县","麻栗坡县","马关县","丘北县","广南县","富宁县","其他"]},
                                                    {city:"西双版纳傣族自治州", areas:["景洪市","勐海县","勐腊县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'xz', province: '西藏', cities: [{city:"拉萨", areas:["城关区","林周县","当雄县","尼木县","曲水县","堆龙德庆县","达孜县","墨竹工卡县","其他"]},
                                                    {city:"那曲地区", areas:["那曲县","嘉黎县","比如县","聂荣县","安多县","申扎县","索县","班戈县","巴青县","尼玛县","其他"]},
                                                    {city:"昌都地区", areas:["昌都县","江达县","贡觉县","类乌齐县","丁青县","察雅县","八宿县","左贡县","芒康县","洛隆县","边坝县","其他"]},
                                                    {city:"林芝地区", areas:["林芝县","工布江达县","米林县","墨脱县","波密县","察隅县","朗县","其他"]},
                                                    {city:"山南地区", areas:["乃东县","扎囊县","贡嘎县","桑日县","琼结县","曲松县","措美县","洛扎县","加查县","隆子县","错那县","浪卡子县","其他"]},
                                                    {city:"日喀则地区", areas:["日喀则市","南木林县","江孜县","定日县","萨迦县","拉孜县","昂仁县","谢通门县","白朗县","仁布县","康马县","定结县","仲巴县","亚东县","吉隆县","聂拉木县","萨嘎县","岗巴县","其他"]},
                                                    {city:"阿里地区", areas:["噶尔县","普兰县","札达县","日土县","革吉县","改则县","措勤县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'shx', province: '陕西', cities: [{city:"西安", areas:["莲湖区","新城区","碑林区","雁塔区","灞桥区","未央区","阎良区","临潼区","长安区","高陵县","蓝田县","户县","周至县","其他"]},
                                                    {city:"铜川", areas:["耀州区","王益区","印台区","宜君县","其他"]},
                                                    {city:"宝鸡", areas:["渭滨区","金台区","陈仓区","岐山县","凤翔县","陇县","太白县","麟游县","扶风县","千阳县","眉县","凤县","其他"]},
                                                    {city:"咸阳", areas:["秦都区","渭城区","杨陵区","兴平市","礼泉县","泾阳县","永寿县","三原县","彬县","旬邑县","长武县","乾县","武功县","淳化县","其他"]},
                                                    {city:"渭南", areas:["临渭区","韩城市","华阴市","蒲城县","潼关县","白水县","澄城县","华县","合阳县","富平县","大荔县","其他"]},
                                                    {city:"延安", areas:["宝塔区","安塞县","洛川县","子长县","黄陵县","延川县","富县","延长县","甘泉县","宜川县","志丹县","黄龙县","吴起县","其他"]},
                                                    {city:"汉中", areas:["汉台区","留坝县","镇巴县","城固县","南郑县","洋县","宁强县","佛坪县","勉县","西乡县","略阳县","其他"]},
                                                    {city:"榆林", areas:["榆阳区","清涧县","绥德县","神木县","佳县","府谷县","子洲县","靖边县","横山县","米脂县","吴堡县","定边县","其他"]},
                                                    {city:"安康", areas:["汉滨区","紫阳县","岚皋县","旬阳县","镇坪县","平利县","石泉县","宁陕县","白河县","汉阴县","其他"]},
                                                    {city:"商洛", areas:["商州区","镇安县","山阳县","洛南县","商南县","丹凤县","柞水县","其他"]},
                                                    {city:"其他", areas:["其他"]} ] },
            { py: 'gs', province: '甘肃', cities: [{city:"兰州", areas:["城关区","七里河区","西固区","安宁区","红古区","永登县","皋兰县","榆中县","其他"]},
                                                    {city:"嘉峪关", areas:["嘉峪关市","其他"]},
                                                    {city:"金昌", areas:["金川区","永昌县","其他"]},
                                                    {city:"白银", areas:["白银区","平川区","靖远县","会宁县","景泰县","其他"]},
                                                    {city:"天水", areas:["清水县","秦安县","甘谷县","武山县","张家川回族自治县","北道区","秦城区","其他"]},
                                                    {city:"武威", areas:["凉州区","民勤县","古浪县","天祝藏族自治县","其他"]},
                                                    {city:"酒泉", areas:["肃州区","玉门市","敦煌市","金塔县","肃北蒙古族自治县","阿克塞哈萨克族自治县","安西县","其他"]},
                                                    {city:"张掖", areas:["甘州区","民乐县","临泽县","高台县","山丹县","肃南裕固族自治县","其他"]},
                                                    {city:"庆阳", areas:["西峰区","庆城县","环县","华池县","合水县","正宁县","宁县","镇原县","其他"]},
                                                    {city:"平凉", areas:["崆峒区","泾川县","灵台县","崇信县","华亭县","庄浪县","静宁县","其他"]},
                                                    {city:"定西", areas:["安定区","通渭县","临洮县","漳县","岷县","渭源县","陇西县","其他"]},
                                                    {city:"陇南", areas:["武都区","成县","宕昌县","康县","文县","西和县","礼县","两当县","徽县","其他"]},
                                                    {city:"临夏回族自治州", areas:["临夏市","临夏县","康乐县","永靖县","广河县","和政县","东乡族自治县","积石山保安族东乡族撒拉族自治县","其他"]},
                                                    {city:"甘南藏族自治州", areas:["合作市","临潭县","卓尼县","舟曲县","迭部县","玛曲县","碌曲县","夏河县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'ah', province: '青海', cities: [{city:"西宁", areas:["城中区","城东区","城西区","城北区","湟源县","湟中县","大通回族土族自治县","其他"]},
                                                    {city:"海东地区", areas:["平安县","乐都县","民和回族土族自治县","互助土族自治县","化隆回族自治县","循化撒拉族自治县","其他"]},
                                                    {city:"海北藏族自治州", areas:["海晏县","祁连县","刚察县","门源回族自治县","其他"]},
                                                    {city:"海南藏族自治州", areas:["共和县","同德县","贵德县","兴海县","贵南县","其他"]},
                                                    {city:"黄南藏族自治州", areas:["同仁县","尖扎县","泽库县","河南蒙古族自治县","其他"]},
                                                    {city:"果洛藏族自治州", areas:["玛沁县","班玛县","甘德县","达日县","久治县","玛多县","其他"]},
                                                    {city:"玉树藏族自治州", areas:["玉树县","杂多县","称多县","治多县","囊谦县","曲麻莱县","其他"]},
                                                    {city:"海西蒙古族藏族自治州", areas:["德令哈市","格尔木市","乌兰县","都兰县","天峻县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'nx', province: '宁夏', cities: [{city:"银川", areas:["兴庆区","西夏区","金凤区","灵武市","永宁县","贺兰县","其他"]},
                                                    {city:"石嘴山", areas:["大武口区","惠农区","平罗县","其他"]},
                                                    {city:"吴忠", areas:["利通区","青铜峡市","盐池县","同心县","其他"]},
                                                    {city:"固原",areas:["原州区","西吉县","隆德县","泾源县","彭阳县","其他"]},
                                                    {city:"中卫", areas:["沙坡头区","中宁县","海原县","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'xj', province: '新疆', cities: [{city:"乌鲁木齐", areas:["天山区","沙依巴克区","新市区","水磨沟区","头屯河区","达坂城区","东山区","乌鲁木齐县","其他"]},
                                                    {city:"克拉玛依", areas:["克拉玛依区","独山子区","白碱滩区","乌尔禾区","其他"]},
                                                    {city:"吐鲁番地区", areas:["吐鲁番市","托克逊县","鄯善县","其他"]},
                                                    {city:"哈密地区", areas:["哈密市","伊吾县","巴里坤哈萨克自治县","其他"]},
                                                    {city:"和田地区", areas:["和田市","和田县","洛浦县","民丰县","皮山县","策勒县","于田县","墨玉县","其他"]},
                                                    {city:"阿克苏地区", areas:["阿克苏市","温宿县","沙雅县","拜城县","阿瓦提县","库车县","柯坪县","新和县","乌什县","其他"]},
                                                    {city:"喀什地区", areas:["喀什市","巴楚县","泽普县","伽师县","叶城县","岳普湖县","疏勒县","麦盖提县","英吉沙县","莎车县","疏附县","塔什库尔干塔吉克自治县","其他"]},
                                                    {city:"克孜勒苏柯尔克孜自治州",areas:["阿图什市","阿合奇县","乌恰县","阿克陶县","其他"]},
                                                    {city:"巴音郭楞蒙古自治州", areas:["库尔勒市","和静县","尉犁县","和硕县","且末县","博湖县","轮台县","若羌县","焉耆回族自治县","其他"]},
                                                    {city:"昌吉回族自治州", areas:["昌吉市","阜康市","奇台县","玛纳斯县","吉木萨尔县","呼图壁县","木垒哈萨克自治县","米泉市","其他"]},
                                                    {city:"博尔塔拉蒙古自治州", areas:["博乐市","精河县","温泉县","其他"]},
                                                    {city:"石河子", areas:["石河子"]},
                                                    {city:"阿拉尔", areas:["阿拉尔"]},
                                                    {city:"图木舒克", areas:["图木舒克"]},
                                                    {city:"五家渠", areas:["五家渠"]},
                                                    {city:"伊犁哈萨克自治州", areas:["伊宁市","奎屯市","伊宁县","特克斯县","尼勒克县","昭苏县","新源县","霍城县","巩留县","察布查尔锡伯自治县","塔城地区","阿勒泰地区","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'tw', province: '台湾', cities: [{city:"台湾", areas:["台北市","高雄市","台北县","桃园县","新竹县","苗栗县","台中县","彰化县","南投县","云林县","嘉义县","台南县","高雄县","屏东县","宜兰县","花莲县","台东县","澎湖县","基隆市","新竹市","台中市","嘉义市","台南市","其他"]},
                                                    {city:"其他", areas:["其他"]}] },
            { py: 'aom', province: '澳门', cities: [{city:"澳门",areas:["花地玛堂区","圣安多尼堂区","大堂区","望德堂区","风顺堂区","嘉模堂区","圣方济各堂区","路凼","其他"]}] },
            { py: 'xg', province: '香港', cities: [{city:"香港", areas:["中西区","湾仔区","东区","南区","深水埗区","油尖旺区","九龙城区","黄大仙区","观塘区","北区","大埔区","沙田区","西贡区","元朗区","屯门区","荃湾区","葵青区","离岛区","其他"]}] },

        ];
        $scope.your.province = $scope.chinaCities[0];
        $scope.your.city = $scope.your.province.cities[0];
        $scope.your.area = $scope.your.city.areas[0];
        $scope.selectedFirstValue = function(province) {
            $scope.your.city = province ? province.cities[0] : '';
            $scope.your.area = province ? province.cities[0].areas[0] : '';
        };
    }])
    /*---选择城市，暂时用输入代替-- by Annabel*/

.controller("CityCtrl",function($scope,$ionicPopup){
        $scope.vm = {};
        $scope.vm.chooseCity ="上海";
      $scope.choose =function(){
            var CityPopup = $ionicPopup.show({

                template: '<input type="text" ng-model="vm.chooseCity" style="background-color: #6E6E6E !important;border-radius: 1em;height: 3em!important;font-size: 1.5em;text-align: center;">',

                title: '请输入城市',

                scope: $scope,

                buttons: [{text: '取消', type: 'button-red-none'}, {

                    text: '<b>确定</b>',

                    type: 'button-red-none',

                    onTap: function (e) {

                       if (!$scope.vm.chooseCity) {
                            e.preventDefault();

                       } else {
                           console.log($scope.vm.chooseCity);
                           return $scope.vm.chooseCity;
                       }
                    }
                }
                ]
            });

           CityPopup.then(function () {

                if ($scope.chooseCity!= null) {
                    console.log($scope.chooseCity);
                }
            });
        }
    })

>>>>>>> origin/Anna
    /*radioBox控制器-----jiefly*/
    .controller('RadioCtrl', function ($scope,guideData) {
        $scope.check = function (type,index) {
            if(type == 8){
                guideData.guide08RadioButton[index] = !guideData.guide08RadioButton[index];
                $scope.Check = guideData.guide08RadioButton[index];
                console.log(guideData.guide08RadioButton);
            }else if(type == 9){
                if(guideData.guide09checkedButtonNum>=9){
                    if(!guideData.guide09RadioButton[index]){
                        return;
                    }
                }
                guideData.guide09RadioButton[index] = !guideData.guide09RadioButton[index];
                if(guideData.guide09RadioButton[index]){
                    guideData.guide09checkedButtonNum++;
                }else{
                    guideData.guide09checkedButtonNum--;
                }
                $scope.Check = guideData.guide09RadioButton[index];
                console.log(guideData.guide09RadioButton);
            }
        };
    })
    /*基本资料输入项--------------jiefly*/
    .controller('InputCtrl', function ($scope, $ionicPopup, ionicDatePicker,guideData) {
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
                case 3:
                    $scope.showHouseholdegisterPopup();
                    break;
                case 4:
                    $scope.showHousingPopup();
                    break;
                case 5:
                    $scope.showEducationPopup();
                    break;
                case 6:
                    $scope.showJobCategoryPopup();
                    break;
                case 7:
                    $scope.showJobPopup();
                    break;
                case 8:
                    $scope.showMonthlyIncomePopup();
                    break;
                case 9:
                    $scope.showMaritalStatusPopup();
                    break;
                default :
                    console.log(id);
                    break;
            }
        };
$scope.MonthlyIncomeList = ["小于3千","3千以上","5千以上","7千以上","9千以上","1万以上","1万2千以上","1万4千以上","1万6千以上","1万8千以上","2万以上","2万五千以上","三万以上","五万以上","十万以上","百万以上"];
$scope.MaritalStatusList = ["有婚史（无子女）","有婚史（有子女）","未婚"];
$scope.educationLevel = ["博士","硕士","本科","大专","高中","初中"];
$scope.JobCategoryList = ["政府机关","事业单位","外企","国企","私企","自己创业","其他"];
$scope.HousingList = ["以购房（无贷款）","以购房（有贷款）","和父母同住","住房","有能力购房","其他"];
$scope.setValue = function(type,value){
    switch(type){
        case 1:
            $scope.showEducationPopup.hide();
            console.log(value);
            break;
    }
};
        /*****************************学历****************************************/
        $scope.showEducationPopup = function () {
            $scope.closePopup = function(value){
                console.log("close Popup");
                $scope.datas.userEducation.value = value;
                EducationPopup.close();
                if ($scope.datas.userEducation.value != null) {
                    console.log($scope.datas.userEducation.value);
                    $scope.datas.userEducation.isFilled = true;
                    console.log($scope.datas.userEducation.isFilled);
                }
            };
            var EducationPopup = $ionicPopup.show({

                template: '<ion-scroll scrollbar-y="false"  style="overflow:hidden;position: relative;padding-top:1em" ng-controller="InputCtrl"> <ul ng-repeat="data in educationLevel"> <li> <button class="button button-red-none" style="width: 16em !important;margin-top: 1em" ng-click="closePopup(data)">{{data}}</b></li></ul></ion-scroll>',

                title: '请选择学历',

                scope: $scope,

                buttons: [{text: '取消', type: 'button-red-none'},{

                    text: '<b>确定</b>',

                    type: 'button-red-none',

                    onTap: function (e) {

                        if (!$scope.datas.userEducation.value) {
                            //e.preventDefault();

                        } else {
                            return $scope.datas.userEducation;
                        }
                    }
                }
                ]
            });

            EducationPopup.then(function () {

                if ($scope.datas.userEducation.value != null) {
                    console.log($scope.datas.userEducation.value);
                    /*$scope.datas.userHeight.value +='cm';*/
                    $scope.datas.userEducation.isFilled = true;
                    console.log($scope.datas.userEducation.isFilled);
                }
            });
        };
        /*********************************************************************/

        /*****************************单位性质****************************************/
        $scope.showJobCategoryPopup = function () {
            $scope.closePopup = function(value){
                console.log("close Popup")
                $scope.datas.userJobCategory.value = value;
                JobCategoryPopup.close();
                if ($scope.datas.userJobCategory.value != null) {
                    console.log($scope.datas.userJobCategory.value);
                    $scope.datas.userJobCategory.isFilled = true;
                    console.log($scope.datas.userJobCategory.isFilled);
                }
            };
            var JobCategoryPopup = $ionicPopup.show({

                template: '<ion-scroll scrollbar-y="false"  style="overflow:hidden;position: relative;padding-top:1em" ng-controller="InputCtrl"> <ul ng-repeat="data in JobCategoryList"> <li> <button class="button button-red-none" style="width: 16em !important;margin-top: 1em" ng-click="closePopup(data)">{{data}}</b></li></ul></ion-scroll>',

                title: '请选择单位性质',

                scope: $scope,

                buttons: [{text: '取消', type: 'button-red-none'},{

                    text: '<b>确定</b>',

                    type: 'button-red-none',

                    onTap: function (e) {

                        if (!$scope.datas.userJobCategory.value) {
                            //e.preventDefault();

                        } else {
                            return $scope.datas.userJobCategory;
                        }
                    }
                }
                ]
            });

            JobCategoryPopup.then(function () {

                if ($scope.datas.userJobCategory.value != null) {
                    console.log($scope.datas.userJobCategory.value);
                    /*$scope.datas.userHeight.value +='cm';*/
                    $scope.datas.userJobCategory.isFilled = true;
                    console.log($scope.datas.userJobCategory.isFilled);
                }
            });
        };
        /*********************************************************************/
        /*****************************婚姻状况****************************************/
        $scope.showMaritalStatusPopup = function () {
            $scope.closePopup = function(value){
                console.log("close Popup")
                $scope.datas.userMaritalStatus.value = value;
                MaritalStatusPopup.close();
                if ($scope.datas.userMaritalStatus.value != null) {
                    console.log($scope.datas.userMaritalStatus.value);
                    $scope.datas.userMaritalStatus.isFilled = true;
                    console.log($scope.datas.userMaritalStatus.isFilled);
                }
            };
            var MaritalStatusPopup = $ionicPopup.show({

                template: '<ion-scroll scrollbar-y="false"  style="overflow:hidden;position: relative;padding-top:1em" ng-controller="InputCtrl"> <ul ng-repeat="data in MaritalStatusList"> <li> <button class="button button-red-none" style="width: 16em !important;margin-top: 1em" ng-click="closePopup(data)">{{data}}</b></li></ul></ion-scroll>',

                title: '请选择单位性质',

                scope: $scope,

                buttons: [{text: '取消', type: 'button-red-none'},{

                    text: '<b>确定</b>',

                    type: 'button-red-none',

                    onTap: function (e) {

                        if (!$scope.datas.userMaritalStatus.value) {
                            //e.preventDefault();

                        } else {
                            return $scope.datas.userMaritalStatus;
                        }
                    }
                }
                ]
            });

            MaritalStatusPopup.then(function () {

                if ($scope.datas.userJobCategory.value != null) {
                    console.log($scope.datas.userMaritalStatus.value);
                    /*$scope.datas.userHeight.value +='cm';*/
                    $scope.datas.userJobCategory.isFilled = true;
                    console.log($scope.datas.userMaritalStatus.isFilled);
                }
            });
        };
        /*********************************************************************/
        /*****************************月收入****************************************/
        $scope.showMonthlyIncomePopup = function () {
            $scope.closePopup = function(value){
                console.log("close Popup")
                $scope.datas.userMonthlyIncome.value = value;
                MonthlyIncomePopup.close();
                if ($scope.datas.userMonthlyIncome.value != null) {
                    console.log($scope.datas.userMonthlyIncome.value);
                    $scope.datas.userMonthlyIncome.isFilled = true;
                    console.log($scope.datas.userMonthlyIncome.isFilled);
                }
            };
            var MonthlyIncomePopup = $ionicPopup.show({

                template: '<ion-scroll scrollbar-y="false"  style="overflow:hidden;position: relative;padding-top:1em" ng-controller="InputCtrl"> <ul ng-repeat="data in MonthlyIncomeList"> <li> <button class="button button-red-none" style="width: 16em !important;margin-top: 1em" ng-click="closePopup(data)">{{data}}</b></li></ul></ion-scroll>',

                title: '请选择单位性质',

                scope: $scope,

                buttons: [{text: '取消', type: 'button-red-none'},{

                    text: '<b>确定</b>',

                    type: 'button-red-none',

                    onTap: function (e) {

                        if (!$scope.datas.userMonthlyIncome.value) {
                            //e.preventDefault();

                        } else {
                            return $scope.datas.userMonthlyIncome;
                        }
                    }
                }
                ]
            });

            MonthlyIncomePopup.then(function () {

                if ($scope.datas.userMonthlyIncome.value != null) {
                    console.log($scope.datas.userMonthlyIncome.value);
                    /*$scope.datas.userHeight.value +='cm';*/
                    $scope.datas.userMonthlyIncome.isFilled = true;
                    console.log($scope.datas.userMonthlyIncome.isFilled);
                }
            });
        };
        /*********************************************************************/
        /*****************************住房情况****************************************/
        $scope.showHousingPopup = function () {
            $scope.closePopup = function(value){
                console.log("close Popup")
                $scope.datas.userHousing.value = value;
                HousingPopup.close();
                if ($scope.datas.userHousing.value != null) {
                    console.log($scope.datas.userHousing.value);
                    $scope.datas.userHousing.isFilled = true;
                    console.log($scope.datas.userHousing.isFilled);
                }
            };
            var HousingPopup = $ionicPopup.show({

                template: '<ion-scroll scrollbar-y="false"  style="overflow:hidden;position: relative;padding-top:1em" ng-controller="InputCtrl"> <ul ng-repeat="data in HousingList"> <li> <button class="button button-red-none" style="width: 16em !important;margin-top: 1em" ng-click="closePopup(data)">{{data}}</b></li></ul></ion-scroll>',

                title: '请选择住房情况',

                scope: $scope,

                buttons: [{text: '取消', type: 'button-red-none'},{

                    text: '<b>确定</b>',

                    type: 'button-red-none',

                    onTap: function (e) {

                        if (!$scope.datas.userHousing.value) {
                            //e.preventDefault();

                        } else {
                            return $scope.datas.userHousing;
                        }
                    }
                }
                ]
            });

            HousingPopup.then(function () {

                if ($scope.datas.userHousing.value != null) {
                    console.log($scope.datas.userHousing.value);
                    /*$scope.datas.userHeight.value +='cm';*/
                    $scope.datas.userHousing.isFilled = true;
                    console.log($scope.datas.userHousing.isFilled);
                }
            });
        };
        /*********************************************************************/

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
        };
        /*******************************居住地填写*****************************/
        /******************************户籍填写*****************************/
        $scope.showHouseholdegisterPopup = function () {
            var HomePopup = $ionicPopup.show({

                template: '<input type="text" ng-model="datas.userHouseholdegister.value" style="background-color: #6E6E6E !important;border-radius: 1em;height: 3em!important;font-size: 1.5em;text-align: center;">',

                title: '请输入个人居住地',

                scope: $scope,

                buttons: [{text: '取消', type: 'button-red-none'}, {

                    text: '<b>确定</b>',

                    type: 'button-red-none',

                    onTap: function (e) {

                        if (!$scope.datas.userHouseholdegister.value) {
                            e.preventDefault();

                        } else {
                            return $scope.datas.userHouseholdegister;
                        }
                    }
                }
                ]
            });

            HomePopup.then(function () {

                if ($scope.datas.userHouseholdegister.value != null) {
                    console.log($scope.datas.userHouseholdegister.value);
                    /*$scope.datas.userHeight.value +='cm';*/
                    $scope.datas.userHouseholdegister.isFilled = true;
                    console.log($scope.datas.userHouseholdegister.isFilled);
                }
            });
        };
        /*******************************户籍填写*****************************/
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
        $scope.save = function(){
            guideData.person = $scope.datas;
            console.log(guideData.person);
            console.log("click");
        };
    })
    .controller('GuideExtraInfoCtrl', function ($scope,guideData) {
        $scope.guide08ExtraText = null;
        $scope.guide09ExtraText = null;
        $scope.Log = function(){
            guideData.guide08ExtraText = $scope.guide08ExtraText;
            guideData.guide09ExtraText = $scope.guide09ExtraText;
            console.log("8:"+guideData.guide08ExtraText+"9:"+guideData.guide09ExtraText);
        }
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
});
