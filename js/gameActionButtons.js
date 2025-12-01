app.component("game-action-buttons", {
  props: {
    bottomButtons: { type: Array, required: true },
  },

  emits: ['clean', 'feed', 'tools', 'add-fish'],

  template: /*html*/ `
  <div class="bottom-buttons">
    <button 
      v-for="btn in bottomButtons" 
      :key="btn.id" 
      @click="$emit(btn.event)"
    >
      <img :src="btn.img" :alt="btn.alt" draggable="false" />
    </button>
  </div>
  `,
});
