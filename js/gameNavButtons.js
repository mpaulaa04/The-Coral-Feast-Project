/**
 * GameNavButtons Component
 *
 * @fileoverview Renders navigation buttons for the game interface, allowing users to open modals for market, missions, and other sections.
 *
 * @component
 * @example
 * <game-nav-buttons
 *   :buttons="navButtons"
 *   @open-modal="handleOpenModal"
 *   @close-modal="handleCloseModal"
 * ></game-nav-buttons>
 */
app.component("game-nav-buttons", {

  /**
   * Component props - Data received from parent component
   * @typedef {Object} GameNavButton
   * @property {string|number} id - Unique identifier for the button
   * @property {string} img - Image source for the button icon
   * @property {string} label - Text label for the button
   * @property {string} type - Type of modal to open (e.g., 'market', 'missions')
   */
  props: {
    /**
     * Array of navigation button definitions to render
     * @type {GameNavButton[]}
     */
    buttons: { type: Array, required: true }
  },


  /**
   * Events emitted by this component
   * @event open-modal
   * @event close-modal
   */
  emits: ['open-modal', 'close-modal'],


  /**
   * Component methods exposed to the template
   * @namespace GameNavButtonsMethods
   */
  methods: {
    /**
     * Emits the open-modal event with the button type, to open the corresponding modal.
     * @memberof GameNavButtonsMethods
     * @param {string} type - The type of modal to open
     * @fires GameNavButtons#open-modal
     */
    open(type) { this.$emit('open-modal', type); },

    /**
     * Emits the close-modal event to close the modal.
     * @memberof GameNavButtonsMethods
     * @fires GameNavButtons#close-modal
     */
    close() { this.$emit('close-modal'); },

    /**
     * Returns a tutorial ID string for a given button type, used for onboarding or tooltips.
     * @memberof GameNavButtonsMethods
     * @param {GameNavButton} button - The button object
     * @returns {string|null} Tutorial ID string or null if not matched
     */
    tutorialId(button) {
      switch (button.type) {
        case 'market':
          return 'market-button';
        case 'missions':
          return 'missions-button';
        default:
          return null;
      }
    },
  },
  /**
   * Template markup for the game navigation buttons UI
   */
  template: /*html*/ `
    <!-- game navigation buttons -->
    <div class="top-buttons">
      <a v-for="button in buttons" :key="button.id"
        href="#" @click.prevent="open(button.type)"
        :data-tutorial="tutorialId(button)">
        <div class="icon-group">
          <img :src="button.img" :alt="button.label" class="icon-img" draggable="false">
          <h3>{{ button.label }}</h3>
        </div>
      </a>
    </div>
    <!-- game navigation buttons -->
  `,
});
