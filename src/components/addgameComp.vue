<template>
    <form class="flex flex-col gap-6 mt-10 text-white">
        <input class="border-2 border-purple-500 rounded-md" type="file" accept="image/*" @change="handleImage">
            <input class="border-2 border-purple-500 rounded-md" type="text" placeholder="Название" v-model="nameGame">
            <input class="border-2 border-purple-500 rounded-md" type="number" placeholder="Рейтинг" v-model="ratingGame">
            <input class="border-2 border-purple-500 rounded-md" type="text" placeholder="Комментарий" v-model="commentGame">
    </form>
    <button class="button" @click="addGame()">
        Добавить
    </button>
    <p class="p" v-if="(info != '')">{{ info }}</p>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { ref } from 'vue'

const imageGame = ref('')
const nameGame = ref('')
const ratingGame = ref('')
const commentGame = ref('')
const info = ref('')
const store = useGameStore()

const clearForm = () => {
    nameGame.value = ''
    ratingGame.value = ''
    commentGame.value = ''
    imageGame.value = ''
}

const addGame = () => {
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
    
    store.addGame({
        image: imageGame.value,
        name: nameGame.value,
        rating: ratingGame.value,
        comment: commentGame.value
    })
    info.value = 'Игра успешно добавлена'
    clearForm()
}

const handleImage = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return
    imageGame.value = URL.createObjectURL(file)
}

</script>
