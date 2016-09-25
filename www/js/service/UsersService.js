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
                user.save(null, {
                    success: function(user) {
                        // This succeeds, since the user was authenticated on the device


                    },
                    error: function(model, error) {
                        alert("create user fail");
                    }
                });

            },
            register: function (username, password) {
                var user = new Bmob.User();
                user.set("username", username);
                user.set("password", password);
                //user.set("email", "example@a.com");

                // other fields can be set just like with Bmob.Object
                //user.set("phone", "415-392-0202");

                user.signUp(null, {
                    success: function (user) {
                        // Hooray! Let them use the app now.
                        console.log("register success");
                    },
                    error: function (user, error) {
                        // Show the error message somewhere and let the user try again.
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            },

            login: function (mobile) {
                return Bmob.User.logIn(mobile,mobile);
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
            subscribe: function (person) {
                var user = Bmob.User.current();
                console.log(user);
                var relation = user.relation("subscribes");
                relation.add(person);
                user.save();
            },

        };

    }