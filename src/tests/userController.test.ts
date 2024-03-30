import supertest from 'supertest';
import app from '../app';
import User from '../repository/models/userModel';

describe('User Controller', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = { email: 'senuvi@j.com', password: 'password' };
      const response = await supertest(app).post('/users').send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'User created successfully' });
    });

    describe('GET /users/:id', () => {
        it('should get a user by ID', async () => {
          const newUser = await User.create({ email: 'senuvi@j.com', password: 'password' });
          const response = await supertest(app).get(`/users/${newUser._id}`);
    
          expect(response.status).toBe(200);
          expect(response.body.user.email).toBe('senuvi@j.com');
        });
    
        it('should return 404 if user is not found', async () => {
          const response = await supertest(app).get(`/users/invalid_id`);
    
          expect(response.status).toBe(404);
          expect(response.body).toEqual({ error: 'User not found!' });
        });
      });
    
      describe('PUT /users/:id', () => {
        it('should update a user', async () => {
          const newUser = await User.create({ email: 'senuvi@j.com', password: 'password' });
          const response = await supertest(app).put(`/users/${newUser._id}`).send({ email: 'senuvi@j.com' });
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ message: 'User updated successfully' });
        });
    
        it('should return 404 if user is not found', async () => {
          const response = await supertest(app).put(`/users/invalid_id`).send({ email: 'senuvi@j.com' });
    
          expect(response.status).toBe(404);
          expect(response.body).toEqual({ error: 'User not found!' });
        });
      });
    
      describe('DELETE /users/:id', () => {
        it('should delete a user', async () => {
          const newUser = await User.create({ email: 'senuvi@j.com', password: 'password' });
          const response = await supertest(app).delete(`/users/${newUser._id}`);
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ message: 'User deleted successfully' });
        });
    
        it('should return 404 if user is not found', async () => {
          const response = await supertest(app).delete(`/users/invalid_id`);
    
          expect(response.status).toBe(404);
          expect(response.body).toEqual({ error: 'User not found!' });
        });
      });
    });
  
});
