import express from 'express'
import path from 'path'
import config from '../../.config.json' assert {type: 'json'}
import { createServer } from 'http'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const staticPath = {
  'browser': path.resolve(__dirname, '../browser'),
  'lib': path.resolve(__dirname, '../../lib')
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

app.post(config.normalUrl, (req, res) => {
  res.send('ok')
})
app.post(config.apiUploadUrl, (req, res) => {
  res.send(req.body)
})

const server = createServer(app)

server.listen(config.testServerPort, () => {})
