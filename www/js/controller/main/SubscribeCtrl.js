var SubscribeCtrl=function($scope, Persons) {
    $scope.activeButton = "subscribing";
    $scope.persons = [];
    $scope.remove = function(person) {
        Persons.remove(person);
    };
    $scope.filterSwitch = function(filter) {
        $scope.activeButton = filter;
        switch (filter) {
            case 'subscribing':
                $scope.persons = [];
                break;
            case 'subscribed':
                $scope.persons = [];
                break;

        }
    };
};