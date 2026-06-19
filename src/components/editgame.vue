<template>
    <div class="main-div">
        <form class="flex flex-col gap-6 mt-10 text-white mb-3">
            <img :src="imageGame" class="list-gamecard mx-auto"/>
            <input class="border-2 border-purple-500 rounded-md" type="file" accept="image/*" @change="handleImage">
            <input class="border-2 border-purple-500 rounded-md" type="text" placeholder="Название" v-model="nameGame">
            <input class="border-2 border-purple-500 rounded-md" type="number" placeholder="Рейтинг" v-model="ratingGame">
            <input class="border-2 border-purple-500 rounded-md" type="text" placeholder="Комментарий" v-model="commentGame">
        </form>
        <p class="p">{{ info }}</p>
        <button class="button" @click="GameEdit">Подтвердить</button>
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

const imageGame = ref(game?.image)
const nameGame = ref(game?.name)
const ratingGame = ref(game?.rating)
const commentGame = ref(game?.comment)
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
    } else if (ratingGame.value === '') {
        info.value = 'Поставьте рейтинг'
        return
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