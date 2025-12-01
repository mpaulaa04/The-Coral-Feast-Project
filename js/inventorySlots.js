app.component('inventory-slots', {
  props: {
    slots: { type: Array, required: true },
    selectedSlotId: { type: Number, default: null }
  },
  emits: ['select-item'],
  methods: {
    selectSlot(slot) { this.$emit('select-item', slot.id); }
  },
  template: /*html*/`
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
  `
});
