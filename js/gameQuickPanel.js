app.component("game-quick-panel", {
  props: {
    slots: { type: Array, required: true },
    inventoryButton: { type: Object, required: true }
  },
  emits: ['drag-start', 'open-inventory', 'use-quick-item'],

  methods: {
    onDragStart(slot) {
      this.$emit('drag-start', slot);
    },
    onItemDragStart(event, slot) {
      if (slot.favoriteItem) {
        this.$emit('drag-start', slot.favoriteItem);
        event.dataTransfer.effectAllowed = 'move';
      }
    },
    openInventory() {
      this.$emit('open-inventory');
    },
    onSlotClick(slot, event) {
      if (slot.favoriteItem && slot.favoriteItem.category === 'regulation') {
        this.$emit('use-quick-item', slot.favoriteItem);
      }
    }
  },

  template: /*html*/ `
    <div>
      <div class="quick-access-bar">
        <div 
          v-for="slot in slots" 
          :key="slot.id" 
          class="quick-access-slot"
          :class="{ 'has-item': slot.favoriteItem }"
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
            class="quick-access-item"
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

      <div class="right-button" @click="openInventory">
        <img :src="inventoryButton.img" :alt="inventoryButton.alt" draggable="false" />
        <h3>{{ inventoryButton.text }}</h3>
      </div>
    </div>
  `,
});
