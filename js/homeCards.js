
app.component('home-cards', {
  props: {
    images: { type: Array, required: true },
  },


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
  <!--  grupo duplicado visualmente -'clone-' + img.id"= generador de clave unica para el nuevo grupo dando un identificador unico a cada card-->
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

