const fs = require('fs');
const db = require("../models");
const config = require("../config/common.config");
const comfunc = require("../lib/comfunc");
const Dbop = db.agent;
const Op = db.Sequelize.Op;

exports.agent = (req, res) => {
  //console.log(req.body);
  Dbop.count({
    where: {
      firstname: req.body.firstname,
      n_delete :0
    }
  }).then(data => {
     if(data > 0){
        res.json({status:false, message: 'Agent Already Exist'});
      }else{
        Dbop.count({
          where: {
            firstname: req.body.firstname,
            n_delete : 1
          }
        }).then(datacheck => {
          if(datacheck >0)
          {
        let dataupdates = {n_delete : 0}
        Dbop.update(dataupdates, { where: {  firstname: req.body.firstname } }).then(existeddata => {
          res.json({status:true, message: 'Data Restored Successfully'});
        });
      }
      else 
      {
        Dbop.create(req.body)
        .then(data => {
            res.json({status: true, message: 'success'});
        })
        .catch(err => {
          res.status(500).send({ status: false, message: err.message });
        });
      }
      });
      }




  });
  // Save User to Database
  
};



//Update User
exports.updateagent = (req, res) => {
  
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
        res.json({status: false, message: "Agent already exists"});
      }else{        
        Dbop.update(req.body, { where: { id: req.query.id } })
    .then(user => {
      res.json({status: true, message: 'success'});
    })
    .catch(err => {
      res.status(500).send({ status:false,message: err.message });
    });
  }
});
// Save User to Database

};

// User data by id
exports.agentbyid = (req, res) => {
  Dbop.findOne({
    where: {
      id: req.query.id
    }
  }).then(data => {
      res.json({status:true, message: 'success', data: data});
  });
};

// User data by id
exports.agentlist = (req, res) => {
  Dbop.findAll({ where: { n_delete: 0 } }).then(data => {
      res.json({status:true, message: 'success', data: data});
});
};

//delete
exports.agentdelete = (req, res) => {
  //console.log(req);
  let data = {n_delete : 1}
  Dbop.update(data, { where: { id: req.query.id } }).then(data => {
    res.json({status:true, message: 'Deleted Successfully'});
  });
};
