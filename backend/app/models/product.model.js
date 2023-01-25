module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("ims_product",
        {

            c_productname: {
                type: Sequelize.STRING
            },
            n_companyid: {
                type: Sequelize.INTEGER
            },
            n_catid: {
                type: Sequelize.INTEGER
            },
            n_subcatid: {
                type: Sequelize.INTEGER
            },
            n_delete: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            }
        },
        {
            freezeTableName: true,
            engine: 'MYISAM'
        });

    return Product;
};
  