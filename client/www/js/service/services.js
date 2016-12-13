var server_url = "https://api.bmob.cn/1/classes/";
var http_headers = {
    'X-Bmob-Application-Id': 'd228b6ed2253b56f53b0a30adf36ed03',
    'X-Bmob-REST-API-Key': '2c98abb9307079a6e401f8ad14284f4a',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With',
};
var bmobAppId = "d228b6ed2253b56f53b0a30adf36ed03";
var bmobRestApiKey = "2c98abb9307079a6e401f8ad14284f4a";
Bmob.initialize(bmobAppId, bmobRestApiKey);
angular.module('starter.services', [])

    .factory('Chats', ChatsService)
    .factory('Users', UsersService)

    .factory('Persons', PersonsService)
    .factory('MockService', ['$http', '$q',
        function ($http, $q) {
            var me = {};

            me.getUserMessages = function (d) {
                /*
                 var endpoint =
                 'http://www.mocky.io/v2/547cf341501c337f0c9a63fd?callback=JSON_CALLBACK';
                 return $http.jsonp(endpoint).then(function(response) {
                 return response.data;
                 }, function(err) {
                 console.log('get user messages error, err: ' + JSON.stringify(
                 err, null, 2));
                 });
                 */
                var deferred = $q.defer();

                setTimeout(function () {
                    deferred.resolve(getMockMessages());
                }, 1500);

                return deferred.promise;
            };

            me.getMockMessage = function () {
                return {
                    userId: '534b8e5aaa5e7afc1b23e69b',
                    date: new Date(),
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                };
            }

            return me;
        }
    ])
    .factory('guideData',function(){
        var service = {};
        /*页面8中的附加信息*/
        service.guide10ExtraText = null;
        /*页面9中的附加信息*/
        service.guide11ExtraText = null;
        /*页面8中十二个选项,默认为不选中*/
        service.guide09RadioButton = [false,false,false,false,false,false,false,false,false,false,false,false];
        /*页面9中十五个选项*/
        service.guide08RadioButton = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
        /*页面9中已选中项数目*/
        service.guide09checkedButtonNum = 0;
        /*上传图片的uri*/
        service.photoUri = null;
        /*个人基本资料*/
        service.person = {
            personHeight: {
                value: null,
                info: "*身高",
                isFilled: false,
                functionId: 0
            },
            personBorn: {
                value: null,
                info: "*出生年月",
                isFilled: false,
                functionId: 1
            },
            personHome: {
                value: null,
                info: "*居住地",
                isFilled: false,
                functionId: 2
            },
            personHouseholdegister: {
                value: null,
                info: "*户籍",
                isFilled: false,
                functionId: 3
            },
            personHousing: {
                value: null,
                info: "*住房情况",
                isFilled: false,
                functionId: 4
            },
            personEducation: {
                value: null,
                info: "*学历",
                isFilled: false,
                functionId: 5
            },
            personJobCategory: {
                value: null,
                info: "*单位性质",
                isFilled: false,
                functionId: 6
            },
            personJob: {
                value: null,
                info: "*职业职务",
                isFilled: false,
                functionId: 7
            },
            personMonthlyIncome: {
                value: null,
                info: "*月收入",
                isFilled: false,
                functionId: 8
            },
            personMaritalStatus: {
                value: null,
                info: "*婚姻状况",
                isFilled: false,
                functionId: 9
            },
            personAge: {
                value:null,
                info:"年龄"
            }
        };
        return service;
    });
