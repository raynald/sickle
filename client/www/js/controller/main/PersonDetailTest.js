var PersonDetailTest = function($scope, $ionicScrollDelegate, $timeout) {
    //用于改变左侧的tag的样式
    $scope.tagState = [true, false, false, false];
    //修改模式/展示模式
    $scope.modleNormal = true;
    //type:BaseInfo,PersonalityInfo,DailyPic,MaritalFilter
    $scope.setPersonalDetail = function(position, type) {
            //修改模式
            if (!$scope.modleNormal) {
                switch (type) {
                    case BaseInfo:
                        switch (position) {
                            case 1:
                                $scope.showHomePopup();
                                break;
                            case 2:
                                $scope.showHouseholdegisterPopup();
                                break;
                            case 3:
                                $scope.showHousingPopup();
                                break;
                            case 4:
                                $scope.showEducationPopup();
                                break;
                            case 5:
                                $scope.showMonthlyIncomePopup();
                                break;
                            case 6:
                                $scope.showMaritalStatusPopup();
                                break;
                        }
                        break;
                    case PersonalityInfo:
                        break;
                    case DailyPic:
                        break;
                    case MaritalFiler:
                        switch (position) {
                            case 0:
                                break;
                            case 1:
                                $scope.showSetHeightPopup();
                            case 2:
                                $scope.showEducationPopup();
                                break;
                            case 3:
                                $scope.showHouseholdegisterPopup();
                                break;
                            case 4:
                                $scope.showHousingPopup();
                                break;
                            case 5:
                                $scope.showMonthlyIncomePopup();
                                break;
                            case 6:
                                $scope.showMaritalStatusPopup();
                                break;
                        }
                        break;
                }
            }
        }
        //通过设置这个属性来切换是自己和别人的相亲页面的样式
        //true：自己的相亲名片，false：别人的相亲名片
    $scope.isSelfPersonDetail = true;
    var setTagFlag = function(to) {
        for (var i = 0; i < 4; i++) {
            if (i == to) {
                $scope.tagState[to] = true;
            } else {
                $scope.tagState[i] = false;
            }
        }
        console.log($scope.tagState);
    };
    $scope.customScrollTo = function(flag, to) {
        /*获取当前滑动的高度*/
        if (flag == 0) {
            setTagFlag(to);
            $ionicScrollDelegate.scrollTo(0, $scope.tagHeight[to], true);
        } else {

        }
    };
    $scope.person = {
        job: '国企银行职员',
        include: '张先生的女儿  26岁 167cm',
        id: 666666,
        face: 'img/mike.png',
        tag: {
            group1: {
                ta1l: "五百强",
                tat2: "上市公司",
                tag3: "名校毕业"
            },
            group2: {
                ta1l: "会做饭",
                tat2: "会撒娇",
                tag3: "会打游戏"
            }
        }
    };
    $scope.filterDatas = {
        userAge: {
            info: "年龄",
            value: "不限"
        },
        userHeight: {
            info: "身高",
            value: "不限"
        },
        userEducation: {
            value: "不限",
            info: "学历"
        },
        userHouseholdegister: {
            value: "不限",
            info: "户籍"
        },
        userHousing: {
            value: "不限",
            info: "住房情况"
        },
        userMonthlyIncome: {
            value: "不限",
            info: "月收入"
        },
        userMaritalStatus: {
            value: "不限",
            info: "婚姻状况"
        }
    };

    $scope.datas = {
        userNum: {
            value: 1024,
            info: "亲家号"
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

    $scope.tagHeight = [0, 380, 560, 950];

    $scope.checkTag = function() {
        $scope.height = $ionicScrollDelegate.getScrollPosition().top;
        console.log($scope.height);
        //设置一个定时器，看200ms的高度和当前高度是否相同，相同的话则认定为滑动停止
        var height = $scope.height;
        $timeout(
            function() {
                if (height == $scope.height) {
                    console.log("没滑动");
                    if (height < 200) {
                        setTagFlag(0);
                    } else if (height >= 200 && height < 480) {
                        setTagFlag(1)
                    } else if (height >= 480 && height < 860) {
                        setTagFlag(2)
                    } else if (height >= 860) {
                        setTagFlag(3)
                    }
                }
                //手动刷新数据
                $scope.$apply();

            }, 500, false);
    }
};
