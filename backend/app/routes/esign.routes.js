const { verifySignUp } = require("../middleware");
const controller = require("../controller/esign.controller");
const { authJwt} = require("../middleware");
const {route} = require("express/lib/router");

const router = require('express').Router();

route.post(
    "/uploadsign",
    [authJwt.verifyToken],
    controller.uploadsign
);

route.post(
    "/generateDocfield",
    [authJwt.verifyToken],
    controller.generateDocfield
);

module.exports = router;
