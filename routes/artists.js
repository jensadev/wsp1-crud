const express = require('express')
const router = express.Router()

const pool = require('../db')

// get /artists
router.get('/', async (req, res) => {
  const [artists] = await pool.promise().query('SELECT * FROM jens_artist')

  res.render('artists.njk', {
    title: 'All artists',
    artists
  })
})

router.get('/new', (req, res) => {
  res.render('newartist.njk', {
    title: 'Create new artist'
  })
})

router.post('/new', async (req, res) => {
  console.log(req.body.name)
  // INSERT INTO `jens_artist` (`name`) VALUES ('Dream Theater');
  const name = req.body.name // tvätta och validera

  const [result] = await pool.promise().query('INSERT INTO jens_artist (name) VALUES (?)', [name])

  if (result.affectedRows === 1) {
    res.send('form posted, artist created')
  } else {
    console.log(result)
    // meddela att något gick fel
    res.redirect('/artists/new')
  }

})

// get /artists/:id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (Number.isInteger(id)) {
    // använd id hämta från databas
    const [artist] = await pool.promise().query('SELECT * FROM jens_artist WHERE id = ?', [id])

    res.render('artist.njk', {
      title: artist[0].name,
      artist: artist[0]
    })
  } else {
    // meddela användaren att något gick fel
    console.log('id är inte en int: ', id)
    res.redirect('/artists')
  }
})



module.exports = router