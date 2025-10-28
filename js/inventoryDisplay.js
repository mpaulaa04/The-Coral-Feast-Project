
app.component('inventory-display', {
  props: {
    profileImg:     { type: String, required: true },
    buttons:        { type: Array,  required: true },
    selectedButton: { type: Number, required: true }
  },
  emits: ['button-click', 'close'],

  methods: {
    imgSrc(btn) { return `./img/${btn.img}.png`; },
    onClick(btn) { this.$emit('button-click', btn); }
  },

template: /*html*/`
  <section class="inventory-body">
    <div class="inventory-stage">
      <!-- Franja turquesa -->
      <div class="inventory-sidebar">
      <div class="inventory-header">
        <!-- Título -->
        <h2 class="inventory-title">INVENTARIO</h2>  
        <!-- Foto -->
        <div class="profile-section">
          <img :src="profileImg" alt="Perfil" class="profile-img" />
        </div>
        <!-- Botones (idénticos a Market) -->
        <div
          v-for="btn in buttons"
          :key="btn.id"
          class="inventory-btn"
          :class="{ active: selectedButton === btn.id }"
          @click="onClick(btn)"
        >
          <span>{{ btn.name }}</span>
          <img :src="imgSrc(btn)" :alt="btn.name">
        </div>
      </div>
      </div>
    </div>
  </section>
  `
});