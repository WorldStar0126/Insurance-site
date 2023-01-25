const { verifySignUp } = require("../middleware");
const controller = require("../controller/other.controller");


/**
 * @swagger
 *  tags:
 *    name: OtherController
 *    description: this is get other some data list (id type list and pay schedule list)
 */
const router = require('express').Router();


/**
 * @swagger
 * /get/idtypelist:
 *   get:
 *     summary: get id type list
 *     tags: [OtherController]
 *     operationId: idTypeList
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.get("/get/idtypelist", controller.idtypelist);


/**
 * @swagger
 * /get/payschedulelist:
 *   get:
 *     summary: get schedule list
 *     tags: [OtherController]
 *     operationId: getScheduleList
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.get("/get/payschedulelist", controller.payschedulelist);

module.exports = router;
