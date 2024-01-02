import starshipsModel from '../models/StarshipsModel'
import { validateFields, handleValidationError, unsetRequiredFields } from './util/validator'

// Define starship field definitions for validation
const STARSHIP_FIELD_DEFS = [
  { name: 'starship_title', type: 'string', required: true },
  { name: 'mglt', type: 'string', required: true },
  { name: 'cargo_capacity', type: 'string', required: true },
  { name: 'consumables', type: 'string', required: true },
  { name: 'cost_in_credits', type: 'string', required: true },
  { name: 'crew', type: 'string', required: true },
  { name: 'hyperdrive_rating', type: 'string', required: true },
  { name: 'length', type: 'number', required: true },
  { name: 'manufacturer', type: 'string', required: true },
  { name: 'max_atmosphering_speed', type: 'string', required: true },
  { name: 'model', type: 'string', required: true },
  { name: 'passengers', type: 'string', required: true },
  { name: 'pilots', type: 'array', required: false },
  { name: 'starship_class', type: 'string', required: true },
  { name: 'url', type: 'number', required: false },
]

// Define method-specific field definitions
const METHOD_FIELD_DEFS = {
  INSERT: STARSHIP_FIELD_DEFS,
  PUT: STARSHIP_FIELD_DEFS,
  PATCH: unsetRequiredFields(STARSHIP_FIELD_DEFS),
}

const getAllStarships = async (req, res) => {
  try {
    const starships = await starshipsModel.getAll()
    res.json(starships)
  } catch (err) {
    console.error('Error fetching starships:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getStarshipById = async (req, res) => {
  const starshipsId = req.params.id
  try {
    const starship = await starshipsModel.getById(starshipsId)
    // Check if starship exists
    if (starship == null) {
      return res.status(404).json({ error: 'Starship not found' })
    }

    res.json(starship)
  } catch (err) {
    console.error(`Error fetching starships with id ${starshipsId}:`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateStarshipById = async (req, res) => {
  const starshipId = req.params.id
  const updatedData = req.body
  try {
    // Validate user input against defined field definitions for PUT method
    validateFields(updatedData, METHOD_FIELD_DEFS.PUT)
    const updatedStarship = await starshipsModel.updateById(starshipId, updatedData)
    // Check if starship exists
    if (updatedStarship == null) {
      return res.status(404).json({ error: 'Starship not found' })
    }

    res.status(201).json(updatedStarship)
  } catch (err) {
    // Handle validation errors that occur and respond with 400 or 500
    handleValidationError(err, res)
  }
}

const partialUpdateStarshipById = async (req, res) => {
  const starshipId = req.params.id
  const updatedData = req.body
  try {
    // Validate user input against defined field definitions for PATCH method
    validateFields(updatedData, METHOD_FIELD_DEFS.PATCH)
    const updatedStarship = await starshipsModel.updateById(starshipId, updatedData)
    // Check if starship exists
    if (updatedStarship == null) {
      return res.status(404).json({ error: 'Starship not found' })
    }

    res.json(updatedStarship)
  } catch (err) {
    // Handle validation errors that occur and respond with 400 or 500
    handleValidationError(err, res)
  }
}

const getStarshipPilots = async (req, res) => {
  const starshipId = req.params.id
  try {
    const starshipPilots = await starshipsModel.getStarshipPilots(starshipId)
    // Check if starship  exists
    if (starshipPilots == null) {
      return res.status(404).json({ error: 'Starship not found' })
    }

    res.json(starshipPilots)
  } catch (err) {
    console.error(`Error fetching starships with id: ${starshipId}`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const starshipsController = {
  getAllStarships,
  getStarshipById,
  getStarshipPilots,
  updateStarshipById,
  partialUpdateStarshipById,
}

export default starshipsController
