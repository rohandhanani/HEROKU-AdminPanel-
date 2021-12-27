const router = require("express").Router();
const auth = require("../middleware/stud.middleware");

const {
    studRegister,
    studLogin,
    studLogout,
} = require("../controller/stud.controller");

router.post("/register", studRegister);
router.post("/login", studLogin);
router.get("/logout", auth, studLogout);

module.exports = router;