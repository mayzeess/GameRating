import { defineStore } from 'pinia'
import type { GameType } from '@/types/Game'

export const useGameStore = defineStore('games', {
    state: () => ({
        games: [] as GameType[]
    }),

    actions: {
        addGame(game: GameType) {
            this.games.push(game)
        },

        deleteGame(id: number) {
            this.games = this.games.filter(game => game.id !== id)
        }
    }
})