
var BaseBot = require('./../lib/Bot');

class Bot extends BaseBot{
    constructor (postData) {
        super(postData);

        this.addLaunchHandler(()=>{
            return {
                outputSpeech : '欢迎查询星座!'
            };
        });

        this.addIntentHandler('constellation_query', ()=>{
            // let loc = this.getSlot('location');    
            // let monthlySalary = this.getSlot('monthlysalary');
            let date = this.getSlot('sys.date');
            let subject = this.getSlot('query_subject');

            if(!date) {
                this.nlu.ask('date');
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
                this.nlu.ask('location');
                return {
                    card : card,
                    outputSpeech : '你想查询星座么'
                };
            }

            if(date&&subject){
                return {
                    outputSpeech : '水瓶座'
                };
            }
        });
    }
}

module.exports = Bot;
