import App from '@/App.vue'
import VueNotify from '@/plugins/VueNotify'
import router from '@/router'
import { auth } from '@/services/AuthService'
import { httpClient as axios } from '@/services/HttpService'
import store from '@/store'
import UIkitIcons from 'uikit/dist/js/uikit-icons'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'

const Vue = createApp(App)
Vue.use(router)
Vue.use(store)
Vue.use(auth)
Vue.use(VueNotify, {
  status: 'success',
  pos: 'top-center',
  timeout: 5000
})
Vue.use(VueAxios, axios)
Vue.mount('#app')

UIkit.use(UIkitIcons)
