/**
 * HomeHeader Component
 *
 * @fileoverview Landing page header that presents the hero message and primary call-to-action.
 *
 * @component
 * @example
 * <header-web :play="'Play Now'"></header-web>
 */
app.component('header-web', {
  /**
   * Component props - Data received from parent component
   * @typedef {Object} HomeHeaderProps
   * @property {string} play - Label for the hero call-to-action button
   */
  props: {
    /** @type {string} Hero call-to-action label */
    play: { type: String, required: true },
  },

  /**
   * Component methods exposed to the template
   * @namespace HomeHeaderMethods
   */
  methods: {

  },

  /**
   * Template markup for the landing header UI
   */
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
  <a href="login.html" class="play-btn black">{{play}}</a>
</div>

</section>
<!-- hero -->


</header>
<!-- homeheader -->


`,
});