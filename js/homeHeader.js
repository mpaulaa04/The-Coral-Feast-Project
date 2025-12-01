
app.component('header-web', {
  props: {
      play: { type: String, required: true },   
  },

  methods: {
  
  },

 template: /*html*/ `

<!-- homeheader -->
<header class="header-b">
  



<!-- hero -->
<section class="hero">
 
 <div class="hero-message">
    <h1 class="hero-title space-b-xs black text-giant">Start your own
    <span>Fish farm</span></h1>
      

</div>

<!-- AQUI para cambiar espaciado: boton play -->
 <div class="space-b-xl">
  <a href="lobby.html" class="play-btn black">{{play}}</a>
</div>

</section>
<!-- hero -->


</header>
<!-- homeheader -->


`,
});