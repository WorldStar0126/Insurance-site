const db = require("../models");
const config = require("../config/auth.config");
const comnconfig = require("../config/common.config");
const cmnfunc = require("../lib/comfunc")
const fs = require('fs');
const AuthOtp = db.authotp;
const nodemailer = require("nodemailer");
const {QueryTypes} = require('sequelize');
const axios = require('axios')
const Op = db.Sequelize.Op;
const User = db.user;
const FormData = require('form-data');
const plivo = require('plivo');
const sgMail = require('@sendgrid/mail')
//const otpGenerator = require('otp-generator');

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const {user} = require("../models");
const {responseJson} = require("../config/common.config");
const {use} = require("express/lib/router");
const e = require("express");

exports.verifyid = async (req, res) => {

    let idtype = 0;
    let email = '';
    let contact = '';
    let idNumber = '';
    let citizentype = req.body.n_citizentype;

    if (citizentype == 1) {
        idNumber = req.body.idNumber;
        contact = req.body.contact;
    } else {
        email = req.body.emailaddress;
        idtype = req.body.n_idtype;
        contact = req.body.contact;
    }

    // Generate a random number.
    let number = Math.random()
    // Convert this number into a string.
    let string = number.toString(36)
    // Grab a section of the string as the password
    let password = string.slice(8);

    if (idtype == 0) {

        const form = new FormData();
        form.append('memberkey', 'PB-LIG001');
        form.append('password', 'bdbbe3fe90c8e48df820150b75ac8105');
        form.append('consumer_details[idNumber]', idNumber);
        form.append('consumer_details[yourReference]', 'verify ID');

        try {

            const response = await axios.post('https://veriid.com/Sandbox/webservice/pbverify-profile-id-verification', form, {headers: form.getHeaders()});
            const SAdata = response.data;
            const profile = SAdata.idProfile
            const status_verify_id = SAdata.Status;
            if (status_verify_id == "Failure") res.status(200).send({status: false, message: SAdata.Error, data: {}});

            const gen = ['Male', 'Female', 'Unkown'].indexOf(profile.gender);
            const checkExistedClient = await User.count({where: {idNumber: idNumber}});
            if (checkExistedClient > 0) res.status(200).send({status: false, message: 'User Already Exist', data: {}});

            const user = await User.create({
                username: contact,
                n_utype: 0,
                idNumber: idNumber,
                firstname: profile.firstNames,
                lastname: profile.surName,
                age: profile.age,
                dob: profile.dob,
                gender: gen,
                contact: contact,
                traceid: profile.traceid,
                n_delete: 1,
                password: ''
            });

            const OTP = Math.floor(1000 + Math.random() * 9000);

            let client = new plivo.Client(comnconfig.PLIVO_AUTH_ID, comnconfig.PLIVO_AUTH_TOKEN);
            let otpmsg = `${OTP} is your ${comnconfig.SITE_NAME} OTP. Do not share it with anyone.`;
            client.messages.create({
                    src: 'IMSINS',
                    dst: contact,
                    text: otpmsg
                }
            ).then(function (message_created) {

                user.n_regotp = OTP;
                user.n_idtype = 0;
                user.n_citizentype= 1;
                user.save();

                user.password = '';
                res.status(200).send({status: true, message: "One Step Ahead To Register", data: user});

            });

        } catch (err) {
            res.status(500).send({status: false, message: err.message, data: {}});
        }

    } else {

        try {

            let idnum = '';
            if (idtype == 1) {
                idnum = req.body.passportid
            } else if (idtype == 2) {
                idnum = req.body.birthday
            } else if (idtype == 3) {
                let dir = comnconfig.COMMON_UPLOAD_PATH;
                let baptismfile = req.files.baptism_file
                if (baptismfile) {
                    let docFile = baptismfile;
                    let orignaldocname = docFile.name;
                    //let folder_path = guid.substr(0, 1)+"/"+fobj.n_doc_type;
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }
                    let file_name_ar = docFile.name.split(".");
                    let file_extension = file_name_ar[file_name_ar.length - 1];
                    // let docname = "1234"+file_extension;
                    if (docFile.mimetype === 'image/jpeg' || docFile.mimetype === 'image/png' || docFile.mimetype === 'application/pdf' || docFile.mimetype === 'application/octet-stream' || docFile.mimetype === 'application/x-compressed' || docFile.mimetype === 'application/x-zip-compressed' || docFile.mimetype === 'application/zip' || docFile.mimetype === 'multipart/x-zip') {
                        docFile.mv(comnconfig.COMMON_UPLOAD_PATH + `${orignaldocname}`, function (err) {
                            if (err) res.status(500).send({status:false, message: err.message, data: {}});
                        });
                    }
                    idnum = comnconfig.COMMON_UPLOAD_PATH + `${orignaldocname}`
                }
            } else if (idtype == 4) {
                idnum = req.body.driveLicenseNumber
            } else if (idtype == 5) {
                idnum = req.body.asylumNumber
            } else if (idtype == 6) {
                idnum = req.body.voterIdNum
            }

            const checkExistedClient = await User.count({where: {idNumber: idNumber}});
            if (checkExistedClient > 0) res.status(200).send({status: false, message: 'User Already Exist', data: {}});

            const user = await User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dob: req.body.birthday,
                idNumber: idnum,
                gender: req.body.gender,
                username: contact,
                email: email,
                n_utype: 0,
                contact: contact,
                n_delete: 1,
                idverified: 0,
                phoneverified: 0,
                password: ''
            });

            const OTP = Math.floor(1000 + Math.random() * 9000);
            console.log("OTP GENERATED", OTP)

            let client = new plivo.Client(comnconfig.PLIVO_AUTH_ID, comnconfig.PLIVO_AUTH_TOKEN);
            let otpmsg = `${OTP} is your ${comnconfig.SITE_NAME} OTP. Do not share it with anyone.`;
            client.messages.create({
                    src: 'IMSINS',
                    dst: contact,
                    text: otpmsg
                }
            ).then(function (message_created) {

                let dataupdates = {n_regotp: OTP, n_idtype: idtype, n_citizentype: 2};

                // send email using SendGrid
                sgMail.setApiKey(comnconfig.SENDGRID_API_KEY)
                const msg = {
                    to: email, // Change to your recipient
                    from: comnconfig.SENDGRID_SENDER_EMAIL, // Change to your verified sender
                    subject: `${comnconfig.SITE_NAME } Verify`,
                    text: otpmsg,
                    html: `<strong>${otpmsg}</strong>`
                }
                sgMail.send(msg).then(() => {
                    user.n_regotp = OTP;
                    user.n_idtype = idtype;
                    user.n_citizentype= 2;
                    user.save();

                    user.password = '';
                    res.status(200).send({status: true, message: "One Step Ahead To Register", data: user});
                });
            });

        } catch (err) {
            res.status(500).send({status: false, message: err.message, data: {}});
        }
    }
};

