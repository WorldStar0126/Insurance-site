const fs = require('fs');
const db = require("../models");
const config = require("../config/common.config");
const comfunc = require("../lib/comfunc");
const contactsdb = db.contacts;
const caddress = db.contactsaddress;
const cidentification = db.contactsid;

const relationship = db.relationship;
const cmode = db.modeofcom;
const country = db.countries;
const addtypes = db.addtypes;
const kycstatus = db.kycstatus;


const Op = db.Sequelize.Op;
const {QueryTypes} = require('sequelize');
const {modeofcom, countries} = require('../models');
const resolve = require('path').resolve;
let jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const comnconfig = require("../config/common.config");


exports.addContactBasicInfo = async (req, res) => {

    try {

        let count = await contactsdb.count({
                where: {
                    c_firstname: req.body.c_firstname,
                    n_userid: req.userId,
                    n_relationship: req.body.n_relationship,
                    n_delete: 0
                }
            }
        );

        if (count > 0) {
            res.json({status: false, message: 'Contact Already Exist'});
            return;
        }

        count = await contactsdb.count({
            where: {
                c_firstname: req.body.c_firstname,
                n_userid: req.userId,
                n_relationship: req.body.n_relationship,
                n_delete: 1
            }
        });

        if (count > 0) {
            const data = await contactsdb.update({n_delete: 0}, {
                where: {
                    c_firstname: req.body.c_firstname,
                    n_userid: req.userId,
                    n_relationship: req.body.n_relationship,
                }
            });
            res.json({status: true, message: 'Data Restored Successfully', data: data.id});
        } else {

            req.body.n_userid = req.userId;

            const relation = await relationship.findByPk(req.body.n_relationship);
            if (relation.relation_name == 'Self') req.body.n_refer_status = 2;
            else req.body.n_refer_status = 0;

            const data = await contactsdb.create(req.body);
            res.json({status: true, data: data.id, message: 'Contact Added Successfully'});
        }

    } catch (err) {
        res.status(500).send({status: false, message: err.message});
    }

};

exports.updateContactBasicInfo = async (req, res) => {

    try {
        const count = contactsdb.count({
            where: {
                c_firstname: req.body.c_firstname,
                id: {
                    [Op.ne]: req.query.id
                }
            }
        });

        if (count > 0) {
            res.json({status: false, data: req.query.id, message: 'Contact Already Exist'});
            return;
        }

        contactsdb.update(req.body, {where: {id: req.query.id}});
        res.json({status: true, data: req.query.id, message: 'Contact Updated Successfully'});

    } catch (err) {
        res.status(500).send({status: false, message: err.message});
    }

};


exports.addContactAddress = (req, res) => {

    caddress.count({
        where: {
            n_contactid: req.body.n_contactid,
            n_userid: req.userId,
            n_delete: 0
        }
    }).then(data => {
        if (data > 0) {
            res.json({status: false, message: 'Contact Address Already Exist'});
        } else {
            caddress.count({
                where: {
                    n_contactid: req.body.n_contactid,
                    n_userid: req.userId,
                    n_delete: 1
                }
            }).then(datacheck => {
                if (datacheck > 0) {
                    var dataupdates = {n_delete: 0}
                    caddress.update(dataupdates, {
                        where: {
                            n_contactid: req.body.n_contactid,
                            n_userid: req.userId
                        }
                    }).then(existeddata => {
                        res.json({status: true, message: 'Data Restored Successfully'});
                    });
                } else {
                    req.body.n_userid = req.userId;
                    caddress.create(req.body)
                        .then(address => {
                            res.json({status: true, data: address.id, message: 'Contact Address Added Successfully'});
                        })
                        .catch(err => {
                            res.status(500).send({status: false, message: err.message});
                        });
                }
            });
        }
    });

};

exports.updateContactAddress = (req, res) => {
    caddress.count({
        where: {
            c_phy_add_l1: req.body.c_phy_add_l1,
            id: {
                [Op.ne]: req.query.id
            }
        }
    }).then(data => {
        if (data > 0) {
            res.json({status: false, data: req.query.id, message: 'Contact Already Exist'});
        } else {
            caddress.update(req.body, {where: {id: req.query.id}})
                .then(user => {
                    res.json({status: true, data: req.query.id, message: 'Contact Updated Successfully'});
                })
                .catch(err => {
                    res.status(500).send({status: false, message: err.message});
                });
        }
    });
};


