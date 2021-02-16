<template>
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">
      <router-link class="uk-navbar-item uk-logo" :to="{name: 'Dashboard'}">
        {{ appName }}
      </router-link>
    </div>

    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li>
          <a href="#"><span uk-icon="grid"></span></a>
          <div class="uk-navbar-dropdown uk-width-medium">
            <ul class="uk-nav uk-navbar-dropdown-nav" v-if="$auth.check()">
              <li class="uk-nav-header">
                Hi, {{ user?.name }}
              </li>

              <li class="uk-nav-divider"></li>

              <li>
                <router-link :to="{ name: 'UserProfile' }">
                  <span uk-icon="user" class="uk-margin-small-right"></span>
                  Profile
                </router-link>
              </li>

              <li>
                <a @click="logout">
                  <span uk-icon="sign-out" class="uk-margin-small-right"></span>
                  Logout
                </a>
              </li>
            </ul>

            <ul class="uk-nav uk-navbar-dropdown-nav" v-else>
              <li>
                <router-link :to="{ name: 'Login' }">
                  <span uk-icon="sign-in" class="uk-margin-small-right"></span>
                  Login
                </router-link>
              </li>

              <li>
                <router-link :to="{ name: 'Register' }">
                  <span uk-icon="user" class="uk-margin-small-right"></span>
                  Register
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      appName: process.env.MIX_APP_NAME || 'Laravel'
    }
  },

  computed: {
    user() {
      return this.$auth.user()
    }
  },

  methods: {
    logout() {
      this.$auth.logout({
        makeRequest: true,
        redirect: {name: 'Login'},
      })
    },
  }
}
</script>
