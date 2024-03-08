import messageModel from '../repository/models/messageModel';

class databaseService {
  static async saveUserMessage(message: string): Promise<void> {
    // Save user message and context in the MongoDB Atlas database
    await messageModel.create({ type: 'user', content: message });
  }

  static async fetchUserMessage(): Promise<string> {
    // Fetch the latest user message from the MongoDB Atlas database
    const latestUserMessage = await messageModel.findOne({ type: 'user' }).sort({ createdAt: -1 });
    return latestUserMessage ? latestUserMessage.content : '';
  }

  static async saveBotResponse(botResponse: string): Promise<void> {
    // Save bot response in the MongoDB Atlas database (if needed)
    await messageModel.create({ type: 'bot', content: botResponse });
  }
}

export default databaseService;
