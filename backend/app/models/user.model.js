module.exports = (sequelize, Sequelize) => {
    const Userdetails = sequelize.define("ims_client",
        {
            username: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            n_utype: {
                type: Sequelize.INTEGER   // 0 -admin 1-broker 2- client/member 3-staff
            },
            n_citizentype: {
                type: Sequelize.INTEGER   // 1- SA 2- NON-SA
            },
            n_idtype:{
                type: Sequelize.INTEGER    //1 - nationalid 2- passportid
            },
            idNumber: {
                type: Sequelize.STRING
            },
            passportid: {
                type: Sequelize.INTEGER
            },
            initials: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            firstname: {
                type: Sequelize.STRING
            },
            lastname: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            age: {
                type: Sequelize.INTEGER
            },
            dob: {
                type: Sequelize.DATE
            },
            gender: {
                type: Sequelize.INTEGER   //1- male, 2 -female
            },
            email: {
                type: Sequelize.STRING
            },
            contact: {
                type: Sequelize.STRING
            },
            telephone: {
                type: Sequelize.STRING
            },
            traceid: {
                type: Sequelize.INTEGER
            },
            profile: {
                type: Sequelize.STRING
            },
            n_act_flg: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            n_approver_id: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            n_delete: {
                type: Sequelize.INTEGER
            },
            n_regotp: {
                type: Sequelize.INTEGER
            },
            idverified: {
                type: Sequelize.INTEGER
            },
            phoneverified: {
                type: Sequelize.INTEGER
            },
            is_first: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            }
        },
        {
            freezeTableName: true,
            engine: 'MYISAM'
        });

    return Userdetails;
};
  