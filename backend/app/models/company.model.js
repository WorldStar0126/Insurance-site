module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("ims_company", 
     { 
          c_name: {
            type: Sequelize.STRING   
          },
             n_delete: {
            type: Sequelize.INTEGER,                      
           defaultValue: 0,   
          },          
        }, 
        {
          freezeTableName: true,
          engine: 'MYISAM'
        });
  
    return Company;
  };
  