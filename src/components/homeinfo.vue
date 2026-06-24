<template>
    <div class="w-full px-4 flex flex-wrap justify-center gap-10">
        <div class="home-card">
            <h2 class="h2">Что умеет данный сайт?</h2>
            <div class="text-left">
                <p class="text-info">Данный сайт предназначен для оценки игр.</p>
                <p class="text-info">Здесь вы можете добавить свои любимые игры и оценить их.</p>
                <p class="text-info">Чтобы посмотерть список игр нажмите на кнопку ниже</p>
            </div>
            <router-link to="/game" class="button w-fit mx-auto mb-2">Посмотреть список игр</router-link>
            <div class="text-left">
                <p class="text-info">Если в списке еще нет игр то можете их добавить.</p>
            </div>
            <router-link to="/addgame" class="button w-fit mx-auto mb-2">Добавить иру</router-link>
        </div>
        <div class="home-card">
            <h2 class="h2">Информация об авторе</h2>
            <div class="text-left">
                <p class="text-info">Также на данном сайте содержится информация об авторе.</p>
                <p class="text-info">Чтобы посмотреть подробнее перейдите во вкладку о себе.</p>
            </div>
            <router-link to="/about" class="button w-fit mx-left mb-2">О себе</router-link>
            <div class="text-left">
                <p class="text-info">На данной странице вы найдете ссылки но социальные сети автора.</p>
                <p class="text-info">Также способ связаться с ним.</p>
            </div>
        </div>
        <div class="home-card">
            <h2 class="h2">Оценивание игр</h2>
            <div class="text-left">
                <p class="text-info">Добавляя новую игру следуетт выбрать для нее обложку. 
                    Картинка которая будет отображаться в карточке игры.</p>
                <p class="text-info">Если захотите поменять рейтинг, или сменить обложку, то вы всегда сможете это сделать.</p>
                <p class="text-info">Вы можете полностью отредактировать добавленную карточку игры. Или вовсе удалить ее.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>