module.exports = (sequelize, Sequelize) => {
    const MemberType = sequelize.define("ims_member_type",
        {
            membertype: {
                type: Sequelize.STRING
            }
        },
        {
            freezeTableName: true,
            engine: 'MYISAM'
        });

    return MemberType;
};
  