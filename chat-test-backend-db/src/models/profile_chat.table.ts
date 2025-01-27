import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { ProfileModel } from "./profile.model";
import { ChatModel } from "./chat.model";

export const ProfileChatTable = sequelize.define('Profile_User', {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: {
            model: ProfileModel,
            key: 'id'
        }
    },
    chatId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: {
            model: ChatModel,
            key: 'id'
        }
    }
})