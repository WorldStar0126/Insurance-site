module.exports = (sequelize, Sequelize) => {
    const Contactsidentification = sequelize.define("ims_contacts_identification", 
     { 
            n_userid: {
             type: Sequelize.INTEGER   
            },
             n_contactid: {
             type: Sequelize.INTEGER   
              },
             c_img : {
              type: Sequelize.BLOB("long") 
             } ,
            n_idtype : {
              type: Sequelize.INTEGER   
             } ,
            n_idnum  : {
              type: Sequelize.STRING   
             } ,
             n_idfile : {
              type: Sequelize.BLOB("long"),
             } , 
             n_idapproved: {
              type: Sequelize.INTEGER   //0 - not approved 1 approved
             } , 
             
             n_addresstype : {
               type: Sequelize.INTEGER   
              } ,
             n_addressnum  : {
               type: Sequelize.STRING   
              } ,
              n_addfile : {
                type: Sequelize.BLOB("long"), 
              } ,
              n_addressapproved: {
                type: Sequelize.INTEGER   //0 - not approved 1 approved
               } , 
               
               n_delete: {
                type: Sequelize.INTEGER,
                defaultValue: 0,   
              }, 

        }, 
        {
          freezeTableName: true,
          engine: 'MYISAM'
        });
  
    return Contactsidentification;
  };
  