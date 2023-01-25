const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require('path');

let fileUpload = require('express-fileupload');

const app = express();

let corsOptions = {
  origin: "http://10.10.11.79:3000"
};

app.use(express.static(path.resolve(__dirname, './build')));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

app.use(cors(corsOptions));
app.use(fileUpload({debug:true}));

app.use(
    cookieSession({
      name: "bezkoder-session",
      secret: "COOKIE_SECRET", // should use as secret environment variable
      httpOnly: true,
      sameSite: 'strict'
    })
);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Insurance API with Swagger",
      version: "0.1.0",
      description: "This is a Restful API for insurance project with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Insurance Development Team",
        url: "https://68.183.24.191:3000",
        email: "admedia@gmail.com",
      },
    },
    servers: [
      {
        url: "http://10.10.11.79:3000/api",
        description: "Insurance API"
      },
    ],
  },
  apis: ["./app/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);



// database
const db = require("./app/models");
db.sequelize.sync();

// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

app.use('/api/auth', require('./app/routes/auth.routes'));
app.use('/api', require('./app/routes/user.routes'));
app.use('/api', require('./app/routes/customquery.routes'));
app.use('/api', require('./app/routes/category.routes'));
app.use('/api', require('./app/routes/company.routes'));
app.use('/api', require('./app/routes/product.routes'));
app.use('/api', require('./app/routes/policy.routes'));
app.use('/api', require('./app/routes/region.routes'));
app.use('/api', require('./app/routes/circuits.routes'));
app.use('/api', require('./app/routes/temples.routes'));
app.use('/api', require('./app/routes/subcategory.routes'));
app.use('/api', require('./app/routes/memberpolicy.routes'));
app.use('/api', require('./app/routes/other.routes'));
app.use('/api', require('./app/routes/billing.routes'));
app.use('/api', require('./app/routes/contacts.routes'));
app.use('/api', require('./app/routes/contacts.routes'));

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Insurance" });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});
