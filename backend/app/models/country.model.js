module.exports = (sequelize, Sequelize) => {
    const Countries = sequelize.define("ims_countries", 
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
  
    return Countries;
  };
  