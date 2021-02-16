<template>
  <nav-bar></nav-bar>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import NavBar from '@/views/components/NavBar.vue'

export default {
  components:{ NavBar },

  mounted() {
    /** Verified Email Check */
    // this.$router.afterEach((to, from) => {
    //   if (
    //     this.$auth.check() &&
    //     !this.$auth.user().email_verified_at &&
    //     this.$route.name !== 'VerifyEmail'
    //   ) {
    //     this.$router.push({ name: 'VerifyEmail' })
    //   }
    // })
  }
}
</script>
