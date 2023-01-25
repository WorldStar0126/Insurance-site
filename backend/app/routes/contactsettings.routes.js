const { verifySignUp } = require("../middleware");
const controller = require("../controller/settings.controller");
const { authJwt} = require("../middleware");

const router = require('express').Router();

router.post(
    "/api/contactsettings",
    controller.updatecontactinfo
);

router.post(
    "/api/csettingsbyid",
    controller.csettingsbyid
);

module.exports = router;

