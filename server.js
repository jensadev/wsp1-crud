const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index.njk', {
    title: "Landing page"
  })
})

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000')
})