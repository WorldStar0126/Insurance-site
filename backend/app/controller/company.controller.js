const fs = require('fs');
const db = require("../models");
const config = require("../config/common.config");
const comfunc = require("../lib/comfunc");
const Dbop = db.company;
const Op = db.Sequelize.Op;


exports.company = (req, res) => {
  //console.log(req.body);
  Dbop.count({
    where: {
      c_name: req.body.c_name,
      n_delete :0
    }
  }).then(data => {
     if(data > 0){
        res.json({status:false, message: 'Company Already Exist'});
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
        Dbop.update(dataupdates, { where: {  c_name: req.body.c_name } }).then(data => {
          res.json({status:true, message: 'Data Restored Successfully', data});
        });
      }
      else 
      {
        Dbop.create(req.body)
        .then(data => {
            res.json({status:true, message: 'success', data});
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
exports.updatecompany = (req, res) => {
  
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
        res.json({status:false, message: "Company already exists"});
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
exports.companybyid = (req, res) => {
  Dbop.findOne({
    where: {
      id: req.query.id
    }
  }).then(data => {
      res.json({status:true, message:'success',data});
  });
};

// User data by id
exports.companylist = (req, res) => {

    Dbop.findAll({ where: { n_delete: 0 } }).then(data => {
        res.json({status:true, message:'success', data});
    });
};


exports.companydelete = (req, res) => {
  //console.log(req);
  let data = {n_delete : 1}
  Dbop.update(data, { where: { id: req.query.id } }).then(data => {
    res.json({status:true, message: 'Deleted Successfully'});
  });
};
