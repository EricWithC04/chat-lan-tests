import { Router } from "express";
import { getProfiles, createProfiles, connectProfile } from "../controllers/profile.controller";

const profileRouter: Router = Router();

profileRouter.get("/", getProfiles);
profileRouter.post("/", createProfiles);
profileRouter.post("/:idUser/:idUserToConnect", connectProfile);

export { profileRouter }