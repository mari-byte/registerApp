<template>
  <div id="app" class="parent-element" :style="{ height: backgroundHeight }">
    <FlashMessage v-if="isShow" :message="flashMessage" :messageClass="messageClass" />

    <h1 class="soft-font">{{ $t('update.title') }}</h1>
    <br />
    <Input
      ref="titleInput"
      :fieldName="$t('common.title')"
      v-model="updateTitleValue"
      @update="changeTitle"
      :placeholders="$t('update.titlePlaceHolder')"
      :flg="delInputFlg"
      :value="updateTitleValues"
    />
    <br />
    <TextArea
      ref="titleTextarea"
      :placeholders="$t('update.descriptPlaceHolder')"
      name="sample-textarea"
      :fieldName="$t('update.descriptLabel')"
      v-model="updateDescriptionValue"
      @update="Changedescription"
      :value="updateDescriptionValues"
    ></TextArea>
    <br />
    <RadioButton
      ref="priorityRadioHigh"
      :title="$t('update.priorityLabel')"
      name="priority"
      :label="$t('common.high')"
      v-model="updatePriority"
      @update:selectedItem="ChangePriority"
      :value="selectedPriority"
    />
    <RadioButton
      ref="priorityRadioMiddle"
      :label="$t('common.normal')"
      name="priority"
      v-model="updatePriority"
      @update:selectedItem="ChangePriority"
      :value="selectedPriority"
    />
    <RadioButton
      ref="priorityRadioLow"
      :label="$t('common.low')"
      name="priority"
      v-model="updatePriority"
      @update:selectedItem="ChangePriority"
      :value="selectedPriority"
    />
    <br />
    <br />
    <RadioButton
      ref="LevelHighref"
      :title="$t('update.levelLabel')"
      name="level"
      :label="$t('common.high')"
      v-model="updateLevelModel"
      @update:selectedItem="ChangeLevelItem"
      :value="selectedLevel"
    />
    <RadioButton
      ref="LevelMiddleref"
      :label="$t('common.normal')"
      name="level"
      v-model="updateLevelModel"
      @update:selectedItem="ChangeLevelItem"
      :value="selectedLevel"
    />
    <RadioButton
      ref="LevelLowref"
      :label="$t('common.low')"
      name="level"
      v-model="updateLevelModel"
      @update:selectedItem="ChangeLevelItem"
      :value="selectedLevel"
    />
    <br />
    <br />
    <PullDown
      ref="pulldownRef"
      :label="$t('update.questionFormatLabel')"
      v-model="updatePulldownValue"
      @update="ChangePullDown"
    />
    <br />
    <Date
      ref="dateRef"
      v-if="updatePulldownValue !== null || showDate"
      v-model="updateDateValue"
      :detalData="modifyData"
      @updateResultData="ChangeResultsList"
      @getListLength="getHeight"
    />
    <br />
    <br />
    <button class="update" @click.prevent="showDelDialog">{{ $t('button.update') }}</button>
    <button class="cancel" @click.prevent="back">{{ $t('button.back') }}</button>

    <Dialog v-if="showDialogFlg" @close="close">
      <h3 class="modal-header">{{ $t('dialog.confirmLabel') }}</h3>
      <div class="modal-body">
        <p>{{ $t('dialog.updateMessage') }}</p>
      </div>
      <footer class="modal-footer">
        <button class="dialog-del-button" id="update" type="button" @click="updatePercentCor">
          {{ $t('button.update') }}
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
import { ref, computed, defineProps } from 'vue'
import Input from '@/components/Input.vue'
import TextArea from '@/components/TextArea.vue'
import RadioButton from '@/components/RadioButton.vue'
import PullDown from '@/components/PullDown.vue'
import FlashMessage from '@/components/FlashMessage.vue'
import Date from '@/components/DateCalendar.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import lastIndex from '@/views/usefulMethod.js'
import Dialog from '@/components/Dialog.vue'

const { t } = useI18n()
const router = useRouter()

const showDate = ref(false)
const store = useStore()
const updateTitleValues = ref()
const updateDescriptionValues = ref()
const resData = ref()
const modifyData = ref()
const showDialogFlg = ref(false)
const flashMessage = ref('')
const messageClass = ref('')
const checkHeight = ref()
const resAll = ref([])
const reqResults = ref([])

