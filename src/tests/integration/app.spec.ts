import request from 'supertest'
import { App } from '../../app'

describe('Server test', () => {
  const app = new App().app
  let nextRequestUrl
  it('should test server running', async () => {
    const response = await request(app).get('/messages')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual([])
  })
  it('should test the connection to a stream', async () => {
    const startHourRequest = Date.now()
    const response = await request(app)
      .get('/api/pix/32074986/stream/start')
      .set('Accept', 'application/json')
    const entHourRequest = Date.now()
    const diffTime = entHourRequest - startHourRequest // Calcula o tempo decorrido em milissegundos

    expect(response.body).toStrictEqual({})
    expect(response.statusCode).toBe(204)
    expect(response.headers).toHaveProperty('pull-next')
    expect(diffTime).toBeGreaterThanOrEqual(8000)
    expect(diffTime).toBeLessThanOrEqual(9000)
    nextRequestUrl = response.headers['pull-next']
  }, 10000)
  it('should test if the connection remains open', async () => {
    expect(nextRequestUrl).toBeDefined()
    const startHourRequest = Date.now()
    const response = await request(app)
      .get(nextRequestUrl)
      .set('Accept', 'application/json')
    const entHourRequest = Date.now()
    const diffTime = entHourRequest - startHourRequest // Calcula o tempo decorrido em milissegundos

    expect(response.body).toStrictEqual({})
    expect(response.statusCode).toBe(204)
    expect(response.headers).toHaveProperty('pull-next')
    expect(diffTime).toBeGreaterThanOrEqual(8000)
    expect(diffTime).toBeLessThanOrEqual(9000)
    nextRequestUrl = response.headers['pull-next']
  }, 10000)

  it('should test creating pix messages', async () => {
    const response = await request(app).post('/api/util/msgs/32074986/15')
    expect(response.body).toStrictEqual({
      message: 'Mensagens PIX adicionadas com sucesso.',
    })
    expect(response.statusCode).toBe(201)
    const responseMessages = await request(app).get('/messages')
    expect(responseMessages.statusCode).toBe(200)
    expect(responseMessages.body.length).toEqual(15)
  })

  it('should test disconnecting a stream', async () => {
    const response = await request(app).delete(nextRequestUrl)
    expect(response.body).toStrictEqual({})
    expect(response.statusCode).toBe(200)
    // tentando se conectar novamente.
    const responseMessage = await request(app).get(nextRequestUrl)
    expect(responseMessage.statusCode).toBe(404)
    expect(responseMessage.body).toStrictEqual({
      message: 'Interaction not found, check your connection',
    })
  })

})
