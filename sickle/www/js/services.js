var server_url="https://api.bmob.cn/1/classes/";
var http_headers={
  'X-Bmob-Application-Id':'d228b6ed2253b56f53b0a30adf36ed03',
  'X-Bmob-REST-API-Key': '2c98abb9307079a6e401f8ad14284f4a',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'X-Requested-With',
};
var bmobAppId = "d228b6ed2253b56f53b0a30adf36ed03";
var bmobRestApiKey="2c98abb9307079a6e401f8ad14284f4a";
Bmob.initialize(bmobAppId,bmobRestApiKey);
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

.factory('Persons', function($http) {
  // Might use a resource here that returns a JSON array
  /*var persons=$http({
    url:"https://api.bmob.cn/1/classes/person",
    method:"POST",
    headers: {
      'X-Bmob-Application-Id':'d228b6ed2253b56f53b0a30adf36ed03',
      'X-Bmob-REST-API-Key': '2c98abb9307079a6e401f8ad14284f4a',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'Content-Type': 'application/json'
    },
    data: {
      "name": "Ben Sparrow",
      "face": "img/ben.png",
      "job": "bank clerk",
      "gender": "female",
      "address": "Shanghai",
      "birthday": "1989",
      "degree": "master",
      "height": "167cm",
      "tags": [
        "can make food",
        "single child"
      ],
      "target-tags": [
        "80-89",
        "taller than 175cm"
      ]
    }
  }).success(function(data,header,config,status){
      console.log(data);
  }).error(function(data,header,config,status){
    console.log(data);
  });*/
  // Some fake testing data
  /*var persons = [{
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
  }];*/
  var table_name="person";
  return {
    all: function() {
      var persons=[];
      /*$http({
        url:server_url+table_name,
        method:"GET",
        headers: http_headers
      }).success(function(data,header,config,status){
        persons=data.results;
      }).error(function(data,header,config,status){
        console.error(data);
        console.error(header);
        console.error(config);
        console.error(status);
      });*/
      var person=[];
      var Person = Bmob.Object.extend("person");
      var query = new Bmob.Query(Person);
      query.find().then(function(results){
          console.log(persons);
          for(var i=0;i<results.length;i++){
            var object=results[i];

            var person = object.attributes;
            person.id=object.id;
            persons.push(person);
          }
          return persons;
        });


      return persons;
      /*query.find({
        success:function (results) {
          console.log(results);
        },error:function (error) {
          console.log(error);
        }
      })*/

    },
    remove: function(person) {
      //persons.splice(persons.indexOf(person), 1);
    },
    get: function(personId) {
      /*for (var i = 0; i < persons.length; i++) {
        if (persons[i].id === parseInt(personId)) {
          return persons[i];
        }
      }*/
      var person={};
      var Person = Bmob.Object.extend("person");
      var query = new Bmob.Query(Person);
      query.get(personId,{
        success:function(object){
          
          person=object.attributes;
          person.id=object.id;
          return person;
        },
        error:function(object,error){
          alert("error");
        }
      });

      return person;
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
