<template>
  <div id="app">
    <form @submit="search">
    <!-- <Input :labelValue="label" /> -->
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" v-model="selectAll" @click="toggleSelectAll" />
          </th>
          <th v-for="(label, key) in header" :key="key">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="flag"
          v-for="(item, index) in items"
          :key="item.no"
          @click="clickvalue(item, index)"
          v-on:mouseover="hoverMethod"
          :class="{ aaa: item.checkvalue }"
        >
          <td v-for="(value, key) in item" :key="'td' + key + item.no">
            <!-- checkvalue列にチェックボックスを表示 -->
            <template v-if="key === 'checkvalue'">
              <input type="checkbox" v-model="selectedItems[index]" @click.stop />
            </template>
            <template v-else>
              {{ value }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />
    <br />
    <button @click="createData">一覧データ作成</button>
    <br />
    <br />

    <button @click="clear">クリア</button>


    <br />
    <br />
    <button @click="nextpage">画面移動</button>

    <div>
      <label for="dropdown">ドロップダウン::: </label>
      <select id="dropdown" v-model="selectedDropdownOption">
        <option v-for="option in dropdownOptions" :key="option" :disabled="isDropdownDisabled">
          {{ option }}</option>
      </select>
    </div>
    <br />
    <br />
    
    <label for="input">Field</label>
    <!-- <input v-model="store.state.serchValue.url" :maxlength="20"/> -->
    <input v-model="store._state.data.module1.serchValue.url" :maxlength="20"/>
    <br />
    <label for="input">Field2</label>
    <input v-model="store._state.data.module1.serchValue.serviceNm" :maxlength="20"/>
    <br />

    <button type="button" @click="search">検索する</button>
  </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/components/Input.vue'
import { useStore } from 'vuex'
import { mapGetters } from 'vuex'
import { useRouter } from 'vue-router';
const router = useRouter();

const store = useStore()
const flag = ref(false)
const { doubleCount } = mapGetters('module1', ['doubleCount'])
const { serchValue } = mapGetters('module1', ['serchValue'])
const label = 'ラベル'
const dropdownOptions = ['', '更新', '削除'];
const isDropdownDisabled = ref(true);


// "更新" オプションを非活性にするかどうかを判定するメソッド
const shouldDisableOption = (option) => {
  return option === '更新' && selectedValues.length > 1;
};

// let randomString = {
//     uuid: '',
//     url: '',
//     serviceNm: '',
//     nodeid: ''
// }

let value = []
let aaa = "通称黒ひげ"

const nextpage = () => {
  console.log("次のページへ移動します")
  console.log("store._state.data.module1.count",store._state.data.module1.count)
  store._state.data.module1.count = 20
  console.log("アフターstore._state.data.module1.count",store._state.data.module1.count)

  
  console.log("store.count",store.state.count)
  console.log("store.count",store.count)
  console.log("store.count222",state.count)

  router.push('/inputstudy',aaa)
}

const search = () => {
  console.log("フォームの検索時")
  console.log("serchValue",store.serchValue)
  console.log("store",store._state.data.module1.serchValue.url)
  console.log("serchValue",serchValue)
// store.commit('module1/POST_URL');
  store.dispatch('module1/POST_URL',store._state.data.module1);

}

const createData = () => {
  console.log('今から作成します')
  const createValue = generateRandomObjects()
  console.log('createValue::', createValue)
  value = createValue
  console.log('★重要')
  console.log('★重要')
  console.log('★重要')
  console.log('value::', value)

  console.log('ビフォーitems', items.value)

  // 新しく生成されたデータでitems配列を更新
  items.value.splice(0, items.value.length, ...createValue)
  console.log('アフターitems', items.value)

  flag.value = true
}

const clear = () => {
  console.log('今からクリアします')
  // ゲッターの利用例
  const derivedValue = store.getters['module1/doubleCount']
  const serchValue = store.getters['module1/serchValue']
  console.log('これがいけたら最高')
  console.log('derivedValue::', derivedValue)
}

function generateRandomObjects() {
  const result = []

  for (let i = 0; i < 5; i++) {
    const randomString = generateRandomString() // ランダムな文字列を生成する関数を呼び出す
    const obj = {
      checkvalue: false,
      // uuid: randomString.uuid,
      url: randomString.url,
      serviceNm: randomString.serviceNm,
      nodeid: randomString.nodeid
    }
    result.push(obj)
  }
  console.log('result:::', result)

  return result
}

function generateRandomString() {
  let uuidlength = 7
  let urllength = 15
  let serviceNmlength = 5
  let nodeidlength = 3
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = {
    checkvalue: false,
    uuid: '',
    url: '',
    nodeid: '',
    serviceNm: ''
  }

  for (let i = 0; i < uuidlength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString.uuid += characters[randomIndex]
  }
  for (let i = 0; i < urllength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString.url += characters[randomIndex]
  }
  for (let i = 0; i < serviceNmlength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString.serviceNm += characters[randomIndex]
  }
  for (let i = 0; i < nodeidlength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString.nodeid += characters[randomIndex]
  }
  randomString.url = 'https://www.testData.com/' + randomString.url
  randomString.serviceNm = 'サービス名:' + randomString.serviceNm
  randomString.nodeid = 'NO.' + randomString.nodeid

  // console.log("randomString::",randomString)
  return randomString
}

// const header = { checkvalue: '', url: 'URL', serviceNm: 'サービス名', nodeid: 'ノードID' }
const header = { url: 'URL', serviceNm: 'サービス名', nodeid: 'ノードID' }

const items = ref([{ checkvalue: false, url: '', serviceNm: '', nodeid: '' }])

let selectedValues = [];

// 各行の選択状態を管理する配列
const selectedItems = new Array(items.length).fill(false)

const clickvalue = (clickedItem, index) => {
  isDropdownDisabled.value = true;

  console.log('★アイテムクリック時にここにくる')

  selectedValues.push(clickedItem)

  console.log("この値が大事",selectedValues)

  console.log('clickedItem', clickedItem)
  console.log('index', index)
  console.log('selectedItems', selectedItems)
  selectedItems[index] = !clickedItem.checkvalue
  clickedItem.checkvalue = !clickedItem.checkvalue
  console.log('clickedItem', clickedItem)



  if (selectedValues.length === 1) {
    isDropdownDisabled.value = false;
  }else if(selectedValues.length > 1) {
    console.log("1個以上")
    console.log(isDropdownDisabled[1])
  }




// ミューテーションのコミット例
// store.commit('module1/geturl');







}


const hoverMethod = () => {
}
</script>

<style>
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
.aaa {
  background-color: #94b8ec;
}
</style>
