<template>
    <div @click="InfoGame"
    class="hover:bg-gray-900 cursor-pointer text-white border border-purple-500 rounded-lg p-2 m-3 
    text-base w-full max-w-4xl flex px-4 hover:scale-102 duration-500">
        <img :src="game.image" class="list-gamecard"/>
        <div class="ml-15 flex flex-col gap-6 justify-center flex-1">
            <h2 class="font-bold">Название игры: {{ game.name }}</h2>
            <p>Рейтинг: {{ game.rating }}/10</p>
            <p>Комментарий: {{ game.comment }}</p>
        </div>
        <div class="flex flex-col items-center self-center">
            <button class="button m-3" 
            @click.stop="deleteGame">Удалить</button>
            <button class="button m-3" @click.stop="editGame">Редактировать</button>
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
    store.deleteGame(props.game.id)
}

const router = useRouter()

const InfoGame = () => {
    router.push(`/game/${props.game.id}`)
}

const editGame = () => {
    router.push(`/editgame/${props.game.id}`)
}
</script>