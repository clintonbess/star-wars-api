import express from 'express'
import filmsRoutes from './films-routes'
import peopleRoutes from './people-routes'
import planetRoutes from './planets-routes'
import speciesRoutes from './species-routes'
import starshipsRoutes from './starships-routes'
import vehiclesRoutes from './vehicles-routes'
import verifyToken from '../middleware/auth-middleware'

const router = express.Router()
// Apply middleware for verifying JWT to all routes below
router.use('/', verifyToken)
// Mount routes to their respective paths
router.use('/films', filmsRoutes)
router.use('/people', peopleRoutes)
router.use('/planets', planetRoutes)
router.use('/species', speciesRoutes)
router.use('/starships', starshipsRoutes)
router.use('/vehicles', vehiclesRoutes)

export default router
