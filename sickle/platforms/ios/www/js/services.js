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

    .factory('Chats', function () {
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
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Users', function ($http) {
        var table_name = "_User";

        return {
            register: function (username, password) {
                var user = new Bmob.User();
                user.set("username", username);
                user.set("password", password);
                user.set("email", "example@a.com");

                // other fields can be set just like with Bmob.Object
                user.set("phone", "415-392-0202");

                user.signUp(null, {
                    success: function (user) {
                        // Hooray! Let them use the app now.
                    },
                    error: function (user, error) {
                        // Show the error message somewhere and let the user try again.
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            },

            login: function (username, password) {
                var user = Bmob.User.logIn(username, password, {
                    success: function (user) {
                        user.set("username", "my_new_username");  // attempt to change username
                        user.save(null, {
                            success: function (user) {
                                // This succeeds, since the user was authenticated on the device

                                // Get the user from a non-authenticated method
                                var query = new Bmob.Query(Bmob.User);
                                query.get(user.objectId, {
                                    success: function (userAgain) {
                                        userAgain.set("username", "another_username");
                                        userAgain.save(null, {
                                            error: function (userAgain, error) {
                                                // This will error, since the Bmob.User is not authenticated
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    },
                    error: function (user, error) {
                        // The login failed. Check error to see why.
                    }
                });
            },
            verifyEmail: function (email) {
                //reset password
                Bmob.User.requestEmailVerify(email, {
                    success: function () {
                        // Password reset request was sent successfully
                    },
                    error: function (error) {
                        // Show the error message somewhere
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            },
            getCurrentUser: function () {
                var currentUser = Bmob.User.current();
                if (currentUser) {
                    // do stuff with the user
                    return currentUser;
                } else {
                    // show the signup or login page
                    return null;
                }
            },
            logOut: function () {
                Bmob.User.logOut();

                var currentUser = Bmob.User.current();  // this will now be null
            },
            getSubscribe: function () {
                var user = Bmob.User.current();
                var relation = user.relation("subscribes");
                relation.query().find({
                    success: function (list) {
                        // list contains the posts that the current user likes.
                    }
                });

            },
            getSubscribed: function () {
                var currentUser = Bmob.User.current();
                var person = currentUser.child;


                var query = Bmob.Relation.reverseQuery('_User', 'subscribes', person);
                query.find({
                    success: function (users) {
                        //users who subscribes this person
                        return users;
                    }
                });

                query.include("post");
            },
            resetPassword: function (username) {
                Bmob.User.requestPasswordReset(username, {
                    success: function () {
                        // Password reset request was sent successfully
                    },
                    error: function (error) {
                        // Show the error message somewhere
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            },
            sendMessage: function (content, toUser) {
                var user = Bmob.User.current();
                // Make a new post
                var Message = Bmob.Object.extend("Message");
                var message = new Message();
                message.set("content", content);
                message.set("user", user);
                message.set("to_user", toUser);
                message.save(null, {
                    success: function (message) {
                        // Find all posts by the current user
                        var query = new Bmob.Query(Message);
                        query.equalTo("user", user);
                        query.find({
                            success: function (messages) {
                                // userPosts contains all of the posts by the current user.
                            }
                        });
                    }
                });
            },
            setChild: function (person) {
                // Declare the types.
                var Person = Bmob.Object.extend("Person");
                var user = Bmob.User.current();
                user.set("child", person);
                user.save();
            },
            subscribe: function (person) {
                var user = Bmob.User.current();
                var relation = user.relation("subscribes");
                relation.add(person);
                user.save();
            }
        };

    })

    .factory('Persons', function ($http) {
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
        var table_name = "person";
        return {
            all: function () {
                var persons = [];
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
                var person = [];
                var Person = Bmob.Object.extend("person");
                var query = new Bmob.Query(Person);
                query.find().then(function (results) {
                    console.log(persons);
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];

                        var person = object.attributes;
                        person.id = object.id;
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
            remove: function (person) {
                //persons.splice(persons.indexOf(person), 1);
            },
            get: function (personId) {
                /*for (var i = 0; i < persons.length; i++) {
                 if (persons[i].id === parseInt(personId)) {
                 return persons[i];
                 }
                 }*/
                var person = {};
                var Person = Bmob.Object.extend("person");
                var query = new Bmob.Query(Person);
                query.get(personId, {
                    success: function (object) {

                        person = object.attributes;
                        person.id = object.id;
                        return person;
                    },
                    error: function (object, error) {
                        alert("error");
                        return null;
                    }
                });

            }
        };
    })
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
    ]);
