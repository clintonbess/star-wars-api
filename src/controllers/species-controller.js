import speciesModel from '../models/SpeciesModel'

const getAllSpecies = async (req, res) => {
  try {
    const species = await speciesModel.getAll()
    res.json(species)
  } catch (err) {
    console.error('Error fetching species:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getSpeciesById = async (req, res) => {
  const speciesId = req.params.id
  try {
    const specie = await speciesModel.getById(speciesId)
    // Check if species exists
    if (specie == null) {
      return res.status(404).json({ error: 'Specie not found' })
    }

    res.json(specie)
  } catch (err) {
    console.error(`Error fetching species with id ${speciesId}:`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const speciesController = {
  getAllSpecies,
  getSpeciesById,
}

export default speciesController
