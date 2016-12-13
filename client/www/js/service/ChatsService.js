ChatsService=function () {
/*
    objectId: String
    belongNick String
    content: String
    msgTime: String
    status: Number
    toId: String
    belongId: String
    belongUsername: String
    conversationId: String
    isReaded: Number
    msgType:  Number
    tag: String
    belongAvatar: String
    extra: String
    createdAt: Date
    updateAt: Date
    ACL: ACL
*/
        var table_name = "BmobMsg";
        var chats = {};
        var user_id = "hRkuBBBF"; // TODO: replace with current user: Bmob.User.current();
        return {
            all: function () {
                var Chats = Bmob.Object.extend(table_name);
                var query = new Bmob.Query(Chats);
                query.equalTo("toId", user_id);
                query.ascending("createdAt");
                query.find().then(function (results) {
                    for (var i = 0;i < results.length;i ++) {
                        var object = results[i];
                        var chat = object.attributes;
                        chats[chat.belongId] = chat;
                    }
                    return chats;
                });
                return chats;
            },

            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (belongId) {
                var Chats = Bmob.Object.extend(table_name);
                var query = new Bmob.Query(Chats);
                var messages = [];
                query.containedIn("conversationId", [user_id + '&' + belongId, belongId + '&' + user_id]);
                query.ascending("createdAt");
                query.find().then(function (results) {
                    for (var i = 0;i < results.length;i ++) {
                        var object = results[i];
                        var chat = object.attributes;
                        messages.push(chat);
                    }
                    return messages;
                });
                return messages;
            },
            getUser: function (id) {
                var user = Bmob.Object.extend("_User");
                var query = new Bmob.Query(user);
                var toUser = {};
                query.get(id). then(function(result) {
                        toUser = result.attributes;
                        return toUser;
                });
                return toUser;
            }
        };
    }