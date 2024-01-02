import express from 'express'
import peopleController from '../controllers/people-controller'

const peopleRoutes = express.Router()

peopleRoutes.get('/', peopleController.getAllPeople)
peopleRoutes.get('/search', peopleController.searchPeople)
peopleRoutes.get('/:id', peopleController.getPersonById)
peopleRoutes.get('/:id/films', peopleController.getPersonFilms)
peopleRoutes.get('/:id/species', peopleController.getPersonSpecies)

peopleRoutes.put('/:id', peopleController.updatePersonById)
peopleRoutes.patch('/:id', peopleController.partialUpdatePersonById)
peopleRoutes.delete('/:id', peopleController.deletePersonById)

export default peopleRoutes
