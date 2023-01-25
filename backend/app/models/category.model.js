module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("ims_category", 
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
  
    return Category;
  };
  