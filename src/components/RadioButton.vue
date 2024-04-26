<template>
  <label class="elements">{{ title }}</label>
  <div :class="inputClass">
    <input
      type="radio"
      :id="label"
      :name="name"
      :value="label"
      :required="required"
      v-model="selectedItem"
      @change="handleRadioChange"
    />
    <label :for="label">{{ label }}</label>
    <div v-if="required" class="required">{{ $t('common.require') }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, defineExpose } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits()
const { t } = useI18n()

const props = defineProps({
  title: String,
  label: String,
  name: String,
  modelValue: String,
  required: { type: Boolean, default: false },
  inputClass: { type: String, default: 'radio-input' }
})
const selectedItem = ref(props.modelValue)

const resetField = () => {
  selectedItem.value = null
}

defineExpose({
  resetField
})

const handleRadioChange = () => {
  if (selectedItem.value === t('common.high')) {
    emit('update:selectedItem', 1)
  } else if (selectedItem.value === t('common.normal')) {
    emit('update:selectedItem', 2)
  } else if (selectedItem.value === t('common.low')) {
    emit('update:selectedItem', 3)
  }
}
</script>
<style scoped>
.elements {
  margin-right: 30px; /* ラベルと必須マークの間の余白 */
  font-size: large; /* ラベルのフォントサイズ */
  white-space: nowrap; /* テキストを折り返さないようにする */
}

.label-wrapper {
  display: flex; /* 子要素を横並びにする */
  align-items: center; /* 子要素を垂直方向に中央揃えにする */
}

.radio-input {
  display: inline-flex;
  align-items: center;
  margin-right: 20px; /* ラジオボタン間の間隔 */
}

.required {
  margin-left: 5px; /* 必須マークの間隔 */
  font-size: small;
  color: rgb(248, 3, 3);
}
</style>
