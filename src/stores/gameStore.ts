import { defineStore } from 'pinia'

interface Game {
    image: string
    name: string
    rating: string
    comment: string
}

export const useGameStore = defineStore('games', {
    state: () => ({
        games: [] as Game[]
    }),

    actions: {
        addGame(game: Game) {
            this.games.push(game)
        },

        deleteGame(index: number) {
            this.games.splice(index, 1)
        }
    }
})