module.exports = (sequelize, Sequelize) => {
    const KYCstatus = sequelize.define("ims_kycstatus", 
     { 
         status_name: {
            type: Sequelize.STRING   
          }        
        }, 
        {
          freezeTableName: true,
          engine: 'MYISAM'
        });
  
    return KYCstatus;
  };
  