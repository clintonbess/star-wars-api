import express from 'express'
import speciesController from '../controllers/species-controller'

const speciesRoutes = express.Router()

speciesRoutes.get('/', speciesController.getAllSpecies)
speciesRoutes.get('/:id', speciesController.getSpeciesById)

export default speciesRoutes
