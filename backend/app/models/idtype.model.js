module.exports = (sequelize, Sequelize) => {
    const IDtypes = sequelize.define("ims_idtype", 
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
  
    return IDtypes;
  };
  