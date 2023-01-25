module.exports = (sequelize, Sequelize) => {
    const MMAge = sequelize.define("ims_mmage", 
     { 
            n_minage : {
             type: Sequelize.INTEGER   
             } ,
             n_maxage : {
              type: Sequelize.INTEGER   
              }         
        }, 
        {
          freezeTableName: true,
          engine: 'MYISAM'
        });
  
    return MMAge;
  };
  