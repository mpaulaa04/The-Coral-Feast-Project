app.component('market-display', {
  props: {
    money:            { type: [String, Number], required: true },
    currentStore:     { type: String, required: true },
    selectedButton:   { type: Number, required: true },
    variantButtons:   { type: Array,  required: true },
    storeItems:       { type: Array,  required: true },
    fishItems:        { type: Array,  required: true },
    showItemPanel:    { type: Boolean, required: true },
    selectedItemId:   { type: [Number, null], default: null }
  },

  emits: ['category-click', 'open-item', 'close-item', 'close-modal'],

  computed: {

    selectedFish() {
      if (!this.showItemPanel) return null;
      return this.fishItems.find(f => f.id === this.selectedItemId) || this.fishItems[0];
    }
  },

  methods: {
    imgSrc(button) {
      return `./img/${button.img}.png`;
    },
    handleCategoryClick(button) {
      this.$emit('category-click', button);
    },
    openItemPanel(item) {
      this.$emit('open-item', item.id);
    },
    closeItemPanel() {
      this.$emit('close-item');
    }
  },

  template: /*html*/`
  <section>
    <div class="market-body">
      <div class="market-bar">
        <div class="market-title">MERCADO</div>
        <div class="wallet site-inner" style="justify-content:flex-end">
          <img src="./img/moneda.png" alt="Moneda" />
          <div class="money-box" title="Dinero disponible">
            <span class="money-value">₡{{ money }}</span>
          </div>
        </div>
      </div>

      <div class="market-stage">
        <!-- Sidebar de categorías -->
        <div class="market-sidebar">
          <div
            v-for="button in variantButtons"
            :key="button.id"
            class="category-btn"
            :class="{ active: selectedButton === button.id }"
            @click="handleCategoryClick(button)"
          >
            <span>{{ button.name }}</span>
            <img :src="imgSrc(button)" :alt="button.name">
          </div>
        </div>

        <!-- Contenedor de tienda e ítems -->
        <div class="store-container">
          <img v-if="currentStore" :src="currentStore" alt="Tienda" class="store-image"/>

          <img
            v-for="item in storeItems"
            :key="item.id"
            :src="item.img"
            class="store-item"
            :style="{ left: item.x, top: item.y }"
            alt="Item"
            @click="openItemPanel(item)"
          />

          <!-- Panel de detalle -->
          <div v-if="showItemPanel" class="item-panel">
            <img
              src="./img/btn-x.png"
              alt="Cerrar"
              class="panel-close"
              @click="closeItemPanel"
            />

            <img
              v-if="selectedFish"
              :src="selectedFish.img"
              :alt="selectedFish.name"
              class="fish-image"
            />

            <h3 class="fish-name" v-if="selectedFish">{{ selectedFish.name }}</h3>

            <div class="fish-price" v-if="selectedFish">
              <img src="./img/moneda.png" alt="Moneda" class="coin-icon" />
              <span>₡{{ selectedFish.price }}</span>
            </div>

            <img
              src="./img/btnComprar.png"
              alt="Comprar"
              class="panel-buy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  `
});
