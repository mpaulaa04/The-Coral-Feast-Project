// inventoryDisplay.js
app.component('inventory-display', {
  props: {
    inventory: { type: Object, required: true }
  },
  emits: ['button-click', 'close', 'select-item', 'action-click'],
  methods: {
    onSelectCategory(btn) {
      if (btn.id === 4) { this.$emit('close'); return; }
      this.inventory.selectedButton = btn.id;
      this.closeInfo(); // al cambiar, cierra tarjeta
      this.$root.clearAllSectionSelections();
      this.$root.resetInventoryUI();
    },

    onSlotSelect(id) {
      const sec = this.$root.activeInvSection;
      sec.selectedSlotId = id;

      const slot = (sec.slots || []).find(s => s.id === id);
      if (slot && slot.img) {
        this.$root.inventory.selectedSlotImg = slot.img;
        this.$root.inventory.selectedMeta = this.$root.findItemByImg(slot.img);
        this.$root.inventory.inventoryInfoOpen = true;
      } else {
        this.closeInfo();
      }
    },

    onAction(actionId) { this.$emit('action-click', actionId); },

    closeInfo() {
      this.$root.inventory.inventoryInfoOpen = false;
      this.$root.inventory.selectedSlotImg = null;
      this.$root.inventory.selectedMeta = null;
    }
  },

  template: /*html*/`
    <section class="inventory-body">
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
  `
});
