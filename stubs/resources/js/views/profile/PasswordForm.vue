<template>
  <section class="uk-margin-top">
    <div class="uk-flex-center" uk-grid>
      <div class="uk-width-1-1">
        <div class="uk-card uk-box-shadow-small">
          <div class="uk-card-body">
            <div uk-grid>
              <div class="uk-width-1-1 uk-width-1-3@s uk-width-1-3@m">
                <h4>
                  Update Password
                </h4>

                <p>
                  Ensure your account is using a long, random password to stay secure.
                </p>
              </div>

              <div class="uk-width-1-1 uk-width-2-3@s uk-width-2-3@m">
                <FlashMessage
                  v-if="form.errors.any()"
                  type="error"
                  message="Whoops! Something went wrong."
                  :errors="form.errors"
                />

                <form @submit.prevent="updatePassword" id="profile-update-password">
                  <div class="uk-margin uk-width-large">
                    <label class="uk-form-label">Current Password</label>

                    <div class="uk-inline uk-width-1-1">
                      <span class="uk-form-icon" uk-icon="icon: unlock"></span>
                      <input type="password" v-model="form.current_password" required autocomplete="current-password" />
                    </div>
                  </div>

                  <div class="uk-margin uk-width-large">
                    <label class="uk-form-label">Password</label>

                    <div class="uk-inline uk-width-1-1">
                      <span class="uk-form-icon" uk-icon="icon: lock"></span>
                      <input type="password" v-model="form.password" required autocomplete="new-password" />
                    </div>
                  </div>

                  <div class="uk-margin uk-width-large">
                    <label class="uk-form-label">Confirm Password</label>

                    <div class="uk-inline uk-width-1-1">
                      <span class="uk-form-icon" uk-icon="icon: check"></span>
                      <input type="password" v-model="form.password_confirmation" required autocomplete="new-password" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="uk-card-footer uk-background-muted">
            <div class="uk-margin uk-text-right">
              <button type="submit" form="profile-update-password" class="uk-button uk-button-primary">
                Save
              </button>
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
        current_password: null,
        password: null,
        password_confirmation: null
      })
    }
  },

  components:{
    FlashMessage
  },

  methods: {
    updatePassword() {
      this.form.put(route('user-password.update'))
        .then(() => this.$notify.success('Your password was updated!'))
        .catch(({response}) => this.$notify.danger(response.data.message))
    },
  },
}
</script>
