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
var nude =["send bin"]
var age
var income
var flag_value
var yojnas = ["yojna","schemes","government schemes","योजनाओं","योजना"]
var yojnamenu = "This are some yojnas:\n" +
    "1.Pradhan Mantri Jeeven Jyoti Bima yojna(PMJ)\n" +
    "2.Atal Pension Yojna(APY)\n" +
    "3.Pradhan Mantri Mudra Yojna(PMMY)\n" +
    "4.Beti bachao beti padhao(BBBP)\n" +
    "5.Deen dayal upadhaya gramjyoti(DDU)"

var pradhanMantriJeevanJyotiBimaYojna =["jeevan jyoti bima","pradhan mantri jeevan bima","जीवन ज्योति बीमा","प्रधान मंत्री जीवन बिमा"]
var pradhanMantriJeevanJyotiBima = "Pradhan Mantri Jeevan Jyoti Bima Yojana is a government-backed Life insurance scheme in India. It was originally mentioned in the 2015 Budget speech by Finance Minister Arun Jaitley in February 2015. It was formally launched by Prime Minister Narendra Modi on 9 May in Kolkata. As of May 2015, only 20% of India's population has any kind of insurance, this scheme aims to increase the number."
var pradhanMantriJeevanJyotiBimaHindi="प्रधान मंत्री जीवन ज्योति बीमा योजना भारत में एक सरकार द्वारा समर्थित जीवन बीमा योजना है। फरवरी 2015 में वित्त मंत्री अरुण जेटली द्वारा 2015 के बजट भाषण में मूल रूप से इसका उल्लेख किया गया था। यह 9 मई को प्रधान मंत्री नरेंद्र मोदी ने औपचारिक रूप से कोलकाता में शुरू किया था। मई 2015 तक, भारत की आबादी में केवल 20% बीमा का कोई भी प्रकार है, इस योजना का लक्ष्य संख्या में वृद्धि करना है।";
var atalPension="Atal Pension Yojana (previously known as Swavalamban Yojana) is a government-backed pension scheme in India targeted at the unorganised sector. It was originally mentioned in the 2015 Budget speech by Finance Minister Arun Jaitley in February 2015. It was formally launched by Prime Minister Narendra Modi on 9 May in Kolkata. As of May 2015, only 11% of India's population has any kind of pension scheme, this scheme aims to increase the number.";
var atalPensionHindi="अटल पेंशन योजना (पहले स्वावलंबन योजना के नाम से जाना जाने वाला) असंगठित क्षेत्र को लक्षित भारत में सरकार द्वारा समर्थित पेंशन योजना है। फरवरी 2015 में वित्त मंत्री अरुण जेटली द्वारा 2015 के बजट भाषण में मूल रूप से इसका उल्लेख किया गया था। यह 9 मई को प्रधान मंत्री नरेंद्र मोदी ने औपचारिक रूप से कोलकाता में शुरू किया था। मई 2015 तक, भारत की आबादी में से केवल 11% की किसी भी तरह की पेंशन योजना है, इस योजना का लक्ष्य संख्या में वृद्धि करना है।";
var atalPensionYojna=["atal pension yojna", "pension yojna","atal pesnion","एटल पेंशन योजना", "पेन्शन योजना", "अताल पेसियन"]
var pradhanMantriMudra="Pradhan Mantri Mudra Yojana under the Micro Units Development and Refinance Agency (MUDRA) Bank is a new institution being set up by Government of India for development and refinancing activities relating to micro units. It was announced by the Finance Minister while presenting the Union Budget for FY 2016. The purpose of MUDRA is to provide funding to the non corporate small business sector. Loans worth about Rs 1 lakh have been sanctioned to small entrepreneurs under the Pradhan Mantri MUDRA Yojana, Prime Minister Narendra Modi said today, emphasising that the government wants youth to be job creators and not job seekers";
var pradhanMantriMudraHindi="माइक्रो यूनिट्स डेवलपमेंट एंड रीफिनेंस एजेंसी (मुड़्रा) बैंक के अंतर्गत प्रधान मंत्री मुद्रा योजना एक नई संस्था है जिसे भारत सरकार ने माइक्रो यूनिट से संबंधित विकास और पुनर्वित्त गतिविधियों के लिए स्थापित किया है। वित्त वर्ष 2016 के लिए केंद्रीय बजट पेश करते हुए वित्त मंत्री ने यह घोषणा की थी। मुड़्रा का उद्देश्य गैर-कॉर्पोरेट लघु व्यवसाय क्षेत्र को वित्तपोषण प्रदान करना है। प्रधान मंत्री मुड़्रा योजना के तहत छोटे उद्यमियों को लगभग 1 लाख रुपये के ऋण की मंजूरी दे दी गई है, प्रधान मंत्री नरेंद्र मोदी ने आज कहा, सरकार को युवाओं को नौकरी बनाने वालों की तलाश करने की आवश्यकता है"
var pradhansaMantriMudraYojna = ["pradhan Mantri Mudra yojana","pmmy","pradhan mantri mudra","प्रधान मंत्री मुद्रा योजना","पम्मी","प्रधान मंत्री मुद्रा"]
var betiBachaoBetiPadhao="Beti Bachao, Beti Padhao (translation: Save girl child, educate a girl child) is a social campaign of the Government of India that aims to generate awareness and improve the efficiency of welfare services intended for girls. The scheme was launched with an initial funding of ₹100 crore (US$16 million). It has been the target of fraudsters in Uttar Pradesh, Haryana, Uttarakhand, Punjab, Bihar and Delhi.";
var betiBachaoBetiPadhaoHindi="बेटी बचाओ, बेटी पढाओ (अनुवाद: लड़की बचाना, लड़की को शिक्षित करना) भारत सरकार का एक सामाजिक अभियान है जिसका लक्ष्य है कि लड़कियों के लिए बनाई गई कल्याण सेवाओं की दक्षता में जागरूकता पैदा करना और सुधार करना। यह योजना ₹ 100 करोड़ (यूएस $ 16 मिलियन) के शुरुआती निधि के साथ शुरू की गई थी। यह उत्तर प्रदेश, हरियाणा, उत्तराखंड, पंजाब, बिहार और दिल्ली में फसलों के लक्ष्य का लक्ष्य रहा है।"
var betiBachaoBetiPadhaoYojna=["Beti Bachao, Beti Padhao","Beti Bachao Beti Padhao","beti bachao","woman empowerment","बेटी बचाओ, बेटी पढ़ाओ","बेटी बचाओ बेटी पढ़ाओ","बेटी बचाओ","वुमन एम्पावरमेंट"]
var deenDayalUpadhayaGramJyotiYojna=["deen dayal upadhayaya gram jyoti","deen dayal yojna","दीन दयाल उपाधयाय ग्राम ज्योति","दीं दयाल योजना"];
var deenDayalUpadhayaGramJyoti="Deen Dayal Upadhyaya Gram Jyoti Yojana (Hindi: दीन दयाल उपाध्याय ग्राम ज्योति योजना, abbr. DDUGJY) is a Government of India scheme designed to provide continuous power supply to rural India. The initiative is named in honor of Indian political philosopher Deen Dayal Upadhyaya. It is one of the key initiatives of the NDA government 2014-2019. The government plans to invest ₹756 billion (US$12 billion) for rural electrification under this scheme. The scheme will replace the existing Rajiv Gandhi Grameen Vidyutikaran Yojana (RGGVY)"
var deenDayalUpadhayaGramJyotiHindi="दीन दयाल उपाध्याय ग्राम ज्योति योजना (हिंदी: दीन दयाल उपाध्याय ग्राम ज्योति योजना, एबीआरआर डीडीयूजीजेवाई) भारत सरकार की योजना है, जो ग्रामीण भारत को निरंतर बिजली आपूर्ति प्रदान करने के लिए डिजाइन की गई है। इस पहल का नाम भारतीय राजनीतिक दार्शनिक दीन दयाल उपाध्याय के सम्मान में रखा गया है।यह एनडीए सरकार 2014-2019 की महत्वपूर्ण पहलों में से एक है।सरकार इस योजना के अंतर्गत ग्रामीण विद्युतीकरण के लिए ₹ 756 बिलियन (12 अरब अमेरिकी डॉलर) निवेश करने की योजना है। यह योजना वर्तमान राजीव गांधी ग्रामीण विद्युतीकरण योजना (आरजीजीवीवाई) को बदल देगी,";
var sukanyaSamriddhiAccountYojana=[""]
var sukanyaSamriddhiAccount= "Sukanya Samriddhi Account (literally Girl Child Prosperity Account) is a Government of India backed saving scheme targeted at the parents of girl children. The scheme encourages parents to build a fund for the future education and marriage expenses for their female child. The scheme was launched by Prime Minister Narendra modi on 22 January 2015 as a part of the Beti Bachao, Beti Padhao campaign. The scheme currently provides an interest rate of 8.3% (for July 2017 to October 2017 ) and tax benefits. The account can be opened at any India Post office or branch of authorised commercial banks";
var sukanyaSamriddhiAccountHindi="सुकन्या समृद्धि खाता भारत सरकार की सहायता वाली एक बचत योजना है, जो कि बच्चों के बच्चों के माता-पिता को लक्षित है। यह योजना माता-पिता को अपनी महिला बच्चे के लिए भविष्य की शिक्षा और शादी के खर्च के लिए एक धन का निर्माण करने के लिए प्रोत्साहित करती है। यह योजना 22 जनवरी 2015 को प्रधान मंत्री नरेन्द्र मोदी द्वारा बेती बचाओ, बेटी पदोह अभियान के एक हिस्से के रूप में शुरू की गई थी। यह योजना वर्तमान में 8.3% की ब्याज दर (जुलाई 2017 से अक्टूबर 2017 तक) और कर लाभ प्रदान करती है। खाता किसी भी भारतीय डाक कार्यालय या अधिकृत वाणिज्यिक बैंकों की शाखा में खोला जा सकता है";


