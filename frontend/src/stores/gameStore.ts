import { defineStore } from 'pinia'
import type { GameType } from '@/types/Game'
import { API_URL } from '@/config/api'

type CreateGame = {
    image: string
    name: string
    rating: number
    comment: string
}
type UpdateGameData = Omit<GameType, 'id' | 'createdAt' | 'updatedAt'>
export const useGameStore = defineStore('games', {
    state: () => ({
        games: [] as GameType[],
        isLoading: false,
        error: ''
    }),

    actions: {
        async fetchGames(){
            this.isLoading = true
            this.error = ''
            try {
                const response = await fetch(`${API_URL}/api/games`)
                if (!response.ok){
                    throw new Error('Ошибка загрузки игр')
                }
                this.games = await response.json()
            } catch {
                this.error = 'Ошибка загрузки игры'
            } finally {
                this.isLoading = false
            }
        },
        async fetchGameById(id: Number){
            const response = await fetch(`${API_URL}/api/games/${id}`)
            if (!response.ok){
                throw new Error('такой игры не найдено')
            }
            return await response.json() as GameType
        },
        async addGame(game: CreateGame) {
            const response = await fetch(`${API_URL}/api/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(game)
            })
            
            if (!response.ok) {
                throw new Error('Не удалось добавить игру')
            }

            const createdGame = await response.json() as GameType
            this.games.unshift(createdGame)
            return createdGame
        },

        async deleteGame(id: number) {
            const response = await fetch(`${API_URL}/api/games/${id}`, {
                method: 'DELETE'
            })
            
            if (!response.ok) {
                throw new Error('Не удалось удалить игру')
            }
            
            this.games = this.games.filter(game => game.id != id)
        },
        
        async editGame(id: number, updatedGame: UpdateGameData) {
            const response = await fetch(`${API_URL}/api/games/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedGame)
            })
            
            if (!response.ok) {
                throw new Error('Не удалось удалить игру')
            }
            
            const GameApi = await response.json() as GameType
            const index = this.games.findIndex(game => game.id === id)
            this.games[index] = GameApi

            return GameApi
        }
    }
})