module.exports = (sequelize, Sequelize) => {
    const PolicyPremiums = sequelize.define("ims_policypremiums",
        {
            n_user_id: {
                type: Sequelize.INTEGER
            },
            n_policy_id: {
                type: Sequelize.INTEGER
            },
            n_option_id: {
                type: Sequelize.INTEGER
            },
            n_amount_id: {
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
            n_has_spouse: {
                type: Sequelize.INTEGER,
            },
            n_spouse_count: {
                type: Sequelize.INTEGER
            },
            n_spouse_minage: {
                type: Sequelize.INTEGER
            },
            n_spouse_maxage: {
                type: Sequelize.INTEGER
            },
            n_has_children: {
                type: Sequelize.INTEGER
            },
            n_children_count: {
                type: Sequelize.INTEGER
            },
            n_children_mixage: {
                type: Sequelize.INTEGER
            },
            n_children_maxage: {
                type: Sequelize.INTEGER
            },
            n_has_extends: {
                type: Sequelize.INTEGER
            },
            n_extends_count: {
                type: Sequelize.INTEGER
            },
            n_extends_minage: {
                type: Sequelize.INTEGER
            },
            n_extends_maxage: {
                type: Sequelize.INTEGER
            },
            is_active: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }
        },
        {
            freezeTableName: true,
            engine: 'MYISAM'
        });

    return PolicyPremiums;
};
  