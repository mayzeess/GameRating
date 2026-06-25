<template>
    <p class="text-white p-5 text-xl text-center" v-if="isLoading">Загрузка...</p>
    <div v-else-if="game" class="mx-auto text-white px-4 py-6 max-w-6xl">
        <div class="flex flex-col lg:flex-row gap-10">
            <img :src="game.image" class="w-full max-w-sm md:max-w-md lg:w-[35%] max-h-[70vh] rounded-lg object-contain mx-auto lg:mx-0 duration-500 hover:scale-105"/>
            <div class="flex-1">
                <h2 class="font-bold text-4xl mb-6">Название игры: {{ game.name }}</h2>
                <div class="text-2xl mb-6">Рейтинг: {{ game.rating }}/10</div>
                <div class="text-xl mb-2">Комментарий: {{ game.comment }}</div>
            </div>
        </div>
    </div>
    <isError v-else />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useGameStore } from '@/stores/gameStore';
import type { GameType } from '@/types/Game';
import { onMounted, ref } from 'vue';
import isError from './isError.vue';

const route = useRoute()
const store = useGameStore()

const game = ref<GameType | null>(null)
const isLoading = ref(true)

onMounted(async () => {
    try{
        const gameId = Number(route.params.id)
        const gameStore = store.games.find(game => game.id === gameId)
        if (gameStore){
            game.value = gameStore
            isLoading.value = false
            return
        }
        game.value = await store.fetchGameById(gameId)
        isLoading.value = false
    } catch {
        game.value = null
    }  finally {
        isLoading.value = false
    }
})
</script>