import express from 'express'
import starshipsController from '../controllers/starships-controller'

const starshipsRoutes = express.Router()

starshipsRoutes.get('/', starshipsController.getAllStarships)
starshipsRoutes.get('/:id', starshipsController.getStarshipById)
starshipsRoutes.get('/:id/pilots', starshipsController.getStarshipPilots)

starshipsRoutes.put('/:id', starshipsController.updateStarshipById)
starshipsRoutes.patch('/:id', starshipsController.partialUpdateStarshipById)

export default starshipsRoutes
