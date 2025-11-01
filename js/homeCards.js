
app.component('home-cards', {
  props: {
    images: { type: Array, required: true },
  },

  methods: {
  
  },

 template: /*html*/ `

<!-- tarjetas -->
<div class="card-container">
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
</div>
<!-- tarjetas -->


`,
});

