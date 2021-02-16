<template>
  <section class="uk-section">
    <div class="uk-container">
      <ProfileForm />
      <hr class="uk-margin-medium">
      <PasswordForm />
    </div>
  </section>
</template>

<script>
import ProfileForm from './ProfileForm'
import PasswordForm from './PasswordForm'

export default {
  components: {
    ProfileForm,
    PasswordForm
  },
}
</script>
