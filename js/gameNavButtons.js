app.component("game-nav-buttons", {
  props: { 
    buttons: { type: Array, required: true } 
  },

  emits: ['open-modal', 'close-modal'],

  methods: {
    open(type) {this.$emit('open-modal', type);},
    close() {this.$emit('close-modal');},
  },
  template: /*html*/ `
  <div class="top-buttons">
    <a v-for="button in buttons" :key="button.id"
      href="#" @click.prevent="open(button.type)" >
      <div class="icon-group">
        <img :src="button.img" :alt="button.label" class="icon-img" draggable="false">
        <h3>{{ button.label }}</h3>
      </div>
    </a>
  </div>
  `,
});
