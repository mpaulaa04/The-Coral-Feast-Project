app.component('market-shop', {
  props: {
    currentStore: { type: String, required: true },
    shelfItems: { type: Array, required: true },
    items: { type: Array, required: true },
    showItemPanel: { type: Boolean, required: true },
    selectedId: { type: [Number, null], default: null },
    buying: { type: Boolean, default: false }
  },
  emits: ['open', 'close', 'buy'],
  computed: {
    selectedItem() {
      if (!this.showItemPanel) return null;
      return this.items.find(i => i.id === this.selectedId) || null;
    }
  },
  template: `
    <div class="store-container">
    
      <img v-if="currentStore" :src="currentStore" class="store-image" alt="Tienda"/>

       <img v-for="(it, idx) in shelfItems" :key="it.id" :src="it.img"
         class="store-item" :style="{ left: it.x, top: it.y }"
         :data-tutorial="idx === 0 ? 'fish-item' : null"
         alt="Item" @click="$emit('open', it.id)" />

      <div v-if="showItemPanel" class="item-panel" :class="{ purchasing: buying }">
        <img src="./assets/img/btn-x.png" alt="Cerrar" class="panel-close" @click="$emit('close')" />
        <template v-if="selectedItem">
          <img :src="selectedItem.img" :alt="selectedItem.name" class="fish-image" />
          <h3 class="fish-name">{{ selectedItem.name }}</h3>
<div class="fish-price">
  <img src="./assets/img/moneda.png" alt="Moneda" class="coin-icon" />
  <span>₡{{ $root.marketTotalPrice }}</span>
</div>
<div class="qty-row">
  <img 
    src="./assets/img/arrow-right.png" 
    alt="Menos" 
    class="qty-btn" 
    :class="{ disabled: $root.isAtMinBuyQty }"
    @click="!$root.isAtMinBuyQty && $root.decBuyQty()" 
  />

  <div class="qty-box">{{ $root.market.buyQty }}</div>

  <img 
    src="./assets/img/arrow-left.png" 
    alt="Más" 
    class="qty-btn" 
    :class="{ disabled: $root.isAtMaxBuyQty }"
    @click="!$root.isAtMaxBuyQty && $root.incBuyQty()" 
  />
</div>

          <img src="./assets/img/btnComprar.png" alt="Comprar" class="panel-buy"
            data-tutorial="buy-button" @click="$emit('buy')" />
        </template>
      </div>
    </div>
  `
});
