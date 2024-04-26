<template>
<div class="modal">
    <div class="modal-content">
      <button class="close-button" @click="closeDialog">×</button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, onMounted, defineEmits } from 'vue'

const emit = defineEmits();

const closeDialog = () => {
  emit('close')
}

</script>

<style scoped>
.back-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.back-image__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 画像を親要素に合わせて拡大縮小する */
  z-index: -1; /* 最背面に配置 */
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  margin: 15% auto;
  padding: 20px;
  width: 80%;
}

.close-button {
  color: #053948;
  float: right;
  font-size: 28px;
  font-weight: bold;
  padding-right: 3%;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
