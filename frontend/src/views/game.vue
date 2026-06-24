<template>
    <div class="main-div pt-10">
        <h1 class="h1">Список игр</h1>
        <p class="p">Здесь предствален список добавленных игр.</p>
        <router-link to="/addgame" class="button m-3">
            Добавить игру
        </router-link>
        <p class="p" v-if="store.isLoading">Загрузка...</p>
        <p class="p" v-else-if="store.error">{{ store.error }}</p>
        <p class="p" v-else-if="store.games.length === 0">Список игр пуст</p>
        <gameCard v-for="game in store.games" :game="game" :key="game.id"/>
    </div>
</template>

<script setup lang="ts">
import gameCard from '@/components/gamecard.vue'
import { useGameStore } from '@/stores/gameStore'
import { onMounted } from 'vue'
const store = useGameStore()

onMounted (() => {
    store.fetchGames()
})
</script>