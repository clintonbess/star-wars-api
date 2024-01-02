import express from 'express'
import filmsController from '../controllers/films-controller'

const filmsRoutes = express.Router()

filmsRoutes.get('/', filmsController.getAllFilms)
filmsRoutes.get('/:id', filmsController.getFilmById)
filmsRoutes.get('/:id/fastest-starship', filmsController.getFilmFastestStarship)

export default filmsRoutes
