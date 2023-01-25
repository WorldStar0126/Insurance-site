const { authJwt,verifySignUp } = require("../middleware");
const controller = require("../controller/customquery.controller");

const router = require('express').Router();


router.get(
    "/custom/dashganttchart",
    controller.ganttChart
);

router.get(
    "/custom/selectall",
    controller.selectall
);

router.get(
    "/custom/updatebyid",
    controller.updatebyid
);

router.get(
    "/custom/callsp",
    controller.callsp
);

module.exports = router;