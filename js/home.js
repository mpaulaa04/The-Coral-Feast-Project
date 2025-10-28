const app = Vue.createApp({

  data() {
    return {
      images: [
        { id: 1, src: "./img/peces.png", title: "Nurture Your Fish", content: "Aquatic Species available", alt: "tarjeta de peces" },
        { id: 2, src: "./img/filete.png", title: "Complete Missions", content: "Gather resources", alt: "tarjeta de filete empanizado " },
        { id: 3, src: "./img/tesoro.png", title: "Discover Rewards", content: "Sort inventory", alt: "tarjeta de inventario" },
        { id: 4, src: "./img/tienda.png", title: "Buy and Sell", content: "Trade and grow profits", alt: "tarjeta de tienda" },
        // { id: 5, src: "./img/especies.png", title: "Species Unlocked", content: "Marine Life Catalog Expanded", alt: "tarjeta de tienda" },
        // { id: 6, src: "./img/oxical.png", title: "Keep Water Quality", content: "Take care of yout pond", alt: "tarjeta de tienda" }
      ],

      title: "START YOUR OWN FISH FARM",
      play: "PLAY",
      showMenu: false,
      openGame:false,
      logged:false,
    };
  },

  methods: {
   
  /**openToggleMenu: opens the toggle menu */
   toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  /**openPlayIf: if an user has an open account, it starts the game, if not, it opens the signup or login forms*/
    openPlayIf(){
      // if user=logged{open my game}
      // if user !logged {create new user or log in}
    },

    /**closeSession:closes actual session*/
closeSession(){
// if user===logged{
//   buscar metodologia para salir
// }
},
   

  }



});



