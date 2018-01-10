
var BaseBot = require('./../lib/Bot');
var tcp = require('./service')

class Bot extends BaseBot{
    constructor (postData) {
        super(postData);

        this.addLaunchHandler(()=>{
            return {
                outputSpeech : '欢迎进入查询星座系统!'
            };
        });

        this.addIntentHandler('constellation_query', ()=>{
            let date = this.getSlot('sys.date');
            let subject = this.getSlot('query_subject');

            if(!date) {
                this.nlu.ask('sys.date');
                let card = new Bot.Card.TextCard('你的生日是多少呢');

                // 如果有异步操作，可以返回一个promise
                return new Promise(function(resolve, reject){
                    resolve({
                        card : card,
                        outputSpeech : '你的生日是多少呢'
                    });
                });
            }

            if(!subject) {
                let card = new Bot.Card.TextCard('你想查询星座么');
                this.nlu.ask('query_subject');
                return {
                    card : card,
                    outputSpeech : '你想查询星座么'
                };
            }

            if(isDialogStateCompleted()){
                let array = date.split('-');
                let month = array[1];
                let year = array[2];
                let lunardate = LunarDate.GetLunarDay(array[0],array[1], array[2])
                
                function toAstro(cMonth,cDay) {
                    var s   = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
                    var arr = [20,19,21,21,21,22,23,23,23,23,22,22];//1月到12月
                    return s.substr(cMonth*2 - (cDay < arr[cMonth-1] ? 2 : 0),2) + "\u5ea7";//座
                }

                tcp.socket.write('I am Chuck Norris!');

                return {
                    outputSpeech : toAstro(month,year)
                };
            }
        });
        
    }
}

module.exports = Bot;
