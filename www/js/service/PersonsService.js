PersonsService = function($http) {
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
        save: function(person) {
            //var Person = Bmob.Object.extend(table_name);
            //var personBmob = new Person();
            //personBmob.setName(person.name);
            console.log(person);
            person.save(null, {
                success: function(object) {
                    alert("save person success, object id:" + object.id);
                    //person = Person.spawn(object);
                    person=object;
                    return person;
                },
                error: function(model, error) {
                    alert("save person fail");
                    console.log(model);
                    console.log(error);
                    return null;
                }
            });
            return person;
        },

        all: function() {
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
           //var person = [];
            var Person = Bmob.Object.extend("person");
            var query = new Bmob.Query(Person);
            query.find().then(function(results) {
                console.log(persons);
                for (var i = 0; i < results.length; i++) {
                    var  personBmob= results[i];
                    //var person = Person.spawn(personBmob);
                    //var person = object.attributes;
                    //person.id = object.id;
                    persons.push(personBmob);
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
        allSortBy: function(sortBy) {
            console.log(sortBy);
            var persons = [];
            var Person = Bmob.Object.extend(table_name);
            var query = new Bmob.Query(Person);
            query.descending(sortBy);
            query.find().then(function(results) {
                console.log(persons);
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    //var person = object.attributes;
                    //person.id = object.id;
                    //var person = Person.spawn(object);
                    persons.push(object);
                }
                return persons;
            });

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
            var person = {};
            var Person = Bmob.Object.extend("person");
            var query = new Bmob.Query(Person);
            query.get(personId).then(function(object) {
                //person = object.attributes;
                //person.id = object.id;
                //person = Person.spawn(object);
                person.set("id",object.id);
                console.log("idddddddd"+person.get("id"));
                return person;
            });


        }
    };
};