const selectedPriority = ref(null)
const selectedLevel = ref(null)
const pulldownValue = ref(null)
const isShow = ref(false)

const delInputFlg = ref(false)
const titleInput = ref()
const titleTextarea = ref()
const priorityRadioHigh = ref()
const priorityRadioMiddle = ref()
const priorityRadioLow = ref()
const LevelHighref = ref()
const LevelMiddleref = ref()
const LevelLowref = ref()
const pulldownRef = ref()
const dateRef = ref()
const hoges = ref()

const option1: string = 'option1'
const option2: string = 'option2'
const option3: string = 'option3'
const option4: string = 'option4'

onMounted(async () => {
  window.scroll({
    top: 0
  })
  resData.value = await store.getters.getUpdateData.rows.map((item) => {
    return {
      answer: item.answer,
      problem_number: item.problem_number,
      date: item.worked_date,
      updateId: item.id
    }
  })
  store.commit('modifyResults', resData.value)

  modifyData.value = store.getters.getResults

  // ゆくゆくは以下を修正する必要がある
  // 備忘
  // 登録時にdate部分を設定していない場合に[]で登録していている
  // そこらへんが原因で更新時に新たに追加しようとすると上手くいかないので処理を追加している
  if (modifyData.value.length && modifyData.value[0].answer === null) {
    modifyData.value.shift()
  }

  // if (updateDateValue.value.length !== 0) {
  if (updateDateValue.value) {
    const beforeDatas = updateDateValue.value.filter(
      (item) => item.answer !== null && item.date !== null && item.problem_number !== null
    )

    const datas = beforeDatas.map((item) => {
      return {
        answer: item.answer,
        date: item.worked_date,
        problem_number: item.problem_number,
        updateId: item.id
      }
    })
    for (const data of datas) {
      resAll.value.push(data)
    }
  }
})

const backgroundHeight = computed(() => {
  if (0 < checkHeight.value) {
    return `${checkHeight.value * 165 + 800}px`
  } else {
    // 備忘
    // return '700px'
    return '110vh'
  }
})

const close = () => {
  showDialogFlg.value = false
}

const updateTitleValue = computed(() => {
  const updateTitle = store.getters.getUpdateData.rows
  if (updateTitle && updateTitle.length > 0) {
    return updateTitle[0]?.title ?? ''
  } else {
    return ''
  }
})

const getHeight = (value: number, hoge?) => {
  if (hoge) {
    resAll.value = hoge
  }
  checkHeight.value = value
}

const updateDescriptionValue = computed(() => {
  const updatedescription = store.getters.getUpdateData.rows

  if (updatedescription && updatedescription.length > 0) {
    return updatedescription[0]?.description ?? ''
  } else {
    return ''
  }
})

const updatePriority = computed(() => {
  const upPriority = store.getters.getUpdateData.rows
  let priorityValue = undefined
  if (upPriority && upPriority[0]?.priority === 1) {
    priorityValue = t('common.high')
  } else if (upPriority && upPriority[0]?.priority === 2) {
    priorityValue = t('common.normal')
  } else if (upPriority && upPriority[0]?.priority === 3) {
    priorityValue = t('common.low')
  } else {
    priorityValue = ''
  }
  return priorityValue
})

const updateLevelModel = computed(() => {
  const updatelevel = store.getters.getUpdateData.rows
  let uplevelValue = undefined
  if (updatelevel && updatelevel[0]?.difficulty === 1) {
    uplevelValue = t('common.high')
  } else if (updatelevel && updatelevel[0]?.difficulty === 2) {
    uplevelValue = t('common.normal')
  } else if (updatelevel && updatelevel[0]?.difficulty === 3) {
    uplevelValue = t('common.low')
  } else {
    uplevelValue = ''
  }
  return uplevelValue
})
const updatePulldownValue = computed(() => {
  const updatelevel = store.getters.getUpdateData.rows
  let updatepulldown = undefined
  if (updatelevel && updatelevel[0]?.question_format === 1) {
    updatepulldown = option1
  } else if (updatelevel && updatelevel[0]?.question_format === 2) {
    updatepulldown = option2
  } else if (updatelevel && updatelevel[0]?.question_format === 3) {
    updatepulldown = option3
  } else if (updatelevel && updatelevel[0]?.question_format === 4) {
    updatepulldown = option4
  } else {
    updatepulldown = null
  }
  return updatepulldown
})

