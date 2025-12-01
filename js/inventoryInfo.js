app.component('inventory-info', {
  props: {
    show: { type: Boolean, default: false },
    img:  { type: String,  default: null },
    item: { type: Object,  default: null } // { name, price, img, catId }
  },
  emits: ['close'],

  computed: {
    panelKindClass() {
      const kind = this.dataCard.kind;
      return {
        'kind-fish':    kind === 'fish',
        'kind-plant':   kind === 'plant',
        'kind-element': kind === 'element',
        'kind-generic': kind === 'generic'
      };
    },

    dataCard() {
      // 1) Si viene metadato del market, úsalo
      if (this.item) {
        const base = {
          name:  this.item.name || 'ITEM',
          price: this.item.price ?? '—',
          img:   this.item.img || this.img || null
        };
        const kind = (this.item.catId === 1) ? 'fish'
                   : (this.item.catId === 2) ? 'plant'
                   : (this.item.catId === 3) ? 'element'
                   : 'generic';

        if (kind === 'fish') {
          const key = (this.item.name || '').toLowerCase();
          if (key.includes('trucha'))  return { ...base, kind, latin:'(Oncorhynchus mykiss)', desc:'Pez de agua dulce originario de América del Norte.', oxy:'6.0–9.0 mg/L', ph:'6.5–8.0', feed:'Larvas 2–3 veces/día' };
          if (key.includes('tilapia')) return { ...base, kind, latin:'(Oreochromis aureus)', desc:'Especie resistente y de rápido crecimiento.',       oxy:'5.5–8.0 mg/L', ph:'6.0–8.5', feed:'Pellets/larvas 2/día' };
          if (key.includes('pargo'))   return { ...base, kind, latin:'(Lutjanus sp.)',        desc:'Pez marino de cuerpo alargado y comprimido.',     oxy:'4.0–5.8 mg/L', ph:'6.5–8.5', feed:'Larvas ≤2/día' };
          return { ...base, kind, latin:'', desc:'', oxy:'—', ph:'—', feed:'—' };
        }

        if (kind === 'plant') {
          const key = (this.item.name || '').toLowerCase();
          if (key.includes('elodea')) return { ...base, kind, desc:'Planta oxigenadora de crecimiento rápido.', light:'Medio',      substrate:'No estricto / enraiza fácil', growth:'Rápido' };
          if (key.includes('anubias'))return { ...base, kind, desc:'Rizomatosa resistente, ideal para principiantes.', light:'Bajo–Medio', substrate:'Fijar a troncos/rocas',      growth:'Lento'  };
          if (key.includes('musgo') || key.includes('java'))
                                     return { ...base, kind, desc:'Epífita, gran refugio para alevines.',       light:'Bajo',       substrate:'No requiere',                 growth:'Medio'  };
          return { ...base, kind, desc:'', light:'—', substrate:'—', growth:'—' };
        }

        if (kind === 'element') {
          const key = (this.item.name || '').toLowerCase();
          if (key.includes('roca'))   return { ...base, kind, desc:'Decoración para refugio y estética.', type:'Decoración', effect:'Refugio / reduce estrés', durability:'Alta'  };
          if (key.includes('filtro')) return { ...base, kind, desc:'Equipo básico para limpieza y circulación.', type:'Equipo', effect:'Filtrado ~200 L/h',     durability:'Media' };
          if (key.includes('red'))    return { ...base, kind, desc:'Herramienta para manejo de peces.',        type:'Herramienta', effect:'Captura selectiva', durability:'Media' };
          return { ...base, kind, desc:'', type:'—', effect:'—', durability:'—' };
        }

        return { ...base, kind:'generic', desc:'' };
      }

      // 2) Fallback por nombre de archivo (cuando el inventario solo guarda la ruta de imagen)
      const key = (this.img || '').toLowerCase();

      // Peces
      if (key.includes('pescado1')) return { name:'TRUCHA ARCOIRIS', price:'—', img:this.img, kind:'fish',   latin:'(Oncorhynchus mykiss)', desc:'Pez de agua dulce originario de América del Norte.', oxy:'6.0–9.0 mg/L', ph:'6.5–8.0', feed:'Larvas 2–3 veces/día' };
      if (key.includes('pescado2')) return { name:'TILAPIA AZUL',    price:'—', img:this.img, kind:'fish',   latin:'(Oreochromis aureus)',  desc:'Especie resistente y de rápido crecimiento.',       oxy:'5.5–8.0 mg/L', ph:'6.0–8.5', feed:'Pellets/larvas 2/día' };
      if (key.includes('pescado3')) return { name:'PEZ PARGO',       price:'—', img:this.img, kind:'fish',   latin:'(Lutjanus sp.)',        desc:'Pez marino de cuerpo alargado y comprimido.',     oxy:'4.0–5.8 mg/L', ph:'6.5–8.5', feed:'Larvas ≤2/día' };

      // Plantas
      if (key.includes('planta1'))  return { name:'Elodea',          price:'—', img:this.img, kind:'plant',  desc:'Planta oxigenadora de crecimiento rápido.', light:'Medio',      substrate:'No estricto / enraiza fácil', growth:'Rápido' };
      if (key.includes('planta2'))  return { name:'Anubias',         price:'—', img:this.img, kind:'plant',  desc:'Rizomatosa resistente, ideal para principiantes.', light:'Bajo–Medio', substrate:'Fijar a troncos/rocas',      growth:'Lento'  };
      if (key.includes('planta3'))  return { name:'Musgo Java',      price:'—', img:this.img, kind:'plant',  desc:'Epífita, gran refugio para alevines.',       light:'Bajo',       substrate:'No requiere',                 growth:'Medio'  };

      // Elementos
      if (key.includes('estanque1'))return { name:'Roca decorativa', price:'—', img:this.img, kind:'element',desc:'Decoración para refugio y estética.', type:'Decoración', effect:'Refugio / reduce estrés', durability:'Alta'  };
      if (key.includes('estanque2'))return { name:'Kit de herramientas',   price:'—', img:this.img, kind:'element',desc:'Recarga herramientas de regulación.',    type:'Kit',     effect:'Recarga tools x2',     durability:'Consumible' };
      if (key.includes('estanque3'))return { name:'Red pequeña',     price:'—', img:this.img, kind:'element',desc:'Herramienta para manejo de peces.',     type:'Herramienta',effect:'Captura selectiva',      durability:'Media' };

      // Genérico
      return { name:'ITEM', price:'—', img:this.img, kind:'generic',
        desc:'', latin:'', oxy:'—', ph:'—', feed:'—',
        light:'—', substrate:'—', growth:'—', type:'—', effect:'—', durability:'—'
      };
    }
  },

  template: /*html*/`
  <transition name="fade">
    <div v-if="show" class="invinfo-panel" :class="panelKindClass">
      <div class="invinfo-close" @click="$emit('close')">
        <img src="./assets/img/btn-x.png" alt="Cerrar" draggable="false" />
      </div>

      <div class="invinfo-content">
        <div class="invinfo-grid">
          <div class="info-left">
            <img class="invinfo-fish" :src="dataCard.img || img" :alt="dataCard.name"/>
            <div class="title">{{ dataCard.name }}</div>
            <div class="latin" v-if="dataCard.latin"><em>{{ dataCard.latin }}</em></div>
            <div class="desc" v-if="dataCard.desc">{{ dataCard.desc }}</div>
          </div>

          <div class="info-divider"></div>

          <div class="info-right">
            <div class="info-subtitle">DETALLES</div>

            <template v-if="dataCard.kind === 'fish'">
              <div class="info-row"><span class="label">Oxígeno:</span> {{ dataCard.oxy }}</div>
              <div class="info-row"><span class="label">pH:</span> {{ dataCard.ph }}</div>
              <div class="info-row"><span class="label">Alimentación:</span> {{ dataCard.feed }}</div>
            </template>

            <template v-else-if="dataCard.kind === 'plant'">
              <div class="info-row"><span class="label">Luz:</span> {{ dataCard.light }}</div>
              <div class="info-row"><span class="label">Sustrato:</span> {{ dataCard.substrate }}</div>
              <div class="info-row"><span class="label">Crecimiento:</span> {{ dataCard.growth }}</div>
            </template>

            <template v-else-if="dataCard.kind === 'element'">
              <div class="info-row"><span class="label">Tipo:</span> {{ dataCard.type }}</div>
              <div class="info-row"><span class="label">Efecto:</span> {{ dataCard.effect }}</div>
              <div class="info-row"><span class="label">Durabilidad:</span> {{ dataCard.durability }}</div>
            </template>

            <div class="info-row">
              <span class="label">Precio de compra:</span> ₡{{ dataCard.price }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  `
});
