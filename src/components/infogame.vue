<template>
    <div v-if="game"
    class="mx-20 text-white border border-purple-500 rounded-lg p-2 m-3 text-base flex px-4">
        <img :src="game.image" class="list-gamecard"/>
        <div class="ml-15 flex flex-col gap-6 justify-center">
            <h2 class="font-bold">Название игры: {{ game.name }}</h2>
            <p>Рейтинг: {{ game.rating }}</p>
            <p>Комментарий: {{ game.comment }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useGameStore } from '@/stores/gameStore';

const route = useRoute()
const store = useGameStore()

const gameId = Number(route.params.id)
const game = store.games.find(game => game.id === gameId)

</script>