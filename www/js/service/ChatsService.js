ChatsService=function () {
        var table_name = "BmobMsg";
        var chats = [];

        return {
            all: function () {
                var Chats = Bmob.Object.extend(table_name);
                var query = new Bmob.Query(Chats);
                query.find().then(function (results) {
                    for (var i = 0;i < results.length;i ++) {
                        var object = results[i];
                        var chat = object.attributes;
                        chat.id = object.id;
                        chats.push(chat);
                    }
                    return chats;
                });
                return chats;
            },

            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].objectId === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    }