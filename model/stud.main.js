const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken");

const studSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    number: {
        type: String,
        minlength: 10
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
});

studSchema.methods.generate = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRTE_KEY2);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    } catch (error) {
        res.status(400).json({
            message: "token not generated..",
            status: 400
        })
    }
}

module.exports = mongoose.model("student", studSchema);