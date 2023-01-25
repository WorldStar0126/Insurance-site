const { verifySignUp } = require("../middleware");
const controller = require("../controller/subcategory.controller");

const router = require('express').Router();


router.post(
    "/create/subcat",
    controller.subcat
);

router.put(
    "/update/subcat",
    controller.updatesubcat
);

router.get(
    "/get/subcatbyid",
    controller.subcatbyid);

router.get(
    "/get/subcatlist",
    controller.subcatlist);


router.delete(
    "/delete/subcat",
    controller.subcatdelete
);

router.get(
    "/get/subcatlistview",
    controller.subcatlistview);


module.exports = router;

