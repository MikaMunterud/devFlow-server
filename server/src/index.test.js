const request = require('supertest');
const app = require('./index');

describe('Server', () => {
  test('should be running on port 4000', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});

