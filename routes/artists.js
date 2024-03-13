const express = require('express')
const router = express.Router()
const {
  body,
  matchedData,
  param,
  validationResult,
} = require('express-validator')

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
    const result = validationResult(req)

    if (result.isEmpty()) {
      const data = matchedData(req)
      const [dbResult] = await pool
        .promise()
        .query('INSERT INTO jens_artist (name) VALUES (?)', [data.name])

      if (dbResult.affectedRows === 1) {
        // res.send('form posted, artist created')
        console.log(dbResult)
        // res.redirect('/artists/' + dbResult.insertId)
        res.redirect('/artists')
      } else {
        // server error
        res.status(500)
      }
    } else {
      res.send({ errors: result.array() })
    }
  }
)

router.get(
  '/:id/edit',
  param('id').notEmpty().isInt().trim(),
  async (req, res) => {
    const validation = validationResult(req)
    console.log(validation)

    if (validation.isEmpty()) {
      const data = matchedData(req)
      const [artist] = await pool
        .promise()
        .query('SELECT * FROM jens_artist WHERE id = ?', [data.id])

        if (artist.length > 0) {
          res.render('editartist.njk', {
            title: 'Edit artist',
            artist: artist[0],
          })
        } else {
          console.log('artist not found error')
          res.redirect('/artists')
        }
    } else {
      res.send('validation error')
    }
  }
)
router.post(
  '/:id/edit',
  body('name').notEmpty().trim().escape(),
  param('id').notEmpty().isInt().trim(),
  async (req, res) => {
    const validation = validationResult(req)

    if (validation.isEmpty()) {
      const data = matchedData(req)
      const [artist] = await pool
      .promise()
      .query('SELECT * FROM jens_artist WHERE id = ?', [data.id])

      if(artist.length > 0) {
        if (artist[0].name === data.name) {
          console.log('nothing to update')
          return res.redirect('/artists')
        } else {
          const [result] = await pool.promise().query(
            'UPDATE jens_artist SET name=? WHERE id=?', [data.name, data.id]
          )
          if(result.changedRows === 1) {
            console.log('artist uppdated')
            res.redirect('/artists/' + data.id)
          } else {
            console.log('failed to update')
            res.redirect(`/artists/${data.id}/edit`)
          }
        }
      } else {
        console.log('artist not found')
        res.redirect('/artists')
      }




      // if (dbResult.affectedRows === 1) {
      //   // res.send('form posted, artist created')
      //   console.log(dbResult)
      //   // res.redirect('/artists/' + dbResult.insertId)
      //   res.redirect('/artists')
      // } else {
      //   // server error
      //   res.status(500)
      // }
    } else {
      res.send({ errors: result.array() })
    }
  }
)
// router.post('/:id', (req, res) => {
//   // validera data

//   // kör sql fråga
//   // UPDATE `te21`.`jens_album` SET `titel` = 'The Ride Majestic s' WHERE `id` = 2 AND `artist_id` = 3 AND `titel` = 'The Ride Majestic' AND `year` = '2015' LIMIT 1;
//   res.send('uppdaterat')
// })

// delete
router.post(
  '/:id/delete',
  param('id').notEmpty().isInt().trim(),
  async (req, res) => {
    const validation = validationResult(req)
    console.log(validation)
    if (validation.isEmpty()) {
      const data = matchedData(req)
      const [result] = await pool
        .promise()
        .query('DELETE FROM jens_artist WHERE id = ?', [data.id])

      if (result.affectedRows === 1) {
        // resource deleted
        res.redirect('/artists')
      } else {
        // säga att något gick fel
        res.redirect('/artists')
      }
    } else {
      res.send('validation failed')
    }
  }
)

// get /artists/:id
router.get('/:id', param('id').notEmpty().isInt().trim(), async (req, res) => {
  const result = validationResult(req)
  console.log(result)

  if (result.isEmpty()) {
    const data = matchedData(req)
    const [artist] = await pool
      .promise()
      .query('SELECT * FROM jens_artist WHERE id = ?', [data.id])
    if (artist.length > 0) {
      return res.render('artist.njk', {
        title: artist[0].name,
        artist: artist[0],
      })
    } else {
      console.log('artist not found error')
      res.redirect('/artists')
    }
  } else {
    // använd result
    res.redirect('/artists')
  }
})

module.exports = router
