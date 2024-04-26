import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import FlashMessage, { FlashMessagePlugin } from '@smartweb/vue-flash-message'
import store from './stores' // Vuexのストアをインポート
import { createI18n } from 'vue-i18n'
import jaMessages from '@/language/ja'

loadFonts()

// i18n インスタンスを作成
const i18n = createI18n({
  legacy: false, // TypeScript を使用する場合は legacy モードを無効にする
  locale: 'ja', // デフォルトの言語設定
  messages: {
    ja: jaMessages
  }
})

// アプリケーションを作成
const app = createApp(App)

// アプリケーションに i18n インスタンスを追加
app.use(i18n)

// ルーター、Vuetify、Vuex、FlashMessage プラグインをアプリに追加し、アプリをマウント
app.use(router)
   .use(vuetify)
   .use(store)
   .use(FlashMessage)
   .mount('#app')
