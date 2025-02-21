import { ProfileModel } from "../models/profile.model";

export const setUserOnline = async (id: string) => {
    await ProfileModel.update({ online: true }, { where: { id }, logging: false })
}

export const setUserOffline = async (id: string) => {
    await ProfileModel.update({ online: false }, { where: { id }, logging: false })
}