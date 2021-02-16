export default {
  install: (Vue) => {
    Vue.config.globalProperties.$notify = {
      settings: {
        message: null,
        status: 'primary',
        timeout: 5000,
        pos: 'bottom-right',
      },

      $notify: function() {
       return UIkit.notification(this.settings)
      },

      primary: function(message) {
        this.settings.message = message
        this.$notify()
      },

      success: function(message) {
        this.settings.message = message
        this.settings.status = 'success'
        this.$notify()
      },

      warning: function(message) {
        this.settings.message = message
        this.settings.status = 'warning'
        this.$notify()
      },

      danger: function(message) {
        this.settings.message = message
        this.settings.status = 'danger'
        this.$notify()
      },
    }
  }
}
