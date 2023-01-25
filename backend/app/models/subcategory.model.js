module.exports = (sequelize, Sequelize) => {
    const Subcategory = sequelize.define("ims_subcategory", 
     { 
          n_catid: {
            type: Sequelize.INTEGER   
          } ,
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
  
    return Subcategory;
  };
  