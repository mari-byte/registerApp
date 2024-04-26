
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

export default store
