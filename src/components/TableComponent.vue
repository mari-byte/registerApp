<template>
  <div>
    <table>
      <thead class="">
        <th v-for="(header, index) in props.tableHeader" :key="index">
          {{ header.label }}
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(value, rowIndex) in props.tableValues"
          :key="rowIndex"
          :class="{
            'highlight-row': !(value.highlightFlg === undefined) && value.highlightFlg === true
          }"
        >
          <td v-for="(header, headerIndex) in props.tableHeader" :key="headerIndex">
            {{ value[header.key] }}
            <button
              v-if="updateButtonFlg && header.key === 'sampleoption'"
              class="btn-square-shadow-update"
              @click="updatePercentCorList(value.id)"
            >
              {{ $t('button.edit') }}
            </button>
            <button
              v-if="delButtonFlg && header.key === 'sampleoption'"
              class="btn-square-shadow-delete"
              @click="deleteValue(value.id)"
            >
              {{ $t('button.delete') }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, defineProps, defineEmits } from 'vue'
import Input from '@/components/Input.vue'
import TextArea from '@/components/TextArea.vue'
import RadioButton from '@/components/RadioButton.vue'
import PullDown from '@/components/PullDown.vue'
import FlashMessage from '@/components/FlashMessage.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import { table } from 'console'
const router = useRouter()
const store = useStore()
const emit = defineEmits()

const props = defineProps({
  tableHeader: [],
  tableValues: [],
  updateButtonFlg: Boolean,
  delButtonFlg: Boolean
})

const deleteValue = (id: number) => {
  emit('deleteValue', id)
}

const updatePercentCorList = async (ids: number) => {
  store.commit('setUpdateId', ids)

  const resData = await getUpdateTitle(ids)
  store.commit('setUpdateData', resData)

  router.push({ name: 'ListUpdate' })
}

const getUpdateTitle = async (id: number) => {
  try {
    const response = await axios.get('http://localhost:3000/api/updatelist', {
      params: { updateId: id }
    })

    console.log("もしかしたら取れているかも",response.data)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
</script>

<style scoped>
td {
  border: 1px solid #040404;
  padding: 8px;
  text-align: left;
}

th {
  border: 1px solid #040404;
  padding: 8px;
  background-color: #81faa1;
}

.btn-square-shadow-update,
.btn-square-shadow-delete {
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  border-radius: 3px;
  border-bottom: solid 4px #627295;
  width: auto; /* ボタンの幅を自動調整 */
}

.btn-square-shadow-update {
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #668ad8; /*ボタン色*/
  color: black;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
}

.btn-square-shadow-delete {
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: red; /*ボタン色*/
  color: wheat;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
}

.btn-square-shadow-update:active,
.btn-square-shadow-delete:active {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px); /*下に動く*/
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2); /*影を小さく*/
  border-bottom: none;
}

@keyframes blink {
  0% {
    background-color: yellow;
  }
  50% {
    background-color: transparent;
  }
  100% {
    background-color: yellow;
  }
}

.highlight-row {
  animation: blink 2.5s infinite; /* 1秒ごとにアニメーションを繰り返す */
}
</style>
