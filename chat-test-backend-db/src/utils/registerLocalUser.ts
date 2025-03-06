import { ChatModel } from "../models/chat.model";
import { ProfileModel } from "../models/profile.model";
import { ProfileChatTable } from "../models/profile_chat.table";
import { setUserOnline } from "./setUserOnline";

interface UserData {
    id: string
    name: string
    img: string | null
    createdAt: string
    updatedAt: string
}

export const registerLocalUser = async (userData: UserData, io: any) => {
    try {
        const profileExists = await ProfileModel.findOne({ where: { id: userData.id } });
    
        if (!profileExists) {
            await ProfileModel.create({ 
                id: userData.id, 
                name: userData.name, 
                img: userData.img, 
                local: false, 
                online: true 
            }, { 
                logging: false,
                fields: ['id', 'name', 'img', 'local', 'online']
            });
            console.log("Nuevo usuario registrado");
            io.emit("new-user", userData);

            const localProfiles: Array<any> = await ProfileModel.findAll({ where: { local: true }, logging: false });

            localProfiles.forEach(async (profile) => {
                if (profile.id !== userData.id) {
                    const newChat: any = await ChatModel.create()

                    await ProfileChatTable.create({ userId: profile.id, chatId: newChat.id }, { logging: false });
                    await ProfileChatTable.create({ userId: userData.id, chatId: newChat.id }, { logging: false });
                }
            });
        } else {
            setUserOnline(userData.id)
        }
    } catch (err) {
        console.error(err);
    }
}