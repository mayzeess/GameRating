<template>
    <form class="flex flex-col gap-6 mt-10 text-white">
        <input class="border-2 border-purple-500 rounded-md" type="file" accept="image/*" @change="handleImage">
            <input class="border-2 border-purple-500 rounded-md" type="text" placeholder="Название" v-model="nameGame">
            <input class="border-2 border-purple-500 rounded-md" type="number" placeholder="Рейтинг" v-model="ratingGame">
            <input class="border-2 border-purple-500 rounded-md" type="text" placeholder="Комментарий" v-model="commentGame">
    </form>
    <button class="button" @click="Addgame()">
        Добавить
    </button>
    <p class="p" v-if="(info != '')">{{ info }}</p>
</template>

<script>
import { useGameStore } from '@/stores/gameStore'

export default {
    data() {
        return {
            imageGame: '',
            nameGame: '',
            ratingGame: '',
            commentGame: '',
            game: [],
            info: ''
        }
    },
    methods: {
        Addgame() {
            if (this.imageGame == '') {
                this.info = 'Загрузите изображение'
                return
            } else if (this.nameGame == ''){
                this.info = 'Введите название игры'
                return
            } else if (this.ratingGame == '') {
                this.info = 'Поставьте рейтинг'
                return
            }
            const store = useGameStore()

            store.addGame({
                image: this.imageGame,
                name: this.nameGame,
                rating: this.ratingGame,
                comment: this.commentGame
            })
            this.info = 'Игра успешно добавлена'
            this.nameGame = ''
            this.ratingGame = ''
            this.commentGame = ''
            this.imageGame = ''
        },
        handleImage(event) {
            const file = event.target.files[0]
            if (!file) return

            this.imageGame = URL.createObjectURL(file)
        }
    },
}

</script>
