// sampleModule.js

// 関数の定義
function greet(name) {
  return `Hello, ${name}!`
}

// リストのヘッダー
const headerList = [
  {
    label: 'タイトル',
    key: 'sampletitle'
  },
  {
    label: '説明',
    key: 'sampledescription'
  },
  {
    label: '優先度',
    key: 'samplepriority'
  },
  {
    label: '難易度',
    key: 'sampledifficulty'
  },
  {
    label: 'オプション',
    key: 'sampleoption'
  }
]
// プルダウンのオプション
const options = [
  { label: '選択してください', value: null },
  { label: '連番形式', value: 'option1' },
  { label: '記述形式', value: 'option2' },
  { label: '大問と小問に分ける形式', value: 'option3' },
  { label: '暗記形式', value: 'option4' }
]

// エクスポート
export { greet, headerList, options }
