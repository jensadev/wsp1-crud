const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world med nodemon')
})

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000')
})