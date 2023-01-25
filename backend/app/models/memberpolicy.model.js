module.exports = (sequelize, Sequelize) => {
    const MemberPolicy = sequelize.define("ims_policy_mainmember",
        {
            n_policyid: {
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
                type: Sequelize.INTEGER
            },
            d_dob: {
                type: Sequelize.DATE
            },
            c_email: {
                type: Sequelize.STRING
            },
            c_tel_home: {
                type: Sequelize.STRING
            },
            c_cell: {
                type: Sequelize.STRING
            },
            c_profile: {
                type: Sequelize.STRING
            },
            c_residence_address1: {
                type: Sequelize.STRING
            },
            c_residence_address2: {
                type: Sequelize.STRING
            },
            n_residence_country: {
                type: Sequelize.INTEGER
            },
            n_residence_region: {
                type: Sequelize.INTEGER
            },
            n_residence_circuit: {
                type: Sequelize.INTEGER
            },
            n_residence_temple: {
                type: Sequelize.INTEGER
            },
            n_residence_postalcode: {
                type: Sequelize.INTEGER
            },
            c_postal_address1: {
                type: Sequelize.STRING
            },
            c_postal_address2: {
                type: Sequelize.STRING
            },
            n_postal_country: {
                type: Sequelize.INTEGER
            },
            n_postal_region: {
                type: Sequelize.INTEGER
            },
            n_postal_circuit: {
                type: Sequelize.INTEGER
            },
            n_postal_temple: {
                type: Sequelize.INTEGER
            },
            n_postal_postalcode: {
                type: Sequelize.INTEGER
            },
            c_comm_mode: {
                type: Sequelize.STRING
            },
            c_kyc_docs: {
                type: Sequelize.TEXT
            },
            n_paymenttype: {
                type: Sequelize.INTEGER
            },
            n_paymentmethod: {
                type: Sequelize.INTEGER
            },
            n_paymentstatus: {
                type: Sequelize.INTEGER
            },
        },
        {
            freezeTableName: true,
            engine: 'MYISAM'
        });

    return MemberPolicy;
};
  