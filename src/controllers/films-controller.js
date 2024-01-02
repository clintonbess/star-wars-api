import filmsModel from '../models/FilmsModel'

const getAllFilms = async (req, res) => {
  try {
    const films = await filmsModel.getAll()
    res.json(films)
  } catch (err) {
    console.error('Error fetching films:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getFilmById = async (req, res) => {
  const filmId = req.params.id
  try {
    const film = await filmsModel.getById(filmId)

    // Check if a film with the given ID exists
    if (film == null) {
      return res.status(404).json({ error: 'Film not found' })
    }

    res.json(film)
  } catch (err) {
    console.error(`Error fetching film with id ${filmId}:`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
const getFilmFastestStarship = async (req, res) => {
  const filmId = req.params.id
  try {
    const filmwWithFastestStarship = await filmsModel.getFilmFastestStarship(filmId)

    // Check if a film with the given ID exists
    if (filmwWithFastestStarship == null) {
      return res.status(404).json({ error: 'Film not found' })
    }

    res.json(filmwWithFastestStarship)
  } catch (err) {
    console.error(`Error fetching film with id ${filmId}:`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const filmsController = {
  getAllFilms,
  getFilmById,
  getFilmFastestStarship,
}

export default filmsController
