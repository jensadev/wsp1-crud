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

// get /artists/:id
router.get('/:id', (req, res) => {
  res.send("artist")
})



module.exports = router