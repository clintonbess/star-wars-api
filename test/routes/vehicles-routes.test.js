import request from 'supertest'
import app from '../../src/app'
import getAuthToken from '../auth'

describe('Vehicles Routes', () => {
  let authToken

  beforeAll(async () => {
    const username = 'test'
    const password = 'test'
    authToken = await getAuthToken(username, password)
  })

  test('GET /api/vehicles should return a list of vehicles', async () => {
    const response = await request(app)
      .get('/api/vehicles')
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test('GET /api/vehicles/:id should return details for a specific vehicle', async () => {
    const vehicleId = 1
    const response = await request(app)
      .get(`/api/vehicles/${vehicleId}`)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(response.body).toHaveProperty('id', vehicleId)
  })

  test('POST /api/vehicles should create and return details for a new vehicle', async () => {
    const timestamp = Date.now()
    const newVehicleEntry = {
      vehicle_name: 'Another New Vehicle' + timestamp,
      cargo_capacity: '33',
      consumables: 'none',
      cost_in_credits: 'unknown',
      crew: 2,
      films: [2],
      length: '4.5',
      manufacturer: 'Incom corporation',
      max_atmosphering_speed: '650',
      model: 't-47 airspeeder',
      passengers: '0',
      pilots: [1, 18],
      url: 14,
      vehicle_class: 'airspeeder',
    }

    const response = await request(app)
      .post(`/api/vehicles`)
      .send(newVehicleEntry)
      .set('Cookie', `access_token=${authToken}`)
      .expect(201)
    expect(response.body).toHaveProperty('vehicle_name', newVehicleEntry.vehicle_name)
  })

  test('PUT /api/vehicles/:id should return an updated vehicle entry', async () => {
    const vehicleId = 5
    const updatedVehicleRecord = {
      vehicle_name: 'Snow speeder test',
      cargo_capacity: '33',
      consumables: 'none',
      cost_in_credits: 'unknown',
      crew: 2,
      films: [2],
      length: '4.5',
      manufacturer: 'Incom corporation',
      max_atmosphering_speed: '650',
      model: 't-47 airspeeder',
      passengers: '0',
      pilots: [1, 18],
      url: 14,
      vehicle_class: 'airspeeder',
    }

    const response = await request(app)
      .put(`/api/vehicles/${vehicleId}`)
      .send(updatedVehicleRecord)
      .set('Cookie', `access_token=${authToken}`)
      .expect(201)

    expect(response.body).toHaveProperty('vehicle_name', updatedVehicleRecord.vehicle_name)
  })

  test('PUT /api/vehicles/:id should return a validation error message with an array of details and 400 status', async () => {
    const vehicleId = 5
    const updatedVehicleRecord = {
      vehicle_name: 'Snow speeder test',
    }

    const response = await request(app)
      .put(`/api/vehicles/${vehicleId}`)
      .send(updatedVehicleRecord)
      .set('Cookie', `access_token=${authToken}`)
      .expect(400)

    expect(response.body).toHaveProperty('error', 'Validation Error')
    expect(Array.isArray(response.body.details)).toBe(true)
  })

  test('PATCH /api/vehicles/:id should return an updated vehicle entry', async () => {
    const vehicleId = 5
    const updatedVehicleRecord = {
      vehicle_name: 'Snowspeeder',
    }

    const response = await request(app)
      .patch(`/api/vehicles/${vehicleId}`)
      .send(updatedVehicleRecord)
      .set('Cookie', `access_token=${authToken}`)
      .expect(200)
    expect(response.body).toHaveProperty('vehicle_name', updatedVehicleRecord.vehicle_name)
  })

  test('PATCH /api/vehicles/:id should return a validation error message and 400 status', async () => {
    const vehicleId = 5
    const updatedVehicleRecord = {}

    const response = await request(app)
      .patch(`/api/vehicles/${vehicleId}`)
      .send(updatedVehicleRecord)
      .set('Cookie', `access_token=${authToken}`)
      .expect(400)
    expect(response.body).toHaveProperty('error', 'Validation Error')
  })
})
