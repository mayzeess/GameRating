import { defineStore } from 'pinia'
import type { GameType } from '@/types/Game'
import { API_URL } from '@/config/api'

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
        addGame(game: GameType) {
            this.games.push(game)
        },

        deleteGame(id: number) {
            this.games = this.games.filter(game => game.id !== id)
        },

        editGame(updatedGame: GameType) {
            const index = this.games.findIndex(
                game => game.id === updatedGame.id
            )
            if (index !== -1) {
                this.games[index] = updatedGame
            }
        }
    }
})