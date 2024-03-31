import { Request, Response, NextFunction } from "express";
import { verifyUser } from '../controllers/userController';

describe('verifyUser function', () => {
  // Test successful user verification
//   it('should return 200 with success message if user is found', async () => {
//     const req = { body: { email: "senuvi@j.com", password: "correct_password" } } as Request; // Replace with valid credentials
//     const res = ({
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       } as unknown) as Response;
//     const next = jest.fn();

//     await verifyUser(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({ message: 'User verified successfully' });
//     expect(next).not.toHaveBeenCalled();
//   });

  // Test user not found scenario (if applicable)
  it('should call next with error if user is not found', async () => {
    const req = { body: { email: "invalid@user.com", password: "invalidpassword" } } as Request;
    const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown) as Response;
    const next = jest.fn();

    await verifyUser(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error('User not found!'));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});