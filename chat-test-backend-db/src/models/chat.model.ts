import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const ChatModel = sequelize.define('Chat', {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
    }
})