const {verifySignUp} = require("../middleware");
const controller = require("../controller/policy.controller");


/**
 * @swagger
 *  tags:
 *    name: PolicyController
 *    description: this is policy management part
 */
const router = require('express').Router();



/**
 * @swagger
 *  components:
 *    schemas:
 *      PremiumOptionSchema:
 *        type: object
 *        properties:
 *          n_planfor:
 *            type: integer
 *            format: int32
 *            example: 1
 *          n_minage:
 *            type: integer
 *            format: int32
 *            example: 18
 *          n_maxage:
 *            type: integer
 *            format: int32
 *            example: 56
 *          n_premiumamount:
 *            type: integer
 *            format: int32
 *            example: 30
 *
 *      PolicyOptionSchema:
 *        type: object
 *        properties:
 *          n_coveramountid:
 *            type: integer
 *            format: int32
 *            example: 8
 *          premiumoptions:
 *            $ref: '#/components/schemas/PremiumOptionSchema'
 *
 */

/**
 * @swagger
 * /create/policy:
 *   post:
 *     summary: create policy.
 *     tags: [PolicyController]
 *     operationId: createPolicy
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                c_policyname:
 *                  type: string
 *                  example: policy1
 *                n_prodid:
 *                  type: integer
 *                  format: int32
 *                  example: 12
 *                n_payschedule:
 *                  type: integer
 *                  format: int32
 *                  example: 25
 *                n_mainmemberage:
 *                  type: integer
 *                  format: int32
 *                  example: 45
 *                is_active:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                c_termsncondtions:
 *                  type: string
 *                  format: int32
 *                  example: this is terms and condition
 *                policyoptions:
 *                   $ref: '#/components/schemas/PolicyOptionSchema'
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
    "/create/policy",
    controller.policy);



/**
 * @swagger
 * /update/policy:
 *   put:
 *     summary: update policy.
 *     tags: [PolicyController]
 *     operationId: updatePolicy
 *     parameters:
 *        - name: id
 *          in: query
 *          description: this is policy id for update
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                c_policyname:
 *                  type: string
 *                  example: policy1
 *                n_prodid:
 *                  type: integer
 *                  format: int32
 *                  example: 12
 *                n_payschedule:
 *                  type: integer
 *                  format: int32
 *                  example: 25
 *                n_mainmemberage:
 *                  type: integer
 *                  format: int32
 *                  example: 45
 *                is_active:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                c_termsncondtions:
 *                  type: string
 *                  format: int32
 *                  example: this is terms and condition
 *                policyoptions:
 *                   $ref: '#/components/schemas/PolicyOptionSchema'
 *
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.put(
    "/update/policy",
    controller.updatepolicy);



/**
 * @swagger
 * /get/policybyid:
 *   get:
 *     summary: get policy data by id.
 *     tags: [PolicyController]
 *     operationId: getPolicyById
 *     parameters:
 *        - name: id
 *          in: query
 *          description: this is policy id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.get(
    "/get/policybyid",
    controller.policybyid);


/**
 * @swagger
 * /get/policylist:
 *   get:
 *     summary: get policy list.
 *     tags: [PolicyController]
 *     operationId: getPolicyList
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.get(
    "/get/policylist",
    controller.policylist);


/**
 * @swagger
 * /get/policylistview:
 *   get:
 *     summary: get policy list view.
 *     tags: [PolicyController]
 *     operationId: getPolicyListView
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.get(
    "/get/policylistview",
    controller.policylistview);

/**
 * @swagger
 * /create/premiumoptions:
 *   post:
 *     summary: create premium options.
 *     tags: [PolicyController]
 *     operationId: createPremiumOptions
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                n_policyid:
 *                  type: integer
 *                  format: int32
 *                  example: 7
 *                n_coveramountid:
 *                  type: integer
 *                  format: int32
 *                  example: 9
 *                n_planfor:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_minage:
 *                  type: integer
 *                  format: int32
 *                  example: 18
 *                n_maxage:
 *                  type: integer
 *                  format: int32
 *                  example: 56
 *                n_premiumamount:
 *                  type: integer
 *                  format: int32
 *                  example: 30
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.post(
    "/create/premiumoptions",
    controller.premiumoptions
);


/**
 * @swagger
 * /get/membertypelist:
 *   get:
 *     summary: get member type list.
 *     tags: [PolicyController]
 *     operationId: getMemberTypeList
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.get(
    "/get/membertypelist",
    controller.membertypelist);


/**
 * @swagger
 * /get/covertypelist:
 *   get:
 *     summary: get cover type list.
 *     tags: [PolicyController]
 *     operationId: getCoverTypeList
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.get(
    "/get/covertypelist",
    controller.covertypelist);



/**
 * @swagger
 * /create/coveramount:
 *   post:
 *     summary: create cover amount.
 *     tags: [PolicyController]
 *     operationId: createCoverAmount
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                n_coveramount:
 *                  type: integer
 *                  format: int32
 *                  example: 32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.post(
    "/create/coveramount",
    controller.coveramount
);


/**
 * @swagger
 * /create/covertype:
 *   post:
 *     summary: create cover type.
 *     tags: [PolicyController]
 *     operationId: createCoverType
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                c_covertype:
 *                  type: string
 *                  example: cover type
 *                n_member_type:
 *                  type: string
 *                  example: 1,2,3
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.post(
    "/create/covertype",
    controller.covertype
);


/**
 * @swagger
 * /create/mmage:
 *   post:
 *     summary: get min and max age.
 *     tags: [PolicyController]
 *     operationId: mmAge
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                n_minage:
 *                  type: integer
 *                  format: int32
 *                  example: 15
 *                n_maxage:
 *                  type: integer
 *                  format: int32
 *                  example: 64
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.post(
    "/create/mmage",
    controller.mmage
);



/**
 * @swagger
 * /update/covertype:
 *   put:
 *     summary: update cover type.
 *     tags: [PolicyController]
 *     operationId: updateCoverType
 *     parameters:
 *        - name: id
 *          in: query
 *          description: this is cover type id for update
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                c_covertype:
 *                  type: string
 *                  example: cover type
 *                n_member_type:
 *                  type: string
 *                  example: 1,2,3
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.put(
    "/update/covertype",
    controller.updatecovertype
);


/**
 * @swagger
 * /delete/covertype:
 *   delete:
 *     summary: delete cover type.
 *     tags: [PolicyController]
 *     operationId: deleteCoverType
 *     parameters:
 *        - name: id
 *          in: query
 *          description: this is cover type id for delete
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.delete(
    "/delete/covertype",
    controller.covertypedelete
);


/**
 * @swagger
 * /get/coveramountlist:
 *   get:
 *     summary: get cover amount list.
 *     tags: [PolicyController]
 *     operationId: getCoverAmountList
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.get(
    "/get/coveramountlist",
    controller.coveramountlist);


/**
 * @swagger
 * /update/coveramount:
 *   put:
 *     summary: update cover amount.
 *     tags: [PolicyController]
 *     operationId: updateCoverAmount
 *     parameters:
 *        - name: id
 *          in: query
 *          description: this is cover amount id for update
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                n_coveramount:
 *                  type: integer
 *                  format: int32
 *                  example: 10000
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.put(
    "/update/coveramount",
    controller.updatecoveramount
);


/**
 * @swagger
 * /delete/coveramount:
 *   delete:
 *     summary: delete cover amount.
 *     tags: [PolicyController]
 *     operationId: deleteCoverAmount
 *     parameters:
 *        - name: id
 *          in: query
 *          description: this is cover amount id for delete
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.delete(
    "/delete/coveramount",
    controller.coveramountdelete
);



/**
 * @swagger
 * /delete/policy:
 *   delete:
 *     summary: delete policy.
 *     tags: [PolicyController]
 *     operationId: deletePolicy
 *     parameters:
 *        - name: id
 *          in: query
 *          description: this is policy id for delete
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.delete(
    "/delete/policy",
    controller.policydelete
);


/**
 * @swagger
 * /get/agegroups:
 *   post:
 *     summary: get age group.
 *     tags: [PolicyController]
 *     operationId: getAgeGroup
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                n_covertype:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_planfor:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_member_type:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.post(
    "/get/agegroups",
    controller.agegroups);



/**
 * @swagger
 * /get/premiumamount:
 *   post:
 *     summary: get premium amount.
 *     tags: [PolicyController]
 *     operationId: getPremiumAmount
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                n_policy:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_covertype:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_planfor:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_member_type_main:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_minage_main:
 *                  type: integer
 *                  format: int32
 *                  example: 16
 *                n_maxage_main:
 *                  type: integer
 *                  format: int32
 *                  example: 65
 *                n_member_type_spouse:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_minage_spouse:
 *                  type: integer
 *                  format: int32
 *                  example: 16
 *                n_maxage_spouse:
 *                  type: integer
 *                  format: int32
 *                  example: 65
 *                n_member_type_children:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_minage_children:
 *                  type: integer
 *                  format: int32
 *                  example: 16
 *                n_maxage_children:
 *                  type: integer
 *                  format: int32
 *                  example: 65
 *                n_member_type_extends:
 *                  type: integer
 *                  format: int32
 *                  example: 1
 *                n_minage_extends:
 *                  type: integer
 *                  format: int32
 *                  example: 16
 *                n_maxage_extends:
 *                  type: integer
 *                  format: int32
 *                  example: 65
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.post(
    "/get/premiumamount",
    controller.premiumamount);



/**
 * @swagger
 * /get/coveroptions:
 *   get:
 *     summary: get policy cover option.
 *     tags: [PolicyController]
 *     operationId: getCoverOption
 *     parameters:
 *        - name: id
 *          in: query
 *          description: this is policy id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.get(
    "/get/coveroptions",
    controller.policycoversbyid);


/**
 * @swagger
 * /get/coveramountbypolicyandtype:
 *   get:
 *     summary: get cover amount by policy and cover type.
 *     tags: [PolicyController]
 *     operationId: getCoverAmountByPolicyAndType
 *     parameters:
 *        - name: n_policyid
 *          in: query
 *          description: this is policy id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *        - name: n_planfor
 *          in: query
 *          description: this is cover type id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.get(
    '/get/coveramountbypolicyandtype',
    controller.coverAmountListByPolicyAndType);


/**
 * @swagger
 * /get/covertypebypolicy:
 *   get:
 *     summary: get cover type by policy.
 *     tags: [PolicyController]
 *     operationId: getCoverAmountByPolicy
 *     parameters:
 *        - name: n_policyid
 *          in: query
 *          description: this is policy id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 *
 */
router.get(
    '/get/covertypebypolicy',
    controller.coverTypeListByPolicy);

module.exports = router;