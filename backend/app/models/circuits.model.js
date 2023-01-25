module.exports = (sequelize, Sequelize) => {
    const Temples = sequelize.define("ims_circuits", 
     { 
          n_regionid: {
            type: Sequelize.INTEGER   
          } ,
          c_name: {
            type: Sequelize.STRING   
          },
          n_delete: {
            type: Sequelize.INTEGER ,           
            defaultValue: 0,  
          }          
        }, 
        {
          freezeTableName: true,
          engine: 'MYISAM'
        });
  
    return Temples;
  };
  