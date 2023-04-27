const request = require('supertest');
const app = require('./index');

describe('Server', () => {
  test('should be running on port 4000', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Success: server is running on port 4000");
  });
});
