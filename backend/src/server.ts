import express from 'express'
import cors from 'cors'
import { prisma } from './prisma'
import fs from 'node:fs'
import multer from 'multer'
import path from 'node:path'

const PORT = 3000
const API_URL = `http://localhost:${PORT}`
const app = express()


app.use(cors())
app.use(express.json())

const uploadsPath = path.join(process.cwd(), 'uploads')

if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath)
}

app.use('/uploads', express.static(uploadsPath))

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, uploadsPath)
    },

    filename: (_req, file, callback) => {
        const ext = path.extname(file.originalname)
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`

        callback(null, fileName)
    }
})

const upload = multer({
    storage,
    fileFilter: (_req, file, callback) => {
        if (!file.mimetype.startsWith('image/')) {
            callback(new Error('Можно загружать только изображения'))
            return
        }

        callback(null, true)
    }
})

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

app.post('/api/games', upload.single('image'), async (req, res) => {
    const { name, rating, comment } = req.body

    if (!req.file){
        res.status(400).json({message: 'нету изображения'})
        return
    }
    const ratingNumber = Number(rating)
    if (!name || String(name).trim() === '') {
        res.status(400).json({ message: 'нет названия игры' })
        return
    }

    const imageUrl = `${API_URL}/uploads/${req.file.filename}`

    const game = await prisma.game.create({
        data: {
            name: String(name).trim(),
            rating: ratingNumber,
            comment: String(comment || '').trim() || 'Без комментариев',
            image: imageUrl
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

app.listen(PORT, () => {console.log(`Server started on ${API_URL}`)})