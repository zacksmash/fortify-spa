<template>
  <div class="uk-alert-danger" uk-alert v-if="(type === 'error') && message">
    <p class="uk-text-bold" v-text="message"></p>

    <ul class="uk-list uk-list-hyphen" v-if="errors && errors.any()">
      <li v-for="(error, name) in errors.all()" :key="name">{{ errors.first(name) }}</li>
    </ul>
  </div>

  <div class="uk-alert-success" uk-alert v-if="(type === 'success') && message">
    <p class="uk-text-bold" v-text="message"></p>
  </div>

  <div class="uk-alert-warning" uk-alert v-if="(type === 'warning') && message">
    <p class="uk-text-bold" v-text="message"></p>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'success',
      validator: function (value) {
        return ['success', 'warning', 'error'].indexOf(value) !== -1
      }
    },
    message: String,
    errors: Object
  }
}
</script>

<style>

</style>
