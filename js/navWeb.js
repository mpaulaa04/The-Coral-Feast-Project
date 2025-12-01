app.component('nav-web', {
  props: {
  },
  emits: [''],
  methods: {
  },

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
    <li><a class="text-xl" href="aboutUs.html">About Us</a></li>
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
