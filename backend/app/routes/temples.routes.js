const { verifySignUp } = require("../middleware");
const controller = require("../controller/temples.controller");

const router = require('express').Router();

router.post(
    "/create/temples",
    controller.temples
);

router.put(
    "/update/temples",
    controller.updatetemples
);

router.get(
    "/get/templesbyid",
    controller.templesbyid);

router.get(
    "/get/templeslist",
    controller.templeslist);

router.get(
    "/get/templeslistview",
    controller.templeslistview);


router.delete(
    "/delete/temples",
    controller.templedelete
);



  router.get(
    "/get/templesbycircuit",
   controller.templeslistbycircuitid);

module.exports = router;
