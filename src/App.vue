<template>
  <div class="background">
    <h1 class="title">{{ $t('menu.subtitle') }}</h1>
    <br />
    <div>
      <MenuIcons @click="backMenu"> </MenuIcons>
      <RouterLink v-bind:to="{ name: 'RegisterApp' }">{{ $t('menu.label') }}</RouterLink>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// ここにスクリプト部分のコードを記述する
import MenuIcons from '@/components/icons/Menu.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const backMenu = () => {
  router.push({ name: 'RegisterApp' })
}
</script>

<style scoped>
/* ここにスタイルを記述する */
.background {
  /* 背景画像の設定 */
  background-image: url('/images/bk.jpg');
  background-size: cover;
  background-position: center;
  /* その他のスタイル */
  width: 100%;
  height: 100vh;
  position: relative; /* 親要素に position: relative; を追加 */
}

.title {
  font-family: 'Lucida Console', Courier, monospace;
  font-size: 2em;
  color: #0f0c0c;
  margin-left: 10px;
  border-radius: 10px;
  position: relative; /* h1要素に position: relative; を追加 */
  z-index: 1; /* h1要素を手前に配置 */
}
</style>
