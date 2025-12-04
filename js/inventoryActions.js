/**
 * InventoryActions Component
 *
 * @fileoverview Renders action buttons for the inventory panel, such as selling or favoriting items.
 *
 * @component
 * @example
 * <inventory-actions
 *   :action-buttons="actionsArray"
 *   @action-click="handleActionClick"
 * ></inventory-actions>
 */
app.component("inventory-actions", {

  /**
   * Component props - Data received from parent component
   * @typedef {Object} InventoryActionButton
   * @property {string} id - Unique identifier for the action (e.g., 'sell', 'fav')
   * @property {string} label - Text label for the action
   */
  props: {
    /**
     * Array of action button definitions to render
     * @type {InventoryActionButton[]}
     */
    actionButtons: { type: Array, required: true },
  },

  /**
   * Events emitted by this component
   * @event action-click
   */
  emits: ["action-click"],

  /**
   * Component methods exposed to the template
   * @namespace InventoryActionsMethods
   */
  methods: {
    /**
     * Returns the asset path for a given action button.
     * @memberof InventoryActionsMethods
     * @param {InventoryActionButton} action - The action button object
     * @returns {string} Asset path for the button image
     */
    assetFor(action) {
      if (action.id === "sell") return "./assets/img/btnSell.png";
      if (action.id === "fav") return "./assets/img/btnFavs.png";
      return "";
    },

    /**
     * Emits the action-click event with the action id when a button is clicked.
     * @memberof InventoryActionsMethods
     * @param {InventoryActionButton} action - The action button object
     * @fires InventoryActions#action-click
     */
    clickAction(action) {
      this.$emit("action-click", action.id);
    },
  },
  /**
   * Template markup for the inventory actions UI
   */
  template: /*html*/ `
    <!-- inventory actions -->
    <div class="inventory-actions">
      <template v-for="action in actionButtons" :key="action.id">
        <img
          :src="assetFor(action)"
          :alt="action.label"
          :class="['action-btn', action.id]"
          :data-tutorial="action.id === 'sell' ? 'inventory-sell' : (action.id === 'fav' ? 'inventory-fav' : null)"
          @click="clickAction(action)"
        />
      </template>
    </div>
    <!-- inventory actions -->
  `,
});
