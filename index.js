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

let token = "EAAVNZAct3G3ABAHcMa6FV2nNl4SYSTXtxuAFGuiQD4QObN49mqM5wZAbfQUFPzTZCIGL1a25y9Juf0qp2jPT7OiepCZBkIYFHcmZB4GjJ4LSjYQufONsWTp79rcigeWVsIPuL931YGQ2nZBh1F5hIa4hKGUZAgUldbQFXlVQnZBaxiVfqXkl4TAb"
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

    var greets=["hi","hello","hey","salam"]
    var replies =["good","fine","bad","shit","nice"]
    var questions =["how are you?","are you"]
    var season =["season"]
    var nude =["nudes","nude","naked"]

    let text= text1.toLowerCase()
    if(text.includes("summer")){

    }
    else if (text.includes("winter")){

    }else if(inArray(text,greets)){sendText(sender, "Hi, How are you?")}
    else if(inArray(text,replies)){sendText(sender,"Thats nice :)")}
    else if(inArray(text,questions)){sendText(sender,"I am good  B-)")}

    else if(inArray(text,season))
    {sendText(sender, "I like fall")
    sendButtonMessage(sender,"What season do you like?" +
        "")}
    else if(inArray(text,nude)){sendImageMessage(sender)}
    else {sendText(sender, "Wow, you just said \"" + text.substring(0, 100)+"\"")
    }
}

function sendText(sender, text) {
    let messageData = {text: text}
    sendRequest(sender,messageData)
}

function sendImageMessage(sender, text) {
    let messageData = {
        "attachment":{
            "type":"image",
            "payload":{
                "url":"https://ak4.picdn.net/shutterstock/videos/18451504/thumb/1.jpg"
            }
        }
    }
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