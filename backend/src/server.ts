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

app.post('/api/games', async (req, res) => {
    const { name, rating, comment, image } = req.body

    const ratingNumber = Number(rating)
    if (!name || String(name).trim() === '') {
        res.status(400).json({ message: 'нет названия игры' })
        return
    }

    if (!image || String(image).trim() === '') {
        res.status(400).json({ message: 'нету изображения' })
        return
    }

    const game = await prisma.game.create({
        data: {
            name: String(name).trim(),
            rating: ratingNumber,
            comment: String(comment || '').trim() || 'Без комментариев',
            image: String(image).trim()
        }
    })

    res.status(201).json(game)
})