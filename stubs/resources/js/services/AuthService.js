import { createAuth } from '@websanova/vue-auth'
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js'
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js'
import { httpClient } from '@/services/HttpService'
import router from '@/router'

export const auth = createAuth({
  plugins: {
    http: httpClient,
    router: router
  },
  drivers: {
    router: driverRouterVueRouter,
    http: driverHttpAxios,
    auth: {
      request: function (req, token) {
        return !! token
      },

      response: function (res) {
        const invalidToken = this.drivers.http.invalidToken.call(this, res)

        if (! invalidToken) {
          return true
        }
      }
    },
  },
  options: {
    notFoundRedirect: {
      name: 'NotFound'
    },
    parseUserData: function (data) {
      return data
    },
  }
})
