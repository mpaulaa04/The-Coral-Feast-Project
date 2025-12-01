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
    },
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

  template: /*html*/ `
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
  `,
});
