/**
 * MarketDisplay Component
 *
 * @fileoverview Renders the main market interface, including category selection, item panels, and buy actions.
 * @namespace MarketDisplay
 * @version 1.0.0
 *
 * @component
 * @example
 * <market-display
 *   :market="marketData"
 *   @buy="handleBuy"
 *   @close="handleClose"
 * ></market-display>
 */
app.component('market-display', {

  /**
   * Component props - Data received from parent component
   * @typedef {Object} MarketData
   * @property {Array<Object>} fishItems - Array of fish items available for purchase
   * @property {Array<Object>} variantButtons - Array of category/variant buttons
   * @property {number|null} selectedItemId - ID of the currently selected item
   * @property {boolean} showItemPanel - Whether the item panel is visible
   * @property {number} selectedButton - ID of the selected category button
   * @property {boolean} buying - Whether a buy action is in progress
   * @property {number} money - Current user money
   * @property {number} timerRemainSec - Remaining seconds for market timer
   * @property {number} timerDurationSec - Total duration of market timer
   */
  props: {
    /**
     * Market data object containing all state for the market UI
     * @type {MarketData}
     */
    market: { type: Object, required: true }
  },

  /**
   * Events emitted by this component
   * @event buy
   * @event close
   */
  emits: ['buy', 'close'],

  /**
   * Component methods exposed to the template
   * @namespace MarketDisplayMethods
   */
  methods: {
    /**
     * Emits the close event when a category is selected.
     * @memberof MarketDisplayMethods
     * @param {Object} btn - The selected category button
     * @fires MarketDisplay#close
     */
    onSelectCategory(btn) {
      this.$emit('close');
    },

    /**
     * Opens the item panel for the selected item.
     * @memberof MarketDisplayMethods
     * @param {number} id - The ID of the item to open
     */
    onOpenItem(id) { this.market.selectedItemId = id; this.market.showItemPanel = true; },

    /**
     * Closes the item panel.
     * @memberof MarketDisplayMethods
     */
    onCloseItem() { this.market.selectedItemId = null; this.market.showItemPanel = false; },

    /**
     * Emits the buy event for the currently selected item.
     * @memberof MarketDisplayMethods
     * @fires MarketDisplay#buy
     */
    onBuySelected() {
      const fish = this.market.fishItems.find(f => f.id === this.market.selectedItemId);
      if (fish) this.$emit('buy', fish);
    }
  },
  /**
   * Template markup for the market display UI
   */
  template: `
    <!-- market display -->
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
    <!-- market display -->
  `
});
