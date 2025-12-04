/**
 * Interactive shop display for the market scene, including shelf items and purchase panel.
 */
/**
 * @typedef {Object} MarketShelfItem
 * @property {number} id - Identifier of the decorative shelf item.
 * @property {string} img - Asset path displayed on the shelf.
 * @property {string} x - CSS left position percentage.
 * @property {string} y - CSS top position percentage.
 */

/**
 * @typedef {Object} MarketCatalogItem
 * @property {number} id - Unique identifier of the catalog entry.
 * @property {string} name - Display name of the item.
 * @property {string} img - Image source shown in the panel.
 */

/**
 * @typedef {Object} MarketShopProps
 * @property {string} currentStore - Background image for the active store scene.
 * @property {MarketShelfItem[]} shelfItems - Decorative shelf elements rendered in the shop.
 * @property {MarketCatalogItem[]} items - Catalog entries available for purchase.
 * @property {boolean} showItemPanel - Whether the item detail panel is visible.
 * @property {number|null} selectedId - Identifier of the item currently selected.
 * @property {boolean} buying - Indicates the component is in a purchasing state.
 */

/**
 * Interactive shop display for the market scene, including shelf items and purchase panel.
 * @component
 */
app.component('market-shop', {
  props: {
    /**
     * Background image shown for the active store scene.
     * @type {import('vue').PropOptions<string>}
     */
    currentStore: { type: String, required: true },
    /**
     * Decorative items displayed on the market shelf.
     * @type {import('vue').PropOptions<MarketShelfItem[]>}
     */
    shelfItems: { type: Array, required: true },
    /**
     * Catalog entries available for purchase in the current category.
     * @type {import('vue').PropOptions<MarketCatalogItem[]>}
     */
    items: { type: Array, required: true },
    /**
     * Whether the detail panel for a selected item is visible.
     * @type {import('vue').PropOptions<boolean>}
     */
    showItemPanel: { type: Boolean, required: true },
    /**
     * Identifier of the item currently highlighted in the panel.
     * @type {import('vue').PropOptions<number|null>}
     */
    selectedId: { type: [Number, null], default: null },
    /**
     * Indicates an in-progress purchase animation/state.
     * @type {import('vue').PropOptions<boolean>}
     */
    buying: { type: Boolean, default: false }
  },
  emits: ['open', 'close', 'buy'],
  computed: {
    /**
     * Currently selected catalog entry displayed in the detail panel.
     * @returns {MarketCatalogItem|null}
     */
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
