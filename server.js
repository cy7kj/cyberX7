const express=require("express");
const fetch=require("node-fetch");
const app=express();

const API_KEY="PUT_YOUR_API_KEY";

app.use(express.json());
app.use(express.static(__dirname));

app.post("/scan",async(req,res)=>{
const url=req.body.url;

const scan=await fetch("https://www.virustotal.com/api/v3/urls",{
method:"POST",
headers:{
"x-apikey":API_KEY,
"Content-Type":"application/x-www-form-urlencoded"
},
body:`url=${encodeURIComponent(url)}`
});

const data=await scan.json();
const id=data.data.id;

setTimeout(async()=>{
const result=await fetch(`https://www.virustotal.com/api/v3/analyses/${id}`,{
headers:{"x-apikey":API_KEY}
});
const final=await result.json();
res.json(final);
},3000);

});

app.listen(3000,()=>console.log("Running"));
