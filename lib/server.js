'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 1337

// configure server
{
  const options = {
    bodyParser: {
      extended: true
    }
  }

  app.set('port', port)
  app.set('view engine', 'ejs')
  app.set('views', 'app/views')

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded(options.bodyParser))
  app.use('/assets', express.static('app/assets'))
}

app.get('/', (req, res) => {
  if (req.query.spf === 'navigate') {
    // page chunk
    res.render('content/home.ejs', (error, html) => {
      if (error) html = ''

      res.json({ body: { main: html } })
    })
  } else {
    // full page
    res.render('page.ejs', {
      page: 'home'
    })
  }
})

app.get('/about', (req, res) => {
  if (req.query.spf === 'navigate') {
    // page chunk
    res.render('content/about.ejs', (error, html) => {
      if (error) html = ''

      res.json({ body: { main: html } })
    })
  } else {
    // full page
    res.render('page.ejs', {
      page: 'about'
    })
  }
})

app.use((req, res) => {
  res.status(404).send('404: Not found')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
