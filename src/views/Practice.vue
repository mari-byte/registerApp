<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

import { DatePicker, Alert } from 'uiv';

import { onMounted } from 'vue';

onMounted(() => {
  convertDayOfWeek();
});


const date = ref(null);

let isShow = ref('password')

// パスワード表示切り替え
const onClick = () => {
  if (isShow.value === 'password') {
    isShow.value = 'text'
  } else if (isShow.value === 'text') {
    isShow.value = 'password'
  }
}

const { errors, handleSubmit, isSubmitting } = useForm({
  initialValues: {
    lastName: '',
    firstName: '',
    hireDate: '',
    department: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
})

const { value: lastName} = useField('lastName')
const { value: firstName } = useField('firstName')
const { value: hireDate } = useField('hireDate')
const { value: department } = useField('department')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: confirmPassword } = useField('confirmPassword')

const onSubmit = handleSubmit((values, { resetForm }) => {
  // console.log(aaa.value)
  console.log(values)
  resetForm()
})

const test = () => {

  let ai = document.getElementById('datepicker')
  console.log("確認")
  console.log("確認")
  console.log("確認")
  console.log(ai)

  var textToConvert = 'Mon'; // 変換したいテキストを指定する

// テキストを置換する
if(ai !== null) {
  ai.innerHTML = ai.innerHTML.replace(new RegExp(textToConvert, 'g'), '月');

}
console.log("二回目")

console.log(ai)


  // if (ai) {

  //   if (ai.textContent === null || ai.textContent.trim() === 'mon') {
  //   ai.textContent = '月';
  // }

  // }
}

// JavaScriptで曜日を変換する関数
// function convertDayOfWeek() {
//   const daysOfWeek = {
//     Sun: '日',
//     Mon: '月',
//     Tue: '火',
//     Wed: '水',
//     Thu: '木',
//     Fri: '金',
//     Sat: '土'
//   };

//   const weekElements = document.querySelectorAll('.uiv-datepicker-week');

//   weekElements.forEach(element => {
//     const dayAbbreviation = element.textContent?.trim(); // null や undefined の可能性を考慮しています

//     if (dayAbbreviation && daysOfWeek.hasOwnProperty(dayAbbreviation)) {
//       element.textContent = daysOfWeek[dayAbbreviation];
//     }
//   });
// }

// document.addEventListener('DOMContentLoaded', function() {
//   convertDayOfWeek();
// });


function convertDayOfWeek() {
  console.log("ここにきてるかね")
  const daysOfWeek: Record<string, string> = {
    Sun: '日',
    Mon: '月',
    Tue: '火',
    Wed: '水',
    Thu: '木',
    Fri: '金',
    Sat: '土'
  };

  const weekElements = document.querySelectorAll('.uiv-datepicker-week');

  weekElements.forEach((element: Element) => {
    const dayAbbreviation = (element.textContent || '').trim(); // null や undefined の可能性を考慮しています

    if (dayAbbreviation && daysOfWeek.hasOwnProperty(dayAbbreviation)) {
      (element as HTMLElement).textContent = daysOfWeek[dayAbbreviation];
    }
  });
}

// document.addEventListener('DOMContentLoaded', function() {
//   convertDayOfWeek();
// });



</script>

<template>

  <!-- <DatePicker ref="aaa" v-model="date" format="yyyy/MMMM/dd" local="ja" id="datepicker"/> -->
  <DatePicker ref="aaa" v-model="date" format="yyyy MMMM dd" locale="ja" id="datepicker"/>

  <br />
  <Alert v-show="date" type="info">
    You selected <b>{{ date }}.</b>
  </Alert>

  <button @click="test">テスト</button>
  <button @click="test2">テスト2</button>

  <body>
    <div class="border-2 border-darkBlue w-2/5 mx-auto my-44 rounded-md">
      <h1 class="title text-3xl text-center my-10">新規ユーザー登録画面</h1>
      <form @submit="onSubmit" class="text-center">
        <div class="mb-2">
          <label for="lastName">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;姓&emsp;</label>
          <input
            id="lastName"
            type="text"
            placeholder="ダイアン"
            class="border border-gray-800 rounded w-1/2 h-9 mx-auto text-sm px-2"
            v-model="lastName"
          />
          <p class="text-red-500">{{ errors.lastName }}</p>
        </div>
        <div class="mb-2">
          <label for="firstName">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;名&emsp;</label>
          <input
            id="firstName"
            type="text"
            placeholder=""
            class="border border-gray-800 rounded w-1/2 h-9 mx-auto text-sm px-2"
            v-model="firstName"
          />
          <p class="text-red-500">{{ errors.firstName }}</p>
        </div>
        <div class="mb-2">
          <label for="hireDate">&emsp;&emsp;&emsp;入社年月&emsp;</label>
          <input
            id="hireDate"
            type="month"
            placeholder=""
            class="border border-gray-800 rounded w-1/2 h-9 mx-auto text-sm px-2"
            v-model="hireDate"
          />
          <p class="text-red-500">{{ errors.hireDate }}</p>
        </div>
        <div class="mb-2">
          <label for="department">&emsp;&emsp;&emsp;所属区分&emsp;</label>
          <select
            id="department"
            v-model="department"
            class="border border-gray-800 rounded w-1/2 h-9 mx-auto text-sm px-2"
          >
            <option selected value="">所属区分を選択してださい</option>
            <option value="java">Java</option>
            <option value="php">PHP</option>
            <option value="cl">CL</option>
            <option value="ml">ML</option>
            <option value="fr">FR</option>
            <option value="qa">QA</option>
          </select>
          <p class="text-red-500">{{ errors.department }}</p>
        </div>
        <div class="mb-2">
          <label for="email">メールアドレス&emsp;</label>
          <input
            disabled
            id="email"
            type="email"
            placeholder="power.taro@rakus-partners.co.jp"
            class="w-1/2 h-9 mx-auto text-sm px-2"
            v-model="email"
          />
          <p class="text-red-500">{{ errors.email }}</p>
        </div>
        <div class="mb-2">
          <label for="email">&emsp;&emsp;パスワード&emsp;</label>&emsp;&emsp;
          <input
            id="password"
            :type="isShow"
            placeholder=""
            class="border border-gray-800 rounded w-1/2 h-9 mx-auto text-sm px-2"
            v-model="password"
          /><button type="button" @click="onClick">表示</button>
          <p class="text-red-500">{{ errors.password }}</p>
        </div>
        <div class="mb-2">
          <label for="confirmPassword">確認パスワード&emsp;</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder=""
            class="border border-gray-800 rounded w-1/2 h-9 mx-auto text-sm px-2"
            v-model="confirmPassword"
          />
          <p class="text-red-500">{{ errors.confirmPassword }}</p>
        </div>
        <button
          type="submit"
          label="登録">登録</button>
      </form>
    </div>
  </body>


</template>
