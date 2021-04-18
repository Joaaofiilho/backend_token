import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import app from '../index.js'

//Retrieving environment information for process.env
dotenv.config()

export function generateAccessToken(object) {
    return jwt.sign(object, process.env.TOKEN_SECRET, { expiresIn: '28800s' });
}

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        console.log(user)

        next()
    })
}

export default {
    createRoutes() {
        app.post('/api/register', (req, res) => {
            const user = req.body

            const token = generateAccessToken(user)

            res.send({token: token})

            console.log('registrado com sucesso, token: ', token)
        })

        app.get('/api/login', (req, res) => {
            const login_credentials = req.body
            
            //TODO: Verify in database
            const token = generateAccessToken(login_credentials.email)

            res.send({token: token})
        })
    }
}