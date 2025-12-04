/**
 * Home Cards Component
 *
 * @fileoverview Carousel-like card display used on the home screen. 

 *
 * @component
 * @example
 * <home-cards :images="[{ id: 1, src: '/img/fish1.png', alt: 'Fish', title: 'Blue Fish', content: 'A friendly fish' }]" />
 */
app.component("home-cards", {
  /**
   * Props for the component
   * @typedef {Object} HomeCardImage
   * @property {number|string} id - Unique id for the card
   * @property {string} src - Image source path or URL
   * @property {string} [alt] - Alt text for the image
   * @property {string} [title] - Title shown on the card
   * @property {string} [content] - Description content for the card
   */
  props: {
    /** @type {HomeCardImage[]} images - Array of image/card objects */
    images: { type: Array, required: true },
  },

  /**
   * Component methods 
   * @namespace HomeCardsMethods
   */
  methods: {
  
  },

  template: /*html*/ `

<!-- tarjetas -->
<h2 class="h1SizeHeader" :style="{ textAlign: 'center', color:'white', marginBottom:'200px',marginTop: '-180px'  }">
The fish are counting on you!</h2>
<div class="carousel">
<div class="grupo">
  <div class="card" v-for="img in images" 
  :key="img.id">
    <div class="card-img">
      <img :src="img.src" 
      :alt="img.alt" 
      :title="img.title" />
      
      <h3 class="card-info text-xxl">{{ img.title }}</h3>
      <p>{{ img.content }}</p>
    
    </div>
  </div>
  <!--  grupo duplicado visualmente - 'clone-' + img.id = unique key generator for cloned group -->
      <div aria-hidden class="card" v-for="img in images" :key="'clone-' + img.id">
        <div class="card-img">
          <img :src="img.src" :alt="img.alt" :title="img.title" />
          <h3 class="card-info text-xxl">{{ img.title }}</h3>
          <p class="--fw-regular">{{ img.content }}</p>
        </div>
         </div>
</div>
<!-- tarjetas -->


`,
});
