import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Setting = sequelize.define('Setting', {
    logoUrl: {
        type: DataTypes.STRING,
        defaultValue: '/images/default-logo.png'
    }
}, {
    tableName: 'settings',
    // timestamps: true // Default
});

export default Setting;