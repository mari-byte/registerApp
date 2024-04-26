<template>
  <div id="app">
    <h1 class="soft-font">{{ $t('menu.title') }}</h1>
    <br />
    <WelcomeItem>
      <template #icon>
        <div class="flex-container">
          <SalarymanIcon />
        </div>
      </template>
    </WelcomeItem>
    <br>
    <form @submit="">
      <div class="flex-container">
        <MemoIcons />
        <router-link :to="{ name: 'Register' }">
          <button class="register-update-button">{{ $t('menu.register') }}</button>
        </router-link>
      </div>
      <br />
      <div class="flex-container">
        <ListIcons />
        <router-link :to="{ name: 'ListApp' }">
          <button class="register-update-button">{{ $t('menu.list') }}</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import SalarymanIcon from '../components/icons/Salaryman.vue'
import WelcomeItem from '../components/WelcomeItem.vue'
import MemoIcons from '../components/icons/MemoIcons.vue'
import ListIcons from '../components/icons/List.vue'
</script>

<style>
.soft-font {
  font-family: 'Lucida Console', Courier, monospace;
  font-size: 2em; /* フォントサイズを調整 */
  color: #333; /* テキストの色を設定 */
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1); /* テキストに影を追加 */
}

/* フレックスコンテナを定義し、子要素を横に並べる */
.flex-container {
  display: flex;
  align-items: center; /* 子要素を垂直方向に中央寄せ */
}

/* PraItemの幅を調整 */
.PraItem {
  flex: 1; /* 幅を均等に分割 */
}

.register-update-button {
  font-family: 'Lucida Console', Courier, monospace;
  font-size: 3.5em; /* フォントサイズを調整 */
  color: #420a0a; /* テキストの色を設定 */
  background-color: #b4d9f7; /* ボタンの背景色を変更 */
  margin-left: 10px;
  margin-right: 10px; /* ボタンとアイコンの間に余白を追加 */
  border-radius: 10px;
}
.delete-button {
  font-family: 'Lucida Console', Courier, monospace;
  font-size: 3.5em; /* フォントサイズを調整 */
  color: #0f0c0c; /* テキストの色を設定 */
  background-color: #f10a0a; /* ボタンの背景色を変更 */
  margin-left: 10px;
  margin-right: 10px; /* ボタンとアイコンの間に余白を追加 */
  border-radius: 10px;
}
</style>
