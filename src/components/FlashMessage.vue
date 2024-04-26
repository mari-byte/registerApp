<template>
  <div :class="messageClass" transition="fade">
    {{props.message}}
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
const props = defineProps({
  message: String,
  messageClass: String
})
</script>

<style scoped>

/* 親要素 */
.parent-element {
  height: 100vh; /* 画面全体の高さを100%に設定 */
}

/* フラッシュメッセージ */
.flash-message-success {
  background-color: #22f329; /* 成功メッセージの背景色 */
  color: rgb(9, 8, 8);
  height: 50px; /* 親要素の高さの30% */
  font-size: large;
}

.flash-message-error {
  background-color: #f44336; /* エラーメッセージの背景色 */
  color: white;
  height: 50px; /* 親要素の高さの30% */
}

.delete-message-success {
  background-color: #22f329; /* 成功メッセージの背景色 */
  color: rgb(9, 8, 8);
  height: 50px; /* 親要素の高さの30% */
  /* height: 1%; 親要素の高さの30% */
  font-size: large;
}

.flash-message {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
