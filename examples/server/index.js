const express = require('express')
const path = require('path')
const config = require('../../.config.json')
const { createServer } = require('http')

const staticPath = {
  'browser': path.resolve(__dirname, '../browser'),
  'browserDist': path.resolve(__dirname, '../../dist/browser')
}

const app = express()

app.use(express.json())

Object.entries(staticPath).forEach(([path, staticPath]) => {
  console.log(path, staticPath)
  app.use(`/${path}`, express.static(staticPath))
})

app.post(config.errorUploadUrl, (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

const server = createServer(app)

server.listen(config.testServerPort, () => {})
