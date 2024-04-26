// module1.js
const state = {
    count: 10,
  };
  
  const mutations = {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
  };
  
  const actions = {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
  };
  
  const getters = {
    doubleCount: (state) => state.count * 2,
  };
  
  export default {
    namespaced: true, // ネームスペースを有効にする場合に設定
    state,
    mutations,
    actions,
    getters,
  };
  