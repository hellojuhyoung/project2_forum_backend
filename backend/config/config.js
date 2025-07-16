require("dotenv").config(); // Load .env file

module.exports = {
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT || 3306,
    dialect: "mysql",
  },
};
