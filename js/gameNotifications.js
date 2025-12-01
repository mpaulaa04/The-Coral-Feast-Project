app.component("game-notifications", {
  props: {
    current: { type: Object, default: null }
  },

  template:  /*html*/ `
    <div class="notifications-wrapper">
        <div
          v-if="current"
          class="notification-popup" :class="current.type" > {{ current.message }}
        </div>
    </div>
  `
});