/**
 * GameDisplay Component
 *
 * @fileoverview Top-level pond management view orchestrating game controls, timers, panels, and pond tiles.
 * 
 * @namespace GameDisplay
 * @version 1.0.0
 *
 * @component
 * @example
 * <game-display
 *   :game="gameState"
 *   :current-cycle="currentCycle"
 *   :time-left="timeLeft"
 *   :day-timer-sec="90"
 *   :night-timer-sec="60"
 *   :current-day="dayCount"
 *   :day-night-transition="transition"
 *   @clean="handleClean"
 *   @feed="handleFeed"
 * ></game-display>
 */

app.component("game-display", {

  /**
   * @typedef {Object} DayNightTransition
   * @property {boolean} active - Indicates whether the transition overlay is visible
   * @property {string} theme - Current transition theme key (e.g., "sunrise", "sunset")
   * @property {string} icon - Path to the icon asset shown during the transition
   */

  /**
   * @typedef {Object} GameDisplayState
   * @property {Array<{statusClass: string, imgSrc: string}>} tiles - Pond tiles with visual metadata
   * @property {Array<Object>} navButtons - Navigation button descriptors for the header
   * @property {Array<Object>} slots - Quick-access slots displayed in the utility bar
   * @property {Object} inventoryButton - Secondary action button for the quick panel
   * @property {Array<Object>} bottomButtons - Actions shown beneath the pond (clean, feed, tools, add fish)
   * @property {Function} initManualGrab - Starts manual drag interactions for pond tiles
   * @property {Function} dropIn - Handles dropping grabbed fish into the pond
   * @property {number} filas - Total tile rows in the pond grid
   * @property {number} columnas - Total tile columns in the pond grid
   * @property {Object} timerColors - Theme configuration for time bar styling
   */

  /**
   * Component props - Data received from parent component
   * @typedef {Object} GameDisplayProps
   * @property {GameDisplayState} game - Aggregated state and callbacks controlling the game view
   * @property {"day"|"night"} currentCycle - Current segment of the day-night loop
   * @property {number} timeLeft - Remaining seconds in the active cycle
   * @property {number} dayTimerSec - Total seconds for the day cycle
   * @property {number} nightTimerSec - Total seconds for the night cycle
   * @property {number} currentDay - Current in-game day count
   * @property {DayNightTransition} dayNightTransition - Transition overlay configuration
   */
  props: {
    /** @type {GameDisplayState} Aggregated game state, resources, and callbacks */
    game: { type: Object, required: true },
    /** @type {"day"|"night"} Current day-night cycle identifier */
    currentCycle: { type: String, required: true },
    /** @type {number} Seconds remaining in the active cycle */
    timeLeft: { type: Number, required: true },
    /** @type {number} Duration of the day segment in seconds */
    dayTimerSec: { type: Number, required: true },
    /** @type {number} Duration of the night segment in seconds */
    nightTimerSec: { type: Number, required: true },
    /** @type {number} Current day counter */
    currentDay: { type: Number, required: true },
    /** @type {DayNightTransition} Visual overlay configuration for transitions */
    dayNightTransition: { type: Object, required: true }
  },

  /**
   * @fires GameDisplay#getClass
   * @fires GameDisplay#getImage
   * @fires GameDisplay#clean
   * @fires GameDisplay#feed
   * @fires GameDisplay#tools
   * @fires GameDisplay#add-fish
   * @fires GameDisplay#open-modal
   * @fires GameDisplay#close-modal
   * @fires GameDisplay#use-quick-item
   * @fires GameDisplay#drag-item
   * @fires GameDisplay#drop-item
   * @fires GameDisplay#tile-click
   */
  emits: ['getClass', 'getImage', 'clean', 'feed', 'tools', 'add-fish', 'open-modal', 'close-modal', 'use-quick-item', 'drag-item', 'drop-item', 'tile-click'],

  /**
   * Component methods exposed to the template
   * @namespace GameDisplayMethods
   */
  methods: {
    /**
     * Retrieves the CSS class representing the current tile status.
     * @memberof GameDisplayMethods
     * @param {number} index - Tile index located within the pond grid
     * @returns {string} Class name applied to the tile element
     */
    obtainClass(index) { return this.game.tiles[index].statusClass; },
    /**
     * Retrieves the asset path representing the current tile contents.
     * @memberof GameDisplayMethods
     * @param {number} index - Tile index located within the pond grid
     * @returns {string} Source path for the tile image
     */
    obtainImage(index) { return this.game.tiles[index].imgSrc; },
    /**
     * Emits the clean action so the parent component can trigger the cleaning workflow.
     * @memberof GameDisplayMethods
     */
    onClean() { this.$emit("clean"); },
    /**
     * Emits the feed action for the parent to distribute food to pond tiles.
     * @memberof GameDisplayMethods
     */
    onFeed() { this.$emit("feed"); },
    /**
     * Emits the tools action to open or toggle tool-related menus.
     * @memberof GameDisplayMethods
     */
    onTools() { this.$emit("tools"); },
    /**
     * Emits the add-fish action signaling that fish should be placed into the pond.
     * @memberof GameDisplayMethods
     */
    onAddFish() { this.$emit("add-fish"); },
    /**
     * Requests that the parent open the corresponding modal dialog.
     * @memberof GameDisplayMethods
     * @param {string} type - Identifier of the modal to display
     */
    openModal(type) { this.$emit('open-modal', type); },
    /**
     * Signals that the currently open modal should be closed by the parent.
     * @memberof GameDisplayMethods
     */
    closeModal() { this.$emit('close-modal'); },
    /**
     * Initiates manual drag handling for a specific tile using the shared game state API.
     * @memberof GameDisplayMethods
     * @param {number} index - Tile index selected for manual interaction
     */
    initManualGrab(index) { this.game.initManualGrab(index); },
    /**
     * Drops any manually grabbed entity into the target tile using the shared state API.
     * @memberof GameDisplayMethods
     * @param {number} index - Target tile index for the drop action
     */
    dropIn(index) { this.game.dropIn(index); },
    /**
     * Opens the inventory modal from the quick panel.
     * @memberof GameDisplayMethods
     */
    handleInventory() {
      this.$emit('open-modal', 'inventory');
    },
    /**
     * Emits the quick-item usage event to the parent.
     * @memberof GameDisplayMethods
     * @param {Object} item - Quick item descriptor selected by the user
     */
    useQuickItem(item) {
      this.$emit('use-quick-item', item);
    },
    /**
     * Forwards drag start metadata from quick panel items.
     * @memberof GameDisplayMethods
     * @param {Object} item - Item being dragged out of the quick panel
     */
    onDragItem(item) {
      this.$emit('drag-item', item);
    },
    /**
     * Emits the drop-item event for quick panel item drops into pond tiles.
     * @memberof GameDisplayMethods
     * @param {number} index - Index of the tile receiving the drop
     */
    onDropItem(index) {
      this.$emit('drop-item', index);
    },
    /**
     * Emits the tile-click event allowing the parent to respond to tile selection.
     * @memberof GameDisplayMethods
     * @param {number} index - Tile index that was clicked by the player
     */
    onTileClick(index) {
      this.$emit('tile-click', index);
    }

  },

  /**
   * Template markup for the game display layout
   */
  template: /*html*/ `
   <div class="bg-game">
      <div
        v-if="dayNightTransition.active"
        class="day-night-overlay"
        :class="'day-night-overlay--' + dayNightTransition.theme"
        aria-hidden="true"
      >
        <img
          :src="dayNightTransition.icon"
          alt=""
          class="day-night-overlay__icon"
        />
      </div>
      <div class="time-indicator"><!-- INDICADOR DE TIEMPO DÍA/NOCHE -->
        <div>
        Día {{ currentDay }} — 
          <span v-if="currentCycle === 'day'">Mañana</span>
          <span v-else>Noche</span>
          — {{ timeLeft }}s
        </div>

        <div class="time-bar">
          <div
            class="time-bar-fill"
            :style="{
              width: (timeLeft / (currentCycle === 'day' ? dayTimerSec : nightTimerSec)) * 100 + '%'
            }"
          ></div>
        </div>
      </div>

     <!--  <game-close></game-close>-->

      <game-nav-buttons 
        :buttons="game.navButtons" 
        @open-modal="openModal" 
        @close-modal="closeModal">
      </game-nav-buttons>

      <div class="container">
        <div class="game-wrapper">
          <game-quick-panel 
            :slots="game.slots" 
            :inventoryButton="game.inventoryButton"
            @drag-start="onDragItem"
            @open-inventory="handleInventory"
            @use-quick-item="useQuickItem">
          </game-quick-panel>

      <game-pond 
        :tiles="game.tiles"
        :rows="game.filas"
        :columns="game.columnas"
          :timer-colors="game.timerColors"
        @drop-item="onDropItem"
        @tile-click="onTileClick"
      >
      </game-pond>

      <game-action-buttons
        :bottom-buttons="game.bottomButtons"
        @clean="onClean"
        @feed="onFeed"
        @tools="onTools"
        @add-fish="onAddFish">
      </game-action-buttons>
    </div>
    </div>
    </div>
  `,
});
