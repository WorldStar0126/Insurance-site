const { verifySignUp } = require("../middleware");
const controller = require("../controller/circuits.controller");

const router = require('express').Router();

router.post(
    "/create/circuits",
    controller.circuits
);

router.put(
    "/update/circuits",
    controller.updatecircuits
);

router.get(
    "/get/circuitsbyid",
    controller.circuitsbyid);

 router.get(
    "/get/circuitsbyregion",
   controller.circuitslistbyregionid);


router.get(
    "/get/circuitslist",
    controller.circuitslist);

router.get(
    "/get/circuitslistview",
    controller.circuitslistview);


router.delete(
    "/delete/circuits",
    controller.circuitsdelete
);

module.exports = router;