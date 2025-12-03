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
        playButtonSound() {
      const audio = new Audio('./assets/sounds/select-menu-47560.mp3');
      audio.play();
    },
    onClick(btn) {
      this.playButtonSound();
      this.$emit(btn.event);
    }

    
  },

  template: /*html*/ `
  <div class="bottom-buttons">
  <button v-for="btn in bottomButtons" :key="btn.id" @click="onClick(btn)">
    <img :src="btn.img" :alt="btn.alt" draggable="false" />
  </button>
  </div>
  `,
});
