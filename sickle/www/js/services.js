angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Persons', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var persons = [{
    id: 0,
    name: 'Ben Sparrow',
    face: 'img/ben.png',
    job: 'bank clerk',
    gender:'female',
    address:'Shanghai',
    birthday:'1989',
    degree:'master',
    height:'167cm',
    tags:['can make food', 'single child'],
    target:['80-89','taller than 175cm']
  }, {
    id: 1,
    name: 'Max Lynx',
    face: 'img/max.png',
    job: 'bank clerk',
    gender:'female',
    address:'Shanghai',
    birthday:'1989',
    degree:'master',
    height:'167cm',
    tags:['can make food', 'single child'],
    target:['80-89','taller than 175cm']
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    face: 'img/adam.jpg',
    job: 'bank clerk',
    gender:'female',
    address:'Shanghai',
    birthday:'1989',
    degree:'master',
    height:'167cm',
    tags:['can make food', 'single child'],
    target:['80-89','taller than 175cm']
  }, {
    id: 3,
    name: 'Perry Governor',
    face: 'img/perry.png',
    job: 'bank clerk',
    gender:'female',
    address:'Shanghai',
    birthday:'1989',
    degree:'master',
    height:'167cm',
    tags:['can make food', 'single child'],
    target:['80-89','taller than 175cm']
  }, {
    id: 4,
    name: 'Mike Harrington',
    face: 'img/mike.png',
    job: 'bank clerk',
    gender:'female',
    address:'Shanghai',
    birthday:'1989',
    degree:'master',
    height:'167cm',
    tags:['can make food', 'single child'],
    target:['80-89','taller than 175cm']
  },{
    id: 5,
    name: 'Mike Harrington1',
    face: 'img/mike.png',
    job: 'bank clerk',
    gender:'female',
    address:'Shanghai',
    birthday:'1989',
    degree:'master',
    height:'167cm',
    tags:['can make food', 'single child'],
    target:['80-89','taller than 175cm']
  },{
    id: 6,
    name: 'Mike Harrington2',
    face: 'img/mike.png',
    job: 'bank clerk',
    gender:'female',
    address:'Shanghai',
    birthday:'1989',
    degree:'master',
    height:'167cm',
    tags:['can make food', 'single child'],
    target:['80-89','taller than 175cm']
  },{
    id: 7,
    name: 'Mike Harrington2',
    face: 'img/mike.png',
    job: 'bank clerk',
    gender:'female',
    address:'Shanghai',
    birthday:'1989',
    degree:'master',
    height:'167cm',
    tags:['can make food', 'single child'],
    target:['80-89','taller than 175cm']
  },{
    id: 8,
    name: 'Mike Harrington2',
    face: 'img/mike.png',
    job: 'bank clerk',
    gender:'female',
    address:'Shanghai',
    birthday:'1989',
    degree:'master',
    height:'167cm',
    tags:['can make food', 'single child'],
    target:['80-89','taller than 175cm']
  },{
    id: 9,
    name: 'Mike Harrington2',
    face: 'img/mike.png',
    job: 'bank clerk',
    gender:'female',
    address:'Shanghai',
    birthday:'1989',
    degree:'master',
    height:'167cm',
    tags:['can make food', 'single child'],
    target:['80-89','taller than 175cm']
  },{
    id: 10,
    name: 'Mike Harrington2',
    face: 'img/mike.png',
    job: 'bank clerk',
    gender:'female',
    address:'Shanghai',
    birthday:'1989',
    degree:'master',
    height:'167cm',
    tags:['can make food', 'single child'],
    target:['80-89','taller than 175cm']
  }];

  return {
    all: function() {
      return persons;
    },
    remove: function(person) {
      persons.splice(persons.indexOf(person), 1);
    },
    get: function(personId) {
      for (var i = 0; i < persons.length; i++) {
        if (persons[i].id === parseInt(personId)) {
          return persons[i];
        }
      }
      return null;
    }
  };
})
.factory('MockService', ['$http', '$q',
  function($http, $q) {
    var me = {};

    me.getUserMessages = function(d) {
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

		 setTimeout(function() {
      	deferred.resolve(getMockMessages());
	    }, 1500);

      return deferred.promise;
    };

    me.getMockMessage = function() {
      return {
        userId: '534b8e5aaa5e7afc1b23e69b',
        date: new Date(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      };
    }

    return me;
  }
]);
