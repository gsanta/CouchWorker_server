const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./test/json_server/db.json')
const middlewares = jsonServer.defaults()
const bodyParser = require('body-parser');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

server.use(jsonServer.bodyParser);

// server.use(bodyParser.json());

// Add custom routes before JSON Server router
server.post('/login', (req, res) => {
    // res.send('hello')
    // console.log(req)
  res.send(req.body)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})