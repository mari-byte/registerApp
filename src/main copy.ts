import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import FlashMessage, { FlashMessagePlugin } from '@smartweb/vue-flash-message'
import store from './stores' // Vuexのストアをインポート
import { createI18n } from 'vue-i18n'

// main.js
// import { createApp } from 'vue'
// import App from './App.vue'
// import { createI18n } from 'vue-i18n'
import jaMessages from '@/language/ja'

loadFonts()

const i18n = createI18n({
  legacy: false, // TypeScript を使用する場合は legacy モードを無効にする
  locale: 'ja', // デフォルトの言語設定
  messages: {
    ja: jaMessages,
    // en: enMessages
  }
})




// createApp(App).use(i18n).mount('#app')

// import { createI18n } from "vue-i18n";
// import ja from "@/language/ja";
// import en from "@/language/en";
// // import ja from "@/language/ja.json";

// const i18n = createI18n({
//   legacy: false,
//   locale: "ja",
//   messages: {
//     ja: ja,
//     en: en,
//   },
// });

// createApp(App).use(i18n).mount("#app");

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $flashMessage: FlashMessagePlugin
  }
}

loadFonts()

createApp(App).use(router).use(vuetify).use(i18n).use(store).use(FlashMessage).mount('#app')
