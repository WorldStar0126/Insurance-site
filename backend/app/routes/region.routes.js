const { verifySignUp } = require("../middleware");
const controller = require("../controller/region.controller");

const router = require('express').Router();


router.post(
    "/create/region",
    controller.region
);

router.put(
    "/update/region",
    controller.updateregion
);

router.get(
    "/get/regionbyid",
    controller.regionbyid);

router.get(
    "/get/regionlist",
    controller.regionlist);



router.delete(
    "/delete/region",
    controller.regiondelete
);


module.exports = router;
