
/**
 * Main Home Vue App
 *
 * @fileoverview Entry point for the home page Vue application. Provides data for the home cards and main title.
 * @namespace HomePage
 * @version 1.0.0
 *
 * @example
 * // This script is loaded in index.html and provides the Vue app context for homeCards and other components.
 * <script src="./js/mainHome.js"></script>
 */
const app = Vue.createApp({


  /**
   * Reactive data for the home page
   * @returns {Object} HomePageData
   * @typedef {Object} HomePageData
   * @property {Array<HomeCard>} images - Array of card data for the home carousel
   * @property {string} title - Main title for the home page
   * @property {string} play - Text for the play button
   *
   * @typedef {Object} HomeCard
   * @property {number} id - Unique identifier for the card
   * @property {string} src - Image source for the card
   * @property {string} title - Title text for the card
   * @property {string} content - Description/content for the card
   * @property {string} alt - Alt text for the card image
   */
  data() {
    return {
      images: [
        { id: 1, src: "./assets/img/peces.png", title: "Nurture Your Fish", content: "Aquatic Species available", alt: "tarjeta de peces" },
        { id: 2, src: "./assets/img/filete.png", title: "Complete Missions", content: "Gather resources", alt: "tarjeta de filete empanizado " },
        { id: 3, src: "./assets/img/tesoro.png", title: "Discover Rewards", content: "Sort inventory", alt: "tarjeta de inventario" },
        { id: 4, src: "./assets/img/tienda.png", title: "Buy and Sell", content: "Trade and grow profits", alt: "tarjeta de tienda" },
        { id: 5, src: "./assets/img/especies.png", title: "Species Unlocked", content: "Marine Life Catalog Expanded", alt: "tarjeta de tienda" },
        { id: 6, src: "./assets/img/oxical.png", title: "Keep Water Quality", content: "Take care of yout pond", alt: "tarjeta de tienda" },
      ],
      title: "START YOUR OWN FISH FARM",
      play: "PLAY",
    };
  },
computed:{

 

},
  

   


});



