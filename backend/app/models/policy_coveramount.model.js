module.exports = (sequelize, Sequelize) => {
    const CoverAmount = sequelize.define("ims_coveramount",
        {
            n_coveramount: {
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

    return CoverAmount;
};
  