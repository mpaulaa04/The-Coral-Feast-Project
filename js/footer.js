app.component('footer', {
  props: {
    { type: Array, required: true },
  },

  emits: [],

  methods: {
   
  },

 template: /*html*/ `
<!-- footer -->
    <footer>
      <div class="links-img"> 
  <a href="https://www.figma.com/design/7Dz37QcT9BEoxmRcJHDrtY/Huerta-Marina--TCF-?node-id=0-1&t=zF7Q3Ahx8B7h8NL8-1">
    <img src="./img/figma.png" alt="Figma link">
  </a>

  <a href="https://github.com/mpaulaa04/The-Coral-Feast-Project.git">
    <img src="./img/github.png" alt="GitHub link">
  </a>
 </div>

  <div class="end">   
    <img class="img-logo"  src="./img/logo.png" alt="coral feast logo">
  <p>© 2025 Coral Feast Project</p>
</div>

</footer>
<!-- footer -->

`,
});
