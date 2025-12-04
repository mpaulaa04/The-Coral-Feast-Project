/**
 * GamePond Component
 *
 * @fileoverview Pond grid renderer responsible for displaying tile states, handling drag-and-drop, and surfacing tile-specific indicators.
 * @namespace GamePond
 * @version 1.0.0
 *
 * @component
 * @example
 * <game-pond
 *   :tiles="tiles"
 *   :rows="5"
 *   :columns="5"
 *   :timer-colors="timerColors"
 *   @drop-item="handleDrop"
 *   @tile-click="handleTileClick"
 * ></game-pond>
 */
app.component("game-pond", {
  props: {
    tiles: { type: Array, required: true },
    rows: { type: Number, required: true },
    columns: { type: Number, required: true },
    timerColors: { type: Object, required: true },
  },

  emits: ["drop-item", "tile-click"],

  /**
   * Component methods exposed to the template
   * @namespace GamePondMethods
   */
  methods: {
    /**
     * Computes CSS grid definition for the pond based on provided rows and columns.
     * @memberof GamePondMethods
     * @returns {{gridTemplateColumns: string, gridTemplateRows: string}} Grid style object for the pond container
     */
    getGridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
        gridTemplateRows: `repeat(${this.rows}, 1fr)`,
      };
    },

    /**
     * Retrieves the status class for a specific tile index.
     * @memberof GamePondMethods
     * @param {number} index - Tile position in the tiles array
     * @returns {string} CSS class representing the tile status
     */
    getClass(index) {
      return this.tiles[index].statusClass;
    },

    /**
     * Obtains the image source for the tile if available.
     * @memberof GamePondMethods
     * @param {number} index - Tile position in the tiles array
     * @returns {string|undefined} Image path for the tile contents
     */
    getImage(index) {
      return this.tiles[index].imgSrc;
    },

    /**
     * Returns the tutorial identifier for highlighting the first tile.
     * @memberof GamePondMethods
     * @param {number} index - Tile index
     * @returns {string|undefined} Tutorial ID when applicable
     */
    tileTutorialId(index) {
      return index === 0 ? "pond-slot-first" : undefined;
    },

    /**
     * Returns the tutorial identifier for the life bar within the first tile.
     * @memberof GamePondMethods
     * @param {number} index - Tile index
     * @returns {string|undefined} Tutorial ID when applicable
     */
    lifeBarTutorialId(index) {
      return index === 0 ? "pond-life-bar" : undefined;
    },

    /**
     * Returns the tutorial identifier for the growth timer within the first tile.
     * @memberof GamePondMethods
     * @param {number} index - Tile index
     * @returns {string|undefined} Tutorial ID when applicable
     */
    timerTutorialId(index) {
      return index === 0 ? "pond-growth-timer" : undefined;
    },

    /**
     * Handles drag-over state, enabling drop when the tile is empty.
     * @memberof GamePondMethods
     * @param {DragEvent} event - Drag event dispatched by the browser
     * @param {number} index - Tile index being hovered
     */
    onDragOver(event, index) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";

      if (this.tiles[index].statusClass === "status0") {
        event.currentTarget.classList.add("drag-over");
      }
    },

    /**
     * Removes drag-over styles when the dragged item leaves the tile.
     * @memberof GamePondMethods
     * @param {DragEvent} event - Drag event dispatched by the browser
     */
    onDragLeave(event) {
      event.currentTarget.classList.remove("drag-over");
    },

    /**
     * Emits the drop-item event when a draggable payload is released over a tile.
     * @memberof GamePondMethods
     * @param {DragEvent} event - Drop event dispatched by the browser
     * @param {number} index - Tile index receiving the dropped item
     * @fires GamePond#drop-item
     */
    onDrop(event, index) {
      event.preventDefault();
      event.currentTarget.classList.remove("drag-over");
      this.$emit("drop-item", index);
    },

    /**
     * Emits the tile-click event when a tile is selected by the player.
     * @memberof GamePondMethods
     * @param {number} index - Tile index that was clicked
     * @fires GamePond#tile-click
     */
    onTileClick(index) {
      this.$emit("tile-click", index);
    },

    /**
     * Builds the conic gradient representing the growth timer progress on a tile.
     * @memberof GamePondMethods
     * @param {Object} tile - Tile data describing the fish lifecycle state
     * @param {"egg"|"adult"|"ready"|"dead"} tile.stage - Current lifecycle stage
     * @param {number} tile.stageTime - Accumulated time in the current stage (seconds)
     * @param {number} tile.eggDuration - Total duration of the egg stage (seconds)
     * @param {number} tile.adultDuration - Total duration of the adult stage (seconds)
     * @returns {{background: string}} Inline style for the timer indicator
     */
    getTileTimerStyle(tile) {
      const total =
        tile.stage === "egg" ? tile.eggDuration : tile.adultDuration;

      const progress = Math.min(tile.stageTime / total, 1);

      let color = this.timerColors.egg;
      if (tile.stage === "adult") color = this.timerColors.adult;
      if (progress >= 1) color = this.timerColors.ready;

      return {
        background: `conic-gradient(${color} ${
          progress * 360
        }deg, rgba(255,255,255,0.2) 0deg)`,
      };
    },
  },

  /**
   * Template markup for the pond tile grid
   */
  template: /*html*/ `
    <div class="grid" :style="getGridStyle()" data-tutorial="pond-slots">
      <div
        v-for="(tile, index) in tiles"
        :key="index"
        class="tile tile-transition"
        :class="[
          getClass(index),
          tile.condition === 'dirty' ? 'tile-dirty' : 'tile-clean',
          tile.problems.ph ? 'tile-ph' : '',
          tile.problems.oxygen ? 'tile-oxygen' : '',
          tile.problems.temperature ? 'tile-temp' : '',
          tile.hasFish ? 'tile-has-fish' : ''
        ]"
        :data-tutorial="tileTutorialId(index)"
        @click="onTileClick(index)"
        @dragover="onDragOver($event, index)"
        @dragleave="onDragLeave"
        @drop="onDrop($event, index)"
      >
        <!-- IMAGEN DEL PEZ O HUEVO -->
        <img
          v-if="getImage(index)"
          :src="getImage(index)"
          class="tile-img"
          :class="{ hungry: tile.hungry }"
          draggable="false"
        />

        <!-- INDICADOR DE EFECTO DE PLANTA -->
        <div
          v-if="tile.hasPlant"
          class="plant-effect-indicator"
          :title="tile.plantEffectSummary"
        >
          <img :src="tile.plantImg" alt="Efecto de planta activo" />
        </div>

        <!-- POPUP DE CURACIÓN/ALIMENTACIÓN -->
        <div v-if="tile.healPopup" class="feed-popup">
          {{ tile.healPopup }}
        </div>

        <!-- BARRA DE VIDA -->
        <div 
          v-if="tile.hasFish 
                 && tile.stage !== 'dead' 
                 && tile.stage !== 'empty'
                 && tile.stage !== 'ready'"
          class="life-bar"
          :data-tutorial="lifeBarTutorialId(index)"
        >
          <div
            class="life-bar-inner"
            :style="{ width: (tile.life / tile.maxLife * 100) + '%' }"
          ></div>
        </div>

        <!-- TIMER DEL TILE -->
        <div 
          v-if="tile.hasFish && tile.stage !== 'dead'"
          class="tile-timer"
          :class="{ ready: tile.stage === 'ready' }"
          :style="getTileTimerStyle(tile)"
          :data-tutorial="timerTutorialId(index)"
        ></div>
      </div>
    </div>
  `,
});
