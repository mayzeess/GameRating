import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
    res.send('работает')
})

app.get('/api/games', (_req, res) => {
    res.json([])
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})