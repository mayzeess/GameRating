import express from 'express'
import cors from 'cors'
import { prisma } from './prisma'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
    res.send('работает')
})

app.get('/api/games', async (_req, res) => {
    const games = await prisma.game.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    res.json(games)
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})