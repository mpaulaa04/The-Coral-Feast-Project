app.component("game-nav-buttons", {
  props: {
    buttons: { type: Array, required: true }
  },

  emits: ['open-modal', 'close-modal'],

  methods: {
    open(type) { this.$emit('open-modal', type); },
    close() { this.$emit('close-modal'); },
    tutorialId(button) {
      switch (button.type) {
        case 'market':
          return 'market-button';
        case 'missions':
          return 'missions-button';
        default:
          return null;
      }
    },
  },
  template: /*html*/ `
  <div class="top-buttons">
    <a v-for="button in buttons" :key="button.id"
      href="#" @click.prevent="open(button.type)"
      :data-tutorial="tutorialId(button)">
      <div class="icon-group">
        <img :src="button.img" :alt="button.label" class="icon-img" draggable="false">
        <h3>{{ button.label }}</h3>
      </div>
    </a>
  </div>
  `,
});
