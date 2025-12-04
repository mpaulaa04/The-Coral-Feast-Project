/**
 * NavWeb Component
 *
 * @fileoverview Renders the main navigation bar for the Coral Feast Project, including logo, navigation links, and sign up button.
 * @namespace NavWeb
 * @version 1.0.0
 *
 * @component
 * @example
 * <nav-web></nav-web>
 */
app.component('nav-web', {
  /**
   * No props required for this component
   */
  props: {
  },
  /**
   * No events emitted by this component
   */
  emits: [''],
  /**
   * No methods for this component
   */
  methods: {
  },

  /**
   * Template markup for the navigation bar UI
   */
 template: /*html*/ `
<!-- nav -->
 <nav class="primary-navigation header-nav">
  <!-- Logo -->
  <div class="logo">
    <a href="index.html">
      <img src="./assets/img/logo.png" alt="coral feast logo">
    </a>
  </div>

  <!-- Enlaces -->
  <ul class="nav-links medium">
    <li><a class="text-xl" href="index.html">Home</a></li>
    <li><a class="text-xl" href="overview.html">Overview</a></li>
   <!-- <li><a class="text-xl" href="aboutUs.html">About Us</a></li>-->
    <li><a class="text-xl" href="stats.html">Stats</a></li>
  </ul>

  <!-- Acceso + toggle -->
  <div >
    <a href="signUp.html" class="sign-button text-xl">Sign Up</a>
  </div>
</nav>

<!-- nav -->


`,
});
