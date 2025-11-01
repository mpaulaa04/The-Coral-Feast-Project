app.component('market-shop', {
  props: {
    currentStore:   { type:String,  required:true },
    storeItems:     { type:Array,   required:true },
    fishItems:      { type:Array,   required:true },
    showItemPanel:  { type:Boolean, required:true },
    selectedId:     { type:[Number, null], default:null },
    buying:         { type:Boolean, default:false }
  },
  emits: ['open','close','buy'],
  computed:{
    selectedFish(){
      if(!this.showItemPanel) return null;
      return this.fishItems.find(f => f.id === this.selectedId) || null;
    }
  },
  template: `
    <div class="store-container">
      <img v-if="currentStore" :src="currentStore" class="store-image" alt="Tienda"/>

      <img v-for="it in storeItems" :key="it.id" :src="it.img"
           class="store-item" :style="{ left: it.x, top: it.y }"
           alt="Item" @click="$emit('open', it.id)" />

      <div v-if="showItemPanel" class="item-panel" :class="{ purchasing: buying }">
        <img src="./img/btn-x.png" alt="Cerrar" class="panel-close" @click="$emit('close')" />
        <template v-if="selectedFish">
          <img :src="selectedFish.img" :alt="selectedFish.name" class="fish-image" />
          <h3 class="fish-name">{{ selectedFish.name }}</h3>
          <div class="fish-price">
            <img src="./img/moneda.png" alt="Moneda" class="coin-icon" />
            <span>₡{{ selectedFish.price }}</span>
          </div>
          <img src="./img/btnComprar.png" alt="Comprar" class="panel-buy" @click="$emit('buy')" />
        </template>
      </div>
    </div>
  `
});
