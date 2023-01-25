const { authJwt,verifySignUp } = require("../middleware");
const controller = require("../controller/user.controller");


/**
 * @swagger
 *  tags:
 *    name: UserController
 *    description: this is user manage part
 */
const router = require('express').Router();


/**
 * @swagger
 * /create/credentials:
 *   post:
 *     summary: Create user credentials.
 *     tags: [UserController]
 *     operationId: createCredentials
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: 12344566
 *                n_utype:
 *                  type: integer
 *                  example: 1
 *                password:
 *                  type: string
 *                  example: 123456
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.post("/create/credentials",
    [authJwt.verifyToken],
    controller.createCredentials);


router.put(
    "/update/credentials",
    [authJwt.verifyToken],
    controller.updateCredentials
);

router.put("/update/useraddress",
    [authJwt.verifyToken],
    controller.updateUserAddress)

/**
 * @swagger
 * /get/credentialsbyid:
 *   get:
 *     summary: get user credentials by id.
 *     tags: [UserController]
 *     operationId: credentialsById
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: The jwt token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.get(
    "/get/credentialsbyid",
    [authJwt.verifyToken],
    controller.credentialsById);

router.get(
    "/get/credentialslist",
    [authJwt.verifyToken],
    controller.credentialsList);

module.exports = router;


