module.exports = (sequelize, Sequelize) => {
    const Region = sequelize.define("ims_region", 
     { 
          c_name: {
            type: Sequelize.STRING   
          },
          n_delete: {
            type: Sequelize.INTEGER ,           
            defaultValue: 0,  
          },            
        }, 
        {
          freezeTableName: true,
          engine: 'MYISAM'
        });
  
    return Region;
  };
  