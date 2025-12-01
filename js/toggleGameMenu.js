app.component("game-menu", {
  data() {
    return {
      open: false,
      musicOn: false,
    };
  },

  methods: {
    toggleMenu() {
      this.open = !this.open;
    },

 toggleMusic() {
  const audio = document.getElementById("bg-music");
  if (!audio) return;

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

    logout() {
      // borrar usuario del localStorage
      localStorage.removeItem("cf_current_user");
      // redirigir
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