exports.addContactIdentification = (req, res) => {
    var idt = req.body.n_idtype
    var addt = req.body.n_addresstype
    var dir = config.COMMON_UPLOAD_PATH;
    const docs = req.files.c_img;
    if (docs || idt > 0 || addt > 0) {
        cidentification.count({
            where: {
                n_contactid: req.body.n_contactid,
                n_userid: req.userId,
                n_delete: 0
            }
        }).then(data => {
            if (data > 0) {
                res.json({status: false, message: 'KYC Already Exist'});
            } else {
                var dataupdates = {
                    n_contactid: req.body.n_contactid,
                    n_userid: req.userId,
                    n_delete: 0
                }
                cidentification.create(dataupdates).then(existeddata => {
                    if (docs) {
                        let docFile = docs;
                        let orignaldocname = docFile.name;
                        //let folder_path = guid.substr(0, 1)+"/"+fobj.n_doc_type;
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }
                        var file_name_ar = docFile.name.split(".");
                        var file_extension = file_name_ar[file_name_ar.length - 1];
                        // let docname = "1234"+file_extension;
                        if (docFile.mimetype === 'image/jpeg' || docFile.mimetype === 'image/png' || docFile.mimetype === 'application/pdf' || docFile.mimetype === 'application/octet-stream' || docFile.mimetype === 'application/x-compressed' || docFile.mimetype === 'application/x-zip-compressed' || docFile.mimetype === 'application/zip' || docFile.mimetype === 'multipart/x-zip') {
                            docFile.mv(config.COMMON_UPLOAD_PATH + `${orignaldocname}`, function (err) {
                                if (err) {
                                    res.status(500).send({status: false, message: err.message});//console.log(err);
                                } else {
                                    var dataupdates = {
                                        n_contactid: req.body.n_contactid,
                                        n_userid: req.userId,
                                        n_delete: 0,
                                        c_img: config.COMMON_UPLOAD_PATH + `${orignaldocname}`
                                    }
                                    cidentification.update(dataupdates, {
                                        where: {
                                            n_contactid: req.body.n_contactid,
                                            n_userid: req.userId,
                                        }
                                    }).then(existeddata => {
                                        // res.status(200).send({ status:true,message: "Image Uploaded Successfully" });
                                    });

                                }
                            });
                        }
                    }

                    // if identification image
                    var idfile = req.files.n_idfile
                    if (idfile) {
                        let docFile = idfile;
                        let orignaldocname = docFile.name;
                        //let folder_path = guid.substr(0, 1)+"/"+fobj.n_doc_type;
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }
                        var file_name_ar = docFile.name.split(".");
                        var file_extension = file_name_ar[file_name_ar.length - 1];
                        // let docname = "1234"+file_extension;
                        if (docFile.mimetype === 'image/jpeg' || docFile.mimetype === 'image/png' || docFile.mimetype === 'application/pdf' || docFile.mimetype === 'application/octet-stream' || docFile.mimetype === 'application/x-compressed' || docFile.mimetype === 'application/x-zip-compressed' || docFile.mimetype === 'application/zip' || docFile.mimetype === 'multipart/x-zip') {
                            docFile.mv(config.COMMON_UPLOAD_PATH + `${orignaldocname}`, function (err) {
                                if (err) {
                                    res.status(500).send({message: err.message});//console.log(err);
                                } else {
                                    var idtype = req.body.n_idtype
                                    if (idtype == 1) {
                                        var idnum = req.body.passportid
                                    } else if (idtype == 2) {
                                        var idnum = req.body.birthday
                                    } else if (idtype == 3) {
                                        var idnum = "baptism certificate"
                                    } else if (idtype == 4) {
                                        var idnum = req.body.driveLicenseNumber
                                    } else if (idtype == 5) {
                                        var idnum = req.body.asylumNumber
                                    } else if (idtype == 6) {
                                        var idnum = req.body.voterIdNum
                                    }
                                    if (idnum == null) {
                                        var idnum = req.body.n_idnum
                                    }
                                    var idfile = config.COMMON_UPLOAD_PATH + `${orignaldocname}`

                                    var dataupdates = {
                                        n_contactid: req.body.n_contactid,
                                        n_userid: req.userId,
                                        n_delete: 0,
                                        n_idtype: idtype,
                                        n_idnum: idnum,
                                        n_idfile: idfile
                                    }
                                    cidentification.update(dataupdates, {
                                        where: {
                                            n_contactid: req.body.n_contactid,
                                            n_userid: req.userId,
                                        }
                                    }).then(existeddata => {
                                        // res.status(200).send({ status:true,message: "ID Uploaded Successfully" });
                                    });


                                }
                            });
                        }
                    }

                    // if identification image
                    var addfile = req.files.n_addfile
                    if (addfile) {
                        let docFile = addfile;
                        let orignaldocname = docFile.name;
                        //let folder_path = guid.substr(0, 1)+"/"+fobj.n_doc_type;
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }
                        var file_name_ar = docFile.name.split(".");
                        var file_extension = file_name_ar[file_name_ar.length - 1];
                        // let docname = "1234"+file_extension;
                        if (docFile.mimetype === 'image/jpeg' || docFile.mimetype === 'image/png' || docFile.mimetype === 'application/pdf' || docFile.mimetype === 'application/octet-stream' || docFile.mimetype === 'application/x-compressed' || docFile.mimetype === 'application/x-zip-compressed' || docFile.mimetype === 'application/zip' || docFile.mimetype === 'multipart/x-zip') {
                            docFile.mv(config.COMMON_UPLOAD_PATH + `${orignaldocname}`, function (err) {
                                if (err) {
                                    res.status(500).send({message: err.message});//console.log(err);
                                } else {

                                    var addnum;
                                    var n_addresstype = req.body.n_addresstype;

                                    if (n_addresstype == 1) {
                                        addnum = req.body.utilitybill;
                                    } else if (n_addresstype == 2) {
                                        addnum = req.body.bankstatement;
                                    } else if (n_addresstype == 3) {
                                        addnum = req.body.rental;
                                    } else if (n_addresstype == 4) {
                                        addnum = req.body.lease;
                                    }

                                    if (addnum == null) addnum = req.body.n_addressnum

                                    var n_addressnum = addnum
                                    var n_add_file = config.COMMON_UPLOAD_PATH + `${orignaldocname}`

                                    var dataupdates = {
                                        n_contactid: req.body.n_contactid,
                                        n_userid: req.userId,
                                        n_delete: 0,
                                        n_addresstype: n_addresstype,
                                        n_addressnum: n_addressnum,
                                        n_addfile: n_add_file
                                    }
                                    cidentification.update(dataupdates, {
                                        where: {
                                            n_contactid: req.body.n_contactid,
                                            n_userid: req.userId,
                                        }
                                    }).then(existeddata => {
                                        //res.status(200).send({ status:true,message: "Address Proof Uploaded Successfully" });
                                    });
                                }
                            });
                        }
                    }
                    res.status(200).send({status: true, data: data.id, message: "KYC Uploaded Successfully"});
                });
            }
        });
    }

};

