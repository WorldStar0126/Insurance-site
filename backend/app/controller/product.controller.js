const fs = require('fs');
const db = require("../models");
const config = require("../config/common.config");
const comfunc = require("../lib/comfunc");
const Dbop = db.product;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');


exports.product = (req, res) => {
  //console.log(req.body);
  Dbop.count({
    where: {
      c_productname: req.body.c_productname,
      n_companyid :  req.body.n_companyid,
      n_catid :  req.body.n_catid,
      n_subcatid :  req.body.n_subcatid,
      n_delete :0
    }
  }).then(data => {
        if(data > 0){
        res.json({status: false, message: 'Product Already Exist'});
        }else{
        Dbop.count({
          where: {
            c_productname: req.body.c_productname,
            n_companyid :  req.body.n_companyid,
            n_catid :  req.body.n_catid,
            n_subcatid :  req.body.n_subcatid,
            n_delete : 1
          }
        }).then(datacheck => {
        if(datacheck >0)
        {
        let dataupdates = {n_delete : 0}
        Dbop.update(dataupdates, { where: {  c_productname: req.body.c_productname, n_companyid :  req.body.n_companyid,n_catid :  req.body.n_catid,
          n_subcatid :  req.body.n_subcatid} }).
        then(existeddata => {
          res.json({status: true, message: 'Data Restored Successfully'});
        });
      }
      else 
      {
        Dbop.create(req.body)
        .then(data => {
            res.json({status:true, message: 'success'});
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
exports.updateproduct = (req, res) => {
  
  Dbop.count({
    where: {
        c_productname: req.body.c_productname,
        id: {
          [Op.ne]: req.query.id
        }      
    }
  }).then(data => {
      //res.json(data);
     // console.log(data);
      if(data > 0){
        res.json({status: false, message: "product already exists"});
      }else{        
        Dbop.update(req.body, { where: { id: req.query.id } })
    .then(user => {
      res.json({status: true, message: 'success'});
    })
    .catch(err => {
      res.status(500).send({ result: 'failed',message: err.message });
    });
  }
});
// Save User to Database

};

// User data by id
exports.productbyid = (req, res) => {
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
exports.productlist = (req, res) => {
  //console.log(req);
  Dbop.findAll({ where: { n_delete: 0 } }).then(data => {
      res.json({status: true, message: 'success', data});
});
};


//delete
exports.productdelete = (req, res) => {
  //console.log(req);
  let data = {n_delete : 1}
  Dbop.update(data, { where: { id: req.query.id } }).then(data => {
    res.json({status: true, message: 'Deleted Successfully'});
  });
};

exports.productlistview = async (req, res) => {
     const data = await db.sequelize.query(
         `SELECT t1.*, COUNT(t2.id) AS policy_count 
          FROM v_productlist t1 LEFT JOIN ims_policy t2 ON t1.id = t2.n_prodid
          WHERE t1.n_delete = 0 AND t2.n_delete = 0
          GROUP BY t1.id`,
         { type: QueryTypes.SELECT });
      res.json({status: true, message: 'success', data});
};

exports.productfilters = (req, res) => {
    let productname  = req.body.productname;
    let companyname = req.body.companyname;
    let categoryname = req.body.categoryname;
    let subcategoryname = req.body.subcategoryname;
    (async () => {
        const data = await db.sequelize.query("select * from v_productlist  where c_productname LIKE  '%"+productname+"%' OR company LIKE  '%"+companyname+"%' OR category LIKE  '%"+categoryname+"%'  OR subcat LIKE  '%"+subcategoryname+"%' and n_delete =0  ", { type: QueryTypes.SELECT });
      	res.json({status: true, message: 'success', data});
    })();
};