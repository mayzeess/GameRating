<template>
    <div class="main-div  pt-10">
    <p class="text-white text-center text-left text-2xl" v-if="(info != '')">{{ info }}</p>
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
import { ref } from 'vue';

const route = useRoute()
const store = useGameStore()
const gameId = Number(route.params.id)
const game = store.games.find(game => game.id === gameId)

if (!game) {
    throw new Error('Игра не найдена') 
}

const imageGame = ref(game.image)
const nameGame = ref(game.name)
const ratingGame = ref(game.rating)
const commentGame = ref(game.comment)
const info = ref('')

const handleImage = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return
    imageGame.value = URL.createObjectURL(file)
}

const GameEdit = () => {
    if (imageGame.value === '') {
        info.value = 'Загрузите изображение'
        return
    } else if (nameGame.value === ''){
        info.value = 'Введите название игры'
        return
    }
    if (commentGame.value == ''){
        commentGame.value = 'Без комментариев'
    }
   
    store.editGame({
        id: gameId,
        image: imageGame.value,
        name: nameGame.value,
        rating: ratingGame.value,
        comment: commentGame.value
    })

    info.value = 'Изменения применены'
}

</script>