const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV || "production";
// const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;

let config; // Declare config variable outside

const sequelizeLoggingOption = env === "production" ? false : console.log;

if (env === "production") {
  // In production, prioritize environment variables
  config = {
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    // host: process.env.DB_HOST,
    // dialect: "mysql", // Dialect should remain 'mysql'
    // port: process.env.DB_PORT || 3306, // Use DB_PORT if set, otherwise default to 3306
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOST,
    dialect: "mysql", // Dialect should remain 'mysql'
    port: process.env.RDS_PORT || 3306, // Use DB_PORT if set, otherwise default to 3306
  };
} else {
  // In development or test, load from config.json
  config = require(__dirname + "/../config/config.json")[env];
}

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    logging: sequelizeLoggingOption,
  });
} else {
  // Create a new options object by spreading the existing config
  // and then adding or overriding the logging property
  const sequelizeOptions = {
    ...config, // This spreads all properties from your config.json (host, dialect, etc.)
    logging: sequelizeLoggingOption,
  };

  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    sequelizeOptions // Pass the new options object here
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// this section would declare sequelize connecting with the database
// then this could be exported with db and would be able to use
// in app.js is where it is implemented...
// ex) db.sequelize.sync... and on
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
