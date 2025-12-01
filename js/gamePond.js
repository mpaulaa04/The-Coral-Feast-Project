app.component("game-pond", {
  props: {
    tiles: { type: Array, required: true },
    rows: { type: Number, required: true },
    columns: { type: Number, required: true },
    timerColors: { type: Object, required: true },
  },

  emits: ["drop-item", "tile-click"],

  methods: {
    getGridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
        gridTemplateRows: `repeat(${this.rows}, 1fr)`,
      };
    },

    getClass(index) {
      return this.tiles[index].statusClass;
    },

    getImage(index) {
      return this.tiles[index].imgSrc;
    },

    tileTutorialId(index) {
      return index === 0 ? 'pond-slot-first' : undefined;
    },

    lifeBarTutorialId(index) {
      return index === 0 ? 'pond-life-bar' : undefined;
    },

    timerTutorialId(index) {
      return index === 0 ? 'pond-growth-timer' : undefined;
    },

    onDragOver(event, index) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";

      if (this.tiles[index].statusClass === "status0") {
        event.currentTarget.classList.add("drag-over");
      }
    },

    onDragLeave(event) {
      event.currentTarget.classList.remove("drag-over");
    },

    onDrop(event, index) {
      event.preventDefault();
      event.currentTarget.classList.remove("drag-over");
      this.$emit("drop-item", index);
    },

    onTileClick(index) {
      this.$emit("tile-click", index);
    },

    getTileTimerStyle(tile) {
      const total =
        tile.stage === "egg" ? tile.eggDuration : tile.adultDuration;

      const progress = Math.min(tile.stageTime / total, 1);

      let color = this.timerColors.egg;
      if (tile.stage === "adult") color = this.timerColors.adult;
      if (progress >= 1) color = this.timerColors.ready;

      return {
        background: `conic-gradient(${color} ${progress * 360
          }deg, rgba(255,255,255,0.2) 0deg)`,
      };
    },
  },

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
          v-if="tile.hasPlant && tile.plantEffectSummary"
          class="plant-effect-indicator"
          :title="tile.plantEffectSummary"
        >
          <img src="./assets/img/leaf-indicator.svg" alt="Efecto de planta activo" />
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
