/**
 * test environment common settings
 * 
 * include all test global settings and teardown
 */

import { connectTestDB, disconnectTestDB, clearDatabase } from '../config/testDb.js';
import app from '../app.js';
import supertest from 'supertest';

// export test request client
export const request = supertest(app);

// run before all tests
beforeAll(async () => {
  // connect to test database
  await connectTestDB();
});

// run before each test
beforeEach(async () => {
  // clear database, ensure test isolation
  await clearDatabase();
});

// run after all tests
afterAll(async () => {
  // disconnect test database
  await disconnectTestDB();
});

/**
 * create test user and get authentication token helper function
 * 
 * @param {Object} userData - user data
 * @param {String} userData.email - user email
 * @param {String} userData.password - userpassword
 * @param {String} userData.username - user name
 * @param {String} userData.role - user role (default is 'user')
 * @returns {Promise<Object>} object containing token and userID
 */
export const createUserAndGetToken = async (userData = {}) => {
  const defaultUser = {
    email: 'test@example.com',
    password: 'password123',
    username: 'testuser',
    role: 'admin'
  };
  
  const user = { ...defaultUser, ...userData };
  
  // register user
  const registerResponse = await request
    .post('/api/v1/auth/register')
    .send(user);
  
  // login and get token
  const loginResponse = await request
    .post('/api/v1/auth/login')
    .send({
      email: user.email,
      password: user.password
    });
  
  return {
    token: loginResponse.body.token,
    userId: registerResponse.body.user._id
  };
}; 