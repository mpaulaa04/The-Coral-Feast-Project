app.component('market-display', {
  props: {
    market: { type: Object, required: true } 
  },
  emits: ['buy','close'],
  methods: {
    
    onSelectCategory(btn) {
      this.market.selectedButton = btn.id;
      this.market.currentStore   = btn.store ? `./assets/img/${btn.store}.png` : this.market.currentStore;
      if (!btn.store) this.$emit('close');
    },
    onOpenItem(id)  { this.market.selectedItemId = id;  this.market.showItemPanel = true;  },
    onCloseItem()   { this.market.selectedItemId = null; this.market.showItemPanel = false; },
    onBuySelected() {
      const fish = this.market.fishItems.find(f => f.id === this.market.selectedItemId);
      if (fish) this.$emit('buy', fish); 
    }
  },
  template: /*html*/`
    <section class="market-body">
      <market-header :money="market.money" />

      <div class="market-stage">
        <market-buttons
          :buttons="market.variantButtons"
          :selected="market.selectedButton"
          @select="onSelectCategory"
        />
        <market-shop
          :current-store="market.currentStore"
          :store-items="market.storeItems"
          :fish-items="market.fishItems"
          :show-item-panel="market.showItemPanel"
          :selected-id="market.selectedItemId"
          :buying="market.buying"
          @open="onOpenItem"
          @close="onCloseItem"
          @buy="onBuySelected"
        />
      </div>
    </section>
  `
});
