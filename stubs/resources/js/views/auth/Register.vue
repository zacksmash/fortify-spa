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
              <h2 class="uk-text-center">Register</h2>

              <hr>
            </div>

            <div class="uk-card-body uk-padding-remove-top">
              <form @submit.prevent="register">
                <div class="uk-margin">
                  <label class="uk-form-label">Name</label>

                  <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                    <input type="text" name="name" v-model="form.name" required autofocus autocomplete="name" />
                  </div>
                </div>

                <div class="uk-margin">
                  <label class="uk-form-label">Email</label>

                  <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: mail"></span>
                    <input type="email" name="email" v-model="form.email" required />
                  </div>
                </div>

                <div class="uk-margin">
                  <label class="uk-form-label">Password</label>

                  <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: lock"></span>
                    <input type="password" name="password" v-model="form.password" required autocomplete="new-password" />
                  </div>
                </div>

                <div class="uk-margin">
                  <label class="uk-form-label">Confirm Password</label>

                  <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: check"></span>
                    <input type="password" name="password_confirmation" v-model="form.password_confirmation" required autocomplete="new-password" />
                  </div>
                </div>

                <div class="uk-margin">
                  <button class="uk-button uk-button-primary uk-width-1-1" type="submit">
                    Register
                  </button>
                </div>

                <div class="uk-text-center">
                  <router-link :to="{name: 'Login'}">
                    <small>Already registered? Sign in here.</small>
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
    return {
      form: new Form({
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      })
    }
  },

  components: {
    FlashMessage
  },

  methods: {
    register() {
      this.$auth.register({
        data: this.form.data(),
        redirect: {name: 'Dashboard'},
        remember: true,
        autoLogin: true,
      })
      .catch(({response}) => {
        this.form = this.form.withErrors(response.data.errors);
        this.$notify.danger(response.data.message)
      })
    },
  },
}
</script>
