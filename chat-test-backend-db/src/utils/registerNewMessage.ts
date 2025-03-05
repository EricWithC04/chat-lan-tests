import { MessageModel } from "../models/message.model"
import { ProfileModel } from "../models/profile.model"
import { ChatModel } from "../models/chat.model"

interface MessageData {
    senderId: string
    receiverId: string
    message: string
}

export const registerNewMessage = async (data: MessageData) => {
    try {
        const allChats = await ChatModel.findAll({
            include: ProfileModel
        });

        const correspondingChat: any = allChats.find((chat: any) => {
            return chat.Profiles.every((profile: any) => profile.id === data.senderId || profile.id === data.receiverId);
        });

        if (correspondingChat) {
            const newMessage = await MessageModel.create({
                text: data.message,
                profileId: data.senderId,
                chatId: correspondingChat.id
            });
        } else {
            throw new Error("Chat not found");
        }
    } catch (err) {
        console.error(err);
    }
}