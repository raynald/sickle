var request = require("request");

var get_options = function(raw_url, data) { 
    return {
        method: "GET",
        url: raw_url, 
        qs: data,
        headers: { 
            'x-bmob-rest-api-key': '57042e35edf15cfd7d359e66f7b0cda9',
            'x-bmob-application-id': '3b5d9f2ce4169420f4ac0a47815c15ac' 
        } 
    }
};

var post_options = function(raw_url, data) { 
    return {
        method: "POST",
        url: raw_url, 
        qs: data,
        headers: { 
            'x-bmob-rest-api-key': '57042e35edf15cfd7d359e66f7b0cda9',
            'x-bmob-application-id': '3b5d9f2ce4169420f4ac0a47815c15ac',
            'Content-Type': 'application/json',
        } 
    }
};

console.log("---- Login ---");
request(get_options('https://api.bmob.cn/1/login/', {username: 'root', password: 'toor'}), function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
});

console.log("---- Get all users ----");
request(get_options('https://api.bmob.cn/1/users/'), function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
});

console.log("---- Get single users with objectId ----");
request(get_options('https://api.bmob.cn/1/users/0HyWSSSe'), function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
});