const updateDateValue = computed(() => {
  const updatelevel = store.getters.getUpdateData.rows
  let updatepulldown = undefined
  if (updatelevel && updatelevel[0]?.question_format === 1) {
    updatepulldown = { option1, updatelevel }
  } else if (updatelevel && updatelevel[0]?.question_format === 2) {
    updatepulldown = { option2, updatelevel }
  } else if (updatelevel && updatelevel[0]?.question_format === 3) {
    updatepulldown = { option3, updatelevel }
  } else if (updatelevel && updatelevel[0]?.question_format === 4) {
    updatepulldown = { option4, updatelevel }
  } else {
    updatepulldown = null
  }
  return updatelevel
})

const back = () => {
  router.back()
}

const ChangeLevelItem = (value: string) => {
  selectedLevel.value = value
}

const ChangePriority = (value: string) => {
  selectedPriority.value = value
}

const changeTitle = (value: string) => {
  updateTitleValues.value = value
}

const Changedescription = (value: string) => {
  updateDescriptionValues.value = value
}

const ChangePullDown = (value: string) => {
  store.commit('setUpdateFormat', value)
  showDate.value = true
  pulldownValue.value = value
}

const ChangeResultsList = (value,index) => {
  hoges.value = value;
  const checkPush = hoges.value === resAll.value[index]
  if (!checkPush) {
    resAll.value.push(value)
  }

  // resAll.value.push(value)

  modifyResultsList(resAll.value)
}

const modifyResultsList = (
  req: Array<{ answer: number; date: string; problem_number: number }>
) => {
  // 外部ファイルで実施ver
  const tests = lastIndex(req)
  // vuex
  store.commit('modifyResults', req)

  const getResultVal = store.getters.getResults
  reqResults.value = getResultVal

  // 備忘
  // ★typescriptでの方法★(上手くいかない、分かってない)
  // const findLastIndex = <T>(
  //   array: T[],
  //   predicate: (value: T, index: number, obj: T[]) => boolean
  // ): number => {
  //   for (let i = array.length - 1; i >= 0; i--) {
  //     if (predicate(array[i], i, array)) {
  //       return i
  //     }
  //   }
  //   return -1
  // }

  // const modifyResultsList = (
  //   req: Array<{ answer: number; date: string; problem_number: number }>
  // ) => {
  //   const newReq = req.filter((e, index, array) => {
  //     return findLastIndex(array, (el) => el.problem_number === e.problem_number) === index
  //   })
  // }

  // ★↑javascriptでの方法↑★
  // const newReq = req.filter((e, index, array) => {
  //   return array.findLastIndex((el) => el.problem_number === e.problem_number) === index
  // })
}

const reset = () => {
  titleInput.value.resetField()
  titleTextarea.value.resetField()
  priorityRadioHigh.value.resetField()
  priorityRadioMiddle.value.resetField()
  priorityRadioLow.value.resetField()
  LevelHighref.value.resetField()
  LevelMiddleref.value.resetField()
  LevelLowref.value.resetField()
  pulldownRef.value.resetField()

  if (dateRef.value) {
    dateRef.value.resetField()
  }

  if (delInputFlg.value) {
    delInputFlg.value = false
  }

  delInputFlg.value = true
}

const showDelDialog = () => {
  showDialogFlg.value = true
}

