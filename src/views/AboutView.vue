<script setup lang="ts">
import { ref } from 'vue'

const showDescription = ref(false)

const showDescription1 = () => {
  showDescription.value = !showDescription.value
}

console.log('こん畜生')
</script>

<template>
  <h1 style="font-size: 24px">This is an about page</h1>

  <div>
    <button @mouseover="showDescription1()" aria-describedby="description1">ボタン</button>
    <div id="description1" v-if="showDescription">これは重要な操作を実行するボタンです。</div>
  </div>

  <span class="c-tooltip" data-tooltip="ツールチップの内容">マウスホバーでツールチップを表示</span>
</template>

<style>

.c-tooltip {
  display: inline-block;
  position: relative;
}

.c-tooltip::before,
.c-tooltip::after {
  -webkit-transition: all 0.2s;
  opacity: 0;
  position: absolute;
  transition: all 0.2s;
  visibility: hidden;
  z-index: 11;
}

.c-tooltip::before {
  -webkit-transform: translateY(-50%);
  border-color: transparent #0c0d0e transparent transparent;
  border-style: solid;
  border-width: 3px 7px 3px 0;
  content: "";
  height: 0;
  left: calc(100% + 6px);
  top: 50%;
  transform: translateY(-50%);
  width: 0;
}

.c-tooltip::after {
  -webkit-transform: translateY(-50%);
  background: #161616;
  /* background: #5f6368; */
  border-radius: 3px;
  color: #fff;
  content: attr(data-tooltip);
  display: block;
  font-size: 11px;
  font-weight: 600;
  left: calc(100% + 13px);
  padding: 5px 10px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
}

.c-tooltip:hover {
  cursor: pointer;
}

.c-tooltip:hover::before {
  opacity: 1;
  visibility: visible;
}

.c-tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}

</style>