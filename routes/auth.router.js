const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

const {
    adminLogin,
    adminLogout,
    viewStud,
    insertStud,
    deleteStud,
    updateStud,
} = require("../controller/auth.controller");

router.post("/login", adminLogin);
router.get("/logout", auth, adminLogout);
router.get("/view", viewStud);
router.post("/insert", insertStud);
router.delete("/delete", deleteStud);
router.patch("/update/:id", updateStud);

module.exports = router;