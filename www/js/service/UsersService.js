UsersService=function ($http) {
        var table_name = "_User";

        return {
            save: function(user) {
                //var user = new Bmob.User();
                /*user.set("")
                user.set("child", "my_new_username");  // attempt to change username

                    "child":"1",/!*person id*!/
                    "gender":"male",
                    "lastname":"huang",
                    "mobile":"1333333333",
                    "targetgender":"male",*/
                    return user.save();
                /*user.save(null, {
                    success: function(user) {
                        // This succeeds, since the user was authenticated on the device


                    },
                    error: function(model, error) {
                        alert("create user fail");
                    }
                });*/

            },


            login: function (mobile) {

                return Bmob.User.logIn(mobile,mobile);

                /*if(Bmob.User.current()!==null){
                    Bmob.User.logOut();
                }
                var user = Bmob.User.logIn(mobile,mobile, {
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
                        //means has this mobile in database
                        console.log("login success");
                        return user;

                    },
                    error: function (user, error) {
                        // The login failed. Means no mobile in database
                        //register(mobile,mobile);
                        return {};

                    }
                });*/

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
                return Bmob.User.logOut();

                //var currentUser = Bmob.User.current();  // this will now be null
            },
            getSubscribe: function () {
                var user = Bmob.User.current();
                var relation = user.relation("subscribes");
                relation.query().find({
                    success: function (list) {
                        // list contains the posts that the current user likes.
                        console.log("subscribe list :::"+list)
                    }
                });



            },
            getSubscribed: function () {
                var currentUser = Bmob.User.current();



                var query = Bmob.Relation.reverseQuery('_User', 'subscribes', currentUser);
                query.find({
                    success: function (users) {
                        //users who subscribes this person
                        console.log("subscribe list :::"+users)
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
                var Message = Bmob.Object.extend("BmobMsg");
                var message = new Message();
                message.set("content", content);
                message.set("belongId", user);
                message.set("toId", toUser);
                console.log("message ne: ", message);
                message.save(null, {
                    success: function (message) {
                        // Find all posts by the current user
                        var query = new Bmob.Query(Message);
                        query.equalTo("belongId", user);
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
                person.set("parent",user);



// MyUser user = BmobUser.getCurrentUser(this, MyUser.class);
// // 创建帖子信息
// Post post = new Post();
// post.setContent(content);
// //添加一对一关联
// post.setAuthor(user);
// post.save(this, new SaveListener() {

//     @Override
//     public void onSuccess() {
//         // TODO Auto-generated method stub
//         ...
//     }

//     @Override
//     public void onFailure(int code, String msg) {
//         // TODO Auto-generated method stub
//         ...
//     }
// });

            },
            subscribe: function (personToSubscribe) {
                var user = Bmob.User.current();
                console.log(user);
                var relation = user.relation("subscribes");
                relation.add(personToSubscribe.bmob);
                user.save();
            },
            all:function(){
            var query = new Bmob.Query(Bmob.User);
                        //query.equalTo(gender, "female");  // find all the women
                        query.find({
                          success: function(women) {
                            // Do stuff
                          }
                        });





            },
             convertToJson: function(userBmob) {
                        var child = {};
                        child = userBmob.attributes;
                        child.id = userBmob.id;
                        child.bmob=userBmob
                        return child;
                    },
                    convertToJsonArray: function(userBmobs) {
                        var children = [];
                        for (var i = 0; i < userBmobs.length; i++) {
                            children[i] = this.convertToJson(userBmobs[i]);
                        }
                        return children;
                    },
                    /*convertToBmob: function(person, personBmob) {
                        personBmob.set("id",person.id);
                        personBmob.set("name", person.name);
                        personBmob.set("avatar", person.avatar);
                        personBmob.set("job", person.job);
                        personBmob.set("gender", person.gender);
                        personBmob.set("address", person.address);
                        personBmob.set("birthday", person.birthday);
                        personBmob.set("degree", person.degree);
                        personBmob.set("height", person.height);
                        personBmob.set("tags", person.tags);
                        personBmob.set("targets", person.targets);
                        return personBmob;
                    },*/


        };

    }