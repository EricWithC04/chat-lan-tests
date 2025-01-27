import { Router } from "express";
import { getMessages, createMessage } from "../controllers/message.controller";

const messageRouter: Router = Router();

messageRouter.get("/", getMessages);
messageRouter.post("/", createMessage);

export { messageRouter }