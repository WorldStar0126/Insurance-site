const fs = require('fs');
const db = require("../models");
const config = require("../config/common.config");
const comfunc = require("../lib/comfunc");
const {QueryTypes} = require("sequelize");

const pmember = db.memberpolicy;
const pdependants = db.memberdependants;
const pbeneficiary = db.memberbeneficiary;
const pPremium = db.policypremiums;
const Op = db.Sequelize.Op;

exports.createPolicyMember = async (req, res) => {

    try {

        req.body.c_profile = '';
        let member = await pmember.create(req.body);

        if (req.files == null) {
            res.json({status:true, message: 'Main member of policy created successfully.', data: member});
        } else {

            let image = req.files.c_profile;
            let dir = config.COMMON_UPLOAD_PATH;

            if (image) {
                let file_name = image.name.split(".");
                let file_extension = file_name[1];
                let originalName = file_name[0];

                if (image.mimetype === 'image/jpeg' || image.mimetype === 'image/png') {
                    const name = `${dir}${originalName}_${new Date().getTime()}.${file_extension}`;
                    image.mv(name, function (err) {
                        if (!err) {
                            member.c_profile = name.replace('build/', '');
                            member.save();
                        }
                        res.json({status:true, message: 'Main member of policy created successfully.', data: member});
                    });
                }
            } else {
                res.json({status:true, message: 'Main member of policy created successfully.', data: member});
            }
        }

    } catch (err) {
        res.status(500).send({status: false, message: err.message});
    }

};

exports.updatePolicyMember = async (req, res) => {

    try {

        const id = req.query.id;
        let member = await pmember.findByPk(id);

        if (member == null) {
            res.json({status: false, message: 'Main member not exist in this policy'});
            return;
        }

        if (req.files && req.files.c_profile) {

            let profile = req.files.c_profile;
            let dir = config.COMMON_UPLOAD_PATH;

            if (profile) {
                let name = profile.name.split(".");
                let extension = name[1];
                let originalName = name[0];

                if (profile.mimetype === 'image/jpeg' || profile.mimetype === 'image/png') {
                    const name = `${dir}${originalName}_${new Date().getTime()}.${extension}`;
                    profile.mv(name, function (err) {
                        if (!err) {
                            member.c_profile = name.replace('build/', '');
                            member.save();
                        }
                    });
                }
            }
        }

        req.body.c_profile = member.c_profile;
        member = await pmember.update(req.body, {where: {id: id}});
        res.json({status: true, message: 'Main member info updated successfully', data: member});

    } catch (err) {
        res.status(500).send({status: false, message: err.message});
    }

}

exports.getPolicyMember = async (req, res) => {

    try {
        const data = await pmember.findOne({where: {n_policyid: req.query.id}});
        res.json({status: true, message: 'success', data: data});
    } catch (err) {
        res.status(500).send({status: false, message: err.message});
    }

};

exports.createPolicyPremium = async (req, res) => {

    try {
        req.body.n_user_id = req.userId;
        const policyPremium = await pPremium.create(req.body);
        res.json({status:true, message: 'success', data: policyPremium});
    } catch (err) {
        res.status(500).send({status: false, message: err.message});
    }

};

exports.getPolicyDependents = async (req, res) => {

    try {
        const data = await db.sequelize.query(`SELECT t1.* FROM ims_policypremiums t1 LEFT JOIN ims_contact t2 ON t1.dependentid = t2.dependentid
            WHERE t1.n_policyid = ${req.query.id}`,
            {type: QueryTypes.SELECT});
        res.json({status: true, message: 'success', data: data});
    } catch (err) {
        res.status(500).send({status: false, message: err.message});
    }

}

exports.createDependents = async (req, res) => {

    try {

        let dependents = req.body;
        let createdData = [];

        const length = dependents.length;
        for (let i = 0; i < length; i++) {
            const data = await pdependants.findOne({where: dependents[i]});
            if (data == null) createdData.push(dependents[i]);
        }

        if (createdData.length > 0) {
            await pdependants.bulkCreate(createdData, {returning: true});
        }

        res.json({status: true, message: 'Policy dependents created successfully.'});

    } catch (err) {
        res.status(500).send({status: false, message: err.message});
    }

}


exports.createBeneficiaries = async (req, res) => {

    try {

        let createdData = [];
        let beneficiaries = req.body;

        for (let i = 0; i < beneficiaries.length; i++) {
            const data = await pbeneficiary.findOne({where: beneficiaries[i]});
            if (data == null) createdData.push(beneficiaries[i]);
        }

        if (createdData.length > 0) {
            await pbeneficiary.bulkCreate(createdData, {returning: true});
        }

        res.json({status: true, message: 'Policy beneficiaries created successfully.'});

    } catch (err) {
        res.status(500).send({status: false, message: err.message});
    }

}



