<template>
    <div class="main-div pt-10">
        <h1 class="h1">Список игр</h1>
        <p class="p mt">Здесь предствален список добавленных игр.</p>
        <router-link to="/addgame" class="button m-3">
            Добавить игру
        </router-link>
        <gameCard v-for="game in store.games" :game="game" :key="game.id"/>
    </div>
</template>

<script setup lang="ts">
import gameCard from '@/components/gamecard.vue';
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

</script>