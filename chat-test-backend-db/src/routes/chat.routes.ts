import { Router } from "express";
import { getChats, createChat } from "../controllers/chat.controller";

const chatRouter: Router = Router();

chatRouter.get("/:idUser", getChats);
chatRouter.post("/", createChat);

export { chatRouter }