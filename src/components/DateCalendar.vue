<template>
  <div v-if="showFlg">
    <button class="create-buttons" @click="handleCreateButtonClick">
      {{ custombuttonName }}
    </button>
    <button class="delete-buttons" @click="deleteResult()" v-if="showDelButton">
      {{ custombuttonDelName }}
    </button>

    <div
      v-for="(form, index) in forms"
      v-if="(forms && forms.length && forms[0].answer !== null) || showResultsList"
    >
      <Form class="element">
        <label class="element" for="input">{{ $t('update.questionNumberLabel') + (index + 1) }}</label>
        <div class="inline-radio">
          <div>
            <input
              type="radio"
              name="member"
              :value="0"
              v-model="resultValue[index]"
              checked
              @change="okE(index, dates[index])"
            /><label>○</label>
          </div>

          <div>
            <input
              type="radio"
              name="member"
              :value="1"
              v-model="resultValue[index]"
              @change="ngE(index, dates[index])"
            /><label>×</label>
          </div>
        </div>
        <div id="box">
          <VueDatePicker
            no-today
            v-model="dates[index]"
            :format="format"
            week-start="0"
            locale="ja"
            :placeholder="$t('date.placeholder')"
            :select-text="$t('date.select')"
            :cancel-text="$t('date.cancel')"
            @update:model-value="selectDate(dates[index], index)"
          ></VueDatePicker>
        </div>
        <br />
        <ErrorMessage class="errormessage" name="input" />
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineExpose, computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'


const props = defineProps({
  modelValue: [],
  detalData: []
})

const store = useStore()
const emit = defineEmits()
const {t} = useI18n()

const showDelButton = ref(false)
const showResultsList = ref(false)
const showFlg = ref(true)
const selectedItem = ref(props.modelValue)


const resetField = () => {
  showFlg.value = false
}

defineExpose({
  resetField
})

const okE = (index: number, selectedDate?: Date) => {
  if (selectedDate === undefined) {
    return
  }
  const date = new Date(selectedDate)
  const isoDateString = date.toISOString()

  let results = {
    answer: resultValue.value[index] !== undefined ? resultValue.value[index] : 0,
    date: isoDateString,
    problem_number: index + 1
  }

  // ミューテーションが完了してからゲッターを使ってデータを取得
  forms.value[index] = results
  dates.value[index] = selectedDate

  emit('updateResultData', results)
}

const ngE = (index: number, selectedDate?: Date) => {
  if (selectedDate === undefined) {
    return
  }
  console.log('✕を選択しました')
  console.log('気になる部分::', selectedDate)
  const date = new Date(selectedDate)
  const isoDateString = date.toISOString()

  let results = {
    answer: resultValue.value[index] !== undefined ? resultValue.value[index] : 0,
    date: isoDateString,
    problem_number: index + 1
  }

  // ミューテーションが完了してからゲッターを使ってデータを取得
  forms.value[index] = results
  dates.value[index] = selectedDate

  emit('updateResultData', results)
}

const dates = computed(() => {
  console.log('知りたいdates::', props.detalData)
  if (props.detalData && props.detalData.length && props.detalData[0] !== undefined) {
    showDelButton.value = true
    console.log('エラーの際にはここには来てほしくない')
    return props.detalData.map((items) => items.date)
  } else {
    return []
  }
})

// const format: string = 'yyyy-MM-dd HH:mm'
const format: string = 'yyyy-MM-dd'
const forms = computed(() => {
  console.log('めちゃくちゃ気になるとこforms', props.detalData)
  return props.detalData
})
const initForms = {
  problemNumber: '',
  workedDate: '',
  answer: undefined
}
const showbutton = ref(false)

const resultValue = computed(() => {
  if (props.detalData && props.detalData.length && props.detalData[0] !== undefined) {
    return props.detalData.map((items) => items.answer)
  } else {
    return [0]
  }
})

const handleCreateButtonClick = (e: Event) => {
  e.stopPropagation()
  createResult()
}

const createResult = () => {
  showDelButton.value = true
  // console.log('これですむ', forms.value[0].answer)
  // if (forms?.value[0]?.answer === null) {
  if (forms.value[0]?.answer === null) {
    deleteResult()
  }
  showResultsList.value = true
  console.log('エミット前に渡すものの確認', forms.value.length)
  emit('getListLength', forms.value.length)
  forms.value.push(initForms)
}

