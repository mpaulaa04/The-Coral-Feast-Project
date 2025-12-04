/**
 * GameQuickPanel Component
 *
 * @fileoverview Renders a quick-access panel for favorite tools/items and an inventory button in the game UI.
 *
 * @component
 * @example
 * <game-quick-panel
 *   :slots="quickSlots"
 *   :inventory-button="inventoryBtn"
 *   @drag-start="handleDragStart"
 *   @open-inventory="handleOpenInventory"
 *   @use-quick-item="handleUseQuickItem"
 * ></game-quick-panel>
 */
app.component("game-quick-panel", {

  /**
   * Component props - Data received from parent component
   * @typedef {Object} QuickPanelSlot
   * @property {string|number} id - Unique identifier for the slot
   * @property {string} img - Background image for the slot
   * @property {Object} [favoriteItem] - Favorite item assigned to the slot (optional)
   * @property {string} [favoriteItem.img] - Image for the favorite item
   * @property {string} [favoriteItem.category] - Category of the favorite item (e.g., 'regulation')
   * @property {string} [favoriteItem.toolSlug] - Slug for the tool (optional)
   * @property {string} [favoriteItem.slug] - Slug for the item (optional)
   * @property {number} [favoriteItem.toolId] - Tool ID (optional)
   * @property {number} [favoriteItem.count] - Quantity of the item (optional)
   *
   * @typedef {Object} InventoryButton
   * @property {string} img - Image for the inventory button
   * @property {string} alt - Alt text for the inventory button
   * @property {string} text - Text label for the inventory button
   */
  props: {
    /**
     * Array of quick panel slots to render
     * @type {QuickPanelSlot[]}
     */
    slots: { type: Array, required: true },
    /**
     * Inventory button definition
     * @type {InventoryButton}
     */
    inventoryButton: { type: Object, required: true }
  },

  /**
   * Events emitted by this component
   * @event drag-start
   * @event open-inventory
   * @event use-quick-item
   */
  emits: ['drag-start', 'open-inventory', 'use-quick-item'],


  /**
   * Component methods exposed to the template
   * @namespace GameQuickPanelMethods
   */
  methods: {
    /**
     * Emits the drag-start event with the slot object when a slot is dragged.
     * @memberof GameQuickPanelMethods
     * @param {QuickPanelSlot} slot - The slot being dragged
     * @fires GameQuickPanel#drag-start
     */
    onDragStart(slot) {
      this.$emit('drag-start', slot);
    },

    /**
     * Emits the drag-start event with the favorite item when a favorite item is dragged.
     * @memberof GameQuickPanelMethods
     * @param {DragEvent} event - The drag event
     * @param {QuickPanelSlot} slot - The slot containing the favorite item
     * @fires GameQuickPanel#drag-start
     */
    onItemDragStart(event, slot) {
      if (slot.favoriteItem) {
        this.$emit('drag-start', slot.favoriteItem);
        event.dataTransfer.effectAllowed = 'move';
      }
    },

    /**
     * Emits the open-inventory event when the inventory button is clicked.
     * @memberof GameQuickPanelMethods
     * @fires GameQuickPanel#open-inventory
     */
    openInventory() {
      this.$emit('open-inventory');
    },

    /**
     * Emits the use-quick-item event when a regulation tool is clicked.
     * @memberof GameQuickPanelMethods
     * @param {QuickPanelSlot} slot - The slot containing the favorite item
     * @param {Event} event - The click event
     * @fires GameQuickPanel#use-quick-item
     */
    onSlotClick(slot, event) {
      if (slot.favoriteItem && slot.favoriteItem.category === 'regulation') {
        this.$emit('use-quick-item', slot.favoriteItem);
      }
    },

    /**
     * Returns a tutorial ID string for a given slot's favorite item, used for onboarding or tooltips.
     * @memberof GameQuickPanelMethods
     * @param {QuickPanelSlot} slot - The slot object
     * @returns {string|undefined|null} Tutorial ID string, undefined, or null if not matched
     */
    slotTutorialId(slot) {
      const item = slot?.favoriteItem;
      if (!item) {
        return null;
      }

      const slug = item.toolSlug || item.slug || this.slugFromToolId(item.toolId);

      switch (slug) {
        case 'ph':
          return 'quickpanel-tool-ph';
        case 'oxygen':
          return 'quickpanel-tool-oxygen';
        case 'temperature':
          return 'quickpanel-tool-temperature';
        case 'water_quality':
          return 'quickpanel-tool-water';
        default:
          return undefined;
      }
    },

    /**
     * Returns a slug string for a given tool ID.
     * @memberof GameQuickPanelMethods
     * @param {number} id - Tool ID
     * @returns {string|null} Slug string or null if not matched
     */
    slugFromToolId(id) {
      switch (id) {
        case 1:
          return 'ph';
        case 2:
          return 'oxygen';
        case 3:
          return 'temperature';
        case 4:
          return 'water_quality';
        default:
          return null;
      }
    },
  },

  /**
   * Template markup for the game quick panel UI
   */
  template: /*html*/ `
    <!-- game quick panel -->
    <div>
      <div class="quick-access-bar" data-tutorial="quickpanel-overview">
        <div 
          v-for="slot in slots" 
          :key="slot.id" 
          class="quick-access-slot"
          :class="{ 'has-item': slot.favoriteItem }"
          :data-tutorial="slotTutorialId(slot)"
        >
          <img 
            :src="slot.img" 
            alt="slot" 
            class="quick-access-bg" 
            draggable="false"
          />
         
          <img 
            v-if="slot.favoriteItem" 
            :src="slot.favoriteItem.img" 
            alt="favorite" 
            :class="['quick-access-item', { 'regulation-tool': slot.favoriteItem.category === 'regulation' }]"
            draggable="true"
            @dragstart="onItemDragStart($event, slot)"
            @click.stop="onSlotClick(slot, $event)"
          />
          
          <span 
            v-if="slot.favoriteItem && slot.favoriteItem.category !== 'regulation'" 
            class="quick-access-count"
          >
            {{ slot.favoriteItem.count }}
          </span>
          
        </div>

      </div>

      <div class="right-button" @click="openInventory" data-tutorial="inventory-button">
        <img :src="inventoryButton.img" :alt="inventoryButton.alt" draggable="false" />
        <h3>{{ inventoryButton.text }}</h3>
      </div>
    </div>
    <!-- game quick panel -->
  `,
});
