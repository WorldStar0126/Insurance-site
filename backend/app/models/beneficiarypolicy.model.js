module.exports = (sequelize, Sequelize) => {
    const BeneficiaryPolicy = sequelize.define("ims_policy_beneficiary", 
     { 
            n_memberid: {
            type: Sequelize.INTEGER   
             },
             n_policyid: {
                type: Sequelize.INTEGER   
                 },
             n_beneficiaryid : {
             type: Sequelize.STRING   
             }
        }, 
        {
          freezeTableName: true,
          engine: 'MYISAM'
        });
  
    return BeneficiaryPolicy;
  };
  