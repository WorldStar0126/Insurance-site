module.exports = (sequelize, Sequelize) => {
    const Agent = sequelize.define("ims_agent",
        {
            firstname: {
                type: Sequelize.STRING
            },
            lastname: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            country_code:{
                type: Sequelize.INTEGER
            },
            mobile: {
                type: Sequelize.INTEGER
            },
            ref_by: {
                type: Sequelize.INTEGER
            },
            balance: {
                type: Sequelize.DECIMAL(10, 2)
            },
            password: {
                type: Sequelize.STRING
            },
            status:{
                type: Sequelize.INTEGER
            },
            kyc_status: {
                type: Sequelize.INTEGER
            },
            kyc_info: {
                type: Sequelize.TEXT
            },
            kyc_reject_reasons: {
                type: Sequelize.TEXT
            },
            ev:{
                type: Sequelize.STRING  //0: email unverified, 1: email verified
            },
            sv: {
                type: Sequelize.INTEGER   //0: sms unverified, 1: sms verified
            },
            ver_code: {
                type: Sequelize.INTEGER
            },
            ver_code_send_at: {
                type: Sequelize.DATE
            },
            remember_token: {
                type: Sequelize.STRING
            },
            n_delete: {
                type: Sequelize.INTEGER
            },

        },
        {
            freezeTableName: true,
            engine: 'MYISAM'
        });

    return Agent;
};
  