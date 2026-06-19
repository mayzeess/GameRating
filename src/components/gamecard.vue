<template>
    <div @click="InfoGame"
    class="hover:bg-purple-600 cursor-pointer text-white border border-purple-500 rounded-lg p-2 m-3 
    text-base w-full max-w-4xl flex px-4">
        <img :src="game.image" class="list-gamecard"/>
        <div class="ml-15 flex flex-col gap-6 justify-center">
            <h2 class="font-bold">Название игры: {{ game.name }}</h2>
            <p>Рейтинг: {{ game.rating }}</p>
            <p>Комментарий: {{ game.comment }}</p>
            <button class="button" @click.stop="deleteGame">Удалить</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import type { GameType } from '@/types/Game'
import { useRouter } from 'vue-router'

interface GameCardProps {
    game: GameType
}

const props = defineProps<GameCardProps>()

const store = useGameStore()

const deleteGame = () => {
    console.log(props.game.id)
    store.deleteGame(props.game.id)
}

const router = useRouter()

const InfoGame = () => {
    router.push(`/game/${props.game.id}`)
}
</script>