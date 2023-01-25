const fs = require('fs');
const db = require("../models");
const config = require("../config/common.config");
const comfunc = require("../lib/comfunc");
const Dbop = db.temples;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');

exports.temples = (req, res) => {
  //console.log(req.body);
  Dbop.count({
    where: {
      c_name: req.body.c_name,
      n_regionid : req.body.n_regionid,
      n_circuitid : req.body.n_circuitid,
      n_delete :0
    }
  }).then(data => {
     if(data > 0){
        res.json({status: false, message: 'Temples Already Exist'});
      }else{
        Dbop.count({
          where: {
            c_name: req.body.c_name,
            n_delete : 1
          }
        }).then(datacheck => {
          if(datacheck >0)
          {
        let dataupdates = {n_delete : 0}
        Dbop.update(dataupdates, { where: { c_name: req.body.c_name, n_regionid : req.body.n_regionid, n_circuitid : req.body.n_circuitid,} }).then(existeddata => {
          res.json({status: true, message: 'Data Restored Successfully'});
        });
      }
      else 
      {
        Dbop.create(req.body)
        .then(data => {
            res.json({status: true, message: 'success'});
        })
        .catch(err => {
          res.status(500).send({status: false, message: err.message });
        });
      }
      });
      }




  });
  // Save User to Database
  
};


//Update User
exports.updatetemples = (req, res) => {
  
  Dbop.count({
    where: {
      c_name: req.body.c_name,
        id: {
          [Op.ne]: req.query.id
        }      
    }
  }).then(data => {
      //res.json(data);
     // console.log(data);
      if(data > 0){
        res.json({status: false, message: "temples already exists"});
      }else{        
        Dbop.update(req.body, { where: { id: req.query.id } })
    .then(user => {
      res.json({status: true, message: 'success'});
    })
    .catch(err => {
      res.status(500).send({status: false, message: err.message });
    });
  }
});
// Save User to Database

};

// User data by id
exports.templesbyid = (req, res) => {
  //console.log(req);
  Dbop.findOne({
    where: {
      id: req.query.id
    }
  }).then(data => {
      res.json({status: true, message: 'success', data});
  });
};

// User data by id
exports.templeslist = (req, res) => {
  //console.log(req);
  Dbop.findAll({ where: { n_delete: 0 } }).then(data => {
    res.json({status: true, message: 'success', data});
});
};


//delete
exports.templedelete = (req, res) => {
  //console.log(req);
  let data = {n_delete : 1}
  Dbop.update(data, { where: { id: req.query.id } }).then(data => {
    res.json({status: false, message: 'Deleted Successfully'});
  });
};


exports.templeslistview = (req, res) => {
  (async () => { 
    const data = await db.sequelize.query("select * from v_templeslist  where n_delete =0", { type: QueryTypes.SELECT });
      res.json({status: true, message: 'success', data});
 })();
}; 



exports.templeslistbycircuitid = (req, res) => {
  //console.log(req.body);
  var circuitid = req.query.circuitid;
  (async () => { 
    const data = await db.sequelize.query("select id,templename	from v_templeslist where n_circuitid = "+circuitid+" and n_delete =0", { type: QueryTypes.SELECT });
 	res.json({status: true, message: 'success', data});
 })();
}; 
