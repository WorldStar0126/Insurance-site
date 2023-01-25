const fs = require('fs');
const db = require("../models");
let bcrypt = require("bcryptjs");
const config = require("../config/common.config");
const { QueryTypes } = require('sequelize');

exports.ganttChart = (req, res) => {
/*
//const tutorials = await sequelize.query("SELECT * FROM `tutorials`", { type: QueryTypes.SELECT });
const tutorials = db.sequelize.query("SELECT * FROM `tutorials`", function(err, result){ if(err){ console.log(err); }else{ console.log(result); } });
console.log(tutorials);
*/
(async () => { 
	const data = await db.sequelize.query("SELECT * FROM view_ganttchart ORDER BY ord", { type: QueryTypes.SELECT });
    res.json({status: true, message: 'success', data});
})();
};

exports.ganttChart = (req, res) => {
   /*
   //const tutorials = await sequelize.query("SELECT * FROM `tutorials`", { type: QueryTypes.SELECT });
   const tutorials = db.sequelize.query("SELECT * FROM `tutorials`", function(err, result){ if(err){ console.log(err); }else{ console.log(result); } });
   console.log(tutorials);
   */
   (async () => { 
      const data = await db.sequelize.query("SELECT * FROM view_ganttchart ORDER BY ord", { type: QueryTypes.SELECT });
       res.json({status: true, message: 'success', data});
   })();
   };


   
   exports.selectall = (req, res) => {
      /*
      //const tutorials = await sequelize.query("SELECT * FROM `tutorials`", { type: QueryTypes.SELECT });
      const tutorials = db.sequelize.query("SELECT * FROM `tutorials`", function(err, result){ if(err){ console.log(err); }else{ console.log(result); } });
      console.log(tutorials);
      */
     let tablename = req.query.t;
     let cols = "*";
     let wherec = "";
     if(req.query.cols){
        cols = req.query.cols;
     }
     if(req.query.whrc){
         wherec = " WHERE "+req.query.whrc;
     }
     
      (async () => { 
         const data = await db.sequelize.query("SELECT "+cols+" FROM "+tablename+" "+wherec+" ", { type: QueryTypes.SELECT });
          res.json({status: true, message: 'success', data});
      })();
   };

   exports.updatebyid = (req, res) => {
      /*
      //const tutorials = await sequelize.query("SELECT * FROM `tutorials`", { type: QueryTypes.SELECT });
      const tutorials = db.sequelize.query("SELECT * FROM `tutorials`", function(err, result){ if(err){ console.log(err); }else{ console.log(result); } });
      console.log(tutorials);
      */
     let tablename = req.query.t;
     let cols = "*";
     let wherec = "";
     if(req.query.cols){
        cols = req.query.cols;
     }
     if(req.query.whrc){
         wherec = " WHERE "+req.query.whrc;
     }
     
      (async () => { 
         const data = await db.sequelize.query("UPDATE "+tablename+" SET "+cols+" "+wherec+" ", { type: QueryTypes.SELECT });
          res.json({status: true, message: 'success', data});
      })();
   };


   
   exports.callsp = (req, res) => {
      let sp_name = req.query.t;
      let sp_param = req.query.sp_param;
     
      (async () => { 
         const data = await db.sequelize.query("CALL "+sp_name+"("+sp_param+");", { type: QueryTypes.SELECT });
          res.json({status: true, message: 'success', data});
      })();
   };    


   

