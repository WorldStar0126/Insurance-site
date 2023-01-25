const fs = require('fs');
const db = require("../models");
const config = require("../config/common.config");
const comfunc = require("../lib/comfunc");
const cinfosettings = db.contactsettings;
const PaySchedule = db.payschedule;
const Op = db.Sequelize.Op;

//Update User
exports.updatecontactinfo = (req, res) => {
    cinfosettings.update(req.body, {where: {id: 1}})
        .then(contactdata => {
            res.status(200).send({status: true, message: "Contact Info Updated Successfully", data: contactdata});
        })
        .catch(err => {
            res.status(500).send({status: false, message: err.message});
        });

};

// User data by id
exports.csettingsbyid = (req, res) => {
    //console.log(req);
    cinfosettings.findOne({
        where: {
            id: 1
        }
    }).then(data => {
        res.status(200).send({status: true, message: "Contact Info", data: data});
    });
};