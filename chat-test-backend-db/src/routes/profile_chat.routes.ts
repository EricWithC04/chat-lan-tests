import { Router } from "express";
import { getProfileChats, createProfileChats } from "../controllers/profile_chat.controller";

const profileChatRouter: Router = Router();

profileChatRouter.get("/", getProfileChats)
profileChatRouter.post("/", createProfileChats)

export { profileChatRouter }