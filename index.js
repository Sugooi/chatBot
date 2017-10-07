const express =require('express');
const bodyparser =require('body-parser');
const app=express();

app.set('port',(process.env.PORT || 5000));

//Allow us to process the data
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//Routes
app.get('/',function (req,res) {
    res.send("Hi I am a chatbot")
    
});

//Facebook
app.get('/webhook/', function (req,res) {
    if(req.query['hub.verify_token']==="adilshaik")
    {res.send(req.query['hub.challenge'])}
    else res.send(287113799)
    
});

app.listen(app.get('port'),function () {
    console.log("running port")
    
});


