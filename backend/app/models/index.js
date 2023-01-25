const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    //port: config.PORT,
    dialect: config.dialect,
    operatorsAliases: false,
    timezone: '+05:30',
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.userAddress = require("../models/user_address.model.js")(sequelize, Sequelize);
db.agent = require("../models/agent.model.js")(sequelize, Sequelize);
db.authotp = require("../models/authotp.model.js")(sequelize, Sequelize);
db.cat = require("../models/category.model.js")(sequelize, Sequelize);
db.subcat = require("../models/subcategory.model.js")(sequelize, Sequelize);
db.region = require("../models/region.model.js")(sequelize, Sequelize);
db.circuits = require("../models/circuits.model.js")(sequelize, Sequelize);
db.temples = require("../models/temples.model.js")(sequelize, Sequelize);
db.company = require("../models/company.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.policy = require("../models/policy.model.js")(sequelize, Sequelize);
db.policyoptions = require("../models/policy_options.model.js")(sequelize, Sequelize);
db.policybenefits = require("../models/policy_benefits.model.js")(sequelize, Sequelize);
db.memberbeneficiary = require("../models/beneficiarypolicy.model.js")(sequelize, Sequelize);
db.memberdependants = require("../models/dependentspolicy.model.js")(sequelize, Sequelize);
db.memberpolicy = require("../models/memberpolicy.model.js")(sequelize, Sequelize);
db.idtype = require("../models/idtype.model.js")(sequelize, Sequelize);
db.payschedule = require("../models/payschedule.model.js")(sequelize, Sequelize);
db.policypremiums = require("../models/policy_premiums.model.js")(sequelize, Sequelize);

// FOR POLICY MASTER

db.membertype = require("../models/policy_membertype.model.js")(sequelize, Sequelize);
db.coveramount = require("../models/policy_coveramount.model.js")(sequelize, Sequelize);
db.covertype = require("../models/policy_covertype.model.js")(sequelize, Sequelize);
db.mmage = require("../models/policy_mmage.model.js")(sequelize, Sequelize);

// PAYMENT PART
db.transaction = require("../models/transcation.model")(sequelize, Sequelize);
db.bankAccount = require("../models/bank_account.model")(sequelize, Sequelize);

// Contact Module
db.contacts = require("../models/contacts.model.js")(sequelize, Sequelize);
db.contactsaddress = require("../models/contacts_address.model.js")(sequelize, Sequelize);
db.contactsid = require("../models/contacts_identification.model.js")(sequelize, Sequelize);
db.relationship = require("../models/relationship.model.js")(sequelize, Sequelize);
db.modeofcom = require("../models/cmode.model.js")(sequelize, Sequelize);
db.countries = require("../models/country.model.js")(sequelize, Sequelize);
db.addtypes = require("../models/addresstype.model.js")(sequelize, Sequelize);
db.kycstatus = require("../models/kycstatus.model.js")(sequelize, Sequelize);

// E-sign
db.esign = require("../models/esign.model.js")(sequelize, Sequelize);


// settings
db.contactsettings = require("../models/contactsettings.model.js")(sequelize, Sequelize);


module.exports = db;
