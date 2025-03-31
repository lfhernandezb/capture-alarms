import { Sequelize } from "sequelize";

// Initialize Sequelize (replace with your database credentials)
/*
const sequelize = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "postgres",
  });
*/

// Initialize Sequelize for a local SQLite database
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite", // Path to the SQLite database file
    logging: false, // Disable logging (optional)
  });

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

export { sequelize };