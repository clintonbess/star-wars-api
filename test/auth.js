import request from 'supertest'
import app from '../src/app'

async function getAuthToken(username, password) {
  const loginResponse = await request(app).post('/login').send({ username, password })
  const token = loginResponse.headers['set-cookie'][0].split(';')[0].split('=')[1]

  return token
}

export default getAuthToken
