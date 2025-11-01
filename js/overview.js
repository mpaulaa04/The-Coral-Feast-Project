app.component('overview', {
  props: {
  },
  
  methods: {
  },

 template: /*html*/ `

<section class="overview">
<div class="content-wrapper"> 
  <div class="content"> 
    <div class="main-info"> 
<div class="p1"> 
 <h2 class="text-xxl" :style="{ textAlign: 'center' }">Purpose</h2>
<p> The Coral Feast is an interactive educational game developed for the TM4100 Interactive Application Development Course. Its core mission is to foster ecological awareness and emotional connection to marine biodiversity in Costa Rica through playful exploration and symbolic storytelling.</p>
</div>

<div class="p1"> 
  <h2 class="text-xxl" :style="{textAlign:'center'}"> Context</h2>
<p>In The Coral Feast, you play as an aquaculturist responsible for caring for a living pond. Your goal is to raise native Costa Rican species by making smart choices that help them grow and stay healthy. You can choose from different aquaculture options, each with its own traits and needs.

As you complete missions like feeding the fish, cleaning the pond, and adjusting water quality, you’ll learn how to keep the ecosystem in balance. Every action matters. Taking good care of your pond keeps it healthy, but if you ignore it, your fish may get sick or die.</p>
</div>

</div>

</div>

</section>

</div>

<section class="architecture-info"> 
 <h2> Technical Architecture</h2>
  <div class="tech-container">  

   <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
  <img class="tech-icon" src="./assets/img/html.png" alt="html icon">
   </a>

 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"target="_blank">
  <img class="tech-icon" src="./assets/img/js.png" alt="js icon">
   </a>

 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"target="_blank">
  <img class="tech-icon" src="./assets/img/css.png" alt="css icon">
   </a>

 <a href="https://vuejs.org/" target="_blank">
  <img class="tech-icon" src="./assets/img/vue.png" alt="vue logo">
   </a>

 <a href="https://laragon.org/"target="_blank">
  <img  class="tech-icon" src="./assets/img/laragon.png" alt="laragon logo">
   </a>

 <a href="https://aws.amazon.com/"target="_blank">
   <img class="tech-icon" src="./assets/img/aws.png" alt="aws logo">
    </a>


</section>

</div>
</div>


`,
});
