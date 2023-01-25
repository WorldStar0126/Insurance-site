
const axios = require("axios");
const db = require("../models");
const commonConfig = require("../config/common.config");
const {QueryTypes} = require("sequelize");
const BankAccount = db.bankAccount;
const Transaction = db.transaction;

/**
 *
 * Bank: Capitec  - 470010
 * Account#:
 * Account Number: 1643179711
 * ID#7607076490189
 * David Auku
 * Personal/Savings
 *
 *
 * Account Name: Light Voice Communications (Pty) Ltd
 * Bank : ABSA
 * Account #: 4100644683
 * Branch: 631205
 *
 */

exports.getBankAccount = async (req, res) => {

    try {
        const data = await BankAccount.findAll();
        res.status(200).send({status: true, message: 'Bank account list get successfully', data});
    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

}

exports.verifyBankAccount = async (req, res) => {

    try {

        let bankCode = '';
        const bankName = req.query.c_bank_name;
        const accountNumber = req.query.c_account_number;

        const header = {headers: {Authorization: `Bearer ${commonConfig.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json'}};
        const bankList = await axios.get('https://api.paystack.co/bank?country=south africa', header);

        bankList.data.data.every(bank => {
            if (bank.name.toLowerCase().includes(bankName.toLowerCase())) {
                bankCode = bank.code;
                return false;
            }
            return true;
        });

        if (bankCode == '') {
            res.status(200).send({status: false, message: 'Bank can not found.', data: {}});
            return;
        }

        const data = JSON.stringify({
            bank_code: bankCode,
            country_code: 'ZA',
            account_number: accountNumber,
            account_type:  ['personal', 'business'][req.query.n_account_type],
            account_name: req.query.c_payee_name,
            document_type: 'identityNumber',
            document_number: req.query.c_branch_code,
        })

        let response = await axios.post('https://api.paystack.co/bank/validate', data, header);
        response = response.data;
        if (response.status && response.data.verified) {
            res.status(200).send({status: true, message: response.data.verificationMessage, data: {}});
        } else {
            res.status(200).send({status: false, message: response.data == undefined ? response.message : response.data.verificationMessage, data: {}});
        }

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

}

exports.createBankAccount = async (req, res) => {

    try {

        let bank = await BankAccount.findOne({where: {c_account_number: req.query.c_account_number}});
        if (bank != undefined) {
            res.status(200).send({status: false, message: 'This bank account already exists', data: {}});
        } else {
            bank = await BankAccount.create(req.query);
            res.status(200).send({status: true, message: 'Bank account created successfully.', data: bank});
        }

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

}

exports.updateBankAccount = async (req, res) => {

    try {

        let bank = await BankAccount.findByPk(req.query.id);
        if (bank == undefined) {
            res.status(200).send({status: false, message: 'This bank account can not found', data: {}});
        } else {
            await BankAccount.update(req.query, {where: {id: req.query.id}});
            res.status(200).send({status: true, message: 'Bank account updated successfully.', data: {}});
        }

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

}

exports.deleteBankAccount = async (req, res) => {

    try {

        let bank = await BankAccount.findByPk(req.query.id);
        if (bank == undefined) {
            res.status(200).send({status: false, message: 'This bank account can not found', data: {}});
        } else {
            await BankAccount.destroy({where: {id: req.query.id}});
            res.status(200).send({status: true, message: 'Bank account deleted successfully.', data: {}});
        }

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

}


exports.getTransaction = async (req, res) => {

    try {
        const data = await db.sequelize.query('SELECT * FROM ims_transaction t1 LEFT JOIN ims_bank_account t2 ON t1.n_payment_id = t2.id', {type: QueryTypes.SELECT});
        res.status(200).send({status: true, message: 'Transaction list get successfully', data});
    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

}

exports.createTransaction = async (req, res) => {

    try {

        const paymentId = req.query.n_payment_id;
        const bankAccount = await BankAccount.findByPk(paymentId);

        if (bankAccount == null) {
            res.status(200).send({status: false, message: 'This bank account does not exist', data: {}});
            return;
        }

        const header = {headers: {Authorization: `Bearer ${commonConfig.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json'}};
        let data = JSON.stringify({ source: "balance", reason: req.query.content, amount: req.query.n_amount,
            recipient: bankAccount.n_account_number});

        let response = await axios.post('https://api.paystack.co/transfer', data, header)
        response = response.data;

        if (!response.status) {
            res.status(500).send({status: false, message: response.message, data: {}});
            return;
        }

        const transferCode = response.data.transfer_code;
        const OTP = Math.floor(100000 + Math.random() * 900000);

        data = JSON.stringify({transfer_code: transferCode, otp: OTP});
        response = await axios.post('https://api.paystack.co/transfer/finalize_transfer', data, header)
        response = response.data;

        if (!response.status) {
            res.status(500).send({status: false, message: response.message, data: {}});
            return;
        }

        data = await Transaction.create(req.query);
        res.status(200).send({status: true, message: 'You\'ve made payment successfully', data});

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

}

exports.updateTransaction = async (req, res) => {

    try {

        let bank = await Transaction.findByPk(req.query.id);
        if (bank == undefined) {
            res.status(200).send({status: false, message: 'This transaction can not found', data: {}});
        } else {
            await Transaction.update(req.query, {where: {id: req.query.id}});
            res.status(200).send({status: true, message: 'The transaction updated successfully.', data: {}});
        }

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

}

exports.deleteTransaction = async (req, res) => {

    try {

        let bank = await Transaction.findByPk(req.query.id);
        if (bank == undefined) {
            res.status(200).send({status: false, message: 'This transaction can not found', data: {}});
        } else {
            await Transaction.destroy({where: {id: req.query.id}});
            res.status(200).send({status: true, message: 'The transaction deleted successfully.', data: {}});
        }

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

}




