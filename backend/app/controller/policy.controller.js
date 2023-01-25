const fs = require('fs');
const db = require("../models");
const config = require("../config/common.config");
const comfunc = require("../lib/comfunc");
const Dbop = db.policy;
// const poptions = db.policyoptions;
const ppremiums = db.policypremiums;
const pbenefits = db.policybenefits;

// NEW VARIABLES
const pcoveramount = db.coveramount;
const pcovertype = db.covertype;
const pmmage = db.mmage;
const poptions = db.policyoptions;
const membertype = db.membertype;
const Op = db.Sequelize.Op;
const {QueryTypes} = require('sequelize');

exports.policy = async (req, res) => {

    try {

        const policyCount = await Dbop.count({where: {c_policyname: req.body.c_policyname}});
        if (policyCount > 0) {
            res.json({status: false, message: "Policy already exists"});
            return;
        }

        const policyData = await Dbop.create(req.body);
        let array_data = req.body.policyoptions
        let policypremiums = [];

        for (let k in array_data) {

            let data_obj = array_data[k];
            data_obj.n_policyid = policyData.id;

            let n_policyid = policyData.id;
            let n_coveramountid = data_obj.n_coveramountid;
            let n_planfor = data_obj.n_planfor;
            let n_member_type = data_obj.n_member_type;
            let n_maxnum = data_obj.n_maxnum;
            let n_premium_change = data_obj.n_premium_change;
            let premiums = data_obj.premiumoptions;

            for (let l in premiums) {
                data_obj = premiums[l];
                data_obj.n_policyid = n_policyid;
                data_obj.n_coveramountid = n_coveramountid;
                data_obj.n_planfor = n_planfor;
                data_obj.n_member_type = n_member_type;
                data_obj.n_maxnum = n_maxnum;
                data_obj.n_premium_change = n_premium_change;
                policypremiums.push(data_obj);
            }
        }

        if (policypremiums.length > 0) {
            await poptions.bulkCreate(policypremiums, {returning: true});
            res.send({status: true, message: "Policy With Premium Options Added Successfully"});
        }

    } catch (err) {
        return res.status(500).send({status: false, message: err.message});
    }

};


exports.mmage = (req, res) => {
    //console.log(req.body);
    pmmage.count({
        where: {
            n_minage: req.body.n_minage,
            n_maxage: req.body.n_maxage,
        }
    }).then(data => {
        if (data > 0) {
            res.send({status: false, message: 'Age Criteria Main Member Already Exist'});
        } else {
            pmmage.create(req.body)
                .then(data => {
                    res.send({status: true, message: 'Age Criteria Main Member Added Successfully'});
                })
                .catch(err => {
                    res.status(500).send({status: false, message: err.message});
                });
        }

    });
    // Save User to Database

};


//Update User
exports.updatepolicy = async (req, res) => {

    try {
        const id = req.query.id;
        const policyCount = await Dbop.count({where: {c_policyname: req.body.c_policyname, id: {[Op.ne]: req.query.id}}});

        if (policyCount > 0) {
            res.json({status: false, message: "policy already exists"});
            return;
        }

        await Dbop.update(req.body, {where: {id: id}});
        await poptions.destroy({where: {n_policyid: id}});

        let policypremiums = [];
        let pOptionData = req.body.policyoptions;

        for (let i in pOptionData) {

            let data_obj = pOptionData[i];
            data_obj.n_policyid = id;

            let n_policyid = pOptionData.id;
            let n_planfor = data_obj.n_planfor;
            let n_coveramountid = data_obj.n_coveramountid;
            let n_premium_change = data_obj.n_premium_change;
            let n_member_type = data_obj.n_member_type;
            let n_maxnum = data_obj.n_maxnum;
            let premiums = data_obj.premiumoptions;

            for (let l in premiums) {
                data_obj = premiums[l];
                data_obj.n_policyid = id;
                data_obj.n_coveramountid = n_coveramountid;
                data_obj.n_planfor = n_planfor;
                data_obj.n_member_type = n_member_type;
                data_obj.n_maxnum = n_maxnum;
                data_obj.n_premium_change = n_premium_change;
                policypremiums.push(data_obj);
            }
        }

        if (policypremiums.length > 0) {
            await poptions.bulkCreate(policypremiums, {returning: true});
            res.json({status: true, message: "Policy updated successfully."});
        }

    } catch (err) {
        res.status(500).send({status:false, message: err.message});
    }


};

