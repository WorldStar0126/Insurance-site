module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("insurance_auth_otp", {
    n_user_id: {
      type: Sequelize.INTEGER
    },
    c_otp: {
      type: Sequelize.STRING
    }
  }, 
  {
    freezeTableName: true,
    engine: 'MYISAM'
  });

  return User;
};
