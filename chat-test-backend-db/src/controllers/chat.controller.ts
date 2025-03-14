import { Request, Response } from "express";
import { ChatModel } from "../models/chat.model";
import { assignProfiles } from "./profile_chat.controller";
import { MessageModel } from "../models/message.model";
import { ProfileModel } from "../models/profile.model";

export const getChats = async (req: Request, res: Response) => {
    try {
        const { idUser } = req.params;

        const chats = await ChatModel.findAll({
            include: [
                {
                    model: MessageModel,
                    attributes: [ "id", "text", "profileId", "createdAt"],
                    separate: true,
                    order: [["createdAt", "ASC"]]
                },
                {
                    model: ProfileModel,
                    attributes: [ "id", "name", "img", "online"],
                }
            ],
            logging: false
        });

        if (!chats || chats.length === 0) {
            res.status(404).send("No chats found");
            return
        }

        const filteredChats = chats.filter((chat: any) => chat.Profiles.some((profile: any) => profile.id === idUser));

        res.status(200).json(filteredChats);
    } catch (err) {
        console.error(err);
    }
}

export const createChat = async (req: Request, res: Response) => {
    try {
        const users: Array<{ id: string }> = req.body.users;

        const newChat = await ChatModel.create({}, { logging: false });

        if (!newChat) {
            res.status(400).send("Failed to create chat");
            return
        }

        const result = await assignProfiles(users, (newChat as any).id);

        if (result === "Created profile chats") res.status(201).json(newChat);
        else res.status(400).json(result);
    } catch (err) {
        console.error(err);
    }
}