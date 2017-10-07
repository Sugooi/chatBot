const express =require('express');
const bodyparser =require('body-parser');
const request = require("request");
const app=express();

app.set('port',(process.env.PORT || 5000));

//Allow us to process the data
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//Routes
app.get('/',function (req,res) {
    res.send("Hi I am a chatbot")
    
});

let token = "EAAVNZAct3G3ABAO8GUURmRH5n7MhCtgRot1uZBBr2SG9IWu3m1Ga7ZBNybkp4zNQsgDCkilPaHkRBVfrtKVg2an5XEFskAhO8kVHAhoUWUhhC3eTTqLowkC9tqA5KbAwuDr94iXsyZBmPLvihHtytA5yFlmZBVcA1Lr0GhboBMsWdlTRiZCt4C";
//Facebook
app.get('/webhook/', function (req,res) {
    if(req.query['hub.verify_token']==="adilshaik")
    {res.send(req.query['hub.challenge'])}
    else res.send("Wrong Token")
    
});
app.post('/webhook/',function (req,res) {
   let messaging_events = req.body.entry[0].messaging;
   for (let i =0;i<messaging_events.length;i ++){
       let event = messaging_events.length[i];
       let sender = event.sender.id;
       if(event.message && event.message.text){
           let text = event.message.text;
           sendText(sender, "Text echo: " +text.substring(0,100));
       }
   }
   res.sendStatus(200)
});

function sendText(sender,text) {
    let messageData = {text:text};
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs :{access_token : token},
        method:"POST",
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if(error) {
            console.log("sending error")
        }else if (response.body.error){
            console.log("response body error")
        }

    }
    )
    
}

app.listen(app.get('port'),function () {
    console.log("running port")
    
});


