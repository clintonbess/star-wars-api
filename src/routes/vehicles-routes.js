import express from 'express'
import vehiclesController from '../controllers/vehicles-controller'

const vehiclesRoutes = express.Router()

vehiclesRoutes.get('/', vehiclesController.getAllVehicles)
vehiclesRoutes.get('/:id', vehiclesController.getVehicleById)

vehiclesRoutes.post('/', vehiclesController.insertVehicle)
vehiclesRoutes.put('/:id', vehiclesController.updateVehicleById)
vehiclesRoutes.patch('/:id', vehiclesController.partialUpdateVehicleById)

export default vehiclesRoutes
