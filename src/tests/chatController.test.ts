import supertest from 'supertest';
import app from '../app';
import * as botApiService from '../services/botApiService';
import databaseService from '../services/databaseService';

// Mock the botApiService
jest.mock('../services/botApiService');

describe('Chat Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /chat/user-message', () => {
    it('should save user message in the database', async () => {
      const userData = { message: 'User message' };
      const response = await supertest(app).post('/chat/user-message').send(userData);

      expect(response.status).toBe(200);
      expect(databaseService.saveUserMessage).toHaveBeenCalledWith('User message');
      expect(response.body).toEqual({ success: true });
    });
  });

  describe('POST /chat/bot-response', () => {
    it('should fetch bot response and send it in the response', async () => {
      const userData = { message: 'User message' };
      (botApiService.getBotResponse as jest.Mock).mockResolvedValue('Bot response');

      const response = await supertest(app).post('/chat/bot-response').send(userData);

      expect(response.status).toBe(200);
      expect(botApiService.getBotResponse).toHaveBeenCalledWith('User message');
      expect(response.body).toEqual({ botResponse: 'Bot response' });
    });
  });

  describe('POST /chat/bot-response', () => {
    it('should save bot response in the database', async () => {
      const userData = { botResponse: 'Bot response' };
      const response = await supertest(app).post('/chat/bot-response').send(userData);

      expect(response.status).toBe(200);
      expect(databaseService.saveBotResponse).toHaveBeenCalledWith('Bot response');
      expect(response.body).toEqual({ success: true });
    });
  });
});