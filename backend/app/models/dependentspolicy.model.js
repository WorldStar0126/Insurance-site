module.exports = (sequelize, Sequelize) => {
    const DependentsPolicy = sequelize.define("ims_policy_dependents", 
     { 
            n_memberid: {
            type: Sequelize.INTEGER   
             },
             n_policyid: {
                type: Sequelize.INTEGER   
                 },
             n_dependentid : {
             type: Sequelize.STRING   
             }
        }, 
        {
          freezeTableName: true,
          engine: 'MYISAM'
        });
  
    return DependentsPolicy;
  };
  