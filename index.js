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

var greets=["hi","hello","hey","salam"]
var replies =["good","fine","bad","shit","nice"]
var questions =["how are you?","are you"]
var season =["season"]
var seasons=["summer"]
var menu=["menu"]
var bin =["send bin"]


let token = "EAAVNZAct3G3ABAG6l7r0v8jZAi0WzADnvXnlhWA9ZC1stZAxljP54ua4k4uDZCdUfDDQteNlayAL9VwjRHrJpoFZBj15AqiEKqJKCLRXMlYKu7xrpOg1mGZBJZCpqXFSSKoRN3ZACmz0IdSGwqo2cPzpsbJJ5nejcKSZA5STUld80JTy9Age3lUZCgS"
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

function inSentence(prompt,intent) {
    for (var i=0;i<=prompt.length;i++)
    {if(intent.includes(prompt[i]))
        return true
    }
        return false
}


function decideMessage(sender, text1) {


    let text= text1.toLowerCase()
    if(inSentence(seasons,text)){
        sendText(sender,"summmmmmmmmer!")
    }
    else if (text.includes("winter")){

    }else if(inSentence(greets,text)){sendText(sender, "Hi, This is Pradhan Sevak and am here to assist you in the best way possible, say menu to know the services I provide")}
    else if(inSentence(replies,text)){sendText(sender,"Thats nice :)")}
    else if(inSentence(questions,text)){sendText(sender,"I am good  B-)")}

    else if(inSentence(season,text))
    {sendText(sender, "I like fall")
        sendButtonMessage(sender,"What season do you like?")}
    else if(inSentence(bin,text)){sendText(sender,"This is the most form of mine. ;)")
        sendImageMessage(sender)}
    else if(inSentence(menu,text)){sendMenuButton(sender,"Menu:")
    sendMenuButton1(sender,"AND")}

    else {sendText(sender, "Wow, you just said \"" + text.substring(0, 100)+"\"")
    }
}

function sendText(sender, text) {
    let messageData = {text: text}
    sendRequest(sender,messageData)
}

function sendImageMessage(sender) {
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
function sendMenuButton(sender, text) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": text,
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Tax calculator",
                        "payload": "Tax calculator"
                    },
                    {
                        "type": "postback",
                        "title": "Income tax info",
                        "payload" : "Income tax info"
                    },

                ]
            }
        }
    }
    sendRequest(sender,messageData)

}


function sendMenuButton1(sender,text) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": text,

                "buttons": [
                    {
                        "type": "postback",
                        "title": "Govt yojnas",
                        "payload": "Govt yojnas"
                    },
                    {
                        "type": "postback",
                        "title": "Know criminal laws",
                        "payload" : "Know criminal laws"
                    },

                ]
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