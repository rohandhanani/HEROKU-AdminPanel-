const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECT_KEY)
    .then(() => {
        console.log("Connection successfully...");
    }).catch((err) => {
        console.log(err);
    })
