import { ProfileModel } from "../models/profile.model";

export const getUserDataById = async (id: string) => {
    console.log("ID del usuario: ", id);
    
    const data = await ProfileModel.findByPk(id, { logging: false })

    if (!data) {
        throw new Error("Not found user")
    }

    return data
}