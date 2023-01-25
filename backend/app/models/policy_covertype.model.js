module.exports = (sequelize, Sequelize) => {
    const CoverType = sequelize.define("ims_covertype",
        {
            c_covertype: {
                type: Sequelize.STRING
            },
            n_member_type: {
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

    return CoverType;
};
  