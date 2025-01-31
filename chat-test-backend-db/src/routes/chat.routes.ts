import { Router } from "express";
import { getChats, createChat } from "../controllers/chat.controller";
import { getProfilesWithChats } from "../controllers/profile.controller";

const chatRouter: Router = Router();

chatRouter.get("/", getChats);
chatRouter.post("/", createChat);
chatRouter.get("/:idUser", getProfilesWithChats);

export { chatRouter }