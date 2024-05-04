<template>
  <div class="label-wrapper">
    <label class="element" for="input">{{ label }}</label>
    <select v-model="selectedItem" @change="handleChange" class="selectdiv">
      <option v-for="(item, index) in options" :key="index" :value="item.value">
        {{ item.label }}
      </option>
    </select>
    <br />
    <br />
    <button
      class="create-buttons"
      @click="handleCreateButtonClick"
      v-if="
        (showbutton || 0 < selectedItem?.length) && router.currentRoute.value.name === 'Register'
      "
    >
      {{ custombuttonName }}
    </button>
    <button
      class="delete-buttons"
      :disabled="!forms.length"
      @click="deleteResult()"
      v-if="
        forms.length &&
        (showbutton || 0 < selectedItem?.length) &&
        router.currentRoute.value.name === 'Register'
      "
    >
      {{ custombuttonDelName }}
    </button>

    <div v-for="(form, index) in forms" v-if="selectedItem !== null">
      <Form class="element">
        <label class="element" for="input">{{
          $t('register.questionNumberLabel') + (index + 1)
        }}</label>
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
            :enable-time-picker="false"
            week-start="0"
            locale="ja"
            :placeholder="$t('date.placeholder')"
            :select-text="$t('date.select')"
            :cancel-text="$t('date.cancel')"
            :show-now-button="false"
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
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
import RadioButton from '@/components/RadioButton.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { options } from '@/views/labelSummarize.js'

const router = useRouter()
const { t } = useI18n()

const props = defineProps({
  label: String,
  modelValue: String
})

const selectedLevel = ref(null)
const resultValue = ref([0])
const date = ref(new Date())
const dates = ref([])
const format: string = 'yyyy-MM-dd'
// const format: string = 'yyyy-MM-dd HH:mm'

const emit = defineEmits()
const selectedItem = ref(props.modelValue)
const showbutton = ref(false)
const forms = ref([])
const initForms = {
  title: '',
  values: ''
}

const resetField = () => {
  selectedItem.value = null
  showbutton.value = false
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
    workedDate: isoDateString,
    problemNumber: index + 1
  }

  // ミューテーションが完了してからゲッターを使ってデータを取得
  // forms.value[index] = results
  // dates.value[index] = selectedDate

  emit('updateResult', results)
}

const ngE = (index: number, selectedDate?: Date) => {
  if (selectedDate === undefined) {
    return
  }
  const date = new Date(selectedDate)
  const isoDateString = date.toISOString()

  let results = {
    answer: resultValue.value[index] !== undefined ? resultValue.value[index] : 0,
    workedDate: isoDateString,
    problemNumber: index + 1
  }

  // ミューテーションが完了してからゲッターを使ってデータを取得
  // forms.value[index] = results
  // dates.value[index] = selectedDate

  emit('updateResult', results)
}

const selectDate = (selectedDate: Date, index: number) => {
  const year = selectedDate.getFullYear()
  const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2) // 月は0-indexedなので+1する
  const day = ('0' + selectedDate.getDate()).slice(-2)
  const mysqlDate = `${year}-${month}-${day}`
  let results = {
    problemNumber: index + 1,
    workedDate: mysqlDate,
    answer: resultValue.value[index] !== undefined ? resultValue.value[index] : 0
  }
  // dates.value[index] = selectedDate
  emit('updateResult', results)
}

const custombuttonName = computed(() => {
  if (selectedItem.value === 'option1') {
    return t('button.addSerial')
  } else if (selectedItem.value === 'option2') {
    return t('button.addDescription')
  } else if (selectedItem.value === 'option3') {
    return t('button.addDivide')
  } else if (selectedItem.value === 'option4') {
    return t('button.addMemorization')
  } else if (selectedItem.value === null) {
    showbutton.value = false
  } else {
    throw new Error(t('message.error'))
  }
})

const custombuttonDelName = computed(() => {
  if (selectedItem.value === 'option1') {
    return t('button.delSerial')
  } else if (selectedItem.value === 'option2') {
    return t('button.delDescription')
  } else if (selectedItem.value === 'option3') {
    return t('button.delDivide')
  } else if (selectedItem.value === 'option4') {
    return t('button.delMemorization')
  } else if (selectedItem.value === null) {
    showbutton.value = false
  } else {
    throw new Error(t('message.error'))
  }
})

const handleCreateButtonClick = (e: Event) => {
  e.stopPropagation()
  createResult()
}

const createResult = () => {
  forms.value.push(initForms)
  emit('getListLength', forms.value.length)
}

const deleteResult = () => {
  // forms.value.splice(forms.value.length -1, 1)
  forms.value.splice(-1, 1)
  emit('getListLength', forms.value.length)
}

const handleChange = () => {
  showbutton.value = false
  if (selectedItem.value === 'option1') {
    showbutton.value = true
    emit('update', 1)
  } else if (selectedItem.value === 'option2') {
    showbutton.value = true
    emit('update', 2)
  } else if (selectedItem.value === 'option3') {
    showbutton.value = true
    emit('update', 3)
  } else if (selectedItem.value === 'option4') {
    showbutton.value = true
    emit('update', 4)
  } else if (selectedItem.value === null) {
    showbutton.value = false
    emit('update', 0)
  } else {
    throw new Error(t('message.error'))
  }
}
</script>

<style>
.elementsss {
  border: 1px solid #100a0a; /* インプットの枠線を表示 */
  margin-right: 50px; /* ラベルと必須マークの間の余白 */
  font-size: large; /* ラベルのフォントサイズ */
  white-space: nowrap; /* テキストを折り返さないようにする */
}

.create-buttons {
  margin-left: 50px;
  border: 1px solid #756161;
  background: linear-gradient(#0bfe64, #99f7c6);
  /* background: linear-gradient(#8bdabf,#99d9d4 ); */
  color: rgb(14, 1, 1); /* ボタンのテキスト色を変更 */
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
