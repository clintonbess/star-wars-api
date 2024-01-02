import request from 'supertest'
import app from '../../src/app'
import getAuthToken from '../auth'

describe('Films Routes', () => {
  let authToken

  beforeAll(async () => {
    const username = 'test'
    const password = 'test'
    authToken = await getAuthToken(username, password)
  })

  test('GET /api/films should return a list of films', async () => {
    const response = await request(app).get('/api/films').set('Cookie', `access_token=${authToken}`)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test('GET /api/films/:id should return a specific film by ID', async () => {
    const filmId = 1
    const response = await request(app)
      .get(`/api/films/${filmId}`)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(response.body).toHaveProperty('id', filmId)
  })

  test('GET /api/films/:id/fastest-starship should return the fastest starship for a film', async () => {
    const filmId = 1
    const expectedResult = {
      id: 1,
      starship_id: 5,
      starship_title: 'Millennium Falcon',
      max_atmosphering_speed: '1050',
      film_title: 'A New Hope',
    }

    const response = await request(app)
      .get(`/api/films/${filmId}/fastest-starship`)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)

    expect(response.body).toEqual(expectedResult)
  })
})
