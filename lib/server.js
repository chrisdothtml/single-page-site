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

/**
 * Handles the rendering of the provided page for spf
 * based on the request query param
 */
function spfPage (page, request, result) {
  if (request.query.spf === 'navigate') {
    // page chunk
    result.render(`content/${page}.ejs`, (error, html) => {
      if (error) html = ''

      result.json({ body: { main: html } })
    })
  } else {
    // full page
    result.render('page.ejs', {
      page
    })
  }
}

app.get('/', (request, result) => {
  spfPage('home', request, result)
})

app.get('/about', (request, result) => {
  spfPage('about', request, result)
})

app.get('/contact', (request, result) => {
  spfPage('contact', request, result)
})

app.use((request, result) => {
  result.status(404).send('404: Not found')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
