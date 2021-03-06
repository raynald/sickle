var InputCtrl = function($scope, $state, $ionicPopup, ionicDatePicker, guideData, Users) {
    $scope.user = Users.getCurrentUser();
    if ($scope.user === null) {
        $state.go("guide_02", {}, { reload: true });
    } else {
        console.log($state.current.name);
        console.log($scope.user);
    };

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
    $scope.do = function(id) {

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
            default:
                console.log(id);
                break;
        }
    };
    $scope.MonthlyIncomeList = ["小于3千", "3千以上", "5千以上", "7千以上", "9千以上", "1万以上", "1万2千以上", "1万4千以上", "1万6千以上", "1万8千以上", "2万以上", "2万五千以上", "三万以上", "五万以上", "十万以上", "百万以上"];
    $scope.MaritalStatusList = ["有婚史（无子女）", "有婚史（有子女）", "未婚"];
    $scope.educationLevel = ["博士", "硕士", "本科", "大专", "高中", "初中"];
    $scope.JobCategoryList = ["政府机关", "事业单位", "外企", "国企", "私企", "自己创业", "其他"];
    $scope.HousingList = ["已购房（无贷款）", "已购房（有贷款）", "和父母同住", "住房", "有能力购房", "其他"];
    $scope.setValue = function(type, value) {
        switch (type) {
            case 1:
                $scope.showEducationPopup.hide();
                console.log(value);
                break;
        }
    };

    /*****************************学历****************************************/
    $scope.showEducationPopup = function() {
        $scope.closePopup = function(value) {
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

            buttons: [{ text: '取消', type: 'button-red-none' }, {

                text: '<b>确定</b>',

                type: 'button-red-none',

                onTap: function(e) {

                    if (!$scope.datas.userEducation.value) {
                        //e.preventDefault();

                    } else {
                        return $scope.datas.userEducation;
                    }
                }
            }]
        });

        EducationPopup.then(function() {

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
    $scope.showJobCategoryPopup = function() {
        $scope.closePopup = function(value) {
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

            buttons: [{ text: '取消', type: 'button-red-none' }, {

                text: '<b>确定</b>',

                type: 'button-red-none',

                onTap: function(e) {

                    if (!$scope.datas.userJobCategory.value) {
                        //e.preventDefault();

                    } else {
                        return $scope.datas.userJobCategory;
                    }
                }
            }]
        });

        JobCategoryPopup.then(function() {

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
    $scope.showMaritalStatusPopup = function() {
        $scope.closePopup = function(value) {
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

            buttons: [{ text: '取消', type: 'button-red-none' }, {

                text: '<b>确定</b>',

                type: 'button-red-none',

                onTap: function(e) {

                    if (!$scope.datas.userMaritalStatus.value) {
                        //e.preventDefault();

                    } else {
                        return $scope.datas.userMaritalStatus;
                    }
                }
            }]
        });

        MaritalStatusPopup.then(function() {

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
    $scope.showMonthlyIncomePopup = function() {
        $scope.closePopup = function(value) {
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

            buttons: [{ text: '取消', type: 'button-red-none' }, {

                text: '<b>确定</b>',

                type: 'button-red-none',

                onTap: function(e) {

                    if (!$scope.datas.userMonthlyIncome.value) {
                        //e.preventDefault();

                    } else {
                        return $scope.datas.userMonthlyIncome;
                    }
                }
            }]
        });

        MonthlyIncomePopup.then(function() {

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
    $scope.showHousingPopup = function() {
        $scope.closePopup = function(value) {
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

            buttons: [{ text: '取消', type: 'button-red-none' }, {

                text: '<b>确定</b>',

                type: 'button-red-none',

                onTap: function(e) {

                    if (!$scope.datas.userHousing.value) {
                        //e.preventDefault();

                    } else {
                        return $scope.datas.userHousing;
                    }
                }
            }]
        });

        HousingPopup.then(function() {

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
    $scope.showHomePopup = function() {
        var HomePopup = $ionicPopup.show({

            template: '<input type="text" ng-model="datas.userHome.value" style="background-color: #6E6E6E !important;border-radius: 1em;height: 3em!important;font-size: 1.5em;text-align: center;">',

            title: '请输入个人居住地',

            scope: $scope,

            buttons: [{ text: '取消', type: 'button-red-none' }, {

                text: '<b>确定</b>',

                type: 'button-red-none',

                onTap: function(e) {

                    if (!$scope.datas.userHome.value) {
                        e.preventDefault();

                    } else {
                        return $scope.datas.userHome;
                    }
                }
            }]
        });

        HomePopup.then(function() {

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
    $scope.showHouseholdegisterPopup = function() {
        var HomePopup = $ionicPopup.show({

            template: '<input type="text" ng-model="datas.userHouseholdegister.value" style="background-color: #6E6E6E !important;border-radius: 1em;height: 3em!important;font-size: 1.5em;text-align: center;">',

            title: '请输入个人居住地',

            scope: $scope,

            buttons: [{ text: '取消', type: 'button-red-none' }, {

                text: '<b>确定</b>',

                type: 'button-red-none',

                onTap: function(e) {

                    if (!$scope.datas.userHouseholdegister.value) {
                        e.preventDefault();

                    } else {
                        return $scope.datas.userHouseholdegister;
                    }
                }
            }]
        });

        HomePopup.then(function() {

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
    $scope.showJobPopup = function() {
            var JobPopup = $ionicPopup.show({

                template: '<input type="text" ng-model="datas.userJob.value" style="background-color: #6E6E6E !important;border-radius: 1em;height: 3em!important;font-size: 1.5em;text-align: center;">',

                title: '请输入个人职业',

                scope: $scope,

                buttons: [{ text: '取消', type: 'button-red-none' }, {

                    text: '<b>确定</b>',

                    type: 'button-red-none',

                    onTap: function(e) {

                        if (!$scope.datas.userJob.value) {
                            e.preventDefault();

                        } else {
                            return $scope.datas.userJob;
                        }
                    }
                }]
            });

            JobPopup.then(function() {

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
    $scope.showSetHeightPopup = function() {

        var HeightPopup = $ionicPopup.show({

            template: '<input type="number" ng-model="datas.userHeight.value" style="background-color: #6E6E6E !important;border-radius: 1em;height: 3em!important;font-size: 1.5em;text-align: center;">',

            title: '请输入个人身高',

            scope: $scope,

            buttons: [{ text: '取消', type: 'button-red-none' }, {

                text: '<b>确定</b>',

                type: 'button-red-none',

                onTap: function(e) {

                    if (!$scope.datas.userHeight.value) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();

                    } else {
                        return $scope.datas.userHeight;
                    }
                }
            }]
        });

        HeightPopup.then(function() {

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
    $scope.openDatePicker = function() {
        ionicDatePicker.openDatePicker(ipObj1);
    };
    var ipObj1 = {
        callback: function(val) { //Mandatory
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
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        closeOnSelect: false, //Optional
        templateType: 'modal', //Optional
    };
    /*******************************时间选择器*****************************/
    /*$scope.save = function() {
        //guideData.person = $scope.datas;
        //guideData.person.name="aa";
        //Persons.save(guideData.person);
        //console.log(guideData.person);
        console.log("click");
        console.log($scope.datas);


        var personId = $scope.user.get("childId");
        console.log(personId);
        $scope.person = null;
        //no child yet
        if (personId === null || personId === undefined) {
            $scope.person = {};
            $scope.setPersonData($scope.person);
            Persons.save($scope.person).then(function(object) {
                console.log("save person success, object id:" + object.id);
                $scope.user.set("childId", object.id);
                Users.save($scope.user);
            }, function(error) {
                console.log("save person fail");
            });

        }
        //has child
        else {

            Persons.get(personId).then(function(result) {
                //person = object.attributes;
                //person.id = object.id;
                $scope.person = Persons.convertToJson(result);
                console.log($scope.person);


                //person.set
                if ($state.current.name === "guide_09") {
                    $scope.setPersonData($scope.person);
                } else if ($state.current.name === "guide_10") {
                    var selfTagsChecked = [];
                    for (x in $scope.selfTagsCheck) {
                        if ($scope.selfTagsCheck[x] === true) {
                            selfTagsChecked.push(x);
                        }
                    }
                    $scope.person.tags=selfTagsChecked;
                } else if ($state.current.name === "guide_11") {
                    var targetTagsChecked = [];
                    for (x in $scope.targetTagsCheck) {
                        if ($scope.targetTagsCheck[x] === true) {
                            targetTagsChecked.push(x);
                        }
                    }
                    console.log(targetTagsChecked);
                    $scope.person.targets=targetTagsChecked;

                }



                Persons.save($scope.person);


            });


            console.log("personGet");
            console.log($scope.person);
        }


        console.log("clicksaveeeeeee");
    };*/
    $scope.save = function() {
        //guideData.person = $scope.datas;
        //guideData.person.name="aa";
        //Persons.save(guideData.person);
        //console.log(guideData.person);
        console.log("save");
        console.log($scope.datas);

        //person.set
        if ($state.current.name === "guide_09") {
            $scope.setChildData();
        } else if ($state.current.name === "guide_10") {
            var selfTagsChecked = [];
            for (x in $scope.selfTagsCheck) {
                if ($scope.selfTagsCheck[x] === true) {
                    selfTagsChecked.push(x);
                }
            }
            $scope.user.set("childtags", selfTagsChecked);
        } else if ($state.current.name === "guide_11") {
            var targetTagsChecked = [];
            for (x in $scope.targetTagsCheck) {
                if ($scope.targetTagsCheck[x] === true) {
                    targetTagsChecked.push(x);
                }
            }
            console.log(targetTagsChecked);
            $scope.user.set("childtargettagss", targetTagsChecked);
        }



        $scope.user.save().then(function() {
            console.log($scope.user);
            console.log("clicksaveeeeeee");
        });
    };
    /*$scope.setPersonData = function(person) {
        person.setHeight($scope.datas.userHeight.value);
        person.setBirthday($scope.datas.userBorn.value);
        person.setDegree($scope.datas.userEducation.value);
        person.setAddress($scope.datas.userHome.value);
        person.setJob($scope.datas.userJob.value);
         userHome: Object
         userHouseholdegister: Object
         userHousing: Object
         userJobCategory: Object
         userMaritalStatus: Object
         userMonthlyIncome: Object
    };*/
    /*$scope.setPersonData = function(person) {
        person.height = parseInt($scope.datas.userHeight.value);
        person.birthday = $scope.datas.userBorn.value;
        person.degree = $scope.datas.userEducation.value;
        person.address = $scope.datas.userHome.value;
        person.job = $scope.datas.userJob.value;
    };*/
    $scope.setChildData = function() {
        $scope.user.set("childheight", parseInt($scope.datas.userHeight.value));
        $scope.user.set("childbirthday", $scope.datas.userBorn.value);
        $scope.user.set("childdegree", $scope.datas.userEducation.value);
        $scope.user.set("childaddress", $scope.datas.userHome.value);
        $scope.user.set("childjob", $scope.datas.userJob.value);
    };
    $scope.skip = function() {
        console.log("clickskipeeeee");
        $state.go("guide_10", {}, { reload: true });
    };
    console.log(guideData);

    $scope.selfTags = ["500", "can make food", "tall", "test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9"];
    $scope.targetTags = ["500", "can make food", "tall", "test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9"];
    $scope.selfTagsCheck = [];
    $scope.targetTagsCheck = [];
    /*
     * 这里有个bug改成guide10RadioButton之后浏览器调试的时候一直显示没修改成功
     * */
    $scope.check = function(type, tag) {
        console.log("check");
        if (type === 'self') {
            $scope.selfTagsCheck[tag] = !$scope.selfTagsCheck[tag];
            //$scope.Check = $scope.selfTagsCheck[tag];
            console.log($scope.selfTagsCheck);
        } else if (type === 'target') {
            if (guideData.guide11checkedButtonNum >= 9) {
                if (!$scope.targetTagsCheck[tag]) {
                    return;
                }
            }
            $scope.targetTagsCheck[tag] = !$scope.targetTagsCheck[tag];
            if ($scope.targetTagsCheck[tag]) {
                guideData.guide11checkedButtonNum++;
            } else {
                guideData.guide11checkedButtonNum--;
            }
            //$scope.Check = $scope.targetTagsCheck[tag];
            console.log($scope.targetTagsCheck);
        }
    };
}
