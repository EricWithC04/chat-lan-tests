import { ProfileModel } from "../models/profile.model";

interface UserData {
    id: string
    name: string
    img: string | null
    local: boolean
    createdAt: string
    updatedAt: string
}

export const registerLocalUser = async (userData: UserData) => {
    try {
        const profileExists = await ProfileModel.findOne({ where: { id: userData.id } });
    
        if (!profileExists) {
            await ProfileModel.create(userData as any)
            console.log("Nuevo usuario registrado");
        }
    } catch (err) {
        console.error(err);
    }
}