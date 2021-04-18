import express from 'express'
import chat from './api/chat.js'
import authentication from './api/authentication.js'

let app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app

chat.createRoutes()
authentication.createRoutes()

const port = 3000
app.listen(port, '127.0.0.1', () => {
    console.log(`App being listened at http://localhost:${port}`)
})