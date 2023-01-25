module.exports = (sequelize, Sequelize) => {
    const Contacts = sequelize.define("ims_contacts",
        {
            n_userid: {
                type: Sequelize.INTEGER
            },
            c_initials: {
                type: Sequelize.STRING
            },
            c_title: {
                type: Sequelize.STRING
            },
            c_firstname: {
                type: Sequelize.STRING
            },
            c_lastname: {
                type: Sequelize.STRING
            },
            n_gender: {
                type: Sequelize.INTEGER   //1 male 2 female
            },
            n_relationship: {
                type: Sequelize.INTEGER
            },
            d_dob: {
                type: Sequelize.DATE
            },
            c_email: {
                type: Sequelize.STRING
            },
            n_tel_home: {
                type: Sequelize.BIGINT
            },
            n_cell: {
                type: Sequelize.BIGINT
            },
            c_img: {
                type: Sequelize.TEXT
            },
            n_refer_status: {
                type: Sequelize.INTEGER
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

    return Contacts;
};
  