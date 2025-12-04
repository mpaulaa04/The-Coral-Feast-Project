/**
 * GameMenu Component
 *
 * @fileoverview Toggleable in-game menu providing quick access to settings like music and logout.
 *
 * @typedef {Object} GameMenuState
 * @property {boolean} open Tracks whether the menu panel is visible.
 * @property {boolean} musicOn Reflects the playback state of the background music.
 *
 * @component
 * @example
 * <game-menu></game-menu>
 */
app.component("game-menu", {
  /**
   * Reactive state controlling menu visibility and audio toggle indicator.
   * @returns {GameMenuState}
   */
  data() {
    return {
      open: false,
      musicOn: false,
    };
  },

  methods: {
    /**
     * Toggles menu panel visibility.
     * @returns {void}
     */
    toggleMenu() {
      this.open = !this.open;
    },

    /**
     * Plays or pauses the background soundtrack and syncs the UI state.
     * @returns {void}
     */
    toggleMusic() {
      const audio = document.getElementById("bg-music");
      if (!audio) {
        return;
      }

      if (audio.paused) {
        audio.volume = 0.2;
        audio.loop = true;
        audio.play();
        this.musicOn = true;
      } else {
        audio.pause();
        this.musicOn = false;
      }
    },

    /**
     * Clears the active session and returns the user to the landing page.
     * @returns {void}
     */
    logout() {
      localStorage.removeItem("cf_current_user");
      window.location.href = "index.html";
    }
  },

 template: /*html*/ `
    <div class="menu-wrapper">

      <!-- TOGGLE MENU -->
      <button class="menu-toggle" 
      @click="toggleMenu">
      <img src="./assets/img/user-icon.svg" alt="menu">
      </button>

      <!-- PANEL -->
      <div v-if="open" class="menu-panel">
        <button @click="toggleMusic" class="menu-btn">
        <img :src="musicOn ? './assets/img/soff.png' : './assets/img/son.png'" />
        </button>
        <button @click="logout" class="menu-btn">
          <img src="./assets/img/btn4.png">
        </button>
      </div>

    </div>
  `,
});