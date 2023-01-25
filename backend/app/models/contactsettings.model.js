module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("ims_contactinfo", 
     { 
          n_contactnum: {
            type: Sequelize.BIGINT   
          },
          c_url: {
            type: Sequelize.STRING   
          },
          c_address: {
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
  
    return Category;
  };
  