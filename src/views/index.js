
// index.js
import { createStore } from 'vuex';
import module1 from '../views/module1';
import module2 from '../views/module2';


const store = createStore({
  modules: {
    module1,
    module2,
    // 他のモジュールもここに追加する
  },
  // その他の設定
});

interface Repo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  created_at: string
  updated_at: string
  language: string
  ex: number
}

interface Repo1 {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  language: string
  ex: [{}]
}


export default store
