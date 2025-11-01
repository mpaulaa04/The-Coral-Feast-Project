
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
  <span class="line-top">Start your own</span>
  <span class="line-bottom">Fish farm</span>
</div>


  <a href="signUp.html" class="play-btn">{{play}}</a>


</section>
<!-- hero -->


</header>
<!-- homeheader -->


`,
});