const updatePercentCor = async () => {
  showDialogFlg.value = false
  const reqId = await store.getters.getUpdateId
  // 以下で最初のものとの比較を実施
  const delhoge = await store.getters.getUpdateData.rows.map((item) => {
    return {
      answer: item.answer,
      problem_number: item.problem_number,
      date: item.worked_date,
      updateId: item.id
    }
  })

  const requestData = {
    title:
      updateTitleValues.value === null || updateTitleValues.value === undefined
        ? updateTitleValue.value
        : updateTitleValues.value,
    description:
      updateDescriptionValues.value === null || updateTitleValues.value === undefined
        ? updateDescriptionValue.value
        : updateDescriptionValues.value,
    priority:
      selectedPriority.value === null || selectedPriority.value === undefined
        ? updatePriority.value === t('common.high')
          ? 1
          : updatePriority.value === t('common.normal')
          ? 2
          : 3
        : selectedPriority.value,
    difficulty:
      selectedLevel.value === null || selectedLevel.value === undefined
        ? updateLevelModel.value === t('common.high')
          ? 1
          : updateLevelModel.value === t('common.normal')
          ? 2
          : 3
        : selectedLevel.value,
    question_format:
      pulldownValue.value === null || pulldownValue.value === undefined
        ? updatePulldownValue.value === 'option1'
          ? 1
          : updatePulldownValue.value === 'option2'
          ? 2
          : updatePulldownValue.value === 'option3'
          ? 3
          : updatePulldownValue.value === 'option4'
          ? 4
          : null
        : pulldownValue.value,
    results:
      resAll.value === null || resAll.value === undefined || resAll.value.length === 0
        ? []
        : (reqResults.value === null ||
            reqResults.value === undefined ||
            reqResults.value.length === 0) &&
          checkHeight.value !== 0
        ? resAll.value
        : checkHeight.value === 0
        ? []
        : reqResults.value,
    id: reqId,
    beforeValue: delhoge
  }

  // 処理を無理矢理止める
  // return

  axios
    .put('http://localhost:3000/api/update', requestData)
    .then((response) => {
      window.scroll({
        top: 0
      })

      isShow.value = true
      flashMessage.value = t('flashMessages.updateSuccess')
      messageClass.value = 'flash-message-success'
      reset()

      setTimeout(() => {
        // メニュー画面へ遷移
        router.push({ name: 'RegisterApp' })
      }, 2500)
    })
    .catch((error) => {
      isShow.value = true
      flashMessage.value = error.response.data.message
      messageClass.value = 'flash-message-error'
      console.error(error)
    })
}
</script>

<style>
.parent-element {
  /* 背景画像の設定 */
  background-image: url('/images/bk.jpg');
  background-size: cover;
  background-position: center;
  /* その他のスタイル */
  width: 100%;
  height: 200vh;
  position: relative; /* 親要素に position: relative; を追加 */
}

/* スタイリングを追加する場合にここに記述 */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #040404;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #08e543;
}

.soft-font {
  font-family: 'Lucida Console', Courier, monospace;
  font-size: 2em; /* フォントサイズを調整 */
  color: #333; /* テキストの色を設定 */
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1); /* テキストに影を追加 */
}

/* フレックスコンテナを定義し、子要素を横に並べる */
.flex-container {
  display: flex;
  align-items: center; /* 子要素を垂直方向に中央寄せ */
}

/* PraItemの幅を調整 */
.PraItem {
  flex: 1; /* 幅を均等に分割 */
}

.register-update-button {
  font-family: 'Lucida Console', Courier, monospace;
  font-size: 3.5em; /* フォントサイズを調整 */
  color: #420a0a; /* テキストの色を設定 */
  background-color: #b4d9f7; /* ボタンの背景色を変更 */
  margin-left: 10px;
  border-radius: 10px;
}
.delete-button {
  font-family: 'Lucida Console', Courier, monospace;
  font-size: 3.5em; /* フォントサイズを調整 */
  color: #0f0c0c; /* テキストの色を設定 */
  background-color: #f10a0a; /* ボタンの背景色を変更 */
  margin-left: 10px;
  border-radius: 10px;
}

.update {
  margin-left: 30px;
  border: 1px solid #756161;
  background: linear-gradient(#32eeff, #edffbe);
  color: black; /* ボタンのテキスト色を変更 */
  font-size: large;
  border-radius: 10px;
  width: 100px;
  height: 50px;
}

.cancel {
  margin-left: 30px;
  border: 1px solid #756161;
  background: linear-gradient(#e5da04, #dda10a);
  color: black; /* ボタンのテキスト色を変更 */
  font-size: large;
  border-radius: 10px;
  width: 100px;
  height: 50px;
}

.flash-message {
  position: fixed;
  bottom: 20px;
  right: 0;
  left: 0;
  margin: auto;
  width: 768px;
  display: flex;
  justify-content: center;
}

.message {
  min-width: 200px;
  height: 20px;
  padding: 10px 20px;
  color: #f5f5f5;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  background-color: #555555;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
