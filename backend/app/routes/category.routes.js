const { verifySignUp } = require("../middleware");
const controller = require("../controller/category.controller");

const router = require('express').Router();

router.post(
    "/create/category",
    controller.category
);

router.put(
    "/update/category",
    controller.updatecategory
);

router.get(
    "/get/categorybyid",
    controller.categorybyid);

router.get(
    "/get/categorylist",
    controller.categorylist);

router.delete(
    "/delete/category",
    controller.categorydelete
);

module.exports = router;