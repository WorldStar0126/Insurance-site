module.exports = (sequelize, Sequelize) => {
    const ContactsAddress = sequelize.define("ims_contacts_adress",
        {
            n_userid: {
                type: Sequelize.INTEGER
            },
            n_contactid: {
                type: Sequelize.INTEGER
            },
            c_phy_add_l1: {
                type: Sequelize.STRING
            },
            c_phy_add_l2: {
                type: Sequelize.STRING
            },
            c_phy_region: {
                type: Sequelize.INTEGER
            },
            c_phy_circuit: {
                type: Sequelize.INTEGER
            },
            c_phy_temple: {
                type: Sequelize.INTEGER
            },
            n_phy_country: {
                type: Sequelize.STRING
            },
            n_phy_postal_code: {
                type: Sequelize.STRING
            },
            n_same: {
                type: Sequelize.INTEGER
            },
            c_res_add_l1: {
                type: Sequelize.STRING
            },
            c_res_add_l2: {
                type: Sequelize.STRING
            },
            c_res_region: {
                type: Sequelize.INTEGER
            },
            c_res_circuit: {
                type: Sequelize.INTEGER
            },
            c_res_temple: {
                type: Sequelize.INTEGER
            },
            n_res_country: {
                type: Sequelize.STRING
            },
            n_res_postal_code: {
                type: Sequelize.STRING
            },
            n_mode_communication: {
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

    return ContactsAddress;
};
  