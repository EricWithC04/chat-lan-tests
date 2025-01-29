import { Request, Response } from "express";
import { ChatModel } from "../models/chat.model";
import { assignProfiles } from "./profile_chat.controller";

interface ChatM {
    id: string
    createdAt: string
    updatedAt: string
}

export const getChats = async (_req: Request, res: Response) => {
    try {
        const chats = await ChatModel.findAll();

        if (!chats || chats.length === 0) {
            res.status(404).send("No chats found");
            return
        }

        res.status(200).json(chats);
    } catch (err) {
        console.error(err);
    }
}

export const createChat = async (req: Request, res: Response) => {
    try {
        const users: Array<{ id: string }> = req.body.users;

        const newChat = await ChatModel.create();

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