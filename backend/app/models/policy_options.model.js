module.exports = (sequelize, Sequelize) => {
    const PolicyOptions = sequelize.define("ims_policyoptions",
        {
            n_policyid: {
                type: Sequelize.INTEGER
            },
            n_coveramountid: {
                type: Sequelize.INTEGER
            },
            n_planfor: {
                type: Sequelize.INTEGER
            },
            n_member_type: {
                type: Sequelize.INTEGER
            },
            n_premium_change: {
                type: Sequelize.INTEGER
            },
            n_maxnum: {
                type: Sequelize.INTEGER
            },
            n_minage: {
                type: Sequelize.INTEGER
            },
            n_maxage: {
                type: Sequelize.INTEGER
            },
            n_premiumamount: {
                type: Sequelize.INTEGER
            },
        },
        {
            freezeTableName: true,
            engine: 'MYISAM'
        });

    return PolicyOptions;
};
  