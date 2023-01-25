module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("ims_transaction", {
            n_policy_id: {type: Sequelize.INTEGER},
            n_policy_type: {type: Sequelize.STRING},
            n_payment_id: {type: Sequelize.INTEGER},
            n_amount: {type: Sequelize.INTEGER},
            c_content: {type: Sequelize.STRING},
            d_pay_date: {type: Sequelize.DATE},
            n_delete: {type: Sequelize.INTEGER, defaultValue: 0}
        },
        {
            freezeTableName: true,
            engine: 'MYISAM'
        });

    return Transaction;
};
