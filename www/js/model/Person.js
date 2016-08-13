/**
 * Created by I312177 on 8/13/2016.
 */
// 为Bmob.Object的子类添加实例方法和类方法
var Person = Bmob.Object.extend("person",
    {
/*        "id": 9,
        "name": "Mike Harrington2",
        "avatar": "img/mike.png",
        "job": "bank clerk",
        "gender":"female",
        "address":"Shanghai",
        "birthday":"1989",
        "degree":"master",
        "height":"167cm",
        "tags":["can make food", "single child"],
        "target":["80-89","taller than 175cm"],*/
        //实例方法
/*        gleaterThanOneHundred: function () {
            return this.get("score") > 100;
        },*/
        getId:function(){
            return this.get("id");
        },
        setId:function(id){
            return this.set("id",id);
        },
        getName:function(){
            return this.get("name");
        },
        setName:function(name){
            return this.set("name",name);
        },
        getAvatar:function(){
            return this.get("avatar");
        },
        setAvatar:function(avatar){
            return this.set("avatar",avatar);
        },
        getJob:function(){
            return this.get("job");
        },
        setJob:function(job){
            return this.set("job",job);
        },
        getGender:function(){
            return this.get("gender");
        },
        setGender:function(gender){
            return this.set("gender",gender);
        },
        getAddress:function(){
            return this.get("address");
        },
        setAddress:function(address){
            return this.set("address",address);
        },
        getBirthday:function(){
            return this.get("birthday");
        },
        setBirthday:function(birthday){
            return this.set("birthday",birthday);
        },
        getDegree:function(){
            return this.get("degree");
        },
        setDegree:function(degree){
            return this.set("degree",degree);
        },
        getHeight:function(){
            return this.get("height");
        },
        setHeight:function(height){
            return this.set("height",height);
        }
    },
    {
        //类方法
/*        spawn: function (score) {
            var gameScore = new GameScore();
            gameScore.set("score", score);
            return gameScore;
        }*/
    });
//var gameScore = new GameScore();

//var gameScore = GameScore.spawn(200);
//alert(gameScore.gleaterThanOneHundred());