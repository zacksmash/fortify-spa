<template>
  <section class="uk-section">
    <div class="uk-container">
      <div class="uk-flex-center" uk-grid>
        <div class="uk-width-large">
          <FlashMessage
            v-if="form.errors.any()"
            type="error"
            message="Whoops! Something went wrong."
            :errors="form.errors"
          />

          <div class="uk-card uk-box-shadow-small">
            <div class="uk-card-header">
              <h2 class="uk-text-center">Login</h2>

              <hr>
            </div>

            <div class="uk-card-body uk-padding-remove-top">
              <form @submit.prevent="login">
                <div class="uk-margin">
                  <label class="uk-form-label">Email</label>

                  <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: mail"></span>
                    <input type="email" name="email" v-model="form.email"  required autofocus />
                  </div>
                </div>

                <div class="uk-margin">
                  <label class="uk-form-label">Password</label>

                  <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: lock"></span>
                    <input type="password" name="password" v-model="form.password" required autocomplete="current-password" />
                  </div>
                </div>

                <div class="uk-margin">
                  <label>
                    <input class="uk-checkbox" type="checkbox" name="remember" id="remember" v-model="form.remember">
                    Remember Me
                  </label>
                </div>

                <div class="uk-margin">
                  <button class="uk-button uk-button-primary uk-width-1-1" type="submit">
                    Login
                  </button>
                </div>

                <div class="uk-flex uk-flex-center">
                  <router-link :to="{name: 'ForgotPassword'}">
                    <small>Forgot your password?</small>
                  </router-link>
                  <span class="uk-margin-small-left uk-margin-small-right">|</span>
                  <router-link :to="{name: 'Register'}">
                    <small>Sign Up</small>
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Form from 'form-backend-validation'
import FlashMessage from '@/views/components/FlashMessage'

export default {
  data() {
    return  {
      form: new Form({
        email: null,
        password: null,
        remember: true,
      })
    }
  },

  computed: {
    redirect() {
      return this.$route.query.redirect ?? { name: 'Dashboard' }
    }
  },

  components: {
    FlashMessage
  },

  methods: {
    login() {
      this.$http.get('/sanctum/csrf-cookie')
        .then(() => {
          this.$auth.login({
            data: this.form.data(),
            redirect: {name: 'Dashboard'}
          })
          .catch(({response}) => {
            this.form = this.form.withErrors(response.data.errors);
            this.$notify.danger(response.data.message)
          })
        })
    }
  }
}
</script>
