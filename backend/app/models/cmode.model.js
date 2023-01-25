module.exports = (sequelize, Sequelize) => {
    const CommunicationMode = sequelize.define("ims_comm_mode",
        {
            mode: {
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

    return CommunicationMode;
};
  