const express=require('express')
const app=express();
const cors=require("cors");
const bodyParser=require('body-parser');
const fs=require('node:fs/promises')
const data=require('./data.json');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// console.log(data.balance);
//post
//Deposite
app.post("/deposite",(req,res)=>{
    console.log(req.body.deposite);
    let balanceAmount = Number(data.balance) + Number(req.body.deposite)
    data.balance = balanceAmount;
    fs.writeFile(__dirname + "/data.json", JSON.stringify(data)).then(
        (result) => {
            console.log(result);
            res.redirect("http://127.0.0.1:5500/App/index.html")
        })
 });
 //Withdraw
app.post("/withdraw",(req,res)=>{

    let balanceAmount = Number(data.balance) - Number(req.body.withdraw)
    data.balance = balanceAmount;
    fs.writeFile(__dirname + "/data.json", JSON.stringify(data)).then(
        (result) => {
            console.log(result);
            res.redirect("http://127.0.0.1:5500/App/index.html")
        })
});

// //Route
app.get("/balance",(req,res)=>{
  res.json(data.balance);
});

//listening
app.listen(3000,()=>{
    console.log("server started")
})