'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
    res.send("Hi I am a chatbot")
})

let token = "EAAVNZAct3G3ABAO8GUURmRH5n7MhCtgRot1uZBBr2SG9IWu3m1Ga7ZBNybkp4zNQsgDCkilPaHkRBVfrtKVg2an5XEFskAhO8kVHAhoUWUhhC3eTTqLowkC9tqA5KbAwuDr94iXsyZBmPLvihHtytA5yFlmZBVcA1Lr0GhboBMsWdlTRiZCt4C"

// Facebook

app.get('/webhook/', function(req, res) {
    if (req.query['hub.verify_token'] === "adilshaik") {
        res.send(req.query['hub.challenge'])
    }
    res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = messaging_events[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            decideMessage(sender, text)
            //sendText(sender, "Text echo: " + text.substring(0, 100))
        }
        if(event.postback){
        let text = JSON.stringify(event.postback)
            decideMessage(sender, text)
            continue
        }
    }
    res.sendStatus(200)
})

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle)
            return true;
    }
    return false;
}

function decideMessage(sender, text1) {

    var greets=["hi","hello","hey"]

    let text= text1.toLowerCase()
    if(text.includes("summer")){

    }
    else if (text.includes("winter")){

    }else if(inArray(text,greets)){sendText(sender, "Hi, How are you?")}
    else if(text.includes('good'||'fine'||'nice')){sendText(sender,"Thats nice :)")}

    else
    {sendText(sender, "I like fall")
    sendButtonMessage(sender,"What season do you like?" +
        "")}
}

function sendText(sender, text) {
    let messageData = {text: text}
    sendRequest(sender,messageData)
}

function sendButtonMessage(sender, text) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": text,
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Summer",
                        "payload": "summer"
                    },
                    {
                        "type": "postback",
                        "title": "Winter",
                        "payload" : "winter"
                    },

                ]
            }
        }
    }
    sendRequest(sender,messageData)
    
}



function sendRequest(sender, messageData) {
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs : {access_token: token},
        method: "POST",
        json: {
            recipient: {id: sender},
            message : messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log("sending error")
        } else if (response.body.error) {
            console.log("response body error")
        }
    })
}

app.listen(app.get('port'), function() {
    console.log("running: port")
})