const fs = require('fs');
const db = require("../models");
const config = require("../config/common.config");
const comfunc = require("../lib/comfunc");
const Dbop = db.idtype;
const PaySchedule = db.payschedule;
const Op = db.Sequelize.Op;

// User data by id
exports.idtypelist = (req, res) => {
  //console.log(req);
  Dbop.findAll({ where: { n_delete: 0 } }).then(data => {
      res.json({status: true, message: 'success', data});
  });
};

exports.payschedulelist = (req, res) => {
  //console.log(req);
  PaySchedule.findAll({ where: { n_delete: 0 } }).then(data => {
      res.json({status: true, message: 'success', data});
  });
};
