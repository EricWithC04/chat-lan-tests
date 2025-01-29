import { sequelize } from "./db";
import { ProfileModel } from "../models/profile.model";
import { MessageModel } from "../models/message.model";
import { ChatModel } from "../models/chat.model";
import { ProfileChatTable } from "../models/profile_chat.table";

ProfileModel.hasMany(MessageModel, { foreignKey: "profileId" });
MessageModel.belongsTo(ProfileModel, { foreignKey: "profileId" });

ChatModel.belongsToMany(ProfileModel, { through: ProfileChatTable, foreignKey: "chatId" });
ProfileModel.belongsToMany(ChatModel, { through: ProfileChatTable, foreignKey: "userId" });

ChatModel.hasMany(MessageModel, { foreignKey: "chatId" });
MessageModel.belongsTo(ChatModel, { foreignKey: "chatId" });

export { sequelize }