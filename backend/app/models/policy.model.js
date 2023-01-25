module.exports = (sequelize, Sequelize) => {
    const Policy = sequelize.define("ims_policy",
        {
            c_policyname: {
                type: Sequelize.STRING
            },
            n_prodid: {
                type: Sequelize.INTEGER
            },
            n_payschedule: {
                type: Sequelize.INTEGER
            },
            n_mainmemberage: {
                type: Sequelize.INTEGER
            },
            is_active: {
                type: Sequelize.INTEGER
            },
            n_delete: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            c_termsncondtions: {
                type: Sequelize.TEXT
            },

        },
        {
            freezeTableName: true,
            engine: 'MYISAM'
        });

    return Policy;
};
  