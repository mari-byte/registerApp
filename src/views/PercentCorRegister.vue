<template>
  <div id="app" class="parent-element" :style="{ height: backgroundHeight }">
    <FlashMessage v-if="isShow" :message="flashMessage" :messageClass="messageClass" />

    <h1 class="soft-font">{{ $t('register.title') }}</h1>
    <br />
    <Input
      ref="titleInput"
      v-model="titleValue"
      :placeholders="$t('register.titlePlaceHolder')"
      :fieldName="$t('common.title')"
      @update="ChangeTitle"
      :flg="delInputFlg"
    />
    <br />
    <TextArea
      ref="titleTextarea"
      v-model="descriptionValue"
      :placeholders="$t('register.descriptPlaceHolder')"
      name="sample-textarea"
      :fieldName="$t('register.descriptLabel')"
      @update="Changedescription"
    ></TextArea>
    <br />
    <RadioButton
      ref="priorityRadioHigh"
      v-model="selectedPriority"
      :title="$t('register.priorityLabel')"
      name="priority"
      :label="$t('common.high')"
      @update:selectedItem="ChangePriority"
    />
    <RadioButton
      ref="priorityRadioMiddle"
      v-model="selectedPriority"
      :label="$t('common.normal')"
      name="priority"
      @update:selectedItem="ChangePriority"
    />
    <RadioButton
      ref="priorityRadioLow"
      v-model="selectedPriority"
      :label="$t('common.low')"
      name="priority"
      @update:selectedItem="ChangePriority"
    />
    <br />
    <br />
    <RadioButton
      ref="LevelHighref"
      v-model="selectedLevel"
      :title="$t('register.levelLabel')"
      name="level"
      :label="$t('common.high')"
      @update:selectedItem="ChangeLevelItem"
    />
    <RadioButton
      ref="LevelMiddleref"
      v-model="selectedLevel"
      :label="$t('common.normal')"
      name="level"
      @update:selectedItem="ChangeLevelItem"
    />
    <RadioButton
      ref="LevelLowref"
      v-model="selectedLevel"
      :label="$t('common.low')"
      name="level"
      @update:selectedItem="ChangeLevelItem"
    />
    <br />
    <br />
    <PullDown
      ref="pulldownRef"
      v-model="pulldownValue"
      :label="$t('register.questionFormatLabel')"
      @update="ChangePullDown"
      @updateResult="ChangeResult"
      @getListLength="getHeight"
    />
    <br />
    <button class="create" @click.prevent="createPercentCor">{{ $t('button.register') }}</button>
    <button class="clear" @click.prevent="reset">{{ $t('button.clear') }}</button>
    <button class="clear" @click.prevent="test">実験</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent } from 'vue'
import Input from '@/components/Input.vue'
import TextArea from '@/components/TextArea.vue'
import RadioButton from '@/components/RadioButton.vue'
import PullDown from '@/components/PullDown.vue'
import FlashMessage from '@/components/FlashMessage.vue'
import axios from 'axios'
import Date from '@/components/DateCalendar.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const flashMessage = ref('')
const messageClass = ref('')
const titleValue = ref()
const resAll = ref([])
const descriptionValue = ref(null)
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
const checkHeight = ref()

const backgroundHeight = computed(() => {
  if (0 < checkHeight.value) {
    return `${checkHeight.value * 160 + 700}px`
  } else {
    return '700px'
  }
})

const test = () => {
  const req = [
    { answer: 1, date: '2024-01-19T15:00:00.000Z', problem_number: 1 },
    { answer: 1, date: '2020-04-09T15:00:00.000Z', problem_number: 2 },
    { answer: 0, date: '2024-02-09T15:00:00.000Z', problem_number: 1 },
    { answer: 1, date: '2024-02-09T15:00:00.000Z', problem_number: 1 },
    { answer: 1, date: '2024-02-27T15:00:00.000Z', problem_number: 1 },
    { answer: 0, date: '1990-12-25T07:55:00.000Z', problem_number: 3 },
    { answer: 1, date: '2024-04-25T07:55:00.000Z', problem_number: 3 },
    { answer: 1, date: '2024-02-04T15:00:00.000Z', problem_number: 1 },
    { answer: 0, date: '2024-08-04T15:00:00.000Z', problem_number: 1 },
    { answer: 0, date: '2024-10-25T07:55:00.000Z', problem_number: 3 },
    { answer: 1, date: '2024-11-31T15:00:00.000Z', problem_number: 2 },
    { answer: 1, date: '2024-03-31T15:00:00.000Z', problem_number: 4 },
    { answer: 1, date: '2010-02-10T15:00:00.000Z', problem_number: 4 },
  ]

  // パターン1ひっくり返して重複削除
  console.log("元々の配列",req)
  const newReq = req.filter((currentItem, index, currentArray) => {
    console.log(`インデックスは::${index}、アイテムは??${currentItem.problem_number} `)
    return currentArray.slice(index + 1).every(nextItem => nextItem.problem_number !== currentItem.problem_number);
  })

  console.log("何が出力されるのかの確認",newReq)
}

const getHeight = (value: number) => {
  checkHeight.value = value
}

const ChangeLevelItem = (value: string) => {
  selectedLevel.value = value
}

const ChangePriority = (value: string) => {
  selectedPriority.value = value
}

const ChangeTitle = (value: string) => {
  titleValue.value = value
}

const Changedescription = (value: string) => {
  descriptionValue.value = value
}

const ChangePullDown = (value: string) => {
  pulldownValue.value = value
}

const ChangeResult = (value) => {
  resAll.value.push(value)
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

  if (delInputFlg.value) {
    delInputFlg.value = false
  }

  delInputFlg.value = true

  //以下いらないかも後ほど検討
  titleValue.value = ''
  descriptionValue.value = ''
  selectedPriority.value = ''
  selectedLevel.value = ''
  pulldownValue.value = ''
  resAll.value = []
}

// 追加処理
const createPercentCor = () => {
  const requestData = {
    title: titleValue.value,
    description: descriptionValue.value,
    priority: selectedPriority.value,
    difficulty: selectedLevel.value,
    question_format: pulldownValue.value,
    results: resAll.value
  }

  axios
    .post('http://localhost:3000/api/create', requestData)
    .then((response) => {
      console.log('レスポンスのデータ', response.data)
      reset()

      router.push({ name: 'Register' })
      isShow.value = true
      flashMessage.value = t('flashMessages.registerSuccess')
      messageClass.value = 'flash-message-success'

      setTimeout(() => {
        // メニュー画面へ遷移
        router.push({ name: 'RegisterApp' })
      }, 2500)
    })

    .catch((error) => {
      isShow.value = true
      console.log('apiのエラーについて', error)
      flashMessage.value = error.response.data.message
      messageClass.value = 'flash-message-error'
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

.soft-font {
  /* font-family: 'cursive'; やわらかいフォントを選択 */
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

.create {
  margin-left: 50px;
  border: 1px solid #756161;
  background: linear-gradient(#0bfe64, #99f7c6);
  color: black; /* ボタンのテキスト色を変更 */
  border-radius: 9px;
  /* ボタンの大きさを大きくする */
  width: 100px;
  height: 50px;
}

.clear {
  margin-left: 50px;
  border: 1px solid #756161;
  /* background: linear-gradient(#f0f17c, #fcfcdb); */
  background: linear-gradient(#55ea2f, #fcfcdb);
  color: rgb(63, 63, 59);
  /* color: rgb(26, 25, 25); ボタンのテキスト色を変更 */
  border-radius: 9px;
  /* ボタンの大きさを大きくする */
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
