import request from 'supertest'
import { App } from '../../app'

describe('Server test', () => {
  const app = new App().app
  it('should test server running', async () => {
    const response = await request(app).get('/messages')
    expect(response.body).toStrictEqual([])
  })
})
