import request from 'supertest'
import app from '../../src/app'
import getAuthToken from '../auth'

describe('Starships Routes', () => {
  let authToken

  beforeAll(async () => {
    const username = 'test'
    const password = 'test'
    authToken = await getAuthToken(username, password)
  })

  test('GET /api/starships should return a list of starships', async () => {
    const response = await request(app)
      .get('/api/starships')
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test('GET /api/starships/:id should return details for a specific starship', async () => {
    const starshipId = 1
    const response = await request(app)
      .get(`/api/starships/${starshipId}`)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(response.body).toHaveProperty('id', starshipId)
  })

  test('GET /api/starships/:id/pilots should return pilots for a specific starship', async () => {
    const response = await request(app)
      .get('/api/starships/1/pilots')
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(Array.isArray(response.body.pilots)).toBe(true)
  })

  test('PUT /api/starships/:id should return an updated starship entry', async () => {
    const starshipId = 5
    const updatedStarshipRecord = {
      starship_title: 'Millennium Falcon Test',
      mglt: '75',
      cargo_capacity: '100000',
      consumables: '2 months',
      cost_in_credits: '100000',
      crew: '4',
      hyperdrive_rating: '0.5',
      length: 34.37,
      manufacturer: 'Corellian Engineering Corporation',
      max_atmosphering_speed: '1050',
      model: 'YT-1300 light freighter',
      passengers: '6',
      pilots: [13, 14, 25, 31],
      starship_class: 'Light freighter',
      url: 10,
    }

    const response = await request(app)
      .put(`/api/starships/${starshipId}`)
      .send(updatedStarshipRecord)
      .set('Cookie', `access_token=${authToken}`)
      .expect(201)

    expect(response.body).toHaveProperty('starship_title', updatedStarshipRecord.starship_title)
  })

  test('PUT /api/starships/:id should return a validation error message with an array of details and 400 status', async () => {
    const starshipId = 5
    const updatedStarshipRecord = {
      starship_title: 'Millennium Falcon Test',
    }

    const response = await request(app)
      .put(`/api/starships/${starshipId}`)
      .send(updatedStarshipRecord)
      .set('Cookie', `access_token=${authToken}`)
      .expect(400)

    expect(response.body).toHaveProperty('error', 'Validation Error')
    expect(Array.isArray(response.body.details)).toBe(true)
  })

  test('PATCH /api/starships/:id should return an updated starship entry', async () => {
    const starshipId = 5
    const updatedStarshipRecord = {
      starship_title: 'Millennium Falcon',
    }

    const response = await request(app)
      .patch(`/api/starships/${starshipId}`)
      .send(updatedStarshipRecord)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(response.body).toHaveProperty('starship_title', updatedStarshipRecord.starship_title)
  })

  test('PATCH /api/starships/:id should return a validation error message and 400 status', async () => {
    const starshipId = 5
    const updatedStarshipRecord = {}

    const response = await request(app)
      .patch(`/api/starships/${starshipId}`)
      .send(updatedStarshipRecord)
      .set('Cookie', `access_token=${authToken}`)
      .expect(400)
    expect(response.body).toHaveProperty('error', 'Validation Error')
  })
})
