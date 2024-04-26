<template>
  <div class="textarea-wrapper">
    <div class="label-wrapper">
      <label class="element">{{ fieldName }}</label>
      <div v-if="required" class="required">{{ $t('common.require') }}</div>
    </div>
    <textarea
      :placeholder="placeholder"
      class="textareas"
      v-model="note"
      @focusout="focusoutValue"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, defineExpose } from 'vue'

const props = defineProps({
  required: { type: Boolean, default: false },
  placeholders: String,
  modelValue: String,
  fieldName: String
})

const resetField = () => {
  note.value = null
}

defineExpose({resetField})

const emit = defineEmits();

const note = ref(props.modelValue)
const placeholder = props.placeholders

const focusoutValue = () => {
  // フォーカスアウト時に親コンポーネントに値をemit
  emit('update', note.value)
}
</script>

<style scoped>
.textareas {
  margin-right: auto;
  height: 100px;
  width: 300px;
  resize: none;
  border-radius: 10px;
  border: 1px solid #100a0a; /* インプットの枠線を表示 */
}
.required {
  font-size: small;
  color: rgb(248, 3, 3);
}
.textarea-wrapper {
  display: flex; /* 子要素を横並びにする */
  align-items: center; /* 子要素を垂直方向に中央揃えにする */
}
.label-wrapper {
  display: flex; /* 子要素を横並びにする */
  align-items: center; /* 子要素を垂直方向に中央揃えにする */
}
.element {
  margin-right: 50px; /* ラベルと必須マークの間の余白 */
  font-size: large; /* ラベルのフォントサイズ */
  white-space: nowrap; /* テキストを折り返さないようにする */
}
</style>
