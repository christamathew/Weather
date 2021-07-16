const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
   
});
app.post("/", function(req, res){
    const city=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=4e94a260e4e170fcc49a26c3225decb0";
    https.get(url, function(response){
    response.on("data", function(data){
        const w_data=JSON.parse(data);
        console.log(w_data);
        const pressure=w_data.main.pressure;
        const temp=w_data.main.temp;
        const icon=w_data.weather[0].icon;
        const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        console.log(pressure);
        res.write("<h1>The pressure in "+city+" is "+pressure+"<h1>");
        res.write("<h2>The temperature in "+city+" is "+temp+"<h2>");
        res.write("<img src="+imgurl+">");
        res.send();
    });
    
});
   
});
app.listen(3000,function(){
    console.log("started");
});