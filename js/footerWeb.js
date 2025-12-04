/**
 * Footer Component 
 *
 * @fileoverview Reusable Vue.js component that renders the global footer section
 * used across the Coral Feast web application. Contains brand logo, copyright
 * information, and external links to GitHub and Figma project resources.
 *
 * @namespace FooterWeb
 * @version 1.0.0
 *
 * @example
 * <!-- Use in HTML -->
 * <footer-web></footer-web>
 *
 * @example
 * // Registers the component globally
 * app.component('footer-web', {...});
 */

app.component('footer-web', {

  /**
   * Component Template - Footer Markup
   *
   * @memberof FooterWeb
   * @description Contains the full HTML structure for the website footer,
   * including external project links and brand identity elements.
   *
   * @returns {string} HTML template string
   */

 template: /*html*/ `
<!-- footer -->
    <footer class="bg-footer footer-info">
    

    <!-- External Resource Links (Figma & GitHub) -->
      <div class="links-img  "> 
  <a href="https://www.figma.com/design/7Dz37QcT9BEoxmRcJHDrtY/Huerta-Marina--TCF-?node-id=0-1&t=zF7Q3Ahx8B7h8NL8-1">
    <img src="./assets/img/figma.png" alt="Figma link">
  </a>

  <a href="https://github.com/mpaulaa04/The-Coral-Feast-Project.git">
    <img src="./assets/img/github.png" alt="GitHub link">
  </a>
 </div>

<!-- Branding + Copyright -->
  <div class="end">   
   <a href="index.html">
    <img class="img-logo"  src="./assets/img/logo.png" alt="coral feast logo">
      </a>

    <!-- Brand copyright -->
  <p :style="{ fontFamily: 'LexendDeca' }">© 2025 Coral Feast Project</p>
</div>


</footer>
<!-- footer -->

`,
});