exports.verifyOTP = async (req, res) => {

    let idNumber = req.body.idNumber;
    let otp = req.body.otp;
    let contact = req.body.contact;

    if ((contact != undefined) || (contact != null)) {

        try {

            let user = await User.findOne({where: {contact: contact, n_regotp: otp}});
            if (user == undefined) {
                res.status(400).send({status: false, message: "Contact is not Matched", data: {}});
            }

            user.idverified = 0;
            user.phoneverified = 1;
            user.n_delete = 0;
            user.save();

            const token = bcrypt.hashSync(user.contact + '', 9);
            const link = `${comnconfig.SERVER_URL}/auth-active?token=${token}`;

            sgMail.setApiKey(comnconfig.SENDGRID_API_KEY);
            const msg = {
                to: user.email, // Change to your recipient
                from: comnconfig.SENDGRID_SENDER_EMAIL, // Change to your verified sender
                subject: 'Insurance Activate',
                text: 'Activation and Set Password',
                html: `<div>Your account is activated. Please set password.</div><div><a href="${link}">Click Here</a></div>`
            }
            sgMail.send(msg).then(() => {
                console.log('sent activation email');
            });

            res.status(200).send({status: true, message: "User Registered Successfully", data:{}});

        } catch (err) {
            res.status(500).send({status: false, message: "OTP is not valid", data: {}});
        }

    } else {

        try {

            let user = await User.findOne({where: {idNumber: idNumber, n_regotp: otp}});
            if (user == undefined) {
                res.status(400).send({status: false, message: "idNumber is not Matched", data: {}});
            }

            user.idverified = 1;
            user.phoneverified = 1;
            user.n_delete = 0;
            user.save();

            res.status(200).send({status: true, message: "User Registered Successfully", data:{}});

        } catch (err) {
            res.status(500).send({status: false, message: "OTP is not valid", data: {}});
        }

    }
};


exports.signin = async (req, res) => {

    let emailOrPhone = req.query.emailOrPhone;
    let password = req.query.password;

    try {

        let user = await User.findOne({where: {email: emailOrPhone, phoneverified: 1, n_delete: 0}});
        if (user == undefined) {
            user = await User.findOne({where: {contact: emailOrPhone, phoneverified: 1, n_delete: 0}});
            if (user == undefined) {
                res.status(400).send({status: false, message: "Email(contact) or password is not match.", data: {}});
            }
        }

        if (!bcrypt.compareSync(password, user.password)) {
            res.status(400).send({status: false, message: "Email(contact) or password is not match.", data: {}});
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.TOKEN_EXPIRE_TIME, // 24 hours
        });

        req.session.token = token;
        const is_first = user.is_first;
        if (is_first == 1) {
            user.is_first = 0;
            user.save();
        }

        return res.status(200).send({
            status: true,
            message: "User signed in successfully",
            data: {
                id: user.id,
                avatar: `${comnconfig.SERVER_URL}/${user.profile}`,
                username: `${user.firstname} ${user.lastname}`,
                email: user.email,
                n_utype: user.n_utype,
                token: token,
                is_first: is_first
            }
        });

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

};

