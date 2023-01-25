const { authJwt} = require("../middleware");
const controller = require("../controller/auth.controller");

/**
 * @swagger
 *  tags:
 *    name: AuthController
 *    description: this is user authorization part (signup and signin etc)
 */
const router = require('express').Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      SignUpSchema:
 *        type: object
 *        properties:
 *          n_citizentype:
 *            type: integer
 *            format: int32
 *            example: 1
 *          idNumber:
 *            type: string
 *            example: 7894561234567
 *          contact:
 *            type: string
 *            example: 27782807022
 *          emailaddress:
 *            type: string
 *            format: email
 *            example: test@email.com
 *          n_idtype:
 *            type: integer
 *            format: int32
 *            example: 0
 *          passportid:
 *            type: string
 *            example: 12345678
 *          firstname:
 *            type: string
 *            example: john
 *          lastname:
 *            type: string
 *            example: smith
 *          birthday:
 *            type: string
 *            format: date
 *            example: 1978-01-01
 *          gender:
 *            type: string
 *            enum:
 *              - male
 *              - female
 *              - unknown
 *          baptism_file:
 *            type: string
 *            format: binary
 *            example: 1.crt
 *
 *      ResponseSchema:
 *        type: object
 *        properties:
 *          status:
 *            type: boolean
 *          message:
 *            type: string
 *            example: user signup successfully.
 *          data:
 *            type: object
 *
 *
 *
 */


/**
 * @swagger
 * /auth/verifyid:
 *   post:
 *     summary: Verify user id for user sign up.
 *     tags: [AuthController]
 *     operationId: verifyid
 *     requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: '#/components/schemas/SignUpSchema'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.post('/verifyid', controller.verifyid);

/**
 * @swagger
 * /auth/verifyOTP:
 *   post:
 *     summary: Verify OTP for sign up.
 *     tags: [AuthController]
 *     operationId: verifyOTP
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                idNumber:
 *                  type: string
 *                  example: 12344566
 *                contact:
 *                  type: string
 *                  example: 34254534343
 *                otp:
 *                  type: integer
 *                  format: int32
 *                  example: 4168
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.post('/verifyOTP', controller.verifyOTP);


/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: User sign in to site.
 *     tags: [AuthController]
 *     operationId: signinUser
 *     parameters:
 *       - name: emailOrPhone
 *         in: query
 *         description: Then email or phone of user for signin
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: query
 *         description: The password for login in clear text
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.post('/signin', controller.signin);


/**
 * @swagger
 * /auth/signout:
 *   get:
 *     summary: User sign out from site.
 *     tags: [AuthController]
 *     operationId: signoutUser
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.get('/signout', controller.signout);


/**
 * @swagger
 * /auth/forgot_password:
 *   post:
 *     summary: When user forgot password, sent email for reset password.
 *     tags: [AuthController]
 *     operationId: forgotPassword
 *     parameters:
 *       - name: email
 *         in: query
 *         description: Then email of user who forgot password
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
router.post('/forgot_password', controller.forgotPassword);

/**
 * @swagger
 * /auth/reset_password:
 *   post:
 *     summary: User reset password when forgot it.
 *     tags: [AuthController]
 *     operationId: resetPassword
 *     parameters:
 *       - name: token
 *         in: header
 *         description: The token for reset password
 *         required: true
 *         schema:
 *           type: string
 *       - name: email
 *         in: query
 *         description: The email of user who reset password
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: query
 *         description: The new password of user who reset password
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 *       - name: confirm
 *         in: query
 *         description: The email of confirm password who reset password
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.post('/reset_password', controller.resetPassword);


/**
 * @swagger
 * /auth/change_password:
 *   post:
 *     summary: User change password.
 *     tags: [AuthController]
 *     operationId: changePassword
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: The jwt token
 *         required: true
 *         schema:
 *           type: string
 *       - name: old_password
 *         in: query
 *         description: The old password of user
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 *       - name: new_password
 *         in: query
 *         description: The new password of user
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 *       - name: confirm
 *         in: query
 *         description: The confirm password
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.post('/change_password', [authJwt.verifyToken], controller.changePassword);

router.post('/resend_otp', controller.resendOTP);

router.post('/set_password', controller.setPassword);

module.exports = router;



