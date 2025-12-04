/**
 * GameActionButtons Component
 *
 * @fileoverview Renders a set of action buttons for the game interface, allowing the user to trigger actions like cleaning, feeding, using tools, or adding fish.
 *
 * @component
 * @example
 * <game-action-buttons
 *   :bottom-buttons="buttonsArray"
 *   @clean="handleClean"
 *   @feed="handleFeed"
 *   @tools="handleTools"
 *   @add-fish="handleAddFish"
 * ></game-action-buttons>
 */
app.component("game-action-buttons", {

  /**
   * Component props - Data received from parent component
   * @typedef {Object} GameActionButton
   * @property {string|number} id - Unique identifier for the button
   * @property {string} img - Image source for the button icon
   * @property {string} alt - Alt text for the button image
   * @property {string} event - Event name to emit when clicked (e.g., 'clean', 'feed', 'tools', 'add-fish')
   */
  props: {
    /**
     * Array of button definitions to render
     * @type {GameActionButton[]}
     */
    bottomButtons: { type: Array, required: true },
  },


  /**
   * Events emitted by this component
   * @event clean
   * @event feed
   * @event tools
   * @event add-fish
   */
  emits: ['clean', 'feed', 'tools', 'add-fish'],


  /**
   * Component methods exposed to the template
   * @namespace GameActionButtonsMethods
   */
  methods: {
    /**
     * Returns a tutorial ID string for a given button event, used for onboarding or tooltips.
     * @memberof GameActionButtonsMethods
     * @param {GameActionButton} btn - The button object
     * @returns {string|undefined} Tutorial ID string or undefined if not matched
     */
    tutorialId(btn) {
      switch (btn.event) {
        case 'tools':
          return 'bottom-button-tools';
        case 'feed':
          return 'bottom-button-supplements';
        case 'clean':
          return 'bottom-button-plants';
        case 'add-fish':
          return 'bottom-button-fish';
        default:
          return undefined;
      }
    },

    /**
     * Plays a button click sound effect.
     * @memberof GameActionButtonsMethods
     */
    playButtonSound() {
      const audio = new Audio('./assets/sounds/select-menu-47560.mp3');
      audio.play();
    },

    /**
     * Handles button click: plays sound and emits the corresponding event.
     * @memberof GameActionButtonsMethods
     * @param {GameActionButton} btn - The button object that was clicked
     */
    onClick(btn) {
      this.playButtonSound();
      this.$emit(btn.event);
    }
  },

  /**
   * Template markup for the game action buttons UI
   */
template: /*html*/ `
    <!-- game action buttons -->
    <div class="bottom-buttons">
      <button
        v-for="btn in bottomButtons"
        :key="btn.id"
        :data-tutorial="tutorialId(btn) || null"
        @click="onClick(btn)"
      >
        <img :src="btn.img" :alt="btn.alt" draggable="false" />
      </button>
    </div>
    <!-- game action buttons -->
  `,
});
