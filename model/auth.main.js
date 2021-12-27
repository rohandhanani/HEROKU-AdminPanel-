const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
});

adminSchema.methods.generate = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    } catch (error) {
        res.status(400).json({
            message: "token not generated..",
            status: 400
        })
    }
}

module.exports = mongoose.model("adminData", adminSchema);
