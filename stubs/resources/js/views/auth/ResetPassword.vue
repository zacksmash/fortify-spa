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
              <h2 class="uk-text-center">Reset Password</h2>

              <hr>
            </div>

            <div class="uk-card-body uk-padding-remove-top">
              <form @submit.prevent="update">
                <input type="hidden" name="token" v-model="form.token">

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
                    <input type="password" name="password" v-model="form.password" required :autofocus="form.email" autocomplete="new-password" />
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
                    Reset Password
                  </button>
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
        email: this.$route.query.email || null,
        password: null,
        password_confirmation: null,
        token: this.$route.params.token || null
      }),
    }
  },

  components: {
    FlashMessage
  },

  methods: {
    update() {
      this.form.post(route('password.update'))
        .then(() => this.$router.push({ name: 'Login' }))
        .catch(({response}) => this.$notify.danger(response.data.message))
    },
  },
}
</script>
