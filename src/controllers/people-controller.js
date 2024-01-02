import peopleModel from '../models/PeopleModel'
import { validateFields, handleValidationError, unsetRequiredFields } from './util/validator'

// Define people field definitions for validation
const PEOPLE_FIELD_DEFS = [
  { name: 'character_name', type: 'string', required: true },
  { name: 'birth_year', type: 'string', required: true },
  { name: 'eye_color', type: 'string', required: true },
  { name: 'gender', type: 'string', required: true },
  { name: 'homeworld', type: 'number', required: true },
  { name: 'hair_color', type: 'string', required: true },
  { name: 'height', type: 'string', required: true },
  { name: 'mass', type: 'string', required: true },
  { name: 'skin_color', type: 'string', required: true },
  { name: 'species', type: 'number', required: true },
  { name: 'starships', type: 'array', required: false },
  { name: 'url', type: 'number', required: false },
  { name: 'vehicles', type: 'array', required: false },
  { name: 'films', type: 'array', required: false },
]

// Define method-specific field definitions
const METHOD_FIELD_DEFS = {
  PUT: PEOPLE_FIELD_DEFS,
  PATCH: unsetRequiredFields(PEOPLE_FIELD_DEFS),
}

const getAllPeople = async (req, res) => {
  try {
    const people = await peopleModel.getAll()
    res.json(people)
  } catch (err) {
    console.error('Error fetching people:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const searchPeople = async (req, res) => {
  const { searchQuery } = req.query
  // Check if a search query is provided
  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query is required' })
  }

  try {
    const people = await peopleModel.searchCharacterName(searchQuery)
    res.json(people)
  } catch (err) {
    console.error('Error searching people:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getPersonById = async (req, res) => {
  const peopleId = req.params.id
  try {
    const person = await peopleModel.getById(peopleId)
    // Check if a person with the given ID exists
    if (person == null) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.json(person)
  } catch (err) {
    console.error(`Error fetching people with id ${peopleId}:`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getPersonFilms = async (req, res) => {
  const peopleId = req.params.id
  try {
    const person = await peopleModel.getPersonWithFilms(peopleId)
    // Check if a person with the given ID exists
    if (person == null) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.json(person)
  } catch (err) {
    console.error(`Error fetching people with id ${peopleId}:`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getPersonSpecies = async (req, res) => {
  const peopleId = req.params.id
  try {
    const person = await peopleModel.getPersonWithSpecies(peopleId)
    // Check if a person with the given ID exists
    if (person == null) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.json(person)
  } catch (err) {
    console.error(`Error fetching people with id ${peopleId}:`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updatePersonById = async (req, res) => {
  const peopleId = req.params.id
  const updatedData = req.body
  try {
    // Validate user input against defined field definitions for PUT method
    validateFields(updatedData, METHOD_FIELD_DEFS.PUT)
    const updatedPerson = await peopleModel.updateById(peopleId, updatedData)
    // Check if person exists
    if (updatedPerson == null) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.status(201).json(updatedPerson)
  } catch (err) {
    // Handle validation errors that occur and respond with 400 or 500
    handleValidationError(err, res)
  }
}

const partialUpdatePersonById = async (req, res) => {
  const peopleId = req.params.id
  const updatedData = req.body

  try {
    // Validate user input against defined field definitions for PATCH method
    validateFields(updatedData, METHOD_FIELD_DEFS.PATCH)
    const updatedPerson = await peopleModel.updateById(peopleId, updatedData)
    // Check if person exists
    if (updatedPerson == null) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.json(updatedPerson)
  } catch (err) {
    // Handle validation errors that occur and respond with 400 or 500
    handleValidationError(err, res)
  }
}

const peopleController = {
  getAllPeople,
  searchPeople,
  getPersonById,
  getPersonFilms,
  getPersonSpecies,
  updatePersonById,
  partialUpdatePersonById,
}

export default peopleController