exports.updateContactIdentification = (req, res) => {

    var dir = config.COMMON_UPLOAD_PATH;
    const docs = req.files.c_img;
    if (docs) {
        let docFile = docs;
        let orignaldocname = docFile.name;
        //let folder_path = guid.substr(0, 1)+"/"+fobj.n_doc_type;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        var file_name_ar = docFile.name.split(".");
        var file_extension = file_name_ar[file_name_ar.length - 1];
        // let docname = "1234"+file_extension;
        if (docFile.mimetype === 'image/jpeg' || docFile.mimetype === 'image/png' || docFile.mimetype === 'application/pdf' || docFile.mimetype === 'application/octet-stream' || docFile.mimetype === 'application/x-compressed' || docFile.mimetype === 'application/x-zip-compressed' || docFile.mimetype === 'application/zip' || docFile.mimetype === 'multipart/x-zip') {
            docFile.mv(config.COMMON_UPLOAD_PATH + `${orignaldocname}`, function (err) {
                if (err) {
                    res.status(500).send({status: false, message: err.message});//console.log(err);
                } else {
                    var dataupdates = {
                        c_img: config.COMMON_UPLOAD_PATH + `${orignaldocname}`
                    }
                    cidentification.update(dataupdates, {where: {id: req.query.id}}).then(existeddata => {
                        // res.status(200).send({ status:true,message: "Image Uploaded Successfully" });
                    });

                }
            });
        }
    }

    // if identification image
    var idfile = req.files.n_idfile
    if (idfile) {
        let docFile = idfile;
        let orignaldocname = docFile.name;
        //let folder_path = guid.substr(0, 1)+"/"+fobj.n_doc_type;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        var file_name_ar = docFile.name.split(".");
        var file_extension = file_name_ar[file_name_ar.length - 1];
        // let docname = "1234"+file_extension;
        if (docFile.mimetype === 'image/jpeg' || docFile.mimetype === 'image/png' || docFile.mimetype === 'application/pdf' || docFile.mimetype === 'application/octet-stream' || docFile.mimetype === 'application/x-compressed' || docFile.mimetype === 'application/x-zip-compressed' || docFile.mimetype === 'application/zip' || docFile.mimetype === 'multipart/x-zip') {
            docFile.mv(config.COMMON_UPLOAD_PATH + `${orignaldocname}`, function (err) {
                if (err) {
                    res.status(500).send({status: false, message: err.message});//console.log(err);
                } else {
                    var idtype = req.body.n_idtype
                    if (idtype == 1) {
                        var idnum = req.body.passportid
                    } else if (idtype == 2) {
                        var idnum = req.body.birthday
                    } else if (idtype == 3) {
                        var idnum = "baptism certificate"
                    } else if (idtype == 4) {
                        var idnum = req.body.driveLicenseNumber
                    } else if (idtype == 5) {
                        var idnum = req.body.asylumNumber
                    } else if (idtype == 6) {
                        var idnum = req.body.voterIdNum
                    }
                    if (idnum == null) {
                        var idnum = req.body.n_idnum
                    }
                    var idfile = config.COMMON_UPLOAD_PATH + `${orignaldocname}`

                    var dataupdates = {
                        n_idtype: idtype,
                        n_idnum: idnum,
                        n_idfile: idfile
                    }
                    cidentification.update(dataupdates, {where: {id: req.query.id}}).then(existeddata => {
                        // res.status(200).send({ status:true,message: "ID Uploaded Successfully" });
                    });


                }
            });
        }
    }

    // if identification image
    var addfile = req.files.n_addfile
    if (addfile) {
        let docFile = addfile;
        let orignaldocname = docFile.name;
        //let folder_path = guid.substr(0, 1)+"/"+fobj.n_doc_type;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        var file_name_ar = docFile.name.split(".");
        var file_extension = file_name_ar[file_name_ar.length - 1];
        // let docname = "1234"+file_extension;
        if (docFile.mimetype === 'image/jpeg' || docFile.mimetype === 'image/png' || docFile.mimetype === 'application/pdf' || docFile.mimetype === 'application/octet-stream' || docFile.mimetype === 'application/x-compressed' || docFile.mimetype === 'application/x-zip-compressed' || docFile.mimetype === 'application/zip' || docFile.mimetype === 'multipart/x-zip') {
            docFile.mv(config.COMMON_UPLOAD_PATH + `${orignaldocname}`, function (err) {
                if (err) {
                    res.status(500).send({status: false, message: err.message});//console.log(err);
                } else {

                    var addnum;
                    var n_addresstype = req.body.n_addresstype

                    if (n_addresstype == 1) {
                        addnum = req.body.utilitybill
                    } else if (n_addresstype == 2) {
                        addnum = req.body.bankstatement
                    } else if (n_addresstype == 3) {
                        addnum = req.body.rental
                    } else if (n_addresstype == 4) {
                        addnum = req.body.lease
                    }

                    if (addnum == null) addnum = req.body.n_addressnum

                    var n_addressnum = addnum;
                    var n_add_file = config.COMMON_UPLOAD_PATH + `${orignaldocname}`;

                    var dataupdates = {
                        n_addresstype: n_addresstype,
                        n_addressnum: n_addressnum,
                        n_addfile: n_add_file
                    }
                    cidentification.update(dataupdates, {where: {id: req.query.id}}).then(existeddata => {
                        //res.status(200).send({ status:true,message: "Address Proof Uploaded Successfully" });
                    });
                }
            });
        }
    }
    res.json({status: true, data: req.query.id, message: 'Identifications Updated Successfully'});

};

