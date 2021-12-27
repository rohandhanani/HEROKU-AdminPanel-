const studMain = require("../model/stud.main");
const nodemailer = require("nodemailer");


//student register
exports.studRegister = async (req, res) => {
    try {
        const studData = new studMain(req.body);
        await studData.save();
        res.status(200).json({
            message: "data saved",
            status: 200,
            data: studData
        })
    } catch (error) {
        res.status(400).json({
            message: "data not save..",
            status: 400
        })
    }
}

//student login
exports.studLogin = async (req, res) => {
    try {
        email = req.body.email;
        number = req.body.number;

        const login = await studMain.findOne({ email });

        if (!login.tokens[0]) {
            const token = await login.generate();
        }
        res.cookie("jwt", login.tokens[0].token)
        if (email == login.email && number == login.number) {
            res.status(200).json({
                message: "student successfully login...",
                status: 200
            })
        } else {
            res.status(400).json({
                message: "please enter proper detail.. for login..",
                status: 400
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "studend not login..",
            status: 400
        })
    }
};

//student logout
exports.studLogout = async (req, res) => {
    try {
        req.studUser.tokens = req.studUser.tokens.filter((currele) => {
            return currele.token != req.token;
        })

        res.clearCookie("jwt");
        await req.studUser.save();
        res.status(200).json({
            message: "Logout Successfully",
            status: 200,
        });
    } catch (error) {
        res.status(400).json({
            message: "studend not logout..",
            status: 400
        })
    }
}