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
      this.$emit('button-click', btn);
    },

    onSlotSelect(id) {
      const sec = this.$root.activeInvSection;
      sec.selectedSlotId = id;

      const slot = (sec.slots || []).find(s => s.id === id);
      if (slot && slot.img) {
        this.$root.inventory.selectedSlotImg = slot.img;
        const sectionId = Number(this.inventory.selectedButton);
        const matchedMeta = this.$root.findItemByImg(slot.img);
        let metaPayload = matchedMeta ? { ...matchedMeta } : {
          ...slot,
          catId: Number.isFinite(sectionId) ? sectionId : null,
          categorySlug: slot.categorySlug
            || (sectionId === 1 ? 'fish'
              : sectionId === 2 ? 'plants'
                : sectionId === 3 ? 'supplements'
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

        if (metaPayload.price === undefined && typeof slot.price !== 'undefined') {
          metaPayload.price = slot.price;
        }

        this.$root.inventory.selectedMeta = metaPayload;
        this.$root.inventory.inventoryInfoOpen = true;
      } else {
        this.closeInfo();
      }

      this.$root.onTutorialEvent('selected-inventory-slot', {
        sectionId: this.$root.inventory.selectedButton,
        slotId: id,
        hasItem: Boolean(slot && slot.img),
      });
    },

    onAction(actionId) { this.$emit('action-click', actionId); },

    closeInfo() {
      this.$root.inventory.inventoryInfoOpen = false;
      this.$root.inventory.selectedSlotImg = null;
      this.$root.inventory.selectedMeta = null;
    }
  },

  template: /*html*/`
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
  `
});