// User data by id
exports.policybyid = async (req, res) => {

    let id = req.query.id;

    const tdata = await db.sequelize.query("select * from v_policylist where id=" + id + "", {type: QueryTypes.SELECT});
    let fdata = []
    for (let k in tdata) {
        let policyid = tdata[k].id;
        const coverdata = await db.sequelize.query("select * from ims_policyoptions where n_policyid=" + policyid + " group by n_coveramountid, n_planfor, n_member_type", {type: QueryTypes.SELECT});
        let covdata = coverdata;
        let st_ar = []
        for (let n in covdata) {
            let coverid = covdata[n].n_coveramountid;
            let typeid = covdata[n].n_planfor;
            let memberid = covdata[n].n_member_type;
            let premiumdata = await poptions.findAll({where : {n_policyid:id, n_coveramountid:coverid, n_planfor:typeid, n_member_type:memberid}});
            let s_obj = {coverid: covdata[n].n_coveramountid, planfor: coverdata[n].n_planfor, coveroptions: premiumdata};
            st_ar.push(s_obj)
        }
        tdata[k].premiumoptions = st_ar;
        fdata.push(tdata[k])
    }

    res.json({status: true, message: 'success', data: fdata});

};

// User data by id
exports.policylist = (req, res) => {
    //console.log(req);
    Dbop.findAll({where: {n_delete: 0, is_active: 1}}).then(data => {
        res.json({status: true, message: 'success', data});
    });
};


exports.policylistview = (req, res) => {
    (async () => {
        const data = await db.sequelize.query("select * from v_policylist where n_delete = 0", {type: QueryTypes.SELECT});
        res.json({status: true, message: 'success', data});
    })();
};


exports.agegroups = async (req, res) => {
    let n_covertype = req.body.n_covertype;
    let n_planfor = req.body.n_planfor;
    let n_member_type = req.body.n_member_type;
    const data = await db.sequelize.query(
        `SELECT DISTINCT n_minage, n_maxage FROM ims_policyoptions 
        WHERE n_coveramountid = ${n_covertype} AND n_planfor = ${n_planfor} AND n_member_type = ${n_member_type}`,
        {type: QueryTypes.SELECT}
    );
   
    res.json({status:true, message:"success",data});
  
  /* poptions.findAll({
        attributes: ['n_minage', 'n_maxage'],
        where: {n_coveramountid: n_covertype, n_planfor: n_planfor}
    }).then(data => {
        res.json({status: true, message: 'success', data});
    });*/
};


exports.premiumamount = async (req, res) => {

    const n_policy = req.body.n_policy;
    const n_coveramountid = req.body.n_covertype;
    const n_planfor = req.body.n_planfor;

    const params = [
        {
            member_type: req.body.n_member_type_main,
            min_age: req.body.n_minage_main,
            max_age: req.body.n_maxage_main
        },
        {
            member_type: req.body.n_member_type_spouse,
            min_age: req.body.n_minage_spouse,
            max_age: req.body.n_maxage_spouse
        },
        {
            member_type: req.body.n_member_type_children,
            min_age: req.body.n_minage_children,
            max_age: req.body.n_maxage_children
        },
        {
            member_type: req.body.n_member_type_extends,
            min_age: req.body.n_minage_extends,
            max_age: req.body.n_maxage_extends
        }
    ]

    let totalAmount = 0;
    let premiumAmount = [];

    for (let i = 0; i < 4; i++) {
        let sql = `SELECT n_premiumamount FROM ims_policyoptions 
                   WHERE 
                       n_policyid = ${n_policy}
                       AND n_coveramountid = ${n_coveramountid}
                       AND n_planfor = ${n_planfor}
                       AND n_member_type = ${params[i].member_type}
                       AND n_minage = ${params[i].min_age}
                       AND n_maxage = ${params[i].max_age}`;

        const data = await db.sequelize.query(sql, {type: QueryTypes.SELECT});
        if (data.length != 0) {
            totalAmount += parseInt(data[0].n_premiumamount);
            premiumAmount.push(data[0].n_premiumamount);
        } else {
            totalAmount += 0;
            premiumAmount.push(0);
        }

    }

    premiumAmount.push(totalAmount);
    res.json({status: true, message: 'success', data: premiumAmount});

};


