import { validateFields, handleValidationError, unsetRequiredFields } from './util/validator'
import vehiclesModel from '../models/VehicleModel'

// Define vehicle field definitions for validation
const VEHICLE_FIELD_DEFS = [
  { name: 'vehicle_name', type: 'string', required: true },
  { name: 'cargo_capacity', type: 'string', required: true },
  { name: 'consumables', type: 'string', required: true },
  { name: 'cost_in_credits', type: 'string', required: true },
  { name: 'crew', type: 'number', required: true },
  { name: 'films', type: 'array', required: true },
  { name: 'length', type: 'string', required: true },
  { name: 'manufacturer', type: 'string', required: true },
  { name: 'max_atmosphering_speed', type: 'string', required: true },
  { name: 'model', type: 'string', required: true },
  { name: 'passengers', type: 'string', required: true },
  { name: 'pilots', type: 'array', required: false },
  { name: 'url', type: 'number', required: true },
  { name: 'vehicle_class', type: 'string', required: true },
]

// Define method-specific field definitions
const METHOD_FIELD_DEFS = {
  POST: VEHICLE_FIELD_DEFS,
  PUT: VEHICLE_FIELD_DEFS,
  PATCH: unsetRequiredFields(VEHICLE_FIELD_DEFS),
}

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehiclesModel.getAll()
    res.json(vehicles)
  } catch (err) {
    console.error('Error fetching vehicles:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getVehicleById = async (req, res) => {
  const vehicleId = req.params.id
  try {
    const vehicle = await vehiclesModel.getById(vehicleId)
    // Check if vehicle exists
    if (vehicle == null) {
      return res.status(404).json({ error: 'Vehicle not found' })
    }

    res.json(vehicle)
  } catch (err) {
    console.error(`Error fetching vehicles with id ${vehicleId}:`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const insertVehicle = async (req, res) => {
  const data = req.body
  try {
    // Validate user input against defined field definitions for POST method
    validateFields(data, METHOD_FIELD_DEFS.POST)
    const vehicleExists = await vehiclesModel.vehicleExists(data.vehicle_name)
    // Check if vehicle exists
    if (vehicleExists === true) {
      return res.status(409).json({ error: 'Vehicle already exists' })
    }

    const insertedVehicle = await vehiclesModel.insert(data)
    res.status(201).json(insertedVehicle)
  } catch (err) {
    // Handle validation errors that occur and respond with 400 or 500
    handleValidationError(err, res)
  }
}

const updateVehicleById = async (req, res) => {
  const vehicleId = req.params.id
  const updatedData = req.body
  try {
    // Validate user input against defined field definitions for PUT method
    validateFields(updatedData, METHOD_FIELD_DEFS.PUT)
    const updatedVehicle = await vehiclesModel.updateById(vehicleId, updatedData)
    // Check if vehicle exists
    if (updatedVehicle == null) {
      return res.status(404).json({ error: 'Vehicle not found' })
    }

    res.status(201).json(updatedVehicle)
  } catch (err) {
    // Handle validation errors that occur and respond with 400 or 500
    handleValidationError(err, res)
  }
}

const partialUpdateVehicleById = async (req, res) => {
  const vehicleId = req.params.id
  const updatedData = req.body
  try {
    // Validate user input against defined field definitions for PATCH method
    validateFields(updatedData, METHOD_FIELD_DEFS.PATCH)
    const updatedVehicle = await vehiclesModel.updateById(vehicleId, updatedData)
    // Check if vehicle exists
    if (updatedVehicle == null) {
      return res.status(404).json({ error: 'Vehicle not found' })
    }

    res.json(updatedVehicle)
  } catch (err) {
    // Handle validation errors that occur and respond with 400 or 500
    handleValidationError(err, res)
  }
}

const vehiclesController = {
  getAllVehicles,
  getVehicleById,
  insertVehicle,
  updateVehicleById,
  partialUpdateVehicleById,
}

export default vehiclesController
