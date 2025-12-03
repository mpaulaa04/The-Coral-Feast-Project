app.component('inventory-side-bar', {
  props: {
    profileImg: { type: String, required: true },
    buttons: { type: Array, required: true },
    selectedButton: { type: Number, required: true }
  },
  emits: ['button-click'],
  methods: {
    imgSrc(btn) { return `./assets/img/${btn.img}.png`; },
    onClick(btn) {
      const audio = new Audio('./assets/sounds/select-menu-47560.mp3');
      audio.play();
      this.$emit('button-click', btn);
    }
  },
  template: /*html*/`
    <div class="inventory-header">
      <h2 class="inventory-title">INVENTARIO</h2>
      <div class="profile-section">
        <img :src="profileImg" alt="Perfil" class="profile-img" />
      </div>

      <div
        v-for="btn in buttons"
        :key="btn.id"
        class="inventory-btn"
        :class="{ active: selectedButton === btn.id }"
        :data-tutorial="btn.id === 1 ? 'inventory-category-fish' : null"
        @click="onClick(btn)"
      >
        <span>{{ btn.name }}</span>
        <img :src="imgSrc(btn)" :alt="btn.name">
      </div>
    </div>
  `
});
