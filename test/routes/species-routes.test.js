import request from 'supertest'
import app from '../../src/app'
import getAuthToken from '../auth'

describe('Species Routes', () => {
  let authToken

  beforeAll(async () => {
    const username = 'test'
    const password = 'test'
    authToken = await getAuthToken(username, password)
  })

  test('GET /api/species should return a list of species', async () => {
    const response = await request(app)
      .get('/api/species')
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test('GET /api/species/:id should return details for a specific species', async () => {
    const speciesId = 1
    const response = await request(app)
      .get(`/api/species/${speciesId}`)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(response.body).toHaveProperty('id', speciesId)
  })
})
