import { Request, Response } from "express";
import * as botService from "../services/botApiService";
import databaseService from "../services/databaseService";

class ChatController {
  static async saveUserMessage(req: Request, res: Response): Promise<void> {
    const { message } = req.body;

    // Save user message and context in the MongoDB Atlas database
    await databaseService.saveUserMessage(message);

    res.status(200).json({ success: true });
  }

  static async getBotResponse(req: Request, res: Response): Promise<void> {
    // Fetch user message and context from the MongoDB Atlas database
    const userMessage = req.body.message;
    console.log(userMessage);

    // Send request to chatbot API to get bot response
    const botResponse = await botService.getBotResponse(userMessage);

    res.status(200).json({ botResponse });
  }

  static async saveBotResponse(req: Request, res: Response): Promise<void> {
    const { botResponse } = req.body;

    // Save bot response in the MongoDB Atlas database if needed
    await databaseService.saveBotResponse(botResponse);

    res.status(200).json({ success: true });
  }
}

export default ChatController;
