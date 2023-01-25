const fs = require('fs');
const db = require("../models");
const config = require("../config/common.config");
const comfunc = require("../lib/comfunc");
const Dbop = db.circuits;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');

exports.circuits = (req, res) => {
  //console.log(req.body);
  Dbop.count({
    where: {
      c_name: req.body.c_name,
      n_regionid : req.body.n_regionid,
      n_delete :0
    }
  }).then(data => {
     if(data > 0){
        res.json({status:false, message: 'circuits Already Exist'});
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
        Dbop.update(dataupdates, { where: {c_name: req.body.c_name, n_regionid : req.body.n_regionid,} }).then(existeddata => {
          res.json({status:true, message: 'Data Restored Successfully'});
        });
      }
      else 
      {
        Dbop.create(req.body)
        .then(data => {
            res.json({status:true, message: 'success'});
        })
        .catch(err => {
          res.status(500).send({ status:false, message: err.message });
        });
      }
      });
      }




  });
  // Save User to Database
  
};


//Update User
exports.updatecircuits = (req, res) => {
  
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
        res.json({status:false, message: "circuits already exists"});
      }else{        
        Dbop.update(req.body, { where: { id: req.query.id } })
    .then(user => {
      res.json({status:true, message: 'success'});
    })
    .catch(err => {
      res.status(500).send({status:false, message: err.message });
    });
  }
});
// Save User to Database

};

// User data by id
exports.circuitsbyid = (req, res) => {
  //console.log(req);
  Dbop.findOne({
    where: {
      id: req.query.id
    }
  }).then(data => {
      res.json({status:true, message: 'success', data});
  });
};

// User data by id
exports.circuitslist = (req, res) => {
  //console.log(req);
  Dbop.findAll({ where: { n_delete: 0 } }).then(data => {
      res.json({status:true, message: 'success', data});
});
};


//delete
exports.circuitsdelete = (req, res) => {
  //console.log(req);
  let data = {n_delete : 1}
  Dbop.update(data, { where: { id: req.query.id } }).then(data => {
    res.json({status:true, message: 'Deleted Successfully'});
  });
};


exports.circuitslistview = (req, res) => {
  (async () => { 
    const data = await db.sequelize.query("select * from v_circuitslist where n_delete =0", { type: QueryTypes.SELECT });
    res.json({status:true, message: 'success', data});
 })();
}; 



exports.circuitslistbyregionid = (req, res) => {
  var regionid = req.query.regionid;
  (async () => { 
    const data = await db.sequelize.query("select id,circuitname from v_circuitslist where n_regionid = "+regionid+" and n_delete =0", { type: QueryTypes.SELECT });
    res.json({status:true, message: 'success', data});
 })();
}; 
