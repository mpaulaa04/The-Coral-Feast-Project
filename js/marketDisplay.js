app.component('market-display', {
  props: { market: { type: Object, required: true } },
  emits: ['buy', 'close'],
  methods: {

    onSelectCategory(btn) {

      this.$emit('close');
    },
    onOpenItem(id) { this.market.selectedItemId = id; this.market.showItemPanel = true; },
    onCloseItem() { this.market.selectedItemId = null; this.market.showItemPanel = false; },
    onBuySelected() {
      const fish = this.market.fishItems.find(f => f.id === this.market.selectedItemId);
      if (fish) this.$emit('buy', fish);
    }
  },
  template: `
    <section class="market-body" data-tutorial-container="market">
<market-header
  :money="$root.market.money"
  :remain-sec="$root.market.timerRemainSec"
  :duration-sec="$root.market.timerDurationSec"
/>

      <div class="market-stage">
        <market-buttons
          :buttons="market.variantButtons"
          :selected="market.selectedButton"
          @select="$root.onMarketCategoryClick"
        />
        <market-shop
          :current-store="$root.marketCurrentStore"
          :shelf-items="$root.marketShelfItems"
          :items="$root.marketCatalogItems"
          :show-item-panel="market.showItemPanel"
          :selected-id="market.selectedItemId"
          :buying="market.buying"
          @open="$root.onMarketOpenItem"
          @close="$root.onMarketCloseItem"
          @buy="$root.onMarketBuy($root.marketSelectedItem)"
        />
      </div>
    </section>
  `
});
