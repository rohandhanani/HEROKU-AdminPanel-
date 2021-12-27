const admin = require("../model/auth.main");
const studMain = require("../model/stud.main");
const jwt = require("jsonwebtoken");

// admin login
exports.adminLogin = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const login = await admin.findOne({ username });

        if (username == login.username && password == login.password) {
            if (!login.tokens[0]) {
                const token = await login.generate();
            }
            res.cookie("jwt", login.tokens[0].token);
            res.status(200).json({
                message: "login successfully...",
                status: 200
            })
        } else {
            res.status(400).json({
                message: "please enter proper admin detail...",
                status: 400
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "admin not login..",
            status: 400
        })
    }
};

// admin logout
exports.adminLogout = async (req, res) => {
    try {
        req.adminUser.tokens = req.adminUser.tokens.filter((currele) => {
            return currele.token != req.token;
        });

        res.clearCookie("jwt");
        await req.adminUser.save();
        res.status(201).json({
            message: "Logout Successfully",
            status: 201,
        });
    } catch (error) {
        res.status(400).json({
            message: "admin not logout..",
            status: 400
        })
    }
};

// admin can view all student data
exports.viewStud = async (req, res) => {
    try {
        const viewData = await studMain.find();
        res.status(200).json({
            message: "record not display",
            status: 200,
            data: viewData
        });
    } catch (error) {
        res.status(400).json({
            message: "record not display",
            status: 400
        });
    }
};

// admin can insert all student data
exports.insertStud = async (req, res) => {
    try {
        const insertData = new studMain(req.body);
        await insertData.save();
        res.status(200).json({
            message: "record insert",
            status: 200,
            data: insertData
        })
    } catch (error) {
        res.status(400).json({
            message: "record not insert",
            status: 400
        });
    }
};

// admin can delete all student data
exports.deleteStud = async (req, res) => {
    try {
        const name = req.body.name;
        const deleteData = await studMain.findOne({ name })

        if (name == deleteData.name) {
            deleteData.remove()
        }
        res.status(200).json({
            message: "record deleted",
            status: 200
        })
    } catch (error) {
        res.status(400).json({
            message: "record not deleted..",
            status: 400
        });
    }
};

// admin can update all student data
exports.updateStud = async (req, res) => {
    try {
        const _id = req.params.id;
        const updateData = await studMain.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json({
            message: "record updated",
            status: 200,
            data: updateData,
        })
    } catch (error) {
        res.status(400).json({
            message: "record not updated..",
            status: 400
        });
    }
}