const deleteResult = () => {
  // forms.value.splice(forms.value.length -1, 1)
  forms.value.splice(-1, 1)
  if (forms.value.length === 0) {
    showDelButton.value = false
  }
  emit('getListLength', forms.value.length)
}

const custombuttonName = computed(() => {
  if (selectedItem && selectedItem.value[0].question_format === 1) {
    return t('button.addSerial')
  } else if (selectedItem.value[0].question_format === 2) {
    return t('button.addDescription')
  } else if (selectedItem.value[0].question_format === 3) {
    return t('button.addDivide')
  } else if (selectedItem.value[0].question_format === 4) {
    return t('button.addMemorization')
  } else if (selectedItem.value[0].question_format === 0) {
    return
  } else if (selectedItem.value === null) {
    showbutton.value = false
  } else {
    throw new Error(t('message.error'))
  }
})

const custombuttonDelName = computed(() => {
  if (selectedItem.value[0].question_format === 1) {
    return t('button.delSerial')
  } else if (selectedItem.value[0].question_format === 2) {
    return t('button.delDescription')
  } else if (selectedItem.value[0].question_format === 3) {
    return t('button.delDivide')
  } else if (selectedItem.value[0].question_format === 4) {
    return t('button.delMemorization')
  } else if (selectedItem.value[0].question_format === 0) {
    return
  } else if (selectedItem.value === null) {
    showbutton.value = false
  } else {
    throw new Error(t('message.error'))
  }
})

const selectDate = (selectedDate: Date, index: number) => {
  console.log('showResultsList', showResultsList.value)
  const date = new Date(selectedDate)
  const isoDateString = date.toISOString()
  console.log(isoDateString)

  console.log('決定した際selectedDate::', selectedDate)
  console.log('決定した際index::', index)
  const year = selectedDate.getFullYear()
  const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2) // 月は0-indexedなので+1する
  const day = ('0' + selectedDate.getDate()).slice(-2)

  const mysqlDate = `${year}-${month}-${day}`
  let results = {
    answer: resultValue.value[index] !== undefined ? resultValue.value[index] : 0,
    date: mysqlDate,
    problem_number: index + 1
  }
  console.log('results::', results)
  // ミューテーションが完了してからゲッターを使ってデータを取得
  forms.value[index] = results
  dates.value[index] = selectedDate
  emit('updateResultData', results)
}
</script>

<style scoped>
.elementsss {
  border: 1px solid #100a0a; /* インプットの枠線を表示 */

  margin-right: 50px; /* ラベルと必須マークの間の余白 */
  font-size: large; /* ラベルのフォントサイズ */
  white-space: nowrap; /* テキストを折り返さないようにする */
}

.create-buttons {
  margin-left: 50px;
  border: 1px solid #756161;
  background-color: #32fda580; /* ボタンの背景色を変更 */
  color: black; /* ボタンのテキスト色を変更 */
  border-radius: 10px;
}

.delete-buttons {
  margin-left: 50px;
  border: 1px solid #756161;
  background-color: #ef0b22; /* ボタンの背景色を変更 */
  color: black; /* ボタンのテキスト色を変更 */
  border-radius: 10px;
}

.inline-radio {
  display: flex;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid #b6b6b6;

  div {
    position: relative;
    flex: 1;
  }

  input {
    width: 100%;
    height: 60px;
    opacity: 0;
  }

  label {
    border: 1px solid #100a0a; /* インプットの枠線を表示 */

    position: absolute;
    top: 0;
    left: 0;
    color: #b6b6b6;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    border-right: 1px solid #b6b6b6;
  }

  div:last-child label {
    border-right: 0;
  }

  input:checked + label {
    background: #d81b60;
    font-weight: 500;
    color: #fff;
  }
}

.selectdiv {
  border: 1px solid rgb(10, 10, 10); /* 枠線の色を赤色に設定 */
  border-radius: 5px; /* 枠線の角を丸める */
  padding: 5px; /* プルダウン要素の内側の余白を設定（任意） */
  background: linear-gradient(#4dc2f8, #0d82b9);
}
</style>
