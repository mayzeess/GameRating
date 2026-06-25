<template>
    <div class="main-div">
        <p class="text-white text-left text-2xl mt-8 mb-5" v-if="info">{{ info }}</p>
        <form class="w-full max-w-lg flex flex-col gap-4 text-white px-4 text-lg" @submit.prevent="addGame">
            <img :src="imageGame" class="max-w-full max-h-[20vh] lg:max-h-[25vh] 2xl:max-h-[35vh] block rounded-lg mx-auto" v-if="imageGame != ''"/>
            <input class="cursor-pointer input" type="file" accept="image/*" @change="handleImage">
            <input class="input" type="text" placeholder="Название" v-model="nameGame">
            <input class="accent-purple-600 cursor-pointer" type="range" min="1" max="10" step="1" placeholder="Рейтинг" v-model.number="ratingGame">
            <p class="text-xl mx-auto font-bold">Оценка игры: {{ ratingGame }}/10</p>
            <textarea class="resize-y input" placeholder="Комментарий" v-model="commentGame"></textarea>
            <button class="button m-3 mx-auto">Добавить</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { ref } from 'vue'

const imageGame = ref('')
const nameGame = ref('')
const ratingGame = ref(1)
const commentGame = ref('')
const info = ref('Добавление игры')
const selectedFile = ref<File | null>(null)

const store = useGameStore()

const clearForm = () => {
    nameGame.value = ''
    ratingGame.value = 1
    commentGame.value = ''
    imageGame.value = ''
    selectedFile.value = null
}

const addGame = async () => {
    if (!selectedFile.value) {
        info.value = 'Загрузите изображение'
        return
    } else if (!nameGame.value.trim()){
        info.value = 'Введите название игры'
        return
    } 
    if (!commentGame.value.trim()){
        commentGame.value = 'Без комментариев'
    }
    try {
        await store.addGame({
            image: 'image',
            name: nameGame.value.trim(),
            rating: ratingGame.value,
            comment: commentGame.value.trim()
        })
        info.value = 'Игра успешно добавлена'
        clearForm()
    } catch {
        info.value = 'Ошибка добавления игры'
    }
}

const handleImage = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return
    selectedFile.value = file
    imageGame.value = URL.createObjectURL(file)
}

</script>
