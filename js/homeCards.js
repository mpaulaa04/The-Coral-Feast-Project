
app.component('home-cards', {
  props: {
    images: { type: Array, required: true },
  },


  methods: {
  
  },

 template: /*html*/ `

<!-- tarjetas -->
<div class="carousel">
<div class="grupo">
  <div class="card" v-for="img in images" 
  :key="img.id">
    <div class="card-img">
      <img :src="img.src" 
      :alt="img.alt" 
      :title="img.title" />
      <h2>{{ img.title }}</h2>
      <p class="--fw-regular">{{ img.content }}</p>
    </div>
  </div>
  <!--  grupo duplicado visualmente -'clone-' + img.id"= generador de clave unica para el nuevo grupo dando un identificador unico a cada card-->
      <div aria-hidden class="card" v-for="img in images" :key="'clone-' + img.id">
        <div class="card-img">
          <img :src="img.src" :alt="img.alt" :title="img.title" />
          <h2>{{ img.title }}</h2>
          <p class="--fw-regular">{{ img.content }}</p>
        </div>
         </div>
</div>
<!-- tarjetas -->


`,
});

