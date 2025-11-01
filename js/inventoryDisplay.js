// inventoryDisplay.js
app.component('inventory-display', {
  props: {
    inventory: { type: Object, required: true }
  },
  emits: ['button-click', 'close', 'select-item', 'action-click'],

  data() {
    return {
      inventoryInfoOpen: false,
      selectedSlotImg: null
    };
  },

    methods: {
    onSelectCategory(btn) {
      if (btn.id === 4) { this.$emit('close'); return; }
      this.inventory.selectedButton = btn.id;
    },

    onSlotSelect(id) {
      this.inventory.selectedSlotId = id;
      const slot = this.inventory.slots.find(s => s.id === id); 
      if (slot && slot.img) {
        this.selectedSlotImg   = slot.img;
        this.inventoryInfoOpen = true;
      }
    },

    onAction(actionId) {
      this.$emit('action-click', actionId);
    },

    closeInfo() {
      this.inventoryInfoOpen = false;
      this.selectedSlotImg   = null;
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
            :slots="inventory.slots"
            :selected-slot-id="inventory.selectedSlotId"
            @select-item="onSlotSelect"
          />

          <inventory-actions
            :action-buttons="inventory.actionButtons"
            @action-click="onAction"
          />

          <inventory-info
            :show="inventoryInfoOpen"
            :img="selectedSlotImg || './img/pescado1.png'"
            @close="closeInfo"
          />
        </div>
      </div>
    </section>
  `
});
