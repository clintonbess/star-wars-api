import request from 'supertest'
import app from '../../src/app'
import getAuthToken from '../auth'

describe('People Routes', () => {
  let authToken

  beforeAll(async () => {
    const username = 'test'
    const password = 'test'
    authToken = await getAuthToken(username, password)
  })

  test('GET /api/people should return a list of people', async () => {
    const response = await request(app).get('/api/people').set('Cookie', `access_token=${authToken}`).expect(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test('GET /api/people/search should return search results', async () => {
    const response = await request(app)
      .get('/api/people/search?searchQuery=Luke')
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test('GET /api/people/:id should return details for a specific person', async () => {
    const peopleId = 1
    const response = await request(app)
      .get(`/api/people/${peopleId}`)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(response.body).toHaveProperty('id', peopleId)
  })

  test('GET /api/people/:id/films should return films for a specific person', async () => {
    const response = await request(app)
      .get('/api/people/1/films')
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(Array.isArray(response.body.films)).toBe(true)
  })

  test('GET /api/people/:id/species should return species for a specific person', async () => {
    const peopleId = 1
    const expectedResult = {
      id: peopleId,
      character_name: 'Luke Skywalker',
      species_name: 'Human',
      language: 'Galactic Basic',
    }

    const response = await request(app)
      .get(`/api/people/${peopleId}/species`)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(response.body).toEqual(expectedResult)
  })

  test('PUT /api/people/:id should return an updated person entry', async () => {
    const peopleId = 17
    const updatedPersonEntry = {
      character_name: 'Clinton Bess',
      birth_year: '1990',
      eye_color: 'blue',
      films: [1, 2, 3],
      gender: 'male',
      hair_color: 'salt and pepper',
      height: '188',
      homeworld: 1,
      mass: '95',
      skin_color: 'brown',
      species: 1,
      starships: null,
      url: 16,
      vehicles: null,
    }

    const response = await request(app)
      .put(`/api/people/${peopleId}`)
      .send(updatedPersonEntry)
      .set('Cookie', `access_token=${authToken}`)
      .expect(201)

    expect(response.body).toHaveProperty('hair_color', 'salt and pepper')
  })

  test('PUT /api/people/:id should return a validation error message with an array of details and 400 status', async () => {
    const peopleId = 17
    const updatedPersonEntry = {
      character_name: 'Clinton Bess',
      birth_year: '1990',
      eye_color: 'blue',
    }

    const response = await request(app)
      .put(`/api/people/${peopleId}`)
      .send(updatedPersonEntry)
      .set('Cookie', `access_token=${authToken}`)
      .expect(400)

    expect(response.body).toHaveProperty('error', 'Validation Error')
    expect(Array.isArray(response.body.details)).toBe(true)
  })

  test('PATCH /api/people/:id should return an updated person entry', async () => {
    const updatedPersonEntry = {
      character_name: 'Clinton Bess',
      hair_color: 'salt and pepper',
    }

    const response = await request(app)
      .patch('/api/people/17')
      .send(updatedPersonEntry)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(response.body).toHaveProperty('hair_color', 'salt and pepper')
  })

  test('PATCH /api/people/:id should return a validation error message and 400 status', async () => {
    const updatedPersonEntry = {}

    const response = await request(app)
      .patch('/api/people/17')
      .send(updatedPersonEntry)
      .set('Cookie', `access_token=${authToken}`)
      .expect(400)
    expect(response.body).toHaveProperty('error', 'Validation Error')
  })

  test('DELETE /api/people/:id should respond with 204 status', async () => {
    const peopleId = 17
    const response = await request(app)
      .delete(`/api/people/${peopleId}`)
      .set('Cookie', `access_token=${authToken}`)
      .expect(204)
  })
})
