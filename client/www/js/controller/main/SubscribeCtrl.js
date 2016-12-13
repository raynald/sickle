var SubscribeCtrl = function($scope, Users,Persons) {
    $scope.activeButton = "subscribing";
    $scope.persons = [];
    $scope.user = Bmob.User.current();
    $scope.remove = function(person) {
        Persons.remove(person);
    };
    $scope.filterSwitch = function(filter) {
        $scope.activeButton = filter;
        var query;
        switch (filter) {
            case 'subscribing':
                var relation = $scope.user.relation("subscribes");
                query = relation.query();
                console.log(query);
                if (query !== null && query !== undefined) {
                    query.find({
                        success: function(results) {
                            //users who subscribes this person
                            console.log("subscribing list :::" + results)
                            $scope.persons = Users.convertToJsonArray(results);
                        }
                    });
                }
                break;
            case 'subscribed':
                query = Bmob.Relation.reverseQuery('_User', 'subscribes', $scope.user);
                query.find({
                    success: function(results) {
                        //users who subscribes this person
                        console.log("subscribed list :::" + results)
                        $scope.persons = Users.convertToJsonArray(results);
                    }
                });

                //query.include("post");
                //$scope.persons = [];
                break;

        }
    };
};