//var menu_no =["0","1","2","3","4","5","6","7","8","9","10"]

var gstmenu = "Type the option character :\n " +
    "A.Transport Related Service\n" +
    "B.Advertisement Space\n" +
    "C.Restaurant without AC\n" +
    "D.Hotel Room less than Rs.2500/Day\n" +
    "E.Transport via rail\n" +
    "F.Construction\n"+
    "G.Bar or Restaurant  with Ac\n" +
    "H.Hotel Room greater than Rs.2500/Day\n" +
    "I.Hotel Room for 5 star and above\n" +
    "J.Events and shows\n"


var total;
var gst;

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

    }else if(inSentence(greets,text)){sendText(sender, "Hi, This is Pradhan Sevak and am here to assist you in the best way possible, say \"MENU\" to know the services I provide")}
    else if(inSentence(replies,text)){sendText(sender,"Thats nice :)")}
    else if(inSentence(questions,text)){sendText(sender,"I am good  B-)")}
    else if(text.includes("gst")){sendText(sender,gstmenu)
    flag_value=true}
    else if(text.includes("income")){sendText(sender,"Enter age")
    flag_value=false}
       // decideIncome(sender,text)}

    else if(inSentence(season,text))
    {sendText(sender, "I like fall")
        sendButtonMessage(sender,"What season do you like?")}
    else if(inSentence(nude,text)){sendText(sender,"This is the most naked form of mine. ;)")
        sendImageMessage(sender)}
    else if(inSentence(menu,text)){sendMenuButton(sender,"Calculator")
    sendMenuButton1(sender,"Services")}
    else  if (!isNaN(text)) {

        if(flag_value)
        {total=text*gst
        sendText(sender,"Total: "+total)}
        else {
            if(text<100)
            {age=text
                sendText(sender,"Enter Income:")
            }
            else{income=text
                if(age<60)
                {   if(income<=250000)
                    sendText(sender,"You need not pay any tax! ;)")
                    if(income>250000 && income<=500000)
                        sendText(sender,"Total:"+income*1.10)
                    if(income>500000 && income<=1000000)
                        sendText(sender,"Total:"+income*1.20)
                    if(income>1000000)
                        sendText(sender,"Total:"+income*1.30)

                }
                else
                {if(income<=250000)
                    sendText(sender,"You need not pay any tax! ;)")
                    if(income>250000 && income<=500000)
                        sendText(sender,"Total:"+income*1.05)
                    if(income>500000 && income<=1000000)
                        sendText(sender,"Total:"+income*1.20)
                    if(income>1000000)
                        sendText(sender,"Total:"+income*1.30)
                }
            }
        }
    }
    else  if(text=="a"){
        gst=1.05
        sendText(sender,"Enter Value :)")
    }
    else if(text=="b"){
        gst=1.05
        sendText(sender,"Enter Value :)")
    } else if(text=="c"){
        gst=1.12
        sendText(sender,"Enter Value :)")
    }else if(text=="d"){
        gst=1.12
        sendText(sender,"Enter Value :)")
    } else if(text=="e"){
        gst=1.12
        sendText(sender,"Enter Value :)")
    }else if(text=="f"){
        gst=1.12
        sendText(sender,"Enter Value :)")
    }else if(text=="g"){
        gst=1.18
        sendText(sender,"Enter Value :)")
    }else if(text=="h"){
        gst=1.18
        sendText(sender,"Enter Value :)")
    }else if(text=="i"){
        gst=1.28
        sendText(sender,"Enter Value :)")
    } else if(text=="j"){
        gst=1.28
        sendText(sender,"Enter Value :)")
    }

    else if(text.includes("what is my name")){sendText(sender,myname)}
    else if(text.includes("scheme")){sendText(sender,yojnamenu)}
    else if(text.includes("pmj")){sendText(sender,pradhanMantriJeevanJyotiBima)}
    else if(text.includes("apj")){sendText(sender,atalPension)}
    else if(text.includes("pmmy")){sendText(sender,pradhanMantriMudra)}
    else if(text.includes("bbbp")){sendText(sender,betiBachaoBetiPadhao)}
    else if(text.includes("ddu")){sendText(sender,deenDayalUpadhayaGramJyoti)}
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
                        "title": "GST calculator",
                        "payload": "gst"
                    },
                    {
                        "type": "postback",
                        "title": "Income Tax",
                        "payload" : "income"
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
                        "title": "Law literacy",
                        "payload": "summer"
                    },
                    {
                        "type": "postback",
                        "title": "Govt Schemes(Yojnas)",
                        "payload" : "schemes"
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