<template>
    <p class="text-white p-5 text-xl text-center" v-if="isLoading">Загрузка...</p>
    <IsError v-else-if="!game"/>
    <div class="main-div  pt-10" v-else>
    <p class="text-white text-center text-left text-2xl" v-if="info">{{ info }}</p>
    <form class="w-full max-w-lg flex flex-col gap-4 mt-8 text-white px-4 text-lg" @submit.prevent="GameEdit">
        <img :src="imageGame" class="max-w-full max-h-[20vh] lg:max-h-[25vh] 2xl:max-h-[35vh] block rounded-lg mx-auto" v-if="imageGame != ''"/>
        <input class="cursor-pointer input" type="file" accept="image/*" @change="handleImage">
        <input class="input" type="text" placeholder="Название" v-model="nameGame">
        <input class="accent-purple-600 cursor-pointer" type="range" min="1" max="10" step="1" placeholder="Рейтинг" v-model.number="ratingGame">
        <p class="text-xl mx-auto font-bold">Оценка игры: {{ ratingGame }}/10</p>
        <textarea class="resize-y input" placeholder="Комментарий" v-model="commentGame"></textarea>
        <button class="button m-3 mx-auto">Подтвердить</button>
    </form>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useGameStore } from '@/stores/gameStore';
import { onMounted, ref } from 'vue';
import type { GameType } from '@/types/Game';
import IsError from './isError.vue';

const route = useRoute()
const store = useGameStore()

const game = ref<GameType | null>(null)
const isLoading = ref(true)

const imageGame = ref('')
const nameGame = ref('')
const ratingGame = ref(1)
const commentGame = ref('')
const info = ref('')

const handleImage = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return
    imageGame.value = URL.createObjectURL(file)
}

onMounted (async () => {
    try {
        const gameId = Number(route.params.id)

        const gameStore = store.games.find(game => game.id === gameId)
        if (gameStore){
            game.value = gameStore
        } else {
            game.value = await store.fetchGameById(gameId)
        }
        imageGame.value = game.value.image
        nameGame.value = game.value.name
        ratingGame.value = game.value.rating
        commentGame.value = game.value.comment
    } catch {
        info.value = 'Произошла ошибка'
    } finally {
        isLoading.value = false
    }
})

const GameEdit = async () => {
    if (!imageGame.value) {
        info.value = 'Загрузите изображение'
        return
    } else if (nameGame.value.trim() === ''){
        info.value = 'Введите название игры'
        return
    }
    if (commentGame.value.trim() === ''){
        commentGame.value = 'Без комментариев'
    }
    if (!game.value){
        info.value = 'ошибка'
        return
    }
    try {
        await store.editGame(game.value.id, {
            image: imageGame.value,
            name: nameGame.value.trim(),
            rating: ratingGame.value,
            comment: commentGame.value
        })
        info.value = 'Изменения применены'
    } catch {
        info.value = 'Проиозошла ошибка изменения игры'
    }

}

</script>