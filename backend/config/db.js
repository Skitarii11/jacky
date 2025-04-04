// config/db.js
import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Make sure dotenv is configured early in server.js

// Ensure these env vars are set in cPanel / .env
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT || 'mysql'; // Default to mysql

// Initialize Sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    logging: false, // Set to console.log to see SQL queries, false for production
});

// Test Connection Function (optional but recommended)
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Connection has been established successfully.');
        // Optional: Sync models (can be dangerous in prod, use migrations instead)
        // await sequelize.sync({ alter: true }); // { force: true } drops tables! Use with caution.
        // console.log('Models synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the MySQL database:', error);
    }
};

// Export the sequelize instance for use in models
export default sequelize;