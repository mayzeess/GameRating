<template>
    <div class="main-div">
        <h1 class="h1">Список игр</h1>
        <p class="p">Рейтинг</p>
        <router-link to="/addgame" 
            class="button">
            Добавить игру
        </router-link>
        <Gamecard v-for="(game, index) in store.games" :game="game" :key="index" :index="index"/>
    </div>
</template>

<script setup lang="ts">
import Gamecard from '@/components/gamecard.vue';
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

</script>