exports.importcontacts = async (req, res) => {

    try {
        var id = req.query.id;
        const data = await db.sequelize.query("select * from v_contactslist where id=" + id + " and n_delete = 0 ", {type: QueryTypes.SELECT});
        var tdata = data;
        var fdata = []
        for (var k in tdata) {
            var contactid = tdata[k].id;
            const contactsaddress = await db.sequelize.query("select * from ims_contacts_adress where n_userid=" + req.userId + " and n_contactid= " + contactid + " group by n_contactid", {type: QueryTypes.SELECT});
            var caddress = contactsaddress;
            tdata[k].addressinfo = caddress;
            const contactskyc = await db.sequelize.query("select * from ims_contacts_identification where n_userid=" + req.userId + " and n_contactid= " + contactid + " group by n_contactid", {type: QueryTypes.SELECT});
            var ckyc = contactskyc;
            tdata[k].kycinfo = ckyc;
            fdata.push(tdata[k])
        }
        res.json({status: true, message: 'success', data: fdata});

    } catch (err) {
        res.status(500).send({status: false, message: err.message});
    }

};

exports.contactdelete = (req, res) => {
    //console.log(req);
    var datadelte = {n_delete: 1}
    contactsdb.update(datadelte, {where: {id: req.query.id}}).then(data => {
        caddress.update(datadelte, {where: {n_contactid: req.query.id}}).then(data => {
            // res.json({result: 'Deleted Successfully'});
        });
        cidentification.update(datadelte, {where: {n_contactid: req.query.id}}).then(data => {
            // res.json({result: 'Deleted Successfully'});
            res.json({status: true, data: req.query.id, message: 'Deleted Successfully'});
        });

    });
};

