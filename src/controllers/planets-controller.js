import planetsModel from '../models/PlanetsModels'

const getAllPlanets = async (req, res) => {
  try {
    const planets = await planetsModel.getAll()
    res.json(planets)
  } catch (err) {
    console.error('Error fetching planets:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getPlanetsById = async (req, res) => {
  const planetId = req.params.id
  try {
    const planet = await planetsModel.getById(planetId)
    // Check if planet exists
    if (planet == null) {
      return res.status(404).json({ error: 'Planet not found' })
    }

    res.json(planet)
  } catch (err) {
    console.error(`Error fetching planets with id ${planetId}:`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getPlanetSpecies = async (req, res) => {
  const planetId = req.params.id
  try {
    const planetWithSpecies = await planetsModel.getSpeciesFromPlanet(planetId)
    // Check if planet exists
    if (planetWithSpecies == null) {
      return res.status(404).json({ error: 'Planet not found' })
    }

    res.json(planetWithSpecies)
  } catch (err) {
    console.error(`Error fetching planets with id ${planetId}:`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const planetsController = {
  getAllPlanets,
  getPlanetsById,
  getPlanetSpecies,
}

export default planetsController
