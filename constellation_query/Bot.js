
var BaseBot = require('./../lib/Bot');
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的


console.log('Server listening on ' + HOST +':'+ PORT);

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

            if(data&&subject){
                let array = date.split('-');
                let month = array[1];
                let year = array[2];
                
                function toAstro(cMonth,cDay) {
                    var s   = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
                    var arr = [20,19,21,21,21,22,23,23,23,23,22,22];//1月到12月
                    return s.substr(cMonth*2 - (cDay < arr[cMonth-1] ? 2 : 0),2) + "\u5ea7";//座
                }

                net.createServer(function(sock) {

                    // 我们获得一个连接 - 该连接自动关联一个socket对象
                    console.log('CONNECTED: ' +
                        sock.remoteAddress + ':' + sock.remotePort);

                    // 为这个socket实例添加一个"data"事件处理函数
                    sock.on('data', function(data) {
                        console.log('DATA ' + sock.remoteAddress + ': ' + data);
                        // 回发该数据，客户端将收到来自服务端的数据
                        sock.write('You said "' + data + '"');
                    });

                    // 为这个socket实例添加一个"close"事件处理函数
                    sock.on('close', function(data) {
                        console.log('CLOSED: ' +
                            sock.remoteAddress + ' ' + sock.remotePort);
                    });

                }).listen(PORT, HOST);

                console.log('Server listening on ' + HOST +':'+ PORT);

                return {
                    outputSpeech : toAstro(month,year)
                };
            }
        });
        
    }
}

module.exports = Bot;
