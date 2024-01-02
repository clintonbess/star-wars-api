import express from 'express'
import planetsController from '../controllers/planets-controller'

const planetsRoutes = express.Router()

planetsRoutes.get('/', planetsController.getAllPlanets)
planetsRoutes.get('/:id', planetsController.getPlanetsById)
planetsRoutes.get('/:id/species', planetsController.getPlanetSpecies)

export default planetsRoutes
