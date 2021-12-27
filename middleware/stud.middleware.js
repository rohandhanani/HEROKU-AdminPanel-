const studMain = require("../model/stud.main");
const jwt = require("jsonwebtoken");

const middleSchema = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyStud = jwt.verify(token, process.env.SECRTE_KEY2);
        const studUser = await studMain.findOne({ _id: verifyStud._id });

        req.token = token;
        req.studUser = studUser;
        next();
    } catch (error) {
        res.status(400).json({
            message: "dat not match..",
            status: 400
        })
    }
};

module.exports = middleSchema;