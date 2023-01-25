module.exports = (sequelize, Sequelize) => {
    const Payschedule = sequelize.define("ims_payschedule", 
     { 
            c_name: {
            type: Sequelize.STRING   
            },
            n_delete: {
                type: Sequelize.INTEGER   
                },        
        }, 
        {
          freezeTableName: true,
          engine: 'MYISAM'
        });
  
    return Payschedule;
  };
  