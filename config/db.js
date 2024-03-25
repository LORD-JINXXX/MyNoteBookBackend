const mongoose = require("mongoose");
const username = encodeURIComponent(process.env.USER_NAME);
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = process.env.CLUSTER_NAME;
const db_name = process.env.DATABASE_NAME;

let uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${db_name}?retryWrites=true&w=majority`;

//const client = new mongoose(uri);

const connectDB = async()=>{
    const connect = mongoose.connect(uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });    
};

module.exports = connectDB;