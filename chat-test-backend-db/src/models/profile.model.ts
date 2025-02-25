import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const ProfileModel = sequelize.define('Profile', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    local: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    online: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})