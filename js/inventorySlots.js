/**
 * Inventory Slots Component
 *
 * @fileoverview Renders a grid of inventory slots for a given inventory section.
 * Each slot may contain an image, a count badge and a favorite marker. Emits
 * selection events when the user clicks a slot.
 *
 * @component
 * @example
 * <inventory-slots :slots="activeSlots" :selected-slot-id="selectedId" @select-item="handleSelect" />
 */
app.component("inventory-slots", {
  /**
   * Slot object typedef
   * @typedef {Object} InventorySlot
   * @property {number|string} id - Unique slot identifier
   * @property {string} [img] - Image URL/path for the item in the slot
   * @property {number} [count] - Quantity count shown as a badge when > 1
   * @property {boolean} [fav] - Whether the slot/item is marked as favorite
   * @property {string} [categorySlug] - Optional category identifier
   */
  props: {
    /** @type {InventorySlot[]} Array of slot objects */
    slots: { type: Array, required: true },
    /** @type {number|null} Currently selected slot id */
    selectedSlotId: { type: Number, default: null },
  },

  /**
   * Events emitted by the component
   * @event inventory-slots#select-item Emitted when a slot is clicked with the slot id as payload
   */
  emits: ["select-item"],

  /**
   * Component methods for user interactions
   * @namespace InventorySlotsMethods
   */
  methods: {
    /**
     * Emits `select-item` with the clicked slot id
     * @memberof InventorySlotsMethods
     * @param {InventorySlot} slot - The slot object that was clicked
     */
    selectSlot(slot) {
      this.$emit("select-item", slot.id);
    },
  },

 
  template: /*html*/ `
    <div class="inventory-grid">
      <div
        v-for="slot in slots"
        :key="slot.id"
        class="inventory-slot"
        :class="{ selected: slot.id === selectedSlotId }"
        :data-tutorial="$root?.tutorial?.inventoryTargetSlotId === slot.id ? 'inventory-fish-slot' : null"
        @click="selectSlot(slot)"
      >
        <img
          v-if="slot.img"
          :src="slot.img"
          alt="item"
          class="slot-img"
          draggable="false"
        />
        <span v-if="slot.count > 1" class="slot-badge">{{ slot.count }}</span>

        <img v-if="slot.fav" src="./assets/img/estrella.png" alt="fav" class="slot-fav" />
      </div>
    </div>
  `,
});
