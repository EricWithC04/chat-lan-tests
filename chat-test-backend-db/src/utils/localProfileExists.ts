import { ProfileModel } from "../models/profile.model"

export const localProfileExists = async (id: string) => {
    try {
        const profileExists = await ProfileModel.findOne({ where: { id } });

        return profileExists ? true : false
    } catch (err) {
        console.error(err);
    }
}