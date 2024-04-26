<template>
  <div id="app">
    <form @submit="search">
    <br />
    <br />
    <br />
    <br />
    <div>
      <label for="dropdown">ドロップダウン学習！！::: </label>
      <!-- <select id="dropdown-study" v-model="selectedOption"> -->
      <select id="dropdown-study">
        <option v-for="option in showData" :key="option" :disabled="isDropdownDisabled">
          {{ option }}</option>
      </select>
    </div>
    <br />    
  </form>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <button @click="getAnswer(1, 3)">スイッチ</button>
  <br />
  <div>{{ "ランダム数::" + randomNum }}</div>
  <br />
  <!-- <div>{{ showData }}</div> -->
  <br />
  <br />
  <br />
  <br />


  <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" v-model="selectAll" @click="" />
          </th>
          <th v-for="(label, key) in tableHeader" :key="key">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="flag"
          v-for="(item, index) in res1"
          :key="item.id"
          @click="clickvalue(item, index)"
          v-on:mouseover="hoverMethod"
        >
          <td v-for="(value, key) in res1" :key="'td' + key + value.id">
            <!-- checkvalue列にチェックボックスを表示 -->
            <template v-if="key === null">
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
  <button @click="getTableheader(1, 3)">テーブルスイッチ</button>
  <br />
  <!-- <th v-for="(headerGroup, index) in tableHeader" :key="index">
      <span v-for="(label, key) in headerGroup" :key="key">{{ label }}</span>
    </th> -->


</div>

</template>

<script setup lang="ts">
import { ref,computed } from 'vue'
import Input from '@/components/Input.vue'
import { useStore } from 'vuex'
import { mapGetters } from 'vuex'
import { useRouter } from 'vue-router';
const router = useRouter();
let randomNum: number = 0
let randomNum1: number = 0

const store = useStore()
const flag = ref(false)
const { doubleCount } = mapGetters('module1', ['doubleCount'])
const { serchValue } = mapGetters('module1', ['serchValue'])
const label = 'ラベル'
const dropdownOptions = ['', '更新', '削除'];
// const dropdownOptions1 = ref<string[]>([]);
let dropdownOptions1: string[] = [];
// let dropdownOptions1 = [];
const sampleOptions = ['サンプル1', 'サンプル2', 'サンプル3'];
const isDropdownDisabled = ref(true);
const selectAll = ref(false);


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

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  language: string;
  ex: number;
}

const res = ref<Repo[]>([]);

const getAnswer = (min: number, max: number): void => {
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  switch (randomNum) {
    case 1:
      res.value = [
        {
          id: 789012,
          name: 'sample-repo-2',
          full_name: 'username/sample-repo-2',
          description: 'Another sample repository.',
          html_url: 'https://github.com/username/sample-repo-2',
          created_at: '2024-02-15T09:45:00Z',
          updated_at: '2024-04-01T15:20:00Z',
          language: 'Python',
          ex: 1,
        }
      ]
      break
    case 2:
      res.value = [
        {
          id: 123456,
          name: 'sample-repo-1',
          full_name: 'username/sample-repo-1',
          description: 'This is a sample repository.',
          html_url: 'https://github.com/username/sample-repo-1',
          created_at: '2024-03-30T12:00:00Z',
          updated_at: '2024-04-01T10:30:00Z',
          language: 'JavaScript',
          ex: 2,
        },
        {
          id: 789012,
          name: 'sample-repo-2',
          full_name: 'username/sample-repo-2',
          description: 'Another sample repository.',
          html_url: 'https://github.com/username/sample-repo-2',
          created_at: '2024-02-15T09:45:00Z',
          updated_at: '2024-04-01T15:20:00Z',
          language: 'Python',
          ex: 3,
        }
      ]
      break
    case 3:
      res.value = [];
      break
    default:
      res.value = [];
  }
}

const showData = computed(() => {
  if(res.value[0] !== undefined) {
    //単純なnameを返すメソッド
    // return FormatArray();

    //配列のマージを返すメソッド
    return JoinArray();
  }else {
    return dropdownOptions;
  }
})


const FormatArray = () => {
  let newArray = res.value.map(items => {
    return items.name;
  })
  return newArray;
}

const JoinArray = () => {
  let newJoinArray = res.value.map(items => {
    if(items.ex === 1) {
      let opt = "月曜日" + items.language;
      return opt;
    }else if(items.ex === 2) {
      let opt = "火曜日" + items.language;
      return opt;
    }else if(items.ex === 3) {
      let opt = "水曜日" + items.language;
      return opt;
    }else {
      throw new Error("エラーが発生しました")
    }
  })
  return newJoinArray;
}

interface Repo1 {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  ex: [{}];
}

const res1 = ref<Repo1[]>([]);

const getTableheader = (min: number, max: number): void => {
  flag.value = false;
  randomNum1 = Math.floor(Math.random() * (max - min + 1)) + min;
  switch (randomNum1) {
    case 1:
      res1.value = [
        {
          id: 789012,
          name: 'sample-repo-2',
          full_name: 'username/sample-repo-2',
          description: 'Another sample repository.',
          html_url: 'https://github.com/username/sample-repo-2',
          language: 'Python',
          ex: [{
            year: "2024",
            day: "01/01",
            time: "10:11"
          }],
        }
      ]
      break
    case 2:
     res1.value = [
        {
          id: 123456,
          name: 'sample-repo-1',
          full_name: 'username/sample-repo-1',
          description: 'This is a sample repository.',
          html_url: 'https://github.com/username/sample-repo-1',
          language: 'JavaScript',
          ex: [{
            dj: "Aさん",
            radio: "fm954"
          }],
        },
        {
          id: 789012,
          name: 'sample-repo-2',
          full_name: 'username/sample-repo-2',
          description: 'Another sample repository.',
          html_url: 'https://github.com/username/sample-repo-2',
          language: 'Python',
          ex: [{
            dj: "Bさん",
            radio: "fm福岡"
          }],
        }
      ]
      break
    case 3:
      res1.value = [];
      break
    default:
      res1.value = [];
  }
}

const tableHeader = computed(() => {
  flag.value = true;
  if(res1.value[0] !== undefined) {
    //単純なnameを返すメソッド
    TableFormat();
    return dropdownOptions1;

  }else {
    return sampleOptions;
  }
})
const TableFormat = () => {
  res1.value.map(items => {
    let obj = Object.keys(items.ex[0]);
    console.log(obj);
    console.log(sampleOptions);
    // dropdownOptions1.value = obj;
    dropdownOptions1 = obj;
  })
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
