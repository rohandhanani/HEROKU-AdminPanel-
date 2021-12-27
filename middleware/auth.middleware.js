const jwt = require("jsonwebtoken");
const admin = require("../model/auth.main");

const middleSchema = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyAdmin = jwt.verify(token, process.env.SECRET_KEY);
        const adminUser = await admin.findOne({ _id: verifyAdmin._id });

        req.token = token;
        req.adminUser = adminUser;
        next();
    } catch (error) {
        res.status(400).json({
            message: "dat not match..",
            status:400
        })
    }
};

module.exports = middleSchema;