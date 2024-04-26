<template>
  <Form @submit="onSubmit">

<Input 
    :labelValue="iguchi"
/>
<button>送信</button>

  </Form>

<button @click="test">ストアの勉強</button>

</template>
  

<script setup>
import Input from '@/components/Input.vue'
import { useStore } from 'vuex'

const store = useStore()

// import { ref } from "vue";

// function onSubmit(values:any) {
//     console.log("いいのかね")
//     console.log(values)
//   alert(JSON.stringify(values, null, 2));
// }

const test = () => {
  console.log("★重要")
  console.log("★重要")
  console.log("★重要")
  console.log("store._state.data.module1.count",store._state.data.module1.count)
  store._state.data.module1.count = 20
  console.log("store._state.data.module1.count",store._state.data.module1.count)

  console.log("store",store.state.count)
  console.log("store22",store)
  // console.log("store333",state.count)
  // console.log("store333",state)
}

// const iguchi = ref("ダイアンラベル::")
</script>
  