module.exports = (sequelize, Sequelize) => {
    const Relationship = sequelize.define("ims_relationships", 
     { 
         relation_name: {
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
  
    return Relationship;
  };
  