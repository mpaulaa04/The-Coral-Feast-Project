/**
 * Overview Component
 *
 * @fileoverview Renders the overview page, including game purpose, context, team members, and technical architecture.
 * @namespace Overview
 * @version 1.0.0
 *
 * @component
 * @example
 * <overview></overview>
 */
app.component('overview', {
  /**
   * No props required for this component
   */
  props: {
  },
  
  /**
   * No methods for this component
   */
  methods: {
  },

  /**
   * Template markup for the overview page UI
   */
 template: /*html*/ `
<section class="overview background-overview space-b-xxl">
  <div class="main-info"> 
    
  <div class="p1" :style="{ textAlign: 'center' }">

      <h2 class="text-xxl color-darkteal">Purpose</h2>
      <p>The Coral Feast is an interactive educational game developed for the TM4100 Interactive Application Development Course. Its core mission is to foster ecological awareness and emotional connection to marine biodiversity in Costa Rica through playful exploration and symbolic storytelling.</p>
    </div>

    <div class="p1" :style="{ textAlign: 'center'}" > 
      <h2 class="text-xxl color-darkteal">Context</h2>
      <p>In The Coral Feast, you play as an aquaculturist responsible for caring for a living pond. Your goal is to raise native Costa Rican species by making smart choices that help them grow and stay healthy. You can choose from different aquaculture options, each with its own traits and needs. As you complete missions like feeding the fish, cleaning the pond, and adjusting water quality, you'll learn how to keep the ecosystem in balance. Every action matters. Taking good care of your pond keeps it healthy, but if you ignore it, your fish may get sick or die.</p>
    </div>

  </div>
</section>


<!-- About us -->
<section class="about-us" id="about-us">
  <h2 class="about-title">About Us</h2>
  <p class="about-intro">
    We are the ones behind Coral Feast, a team of ITM students who have been working hard to develop this web application as part of our 
    Interactive Application Development course. 


<div class="about-wrapper">
  <div class="about-grid">
    <!-- TARJETA ALFREDO-->
    <div class="about-card about-card--1">
      <div class="about-photo">
    
        <img src="./assets/img/alfredo.png" alt="Alfredo Medrano" />
      </div>
      <div class="about-content">
        <h3>Alfredo Medrano</h3>
        <p class="about-description"> Soy estudiante de ITM,  siempre doy lo mejor de mi</p>
         <span>_</span>
 <p class="about-comment"> Mi experiencia fue retadora y enriquecedora , ya que, aprendí a organizar mejor la lógica, depurar errores y entender el flujo de código</p>
        <a class="about-email-btn" href="mailto:mc.alfredome@gmail.com" > Talk to Me </a>
      </div>
    </div>

    <!-- TARJETA PAU -->
    <div class="about-card about-card--2">
      <div class="about-photo">
        <img src="./assets/img/pau.png" alt="Paula Obando 2" />
      </div>
      <div class="about-content">
        <h3>Paula Obando</h3>  
        <p class="about-description">Soy estudiante de ITM, me esfuerzo siempre</p> 
         <span>_</span>
        <p class="about-comment">Trabajar en el proyecto fue una experiencia positiva que amplió mis conocimientos en programación. Espero que quienes lo jueguen puedan disfrutar del resultado </p>

        <a class="about-email-btn" href="mailto:mariapaulaobandosolis@gmail.com"> Talk to Me </a>
      </div>
    </div>

    <!-- TARJETA LAURA -->
    <div class="about-card about-card--3">
      <div class="about-photo">
        <img src="./assets/img/laura.png" alt="Laura Arroyo" />
      </div>
      <div class="about-content">
        <h3>Laura Arroyo</h3>
        <p class="about-description">Soy estudiante de ITM, busco avanzar en lo que pueda</p>
        <span>_</span>
        <p class="about-comment">Ser parte del desarrollo de este proyecto fue una experiencia de provecho para mi desarrollo, ojala puedan verlo varias personas</p>

        <a class="about-email-btn" href="mailto:la.arroyo.rivera@gmail.com" >Talk to Me</a>
        
      </div>
    </div>
  </div>


  </div>    <!-- wrapper end-->

</section>
 



<section class="architecture-info space-b-xxl"> 
  <h2>Technical Architecture</h2>
  
  <div class="tech-container">  
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
      <img class="tech-icon" src="./assets/img/html.png" alt="html icon">
    </a>

    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img class="tech-icon" src="./assets/img/js.png" alt="js icon">
    </a>

    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank">
      <img class="tech-icon" src="./assets/img/css.png" alt="css icon">
    </a>

    <a href="https://vuejs.org/" target="_blank">
      <img class="tech-icon" src="./assets/img/vue.png" alt="vue logo">
    </a>

    <a href="https://laragon.org/" target="_blank">
      <img class="tech-icon" src="./assets/img/laragon.png" alt="laragon logo">
    </a>

    <a href="https://aws.amazon.com/" target="_blank">
      <img class="tech-icon" src="./assets/img/aws.png" alt="aws logo">
    </a>
  </div>
</section>
`,
});
