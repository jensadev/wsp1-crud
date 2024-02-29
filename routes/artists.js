const express = require('express')
const router = express.Router()
const { body, matchedData, validationResult } = require('express-validator')

const pool = require('../db')

// get /artists
router.get('/', async (req, res) => {
  const [artists] = await pool.promise().query('SELECT * FROM jens_artist')

  res.render('artists.njk', {
    title: 'All artists',
    artists,
  })
})

router.get('/new', (req, res) => {
  res.render('newartist.njk', {
    title: 'Create new artist',
  })
})

router.post(
  '/new',
  body('name').notEmpty().trim().escape(),
  async (req, res) => {

    const result = validationResult(req);

    if (result.isEmpty()) {
      const data = matchedData(req);
      const [dbResult] = await pool
        .promise()
        .query('INSERT INTO jens_artist (name) VALUES (?)', [data.name])

      if (dbResult.affectedRows === 1) {
        res.send('form posted, artist created')
      } else {
        // server error
        res.status(500)
      }
    } else {
      res.send({ errors: result.array() });
    }
  }
)

// get /artists/:id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (Number.isInteger(id)) {
    // använd id hämta från databas
    const [artist] = await pool
      .promise()
      .query('SELECT * FROM jens_artist WHERE id = ?', [id])

    res.render('artist.njk', {
      title: artist[0].name,
      artist: artist[0],
    })
  } else {
    // meddela användaren att något gick fel
    console.log('id är inte en int: ', id)
    res.redirect('/artists')
  }
})

module.exports = router
