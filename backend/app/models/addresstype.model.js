module.exports = (sequelize, Sequelize) => {
    const ADDtypes = sequelize.define("ims_addresstype", 
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
  
    return ADDtypes;
  };
  