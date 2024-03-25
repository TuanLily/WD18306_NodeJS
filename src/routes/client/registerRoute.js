const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/client/register.controller");


router.get("/register", (req, res) => {
    registerController.renderRegisterPage(req, res, "register");
});

router.post("/api/register", registerController.addNewUser);


module.exports = router;
