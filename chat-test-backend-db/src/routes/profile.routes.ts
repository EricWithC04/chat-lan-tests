import { Router } from "express";
import { getProfiles, createProfiles } from "../controllers/profile.controller";

const profileRouter: Router = Router();

profileRouter.get("/", getProfiles);
profileRouter.post("/", createProfiles);

export { profileRouter }