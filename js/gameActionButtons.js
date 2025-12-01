app.component("game-action-buttons", {
  props: {
    bottomButtons: { type: Array, required: true },
  },

  emits: ['clean', 'feed', 'tools', 'add-fish'],

  methods: {
    tutorialId(btn) {
      switch (btn.event) {
        case 'tools':
          return 'bottom-button-tools';
        case 'feed':
          return 'bottom-button-supplements';
        case 'clean':
          return 'bottom-button-plants';
        case 'add-fish':
          return 'bottom-button-fish';
        default:
          return undefined;
      }
    },
  },

  template: /*html*/ `
  <div class="bottom-buttons">
    <button 
      v-for="btn in bottomButtons" 
      :key="btn.id" 
      :data-tutorial="tutorialId(btn)"
      @click="$emit(btn.event)"
    >
      <img :src="btn.img" :alt="btn.alt" draggable="false" />
    </button>
  </div>
  `,
});
