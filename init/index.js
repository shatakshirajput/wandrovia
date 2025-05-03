const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing =require("../models/listing.js");

main()
    .then(() => {
        console.log("Connection successfull")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wandurlust');
};

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({
        ...obj,owner:"6815b4b6030cdeb381facd11"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
};

initDB();