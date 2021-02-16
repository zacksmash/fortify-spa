<template>
  <section class="uk-section">
    <div class="uk-container">
      <div class="uk-flex-center" uk-grid>
        <div class="uk-width-large">
          <FlashMessage
          v-if="message"
          type="success"
          :message="message"
          />

          <div class="uk-card uk-box-shadow-small">
            <div class="uk-card-header">
              <h2 class="uk-text-center">Verify Your Email</h2>

              <p>
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.
              </p>

              <hr>
            </div>

            <div class="uk-card-body uk-padding-remove-top">
              <div class="uk-margin">
                <button class="uk-button uk-button-primary uk-width-1-1" @click="resend">
                  Resend Verification Email
                </button>
              </div>

              <div class="uk-margin">
                <button class="uk-button uk-button-default uk-width-1-1" @click="logout">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FlashMessage from '@/views/components/FlashMessage'

export default {
  data() {
    return {
      message: null
    }
  },

  components: {
    FlashMessage
  },

  methods: {
    resend() {
      this.$http.post(route('verification.send'))
        .then((res) => this.message = 'A verification email has been sent to your inbox.')
        .catch(({response}) => this.$notify.danger(response.data.message))
    },
    logout() {
      this.$auth.logout({
        makeRequest: true,
        redirect: {name: 'Login'},
      })
    }
  }
}
</script>
