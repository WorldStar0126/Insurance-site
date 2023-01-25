module.exports = (sequelize, Sequelize) => {
    const Userdetails = sequelize.define("ims_user_sign",
        {
            n_userid: {
                type: Sequelize.INTEGER
            },
            c_sign: {
                type: Sequelize.TEXT
            },
            c_doclink: {
                type: Sequelize.TEXT,
                defaultValue: 0
            },
            n_delete: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            signverified: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },

        },
        {
            freezeTableName: true,
            engine: 'MYISAM'
        });

    return Userdetails;
};
  