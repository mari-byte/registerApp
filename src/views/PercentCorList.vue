<template>
  <div class="backgrounds" :style="{ height: calculateBackgroundHeight }">
    <FlashMessage v-if="isShow" :message="flashMessage" :messageClass="messageClass" />

    <Table
      :tableHeader="headerList"
      :tableValues="valuesList"
      :delButtonFlg="true"
      :updateButtonFlg="true"
      @deleteValue="showDelDialog"
    ></Table>

    <Dialog v-if="showDialogFlg" @close="close">
      <h3 class="modal-header">{{ $t('dialog.confirmLabel') }}</h3>
      <div class="modal-body">
        <p>{{ $t('dialog.deleteMessage') }}</p>
      </div>
      <footer class="modal-footer">
        <button
          class="dialog-del-button"
          id="del"
          type="button"
          @click="deleteTableValueList(idNum)"
        >
          {{ $t('button.delete') }}
        </button>

        <button
          class="dialog-close-button"
          id="close"
          type="button"
          style="margin-right: 10px"
          @click="close"
        >
          {{ $t('button.cancel') }}
        </button>
      </footer>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, onMounted } from 'vue'
import FlashMessage from '@/components/FlashMessage.vue'
import Dialog from '@/components/Dialog.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Table from '@/components/TableComponent.vue'
import { useI18n } from 'vue-i18n'
import { headerList } from './labelSummarize.js'
import { constants } from 'buffer'
import { title } from 'process'

// script部分で使用する際に必要
const { t } = useI18n()
const valuesList = ref([])
const resultsList = ref([])
const showDialogFlg = ref(false)
const idNum = ref()
const router = useRouter()

// 現在の日時を取得
const now = new Date()
// 1週間前の日時を計算
const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
const isShow = ref(false)
const flashMessage = ref('')
const messageClass = ref('')

onMounted(async () => {
  resultsList.value = []
  const resValues = await getTableValueList()
  const resultsValues = await getResultsList()
  if (resultsValues.data) {
    await filterArray(resultsValues.data.rows)
  } else {
    resultsList.value = []
  }

  if (resValues.data) {

    // タイトルの昇順で並び替え
    resValues.data.rows.sort((a, b) => {
      if (a.title > b.title) {
        return 1
      } else if (b.title > a.title) {
        return -1
      } else {
        return 0
      }
    })

    await mappedArray(resValues.data.rows)
  } else {
    valuesList.value = []
  }
})

const calculateBackgroundHeight = computed(() => {
  if (0 < valuesList.value.length) {
    return `${valuesList.value.length * 62 + 200}px`
  } else {
    return '500px'
  }
})

const close = () => {
  idNum.value = undefined
  showDialogFlg.value = false
}

const showDelDialog = (id: number) => {
  idNum.value = id
  showDialogFlg.value = true
}

const mappedArray = async (values) => {
  valuesList.value = await values.map((item) => {
    //   (item) => item.answer === 1 && new Date(item.worked_date) < oneWeekAgo
    // const checkId = resultsList.value.map((idList) => new Date(idList.worked_date) < oneWeekAgo)

    // checkIdはゆくゆくは以下にする
    const checkId = resultsList.value.map((idList) => idList.title_id)
    const tableValueList = {
      id: item.id,
      sampletitle: item.title,
      sampledescription: item.description,
      samplepriority:
        item.priority === 1
          ? t('list.high')
          : item.priority === 2
          ? t('list.normal')
          : t('list.low'),
      sampledifficulty:
        item.difficulty === 1
          ? t('list.high')
          : item.difficulty === 2
          ? t('list.normal')
          : t('list.low'),
      highlightFlg: checkId.includes(item.id) ? true : false
    }
    return tableValueList
  })
}

const filterArray = async (values) => {
  // ゆくゆくは以下で済むようにしたい
  // resultsList.value = await values.filter(
  //   (item) => item.answer === 1 && new Date(item.worked_date) < oneWeekAgo
  // )
  let missList = await values.filter((item) => item.answer === 1)

  let beforeList = missList.filter((e, index, array) => {
    return array.slice(index + 1).every((item) => e.title_id !== item.title_id)
  })

  resultsList.value = beforeList.filter((e, index) => {
    return new Date(e.worked_date) < oneWeekAgo
  })
}

const getTableValueList = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/list')
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

const getResultsList = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/resultList')
    // const response = await axios.get('http://localhost:3000/api/resultList',{
    //   params: { updateId: Response }
    // })
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

// 削除処理
const deleteTableValueList = async (id: number) => {
  idNum.value = undefined
  const request = id
  try {
    const response = await axios.delete(`http://localhost:3000/api/deleteList/${request}`)
    const responses = await getTableValueList()

    isShow.value = true
    flashMessage.value = t('flashMessages.deleteSuccess')
    messageClass.value = 'delete-message-success'

    // 削除後に画面の上部にスクロール
    window.scroll({
      top: 0
    })

    setTimeout(() => {
      isShow.value = false
      flashMessage.value = undefined
      messageClass.value = undefined
    }, 1500)

    await mappedArray(responses.data.rows) // 削除後に一覧を再マップ
    close()
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
</script>

<style>
/* ここにスタイルを記述する */
.backgrounds {
  /* 背景画像の設定 */
  background-image: url('/images/bk.jpg');
  background-size: cover;
  background-position: center;
  /* その他のスタイル */
  width: 100%;
  height: 300vh;
  position: relative; /* 親要素に position: relative; を追加 */
}

.modal-header,
.modal-body,
.modal-footer {
  padding: 1.5em;
}

.modal-header {
  margin: 0;
  padding-bottom: 0.6em;
  background-color: rgb(248, 242, 216);
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  border-bottom: 1px solid black;
}

.modal-body,
.modal-footer {
  background-color: rgb(248, 242, 216);
  text-align: center;
}

.dialog-del-button {
  border: 1px solid black;
  background-color: rgb(248, 8, 56);
  /* padding-right: 10%; */
  color: white;
}
.dialog-close-button {
  border: 1px solid black;
  background-color: rgb(93, 138, 241);
  /* padding-right: 10%; */
}

.modal-body {
  font-size: 25px;
  font-family: 'MS UI Gothic', sans-serif;
}

.dialog-del-button,
.dialog-close-button {
  border: 1px solid black;
  /* ボタンの幅を広げる */
  width: 100px;
  height: 40px;
  margin: 25px; /* ボタン同士の間隔を調整 */
}
</style>
