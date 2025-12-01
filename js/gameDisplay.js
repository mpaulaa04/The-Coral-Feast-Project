app.component("game-display", {

  props: {
    game: { type: Object, required: true },
    currentCycle: { type: String, required: true },
    timeLeft: { type: Number, required: true },
    dayTimerSec: { type: Number, required: true },
    nightTimerSec: { type: Number, required: true },
    currentDay: { type: Number, required: true },
    dayNightTransition: { type: Object, required: true }
  },

  emits: ['getClass', 'getImage', 'clean', 'feed', 'tools', 'add-fish', 'open-modal', 'close-modal', 'use-quick-item', 'drag-item', 'drop-item', 'tile-click'],

  methods: {
    obtainClass(index) { return this.game.tiles[index].statusClass; },
    obtainImage(index) { return this.game.tiles[index].imgSrc; },
    onClean() { this.$emit("clean"); },
    onFeed() { this.$emit("feed"); },
    onTools() { this.$emit("tools"); },
    onAddFish() { this.$emit("add-fish"); },
    openModal(type) { this.$emit('open-modal', type); },
    closeModal() { this.$emit('close-modal'); },
    initManualGrab(index) { this.game.initManualGrab(index); },
    dropIn(index) { this.game.dropIn(index); },
    handleInventory() {
      this.$emit('open-modal', 'inventory');
    },
    useQuickItem(item) {
      this.$emit('use-quick-item', item);
    },
    onDragItem(item) {
      this.$emit('drag-item', item);
    },
    onDropItem(index) {
      this.$emit('drop-item', index);
    },
    onTileClick(index) {
      this.$emit('tile-click', index);
    }

  },

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
