// src/store/index.ts
import { createStore } from 'vuex'

export default createStore({
  state: {
    // ステートの定義
    updateId: undefined,
    updateData: undefined,
    results: [],
  },
  mutations: {
    // ミューテーションの定義
    setUpdateId(state, id) {
      state.updateId = id
    },

    setUpdateData(state, data) {
      state.updateData = data.data
    },

    modifyResults(state, data) {
      const newReq = data.filter((e, index, array) => {
        return array.findLastIndex((el) => el.problem_number === e.problem_number) === index
      })

      const sortedResults = newReq.sort((a, b) => {
        // ソート条件を記述します。例えば、problem_numberで昇順ソートする場合は以下のようにします。
        return a.problem_number - b.problem_number;
      });
    
      state.results = sortedResults;
      // state.results = newReq
    },

    setUpdateFormat(state, data) {
      state.updateData.rows[0].question_format = data
    }
  },
  actions: {
    // アクションの定義
  },
  getters: {
    // ゲッターの定義
    getUpdateId: (state) => state.updateId,
    getUpdateData: (state) => state.updateData,
    getResults: (state) => state.results,
  }
})