exports.signout = async (req, res) => {

    try {
        req.session = null;
        return res.status(200).send({
            status: true,
            message: "You've been signed out.",
            data: {}
        });
    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

};

exports.forgotPassword = async (req, res) => {

    try {

        const user = await User.findOne({where: {email: req.query.email, phonevefified: 1, n_delete: 0}});
        if (user == undefined) {
            res.status(400).send({status: false, message: "User not found.", data: {}});
        }

        const token = bcrypt.hashSync(user.contact + '', 8);
        const link = `${comnconfig.SERVER_URL}/auth-reset?token=${token}`;

        sgMail.setApiKey(comnconfig.SENDGRID_API_KEY);
        const msg = {
            to: user.email, // Change to your recipient
            from: comnconfig.SENDGRID_SENDER_EMAIL, // Change to your verified sender
            subject: 'Insurance reset password',
            text: 'Reset Password',
            html: `<div>You have requested reset password</div><div><a href="${link}">Click Here</a></div>`
        }
        sgMail.send(msg).then(() => {
            res.status(200).send({status: true, message: "Sent email successfully for reset password", data: {}});
        });

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }


};

exports.resetPassword = async (req, res) => {

    try {

        const user = await User.findOne({where: {email: req.query.email, phoneverified: 1, n_delete: 0}});
        if (user == undefined) {
            res.status(400).send({status: false, message: "User not found.", data: {}});
        }

        if (!bcrypt.compareSync(user.contact + '', req.headers.token)) {
            res.status(200).send({status: false, message: "This is not correct request.", data: {}});
        }

        if (req.query.password != req.query.confirm) {
            res.status(200).send({status: false, message: "Password is not match.", data: {}});
        }

        user.password = bcrypt.hashSync(req.query.password + '', 8);
        user.save();

        res.status(200).send({status: true, message: "Your password has rested successfully.", data: {}});

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

};

exports.changePassword = async (req, res) => {

    try {

        const user = await User.findByPk(req.userId);
        if (!bcrypt.compareSync(req.query.old_password, user.password)) {
            res.status(200).send({status: false, message: "Current password is not correct.", data: {}});
        }

        const newPassword = req.query.new_password;
        if (newPassword != req.query.confirm) {
            res.status(200).send({status: false, message: "Password is not match.", data: {}});
        }

        user.password = bcrypt.hashSync(newPassword + '', 8);
        user.save();

        res.status(200).send({status: true, message: "Your password has changed successfully.", data: {}});

    } catch (err) {
        res.status(500).send({status: false, message: err.message, data: {}});
    }

};

exports.resendOTP = async (req, res) => {

    const idNumber = req.body.idNumber;
    const contact = req.body.contact;

    let user;
    if (contact == null) user = await User.findOne({where: {idNumber: idNumber}});
    else user = await User.findOne({where: {idNumber: idNumber, contact: contact}});

    if (user == null) {
        res.json({status: false, message: 'User not exists'});
        return;
    }

    const OTP = Math.floor(1000 + Math.random() * 9000);

    let client = new plivo.Client(comnconfig.PLIVO_AUTH_ID, comnconfig.PLIVO_AUTH_TOKEN);
    let otpMSG = `${OTP} is your ${comnconfig.SITE_NAME} OTP. Do not share it with anyone.`;

    await client.messages.create({
        src: 'IMSINS',
        text: otpMSG,
        dst: contact
    });

    if (user.email) {
        sgMail.setApiKey(comnconfig.SENDGRID_API_KEY);
        sgMail.send({
            to: user.email, // Change to your recipient
            from: comnconfig.SENDGRID_SENDER_EMAIL, // Change to your verified sender
            subject: `${comnconfig.SITE_NAME } Verify`,
            text: otpMSG,
            html: `<strong>${otpMSG}</strong>`
        }).then(() => {
            user.n_regotp = OTP;
            user.save();
            res.status(200).send({status: true, message: "One Step Ahead To Register"});
        }).catch((err) => {
            res.status(500).send({status: false, message: err.message, data: {}});
        })
    } else {
        user.n_regotp = OTP;
        user.save();
        res.status(200).send({status: true, message: "One Step Ahead To Register"});
    }

}

exports.setPassword = async (req, res) => {

    let user = await User.findOne({where: {email: req.body.email}});
    if (user == null) {
        res.json({status: false, message: 'User not exist.'});
        return;
    }

    if (!bcrypt.compareSync(user.contact + '', req.headers.token)) {
        res.json({status: false, message: "This is not correct request.", data: {}});
        return;
    }

    user.password = bcrypt.hashSync(req.body.password + '', 8);
    user.save();

    res.json({status: true, message: "Your password set successfully.", data: {}});

}