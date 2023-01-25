const { verifySignUp, authJwt} = require("../middleware");
const controller = require("../controller/memberpolicy.controller");

/**
 * @swagger
 *  tags:
 *    name: MainMemberController
 *    description: this is main member management for policy
 */
const router = require('express').Router();

/**
 * @swagger
 * /create/memberpolicy:
 *   post:
 *     summary: create policy.
 *     tags: [MainMemberController]
 *     operationId: createPolicy
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                n_policyid:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                c_title:
 *                  type: string
 *                  example: Mr
 *                  enum:
 *                    - Mr
 *                    - Mrs
 *                    - Ms
 *                c_firstname:
 *                  type: string
 *                  example: john
 *                c_lastname:
 *                  type: string
 *                  example: smith
 *                n_gender:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_verificationid:
 *                  type: integer
 *                  format: int32
 *                  example: 2
 *                d_dob:
 *                  type: string
 *                  format: date
 *                  example: 1995-05-18
 *                c_email:
 *                  type: string
 *                  format: email
 *                  example: josh@email.com
 *                c_residence_address:
 *                  type: string
 *                  example: address1
 *                n_residence_region:
 *                  type: integer
 *                  format: int32
 *                  example: 32
 *                n_residence_postalcode:
 *                  type: integer
 *                  format: int32
 *                  example: 28001
 *                c_postal_address:
 *                  type: string
 *                  example: address2
 *                n_postal_region:
 *                  type: integer
 *                  format: int32
 *                  example: 35
 *                n_postal_postalcode:
 *                  type: integer
 *                  format: int32
 *                  example: 56007
 *                n_tel_home:
 *                  type: string
 *                  example: 11352268976
 *                n_tel_work:
 *                  type: string
 *                  example: 11352268976
 *                n_cell:
 *                  type: string
 *                  example: 11352268976
 *                c_kyc_docs:
 *                  type: string
 *                  example: this is key doc
 *                c_comm_mode:
 *                  type: string
 *                  example: common mode
 *                n_paymenttype:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_paymentmethod:
 *                  type: integer
 *                  format: int32
 *                  example: 5
 *                n_paymentstatus:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.post(
    "/create/policy_member",
    controller.createPolicyMember
);

router.put(
    "/update/policy_member",
    [authJwt.verifyToken],
    controller.updatePolicyMember
);

router.get(
    "/get/policy_member",
    [authJwt.verifyToken],
    controller.getPolicyMember
);

router.post(
    '/create/policy_premium',
    [authJwt.verifyToken],
    controller.createPolicyPremium
);

router.get(
    '/get/dependents',
    [authJwt.verifyToken],
    controller.getPolicyDependents
);

router.post(
    '/create/dependents',
    [authJwt.verifyToken],
    controller.createDependents
);

router.post(
    '/create/beneficiaries',
    [authJwt.verifyToken],
    controller.createBeneficiaries
);

module.exports = router;
