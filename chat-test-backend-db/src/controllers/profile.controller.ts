import { Request, Response } from "express";
import { ProfileModel } from "../models/profile.model";

export const getProfiles = async (_req: Request, res: Response) => {
    try {
        const profiles = await ProfileModel.findAll();

        if (!profiles || profiles.length === 0) {
            res.status(404).send("No profiles found");
        }

        res.status(200).json(profiles);
    } catch (err) {
        console.error(err);
    }
}

export const createProfiles = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const newProfile = await ProfileModel.create({ name });

        if (!newProfile) {
            res.status(400).send("Failed to create profile");
        }

        res.status(201).json(newProfile);
    } catch (err) {
        console.error(err);
    }
}