exports.membertypelist = (req, res) => {
    //console.log(req);
    membertype.findAll().then(data => {
        res.json({status: true, message: 'success', data});
    });
};

exports.coveramount = (req, res) => {
    //console.log(req.body);
    pcoveramount.count({
        where: {
            n_coveramount: req.body.n_coveramount,
            n_delete: 0
        }
    }).then(data => {
        if (data > 0) {
            res.send({status: false, message: 'Cover Amount Option Already Exist'});
        } else {
            pcoveramount.count({
                where: {
                    n_coveramount: req.body.n_coveramount,
                    n_delete: 1
                }
            }).then(datacheck => {
                if (datacheck > 0) {
                    let dataupdates = {n_delete: 0}
                    pcoveramount.update(dataupdates, {where: {n_coveramount: req.body.n_coveramount}}).then(existeddata => {
                        res.json({status: true, message: 'Data Restored Successfully'});
                    });
                } else {
                    pcoveramount.create(req.body)
                        .then(data => {
                            res.send({status: true, message: 'Cover Amount Added Successfully'});
                        })
                        .catch(err => {
                            res.status(500).send({status: false, message: err.message});
                        });
                }
            });
        }
    });
    // Save User to Database

};

exports.updatecoveramount = async (req, res) => {
    try {
        const policyCoverAmountCount =
            await pcoveramount.count({
                where: {
                    n_coveramount: req.body.n_coveramount,
                    id: {[Op.ne]: req.query.id}
                }
            });

        if (policyCoverAmountCount > 0) {
            res.json({status: false, message: "Cover Amount already exists"});
        } else {
            await pcoveramount.update(req.body, {where: {id: req.query.id}});
            res.json({status: true, message: 'success'});
        }
    } catch (err) {
        res.status(500).send({status: false, message: err.message});
    }
};

exports.coveramountlist = async (req, res) => {
    pcoveramount.findAll({where: {n_delete: 0}, order:['n_coveramount']}).then(data => {
        res.json({status: true, message: 'success', data});
    });
};

exports.coverAmountListByPolicyAndType = async (req, res) => {

    const policyId = req.query.n_policyid;
    const coverTypeId = req.query.n_planfor;

    const data = await db.sequelize.query(
            `SELECT t2.* 
                FROM ims_policyoptions t1 
                LEFT JOIN ims_coveramount t2 ON t1.n_coveramountid = t2.id 
            WHERE t1.n_policyid = ${policyId} AND t1.n_planfor = ${coverTypeId} GROUP BY t2.id`
        , {type: QueryTypes.SELECT});

    res.json({status: true, message: 'success', data});

};

exports.coveramountdelete = (req, res) => {
    //console.log(req);
    let data = {n_delete: 1}
    pcoveramount.update(data, {where: {id: req.query.id}}).then(data => {
        res.json({status: true, message: 'Deleted Successfully'});
    });
};

