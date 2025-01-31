import { Request, Response } from "express";
import { MessageModel } from "../models/message.model";

export const getMessages = async (_req: Request, res: Response) => {
    try {
        const messages = await MessageModel.findAll();

        if (!messages || messages.length === 0) {
            res.status(404).send("No messages found");
            return
        }

        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
    }
}

export const createMessage = async (req: Request, res: Response) => {
    try {
        const { profileId, chatId } = req.params;
        const { text } = req.body;

        const newMessage = await MessageModel.create({ text, profileId, chatId });

        if (!newMessage) {
            res.status(400).send("Failed to create message");
        }

        res.status(201).json(newMessage);
    } catch (err) {
        console.error(err);
    }
}