<template>
  <Form class="element">
    <label class="element" for="input">{{ props.fieldName }}</label>
    <Field
      :placeholder="placeholder"
      :componentField="props.fieldName"
      name="inputName"
      class="input"
      :rules="rulesFlg ? 'required' : ''"
      @change="valueChange"
      v-model="inputValue"
    />
    <br />
    <ErrorMessage class="errormessage" name="inputName" />
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'

import { ref, computed, defineEmits, defineExpose } from 'vue'

const props = defineProps({
  placeholders: String,
  fieldName: String,
  className: String,
  required: Boolean,
  flg: Boolean,
  modelValue: String
})

const inputValue = ref(props.modelValue)
const placeholder = props.placeholders
const rulesFlg = ref(true)

const emit = defineEmits()

const resetField = () => {
  rulesFlg.value = false
  // フィールドのバリデーション状態をリセットする
  inputValue.value = null
}

defineExpose({
  resetField
})

const valueChange = () => {
  rulesFlg.value = true
  emit('update', inputValue.value)
}

defineRule('required', (value: string | null) => {
  if (!value || value.trim() === '') {
    return 'This field is required'
  }
  return true
})

</script>

<style>
.green {
  background-color: rgb(15, 224, 155);
}

.element {
  margin-right: 10px;
  font-size: large;
}

.errormessage {
  font-size: 20px;
  color: red;
}

.input {
  width: 250px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid #100a0a; /* インプットの枠線を表示 */
  padding: 5px; /* インプットの内側の余白を設定 */
}
</style>
