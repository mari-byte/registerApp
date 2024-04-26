<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarMenu from '@/components/SidebarMenu.vue';

</script>

<template>

  <input type="checkbox" id="check" />
  <label for="check">
    <i class="fas fa-bars" id="hambergerBtn"></i>
    <i class="fas fa-times" id="cancel"></i>
  </label>
<div class="sidebar">
  <header>お店情報</header>
    <ul>
      <li>
        <a href="#">ダッシュボード</a>
      </li>
      <li>
        <a href="#">コミュニティ</a>
      </li>
      <li>
        <a href="#">コーヒー</a>
      </li>
      <li>
        <a href="#">イベント</a>
      </li>
      <li>
        <a href="#">サービス</a>
      </li>
      <li>
        <a href="#">詳細情報</a>
      </li>
      <li>
        <a href="#">お問い合わせ</a>
      </li>
    </ul>
</div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

.sidebar {
  position: fixed;
  left: 0;
  background-color: aquamarine;
  width: 250px;
  height: 100%;
}

.sidebar header {
  font-size: 20px;
  color: black;
  text-align: center;
  line-height: 70px;
  background-color: rgb(16, 207, 16);
  user-select: none;
}

.sidebar ul a {
  display: block;
  height: 100%;
  widows: 100%;
  line-height: 60px;
  color: black;
  font-size: 17px;
  padding-left: 30px;
  border-top: 1px solid #d3caca;
  border-bottom: 1px solid black;
  transition: 0.6s;
}

ul li:hover a {
  padding-left: 50px;
}


</style>