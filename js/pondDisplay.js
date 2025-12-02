app.component('pond-display', {
  props: {
    pondInfo: { type: Object, required: false, default: () => ({}) }
  },

  methods: {
    exitPond() {
      this.$emit('close-modal');
    }
  },

  template: /*html*/ `
 <div class="pond-bod">
  <div class="pond-content" data-tutorial-container="pond">
    <div class="pond-title">
      <h1 :style="{ color: 'var(--clr-white)', textAlign: 'center' }"> Cómo funciona el estanque</h1>
    </div>
    <div class="pond-container">
      <div
        class="pond-card pond-card-text"
      >
<div>
  <ul class="pond-list">
    <li>
      <strong>Mercado:</strong>  
      Aquí puedes comprar peces, plantas y otros ítems necesarios para tu estanque. Podrás ver detalles de cada ítem, recibir ofertas y tus monedas disponibles.
    </li>
    <li>
      <strong>Inventario:</strong>  
      Muestra todo lo que has comprado. Desde aquí puedes revisar los ítems, venderlos o marcarlos como favoritos para acceder a ellos rápidamente.
    </li>
    <li>
      <strong>Barra Rápida:</strong>  
      Guarda tus favoritos para colocarlos fácilmente en el estanque sin abrir el inventario.
    </li>
    <li>
      <strong>Estanque:</strong>  
      Es donde siembras peces. Cada tile muestra la vida y el progreso de crecimiento de los peces. Tienes que resolver los problemas que surjan para mantenerlos saludables.
    </li>
    <li>
      <strong>Herramientas:</strong>  
      Incluyen reguladores de pH, oxígeno, temperatura y limpieza del agua para mantener el equilibrio del estanque.
    </li>
    <li>
      <strong>Misiones:</strong>  
      Te recompensan por acciones importantes, como sembrar tu primer pez o mantener el estanque en buen estado.
    </li>
  </ul>
</div>

    </div>
  </div>
  <div class="pond-ok-container">
    <button class="ok-button" @click="exitPond">OK!</button>
  </div>
</div>
`,
});
