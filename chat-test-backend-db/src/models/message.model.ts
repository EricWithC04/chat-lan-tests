import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const MessageModel = sequelize.define('Message', {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})