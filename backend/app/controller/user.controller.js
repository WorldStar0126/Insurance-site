const fs = require('fs');
const db = require("../models");
const config = require("../config/common.config");
const comfunc = require("../lib/comfunc");
let bcrypt = require("bcryptjs");
const {QueryTypes} = require("sequelize");

const Dbop = db.user;
const DbAdd = db.userAddress;
const Op = db.Sequelize.Op;

exports.createCredentials = async (req, res) => {

    try {

        const count = await Dbop.count({where: {username: req.body.username}});
        if (count > 0) res.status(200).send({status: false, message: 'Username already exists', data: {}});

        const user = await Dbop.create({
            n_utype: req.body.n_utype,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        user.password = '';
        res.status(200).send({status: true, message: 'User has created successfully', data: user});

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

};

//Update User
exports.updateCredentials = async (req, res) => {

    try {
        const userId = req.userId;
        const user = await Dbop.findByPk(userId);

        if (user == null) {
            res.json({status: false, message: 'User not exist!'});
        }

        let profile = req.files.profile;
        let dir = config.COMMON_UPLOAD_PATH;

        if (profile) {
            let file_name = profile.name.split(".");
            let file_extension = file_name[1];
            let originalName = file_name[0];

            if (profile.mimetype === 'image/jpeg' || profile.mimetype === 'image/png') {
                const name = `${dir}${originalName}_${new Date().getTime()}.${file_extension}`;
                profile.mv(name, function (err) {
                    if (!err) req.body.profile = name.replace('build/', '');
                    Dbop.update(req.body, {where: {id: userId}})
                        .then(() => {
                            res.json({status: true, message: 'User has updated successfully.'});
                        })
                });
            }
        }
    } catch (err) {
        res.status(500).send({status:false, message: err.message});
    }

};

exports.updateUserAddress = async (req, res) => {

    try {
        const userId = req.userId;
        const userAddress = await DbAdd.findOne({where: {n_userid: userId}});

        req.body.n_userid = userId;
        if (userAddress == undefined) await DbAdd.create(req.body);
        else await DbAdd.update(req.body, {where: {n_userid: userId}});

        res.json({status: true, message: 'User Address Info has updated successfully.'});
    } catch (err) {
        res.status(500).send({status:false, message: err.message});
    }

}

// User data by id
exports.credentialsById = async (req, res) => {
    try {
        const data = await db.sequelize.query(`SELECT * FROM ims_client t1 LEFT JOIN ims_client_address t2 ON t1.id = t2.n_userid 
            WHERE t1.id = ${req.userId}`,
            {type: QueryTypes.SELECT})
        res.json({status: true, message: 'success', data: data});
    } catch (err) {
        res.status(500).send({status:false, message: err.message});
    }
};

// User data by id
exports.credentialsList = (req, res) => {
    Dbop.findAll().then(data => {
        res.json({status: true, message: 'success', data: data});
    });
};
