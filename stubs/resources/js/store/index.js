import { createStore } from 'vuex'
import * as auth from '@/store/modules/auth'

const store = createStore({
  strict: true,

  modules: {
    // auth,
  },
})

export default store
