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

app.get('/api/games/:id', async (req, res) => {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
        res.status(400).json({ message: 'нет такого id' })
        return
    }

    const game = await prisma.game.findUnique({
        where: {
            id: id
        }
    })

    if (!game) {
        res.status(404).json({ message: 'игра не найдена' })
        return
    }

    res.json(game)
})

app.delete('/api/games/:id', async (req, res) => {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
        res.status(400).json({ message: 'нет такого id' })
        return
    }

    const game = await prisma.game.findUnique({
        where: {
            id: id
        }
    })

    if (!game) {
        res.status(404).json({ message: 'игра не найдена' })
        return
    }
    await prisma.game.delete({
        where: {id}
    })

    res.json({messadge: 'Игра удалена'})
})

app.patch('/api/games/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
        res.status(400).json({ message: 'нет такого id' })
        return
    }
    const { name, rating, comment, image } = req.body
    const ratingNumber = Number(rating)
    
    const game = await prisma.game.findUnique({
        where: {
            id: id
        }
    })

    if (!game) {
        res.status(404).json({ message: 'игра не найдена' })
        return
    }
    
    const updatedGame = await prisma.game.update({
        where: {id},
        data: {
            name: String(name).trim(),
            rating: ratingNumber,
            comment: String(comment || '').trim() || 'Без комментариев',
            image: String(image).trim()
        }
    })

    res.json(updatedGame)
})