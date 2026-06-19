<template>
    <div class="text-white border border-purple-500 rounded-lg p-2 m-3 text-base w-full max-w-4xl flex px-4">
        <img :src="game.image" class="list-gamecard"/>
        <div class="ml-15 flex flex-col gap-6 justify-center">
            <h2 class="font-bold">Название игры: {{ game.name }}</h2>
            <p>Рейтинг: {{ game.rating }}</p>
            <p>Комментарий: {{ game.comment }}</p>
            <button class="button" @click="deleteGame">Удалить</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import type { GameType } from '@/types/Game'

interface GameCardProps {
    game: GameType
    index: number
}

const props = defineProps<GameCardProps>()

const store = useGameStore()

const deleteGame = () => {
    store.deleteGame(props.index)
}

</script>