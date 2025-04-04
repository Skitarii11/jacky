import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Import the sequelize instance

const Food = sequelize.define('Food', {
    // id is added automatically by Sequelize as primary key
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }, // Or DataTypes.DECIMAL
    category: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    use_field: { type: DataTypes.TEXT, allowNull: false, field: 'use_field' }, // Map to DB column name if different
    specialty: { type: DataTypes.TEXT, allowNull: false },
    model_detail: { type: DataTypes.TEXT, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false },
    dimension: { type: DataTypes.STRING, allowNull: false },
    turelt: { type: DataTypes.TEXT, allowNull: false },
    asaalt: { type: DataTypes.TEXT, allowNull: false },
    guidel: { type: DataTypes.TEXT, allowNull: false },
    hurd: { type: DataTypes.TEXT, allowNull: false },
    chadal: { type: DataTypes.TEXT, allowNull: false },
    motor75: { type: DataTypes.TEXT, allowNull: false },
    motor100: { type: DataTypes.TEXT, allowNull: false },
    pack: { type: DataTypes.TEXT, allowNull: false }
    // createdAt and updatedAt are added automatically by Sequelize if timestamps: true (default)
}, {
    tableName: 'foods', // Explicitly specify table name
    // timestamps: true // Default: Sequelize adds createdAt and updatedAt
});

export default Food;