exports.covertype = (req, res) => {

    pcovertype.count({
        where: {
            c_covertype: req.body.c_covertype,
            n_delete: 0
        }
    }).then(data => {
        if (data > 0) {
            res.send({status: false, message: 'Cover Type Already Exist'});
        } else {
            pcovertype.count({
                where: {
                    c_covertype: req.body.c_covertype,
                    n_delete: 1
                }
            }).then(datacheck => {
                if (datacheck > 0) {
                    let dataupdates = {n_delete: 0}
                    pcovertype.update(dataupdates, {where: {c_covertype: req.body.c_covertype}}).then(existeddata => {
                        res.json({status: true, message: 'Data Restored Successfully'});
                    });
                } else {
                    pcovertype.create(req.body)
                        .then(data => {
                            res.send({status: true, message: 'Cover Type Added Successfully'});
                        })
                        .catch(err => {
                            res.status(500).send({status: false, message: err.message});
                        });
                }
            });
        }

    });
    // Save User to Database

};

exports.updatecovertype = (req, res) => {
    pcovertype.count({
        where: {
            c_covertype: req.body.c_covertype,
            id: {
                [Op.ne]: req.query.id
            }
        }
    }).then(data => {
        //res.json(data);
        // console.log(data);
        if (data > 0) {
            res.json({status: false, message: "Cover Amount already exists"});
        } else {
            pcovertype.update(req.body, {where: {id: req.query.id}})
                .then(user => {
                    res.json({status: true, message: 'success'});
                })
                .catch(err => {
                    res.status(500).send({status: false, message: err.message});
                });
        }
    });
// Save User to Database

};


exports.covertypelist = async (req, res) => {
    let data = await pcovertype.findAll({where: {n_delete: 0}});
    res.json({status: true, message: 'success', data});
};


exports.coverTypeListByPolicy = async (req, res) => {

    const policyId = req.query.n_policyid;
    const data = await db.sequelize.query(
        `SELECT t2.* 
                FROM ims_policyoptions t1 
                LEFT JOIN ims_covertype t2 ON t1.n_planfor = t2.id 
            WHERE t1.n_policyid = ${policyId} 
            GROUP BY t2.id`
        , {type: QueryTypes.SELECT});

    res.json({status: true, message: 'success', data});

};

exports.covertypedelete = (req, res) => {

    let data = {n_delete: 1}
    pcovertype.update(data, {where: {id: req.query.id}}).then(data => {
        res.json({status: true, message: 'Deleted Successfully'});
    });
};


exports.premiumoptions = (req, res) => {

    poptions.count({
        where: {
            n_policyid: req.body.n_policyid,
            n_coveramountid: req.body.n_coveramountid,
            n_planfor: req.body.n_planfor
        }
    }).then(data => {
        if (data > 0) {
            res.send({status: false, message: 'Premium Amount Already Exist'});
        } else {
            poptions.create(req.body)
                .then(data => {
                    res.send({status: true, message: 'Premium Amount Added Successfully'});
                })
                .catch(err => {
                    res.status(500).send({status: false, message: err.message});
                });
        }

    });
    // Save User to Database

};

exports.policydelete = (req, res) => {

    let data = {n_delete: 1}
    Dbop.update(data, {where: {id: req.query.id}}).then(data => {
        res.json({status: true, message: 'Deleted Successfully'});
    });
};


exports.policycoversbyid = async (req, res) => {
    let id = req.query.id;
    const data = await db.sequelize.query("select n_coveramountid,n_coveramount from vcoverspolicy where n_policyid="+id+"", { type: QueryTypes.SELECT });
    res.json({status: true, message: 'success' ,data});
};

exports.policyfilters = async (req, res) => {
    let policyname  = req.body.productname;
    let companyname = req.body.companyname;
    let categoryname = req.body.categoryname;
    let subcategoryname = req.body.subcategoryname;
    const data = await db.sequelize.query("select * from v_productlist  where c_productname LIKE  '%"+productname+"%' OR company LIKE  '%"+companyname+"%' OR category LIKE  '%"+categoryname+"%'  OR subcat LIKE  '%"+subcategoryname+"%' and n_delete =0  ", { type: QueryTypes.SELECT });
    res.json({status: false, message: 'success', data:data});
};

