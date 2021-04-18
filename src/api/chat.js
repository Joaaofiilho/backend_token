import app from '../index.js'
import chatDb from '../db/chat_db.js'
import {authenticateToken} from './authentication.js'

export default {
    createRoutes() {
        app.get('/api/chats', authenticateToken, (req, res) => {
            const user = req.user
        
            res.send(chatDb.getChats())
        })
    }
}