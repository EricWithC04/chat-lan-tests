import { Request, Response } from "express";
import { ProfileChatTable } from "../models/profile_chat.table";

export const getProfileChats = async (_req: Request, res: Response) => {
    try {
        const profileChats = await ProfileChatTable.findAll();

        if (!profileChats || profileChats.length === 0) {
            res.status(404).send("No profileChats found");
            return
        }

        res.status(200).json(profileChats);
    } catch (err) {
        console.error(err);
    }
}

export const createProfiles = async (_req: Request, res: Response) => {
    try {
        // const { name, img } = req.body;

        const newProfileChat = await ProfileChatTable.create();

        if (!newProfileChat) {
            res.status(400).send("Failed to create profile chat");
        }

        res.status(201).json(newProfileChat);
    } catch (err) {
        console.error(err);
    }
}