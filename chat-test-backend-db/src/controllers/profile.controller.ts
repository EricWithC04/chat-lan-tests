import { Request, Response } from "express";
import { ProfileModel } from "../models/profile.model";
import { assignProfiles } from "./profile_chat.controller";
import { ChatModel } from "../models/chat.model";

export const getProfiles = async (_req: Request, res: Response) => {
    try {
        const profiles = await ProfileModel.findAll({
            where: {
                local: true
            }
        });

        if (!profiles || profiles.length === 0) {
            res.status(404).send("No profiles found");
            return
        }

        res.status(200).json(profiles);
    } catch (err) {
        console.error(err);
    }
}

export const getProfilesWithChats = async (req: Request, res: Response) => {
    try {
        const profiles = await ProfileModel.findAll({
            where: {
                local: false
            },
            include: {
                model: ChatModel,
            }
        });

        if (!profiles) {
            res.status(400).send("Profiles error");
            return
        }

        res.status(200).json(profiles);
    } catch (err) {
        console.error(err);
    }
}

export const createProfiles = async (req: Request, res: Response) => {
    try {
        const { name, img } = req.body;

        const newProfile = await ProfileModel.create({ name, img, local: true });

        if (!newProfile) {
            res.status(400).send("Failed to create profile");
        }

        res.status(201).json(newProfile);
    } catch (err) {
        console.error(err);
    }
}

export const connectProfile = async (req: Request, res: Response) => {
    try {
        const { idUser, idUserToConnect } = req.params; 
        const { newUser } = req.body;

        // Registramos el usuario localmente
        const newProfile = await ProfileModel.create({ id: idUserToConnect, name: newUser.name, img: newUser.img, local: false });

        if (!newProfile) {
            res.status(400).send("Failed to create profile connection");
            return
        }

        // Agregamos un chat con ese usuario automaticamente
        const newChat = await ChatModel.create()

        if (!newChat) {
            res.status(400).send("Failed to create chat connection");
            return
        }

        // Asignamos nuestro perfil y el del usuario registrado al nuevo chat creado
        const result = await assignProfiles([{ id: idUser }, { id: (newProfile as any).id }], (newChat as any).id);

        if (result === "Created profile chats") res.status(201).json(newChat);
        else res.status(400).json(result);
    } catch (err) {
        console.error(err);
    }
}