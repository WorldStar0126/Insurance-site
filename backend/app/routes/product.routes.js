const { verifySignUp } = require("../middleware");
const controller = require("../controller/product.controller");

const router = require('express').Router();


router.post(
    "/create/product",
    controller.product
);

router.put(
    "/update/product",
    controller.updateproduct
);

router.get(
    "/get/productbyid",
    controller.productbyid);

router.get(
    "/get/productlist",
    controller.productlist);

router.delete(
    "/delete/product",
    controller.productdelete
);

router.get(
    "/get/productlistview",
    controller.productlistview);

router.post(
    "/get/productfilters",
    controller.productfilters);

module.exports = router;