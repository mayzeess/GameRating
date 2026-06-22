<template>
  <div class="main-div px-10 pt-10">
        <h1 class="h1 mb-15">Главная страница сайта</h1>
        <Homeinfo />
    </div>
</template>

<script setup lang="ts">
import Homeinfo from '@/components/homeinfo.vue';

</script>

 <!-- <div class="">
            <p class="p">Данный сайт предназначен для оценки игр.</p>
            <p class="p">Чтобы добавить новую игру перейдите во вкладку игры.
            <router-link to="/game" class="button inline-block">Игры</router-link></p>
            <p class="p">Если хотите прочитать информацию об авторе перейдите на страницу "О себе"
                <router-link to="/about" class="button inline-block">О себе</router-link>
            </p>
        </div> -->