exports.contactslist = async (req, res) => {
    const data = await db.sequelize.query("select * from v_contactslist where n_userid=" + req.userId + " and n_delete = 0", {type: QueryTypes.SELECT});
    res.json({status: true, message: 'success', data});
};

exports.contactslistbyrelation = (req, res) => {
    var id = req.query.id;
    var relationshipid = req.query.n_relationship;
    (async () => {
        const data = await db.sequelize.query("select * from v_contactslist where n_userid=" + req.userId + " and n_relationship = " + relationshipid + " and n_delete = 0", {type: QueryTypes.SELECT});
        res.json({status: true, message: 'success', data});
    })();
};


exports.kycstatus = (req, res) => {
    //console.log(req);
    kycstatus.findAll().then(data => {
        res.json({status: true, message: 'success', data});
    });
};


exports.relationshiplist = (req, res) => {
    //console.log(req);
    relationship.findAll({where: {n_delete: 0}}).then(data => {
        res.json({status: true, message: 'success', data});
    });
};


exports.addresstypelist = (req, res) => {
    //console.log(req);
    addtypes.findAll({where: {n_delete: 0}}).then(data => {
        res.json({status: true, message: 'success', data});
    });
};

exports.modecomm = (req, res) => {
    //console.log(req);
    modeofcom.findAll({where: {n_delete: 0}}).then(data => {
        res.json({status: true, message: 'success', data});
    });
};

exports.country = (req, res) => {
    //console.log(req);
    countries.findAll({where: {n_delete: 0}}).then(data => {
        res.json({status: true, message: 'success', data});
    });
};

exports.sendReferEmail = (req, res) => {

    const contactId = req.query.id;
    const name = req.body.name;
    const email = req.body.email;
    const title = req.body.title;
    const message = req.body.message;

    sgMail.setApiKey(comnconfig.SENDGRID_API_KEY);
    const msg = {
        to: email, // Change to your recipient
        from: comnconfig.SENDGRID_SENDER_EMAIL, // Change to your verified sender
        subject: name,
        text: title,
        html: message
    }

    sgMail.send(msg).then(() => {
        contactsdb.update({n_refer_status: 1}, {where: {id: contactId}});
        res.status(200).send({status: true, message: "Send refer email successfully."});
    }).catch(err => {
        res.status(500).send({status: false, message: err.message});
    });


}
