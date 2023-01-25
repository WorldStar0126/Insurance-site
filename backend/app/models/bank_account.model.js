module.exports = (sequelize, Sequelize) => {
    const BankAccount = sequelize.define("ims_bank_account", {
            c_payee_name: {type: Sequelize.STRING},
            c_bank_name: {type: Sequelize.STRING},
            c_account_number: {type: Sequelize.STRING},
            n_account_type: {type: Sequelize.INTEGER},
            c_branch_code: {type: Sequelize.STRING},
            c_bank_location: {type: Sequelize.STRING},
            is_active: {type: Sequelize.INTEGER},
            n_verification_status: {type: Sequelize.INTEGER, defaultValue: 0}
        },
        {
            freezeTableName: true,
            engine: 'MYISAM'
        });

    return BankAccount;
};
