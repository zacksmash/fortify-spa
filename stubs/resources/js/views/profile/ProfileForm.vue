<template>
  <section>
    <div class="uk-flex-center" uk-grid>
      <div class="uk-width-1-1">
        <div class="uk-card uk-box-shadow-small">
          <div class="uk-card-body">
            <div uk-grid>
              <div class="uk-width-1-1 uk-width-1-3@s uk-width-1-3@m">
                <h4>
                  Profile Information
                </h4>

                <p>
                  Update your account's profile information and email address.
                </p>
              </div>

              <div class="uk-width-1-1 uk-width-2-3@s uk-width-2-3@m" v-if="form">
                <FlashMessage
                v-if="form.errors.any()"
                type="error"
                message="Whoops! Something went wrong."
                :errors="form.errors"
                />

                <form @submit.prevent="updateUser" id="profile-update-info">
                  <div class="uk-margin uk-width-large">
                    <label class="uk-form-label">Name</label>

                    <div class="uk-inline uk-width-1-1">
                      <span class="uk-form-icon" uk-icon="icon: user"></span>
                      <input type="text" name="name" v-model="form.name" required autofocus autocomplete="name" />
                    </div>
                  </div>


                  <div class="uk-margin uk-width-large">
                    <label class="uk-form-label">Email</label>

                    <div class="uk-inline uk-width-1-1">
                      <span class="uk-form-icon" uk-icon="icon: mail"></span>
                      <input type="email" name="email" v-model="form.email" required />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="uk-card-footer uk-background-muted">
            <div class="uk-margin uk-text-right">
              <button type="submit" form="profile-update-info" class="uk-button uk-button-primary">
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
// import { mapGetters } from 'vuex'
import Form from 'form-backend-validation'
import FlashMessage from '@/views/components/FlashMessage'

export default {
  data() {
    return {
      form: new Form(this.$auth.user(), {
        resetOnSuccess: false
      })
    }
  },

  components: {
    FlashMessage
  },

  methods: {
    updateUser() {
      this.form.put(route('user-profile-information.update'))
        .then(() => {
          this.$notify.success('Your profile was updated!')
          this.$auth.fetch()
        })
        .catch(({response}) => this.$notify.danger(response.data.message))
    },
  },
}
</script>
