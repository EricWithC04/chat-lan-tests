import { Router } from "express";
import { getProfileChats, createProfiles } from "../controllers/profile_chat.controller";

const profileChatRouter: Router = Router();

profileChatRouter.get("/", getProfileChats)
profileChatRouter.post("/", createProfiles)

export { profileChatRouter }