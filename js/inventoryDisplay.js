/**
 * Inventory Display Component
 *
 * @fileoverview Component that renders the player's inventory sidebar: category
 * buttons, item slots, action buttons and the inventory info panel. 
 *
 * @component
 * @example
 * <inventory-display :inventory="inventoryObject" @button-click="handleButton" />
 */
app.component("inventory-display", {
  /**
   * Component props - data received from parent/root
   * @typedef {Object} InventoryProps
   * @property {Object} inventory - Inventory state object
   * @property {number|string} inventory.selectedButton - Currently selected category/button id
   * @property {Object[]} inventory.buttons - Array of category/button definitions
   * @property {Object[]} inventory.actionButtons - Array of action button definitions
   * @property {string} [inventory.profileImg] - Profile image URL for sidebar
   */
  props: {
    /** @type {InventoryProps} Inventory state object */
    inventory: { type: Object, required: true },
  },

  /**
   * Events emitted by the component
   * @event inventory-display#button-click Emitted when a category/button is selected
   * @event inventory-display#close Emitted when the close button is pressed
   * @event inventory-display#select-item Emitted when an inventory slot is selected
   * @event inventory-display#action-click Emitted when an action button is clicked
   */
  emits: ["button-click", "close", "select-item", "action-click"],

  /**
   * Component methods 
   * @namespace InventoryDisplayMethods
   */
  methods: {
    /**
     * Handle category/button selection
     * Updates selected button, closes any open info panel, resets UI and
     * forwards a `button-click` event with the selected button payload.
     * @memberof InventoryDisplayMethods
     * @param {Object} btn - Button object that was clicked
     * @param {number|string} btn.id - Button id
     */
    onSelectCategory(btn) {
      if (btn.id === 4) {
        this.$emit("close");
        return;
      }
      this.inventory.selectedButton = btn.id;
      this.closeInfo(); // close info panel when changing
      this.$root.clearAllSectionSelections();
      this.$root.resetInventoryUI();
      this.$emit("button-click", btn);
    },

    /**
     * Handles selecting a slot inside the active inventory section
     * Finds slot metadata (if available), builds a normalized meta payload and
     * opens the inventory info panel, also emits a tutorial event.
     * @memberof InventoryDisplayMethods
     * @param {number|string} id - Slot id being selected
     */
    onSlotSelect(id) {
      const sec = this.$root.activeInvSection;
      sec.selectedSlotId = id;

      const slot = (sec.slots || []).find((s) => s.id === id);
      if (slot && slot.img) {
        this.$root.inventory.selectedSlotImg = slot.img;
        const sectionId = Number(this.inventory.selectedButton);
        const matchedMeta = this.$root.findItemByImg(slot.img);
        let metaPayload = matchedMeta
          ? { ...matchedMeta }
          : {
              ...slot,
              catId: Number.isFinite(sectionId) ? sectionId : null,
              categorySlug:
                slot.categorySlug ||
                (sectionId === 1
                  ? "fish"
                  : sectionId === 2
                  ? "plants"
                  : sectionId === 3
                  ? "supplements"
                  : null),
            };

        if (!metaPayload.metadata && slot.metadata) {
          metaPayload = {
            ...metaPayload,
            metadata: { ...slot.metadata },
          };
        }

        if (!metaPayload.inventorySlug) {
          metaPayload = {
            ...metaPayload,
            inventorySlug: slot.inventorySlug ?? slot.slug ?? null,
          };
        }

        if (
          metaPayload.price === undefined &&
          typeof slot.price !== "undefined"
        ) {
          metaPayload.price = slot.price;
        }

        this.$root.inventory.selectedMeta = metaPayload;
        this.$root.inventory.inventoryInfoOpen = true;
      } else {
        this.closeInfo();
      }

      this.$root.onTutorialEvent("selected-inventory-slot", {
        sectionId: this.$root.inventory.selectedButton,
        slotId: id,
        hasItem: Boolean(slot && slot.img),
      });
    },

    /**
     * Forward an action click to parent
     * @memberof InventoryDisplayMethods
     * @param {string|number} actionId - Identifier for the action invoked
     */
    onAction(actionId) {
      this.$emit("action-click", actionId);
    },

    /**
     * Close the inventory info panel and clear selection data
     * @memberof InventoryDisplayMethods
     */
    closeInfo() {
      this.$root.inventory.inventoryInfoOpen = false;
      this.$root.inventory.selectedSlotImg = null;
      this.$root.inventory.selectedMeta = null;
    },
  },


  template: /*html*/ `
    <section class="inventory-body" data-tutorial-container="inventory">
      <div class="inventory-stage">
        <div class="inventory-sidebar">

          <inventory-side-bar
            :profile-img="inventory.profileImg"
            :buttons="inventory.buttons"
            :selected-button="inventory.selectedButton"
            @button-click="onSelectCategory"
          />

          <inventory-slots
            :slots="$root.activeInvSlots"
            :selected-slot-id="$root.activeInvSelectedId"
            @select-item="onSlotSelect"
          />

          <inventory-actions
            :action-buttons="inventory.actionButtons"
            @action-click="onAction"
          />

<inventory-info
  :show="$root.inventory.inventoryInfoOpen"
  :item="$root.inventory.selectedMeta"
  :img="$root.inventory.selectedSlotImg || './assets/img/pescado1.png'"
  @close="closeInfo"
/>
        </div>
      </div>
    </section>
  `,
});
