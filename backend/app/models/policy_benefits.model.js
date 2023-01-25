module.exports = (sequelize, Sequelize) => {
    const PolicyBenefits = sequelize.define("ims_policybenefits", 
     { 
            n_policyid: {
            type: Sequelize.INTEGER   
             },
             c_benefits : {
             type: Sequelize.TEXT   
             } ,
             n_benefit_value : {
              type: Sequelize.INTEGER   
             }              
        }, 
        {
          freezeTableName: true,
          engine: 'MYISAM'
        });
  
    return PolicyBenefits;
  };
  