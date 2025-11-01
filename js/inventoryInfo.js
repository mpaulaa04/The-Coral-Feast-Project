app.component('inventory-info', {
  props: {
    show: { type: Boolean, default: false },
    img:  { type: String,  default: null }   
  },
  emits: ['close'],

  computed:{
    fishData(){
    
      const key = (this.img || '').toLowerCase();
      if (key.includes('pescado1')) {
        return {
          name: 'TRUCHA ARCOIRIS',
          latin: '(Oncorhynchus mykiss)',
          desc: 'Pez de agua dulce originario de América del Norte.',
          oxy: 'Mantener rangos entre los 6,0 mg/L y 9,0 mg/L.',
          ph:  'Mantener rangos entre los ~ 6,5 y 8,0.',
          feed:'Larvas. Suministrar alimento 2 a 3 veces al día.'
        };
      }
      if (key.includes('pescado2')) {
        return {
          name: 'TILAPIA AZUL',
          latin: '(Oreochromis aureus)',
          desc: 'Especie resistente y de rápido crecimiento.',
          oxy: 'Rangos recomendados 5,5–8,0 mg/L.',
          ph:  'Apropiado entre ~ 6,0 y 8,5.',
          feed:'Pellets/larvas. 2 veces al día.'
        };
      }
      if (key.includes('pescado3')) {
        return {
          name: 'PEZ PARGO',
          latin: '(Lutjanus sp.)',
          desc: 'Pez marino de cuerpo alargado y comprimido.',
          oxy: 'Rangos sugeridos 4,0–5,8 mg/L.',
          ph:  'Apropiado entre ~ 6,5 y 8,5.',
          feed:'Larvas. No más de dos veces al día.'
        };
      }

      return {
        name: 'INFORMACIÓN DEL PEZ',
        latin: '',
        desc: '(placeholder por ahora)',
        oxy: '—',
        ph:  '—',
        feed:'—'
      };
    }
  },

  template: /*html*/`
  <transition name="fade">
    <div v-if="show" class="invinfo-panel">
      <!-- Botón de cerrar -->
      <div class="invinfo-close" @click="$emit('close')">
        <img src="../assets/img/btn-x.png" alt="Cerrar" draggable="false" />
      </div>

      <!-- Contenido interno -->
      <div class="invinfo-content">
        <div class="invinfo-grid">
          <!-- Izquierda -->
          <div class="info-left">
            <img class="fish invinfo-fish" :src="img" alt="pez"/>
            <div class="title">{{ fishData.name }}</div>
            <div class="latin">
              <em>{{ fishData.latin }}</em> {{ fishData.desc }}
            </div>
          </div>

          <!-- Divisor -->
          <div class="info-divider"></div>

          <!-- Derecha -->
          <div class="info-right">
            <div class="info-subtitle">CONDICIONES DE VIDA</div>

            <div class="info-row">
              <span class="label">Oxígeno del estanque:</span>
              {{ fishData.oxy }}
            </div>

            <div class="info-row">
              <span class="label">pH del estanque:</span>
              {{ fishData.ph }}
            </div>

            <div class="info-row">
              <span class="label">Alimentación:</span>
              {{ fishData.feed }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
`
});
