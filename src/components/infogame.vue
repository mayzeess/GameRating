<template>
    <div v-if="game" class="mx-auto text-white px-4 py-6 max-w-6xl">
        <div class="flex flex-col lg:flex-row gap-10">
            <img :src="game.image" class="w-full max-w-sm md:max-w-md lg:w-[35%] max-h-[70vh] rounded-lg object-contain mx-auto lg:mx-0"/>
            <div class="flex-1">
                <h2 class="font-bold text-4xl mb-6">Название игры: {{ game.name }}</h2>
                <div class="text-2xl mb-6">Рейтинг: {{ game.rating }}/10</div>
                <div class="text-xl mb-2">Комментарий: {{ game.comment }}</div>
            </div>
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

<!-- <template>
    <div v-if="game"
    class="mx-auto text-white p-2 px-4 m-3 max-w-5xl items-center">
        <img :src="game.image" class="block w-full rounded-lg mx-auto object-contain max-h-[45vh] max-w-4xl aspect-video"/>
        <div class="ml-15 flex flex-col gap-6 justify-center">
            <h2 class="font-bold mt-10 text-4xl">Название игры: {{ game.name }}</h2>
            <div class="py-3 rounded-xl text-2xl">Рейтинг: {{ game.rating }}/10</div>
            <div class="rounded-xl text-xl mb-4">Комментарий: {{ game.comment }}</div>
        </div>
    </div>
</template> -->