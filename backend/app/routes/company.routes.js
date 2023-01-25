const { verifySignUp } = require("../middleware");
const controller = require("../controller/company.controller");


const router = require('express').Router();

router.post(
    "/create/company",
    controller.company
);

router.put(
    "/update/company",
    controller.updatecompany
);

router.get(
    "/get/companybyid",
    controller.companybyid);

router.get(
    "/get/companylist",
    controller.companylist);

router.delete(
    "/delete/company",
    controller.companydelete
);

module.exports = router;