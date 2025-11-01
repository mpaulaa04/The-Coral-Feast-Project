app.component('inventory-actions', {
  props: {
    actionButtons: { type: Array, required: true }
  },
  emits: ['action-click'],
  methods: {
    assetFor(action) {
      if (action.id === 'sell') return '../assets/img/btnSell.png';
      if (action.id === 'fav')  return '../assets/img/btnFavs.png';
      return '';
    },
    clickAction(action) { this.$emit('action-click', action.id); }
  },
  template: /*html*/`
    <div class="inventory-actions">
      <template v-for="action in actionButtons" :key="action.id">
        <img
          :src="assetFor(action)"
          :alt="action.label"
          class="action-btn"
          @click="clickAction(action)"
        />
      </template>
    </div>
  `
});
