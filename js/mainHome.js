const app = Vue.createApp({

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
      startIndex: 0,
      showMenu: false,
      openGame:false,
      logged:false,
    };
  },
computed:{

  visibleCards() {
    // toma 4 imagenes desde la posicion startIndex/por ejemplo, si startIndex es 2, agarra las posiciones 2, 3, 4 y 5
    let visible = this.images.slice(this.startIndex, this.startIndex + 4);
    // si no se lograron agarrar 4 (porque ya se llegó al final del arreglo), se completan las que faltan desde el principio por 
    // ejemplo, si solo se agarraron 2, se buscan 2 más desde el inicio (slice(0, 2))
    if (visible.length < 4) {
      visible = visible.concat(this.images.slice(0, 4 - visible.length));
    }
    return visible;
  }

},
  


  mounted() {
    setInterval(() => {
      this.startIndex++;
    }, 4000);
  }
   


});



