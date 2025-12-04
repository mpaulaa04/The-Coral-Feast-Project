/**
 * @typedef {Object} MarketButton
 * @property {number} id - Unique identifier of the market category.
 * @property {string} name - Display name shown in the sidebar.
 * @property {string} img - Image slug used for the button artwork.
 */

/**
 * Sidebar button list for the market view, emitting the selected category.
 * @component
 */
app.component('market-buttons', {
  props: {
    /**
     * Collection of sidebar buttons representing market categories.
     * @type {import('vue').PropOptions<MarketButton[]>}
     */
    buttons: { type: Array, required: true },
    /**
     * Identifier of the currently active category.
     * @type {import('vue').PropOptions<number>}
     */
    selected: { type: Number, required: true }
  },
  emits: ['select'],
  methods: {
    /**
     * Emits the selected button payload to parent listeners.
     * @param {MarketButton} b - Category descriptor emitted to listeners.
     * @returns {void}
     */
    clickBtn(b) {
      this.$emit('select', b);
    }
  },
  template: `
    <div class="market-sidebar">
      <div v-for="b in buttons" :key="b.id"
           class="category-btn" :class="{ active: selected===b.id }"
           @click="clickBtn(b)"
           :data-tutorial="b.id === 1 ? 'category-fish' : null">
        <span>{{ b.name }}</span>
        <img :src="'./assets/img/'+b.img+'.png'" :alt="b.name">
      </div>
    </div>
  `
});
