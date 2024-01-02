import request from 'supertest'
import app from '../../src/app'
import getAuthToken from '../auth'

describe('Planets Routes', () => {
  let authToken

  beforeAll(async () => {
    const username = 'test'
    const password = 'test'
    authToken = await getAuthToken(username, password)
  })

  test('GET /api/planets should return a list of planets', async () => {
    const response = await request(app)
      .get('/api/planets')
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test('GET /api/planets/:id should return details for a specific planet', async () => {
    const planetId = 1
    const response = await request(app)
      .get(`/api/planets/${planetId}`)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(response.body).toHaveProperty('id', planetId)
  })

  test('GET /api/planets/:id/species should return species for a specific planet', async () => {
    const planetId = 1
    const response = await request(app)
      .get(`/api/planets/${planetId}/species`)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(Array.isArray(response.body.species)).toBe(true)
  })
})
