PersonsService= function ($http) {
        var table_name = "_User";
        return {
            all: function () {
                var persons = [];
                var person = [];
                var Person = Bmob.Object.extend(table_name);
                var query = new Bmob.Query(Person);
                query.find().then(function (results) {
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
            allSortBy:function (sortBy) {
                var persons = [];
                var Person = Bmob.Object.extend(table_name);
                var query = new Bmob.Query(Person);
                query.descending(sortBy).then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];

                        var person = object.attributes;
                        person.id = object.id;
                        persons.push(person);
                    }
                    return persons;
                });


                return persons;
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
                var Person = Bmob.Object.extend(table_name);
                var query = new Bmob.Query(Person);
                query.get(personId).then(function (object) {
                    person = object.attributes;
                    person.id = object.id;
                    return person;
                });
                return person;

            }
        };
    }