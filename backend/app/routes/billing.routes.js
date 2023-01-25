const { authJwt } = require("../middleware");
const controller = require("../controller/billing.controller");

/**
 * @swagger
 *  tags:
 *    name: BillingController
 *    description: this is billing option management
 */
const router = require('express').Router();



/**
 * @swagger
 * /get/bank_account:
 *   get:
 *     summary: get bank account list.
 *     tags: [BillingController]
 *     operationId: getBankAccount
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
router.get('/get/bank_account', [authJwt.verifyToken], controller.getBankAccount);


/**
 * @swagger
 * /verify/bank_account:
 *   post:
 *     summary: verify bank account.
 *     tags: [BillingController]
 *     operationId: verifyBankAccount
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: The jwt token
 *         required: true
 *         schema:
 *           type: string
 *       - name: c_bank_name
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: c_payee_name
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: c_account_number
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: n_account_type
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: c_branch_code
 *         in: query
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
router.post('/verify/bank_account', [authJwt.verifyToken], controller.verifyBankAccount);


/**
 * @swagger
 * /create/bank_account:
 *   post:
 *     summary: create bank account.
 *     tags: [BillingController]
 *     operationId: createBankAccount
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: The jwt token
 *         required: true
 *         schema:
 *           type: string
 *       - name: c_payee_name
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: c_bank_name
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: c_account_number
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: n_account_type
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: c_branch_code
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: c_bank_location
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: is_active
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *           example: 0
 *           enum:
 *             - 1
 *             - 0
 *       - name: n_verification_status
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *           example: 0
 *           enum:
 *             - 1
 *             - 0
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.post('/create/bank_account', [authJwt.verifyToken], controller.createBankAccount);


/**
 * @swagger
 * /update/bank_account:
 *   put:
 *     summary: update bank account.
 *     tags: [BillingController]
 *     operationId: updateBankAccount
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: The jwt token
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: c_payee_name
 *         in: query
 *         schema:
 *           type: string
 *       - name: c_bank_name
 *         in: query
 *         schema:
 *           type: string
 *       - name: c_account_number
 *         in: query
 *         schema:
 *           type: string
 *       - name: n_account_type
 *         in: query
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: c_branch_code
 *         in: query
 *         schema:
 *           type: string
 *       - name: c_bank_location
 *         in: query
 *         schema:
 *           type: string
 *       - name: is_active
 *         in: query
 *         schema:
 *           type: integer
 *           format: int32
 *           example: 0
 *           enum:
 *             - 1
 *             - 0
 *       - name: n_verification_status
 *         in: query
 *         schema:
 *           type: integer
 *           format: int32
 *           example: 0
 *           enum:
 *             - 1
 *             - 0
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.put('/update/bank_account', [authJwt.verifyToken], controller.updateBankAccount);

/**
 * @swagger
 * /delete/bank_account:
 *   delete:
 *     summary: delete bank account.
 *     tags: [BillingController]
 *     operationId: deleteBankAccount
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: The jwt token
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.delete('/delete/bank_account', [authJwt.verifyToken], controller.deleteBankAccount);

/**
 * @swagger
 * /get/transaction:
 *   get:
 *     summary: get transaction list.
 *     tags: [BillingController]
 *     operationId: getTransaction
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
router.get('/get/transaction', [authJwt.verifyToken], controller.getTransaction);



/**
 * @swagger
 * /create/transaction:
 *   post:
 *     summary: create transaction.
 *     tags: [BillingController]
 *     operationId: createTransaction
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: The jwt token
 *         required: true
 *         schema:
 *           type: string
 *       - name: n_policy_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: n_policy_type
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: n_payment_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: c_content
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: n_amount
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.post('/create/transaction', [authJwt.verifyToken], controller.createTransaction);


/**
 * @swagger
 * /update/transaction:
 *   put:
 *     summary: update transaction.
 *     tags: [BillingController]
 *     operationId: updateTransaction
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: The jwt token
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: n_policy_id
 *         in: query
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: n_policy_type
 *         in: query
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: n_payment_id
 *         in: query
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: c_content
 *         in: query
 *         schema:
 *           type: string
 *       - name: n_amount
 *         in: query
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.put('/update/transaction', [authJwt.verifyToken], controller.updateTransaction);


/**
 * @swagger
 * /delete/transaction:
 *   delete:
 *     summary: delete transaction.
 *     tags: [BillingController]
 *     operationId: deleteTransaction
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: The jwt token
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ResponseSchema'
 */
router.delete('/delete/transaction', [authJwt.verifyToken], controller.deleteTransaction);


module.exports = router;