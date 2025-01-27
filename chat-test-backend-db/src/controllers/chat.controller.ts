import { Request, Response } from "express";
import { ChatModel } from "../models/chat.model";

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

export const createChat = async (_req: Request, res: Response) => {
    try {
        // const { name, img } = req.body;

        const newChat = await ChatModel.create();

        if (!newChat) {
            res.status(400).send("Failed to create chat");
        }

        res.status(201).json(newChat);
    } catch (err) {
        console.error(err);
    }
}