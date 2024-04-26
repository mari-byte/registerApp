<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm,  } from 'vee-validate'
import TextArea from '@/components/TextArea.vue'
import { useStore } from 'vuex'

const { errors, handleSubmit } = useForm({
  initialValues: {
    firstName: '',
    lastName: '',
    memo: ''
  }
})

const placeholders = ref('たかぎしくん')

const { value: lastName } = useField('lastName')
const { value: firstName } = useField('firstName')
const { value: memo } = useField('memo')

const store = useStore()

const onSubmit = handleSubmit((values, { resetForm }) => {
  console.log('ビフォーvalues::', values)
  resetForm()
  console.log('アフターvalues::', values)
})

const test = () => {
  // Vuex ストアのミューテーションをコミット
  store.commit('increment');

  // Vuex ストアの状態にアクセス
  const count = store.state.count;
  console.log(count);
}

const textareaValue = ref()

const updateTextareaValue = (newValue: Event) => {
  memo.value = newValue;
  console.log("emitの値を参照", memo.value)
}
</script>

<template>
  <body>
    <!-- ... 省略 ... -->
    <button @click="test">ストアの勉強</button>
    <!-- ... 省略 ... -->
  </body>
</template>

<style>
.resetbutton {
  background-color: aquamarine;
  font-size: large;
}
</style>
