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

          <FlashMessage
          v-if="message"
          type="success"
          :message="message"
          />

          <div class="uk-card uk-box-shadow-small">
            <div class="uk-card-header">
              <h2 class="uk-text-center">Forgot Password</h2>

              <p>
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
              </p>

              <hr>
            </div>

            <div class="uk-card-body uk-padding-remove-top">
              <form @submit.prevent="forgotPassword">
                <div class="uk-margin">
                  <label class="uk-form-label">Email</label>

                  <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: mail"></span>
                    <input type="email" name="email" v-model="form.email" required autofocus />
                  </div>
                </div>

                <div class="uk-margin">
                  <button class="uk-button uk-button-primary uk-width-1-1" type="submit">
                    Email Password Reset Link
                  </button>
                </div>

                <div class="uk-flex uk-flex-center">
                  <router-link :to="{ name: 'Login' }">
                    <small>Back to login</small>
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
        email: null,
      }),
      message: null,
    }
  },

  components: {
    FlashMessage
  },

  methods: {
    forgotPassword() {
      this.form.post(route('password.email'))
        .then((res) => this.message = res.message)
        .catch(({response}) => this.$notify.danger(response.data.message))
    },
  },
}
</script>
