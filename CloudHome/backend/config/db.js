const mongoose = require("mongoose");

const uri = "mongodb+srv://<username>:<password>@cluster0.if3x5v3.mongodb.net/<dbName>?appName=Cluster0";
let dbURL =uri;
dbURL = dbURL.replace("<username>",process.env.DB_USERNAME);
dbURL = dbURL.replace("<password>",process.env.DB_PASSWORD);
dbURL = dbURL.replace("<dbName>",process.env.DB_NAME);

mongoose.connect(dbURL).then(()=>{
    console.log("----------DB connected----------");
})
.catch((err)=>{
    console.log("DB connect failed:\n");
    console.log(err);
})