const app = Vue.createApp({

  data() {
    return {
     modal: {
        open: false,
        type: null
      },
      openerEl: null,

       inventory: {
        profileImg: './assets/img/perfil.png',
        buttons: [
          { id: 1, name: 'Huevos', img: 'btn1' },
          { id: 2, name: 'Plantas', img: 'btn2' },
          { id: 3, name: 'Estanque', img: 'btn2' },
          { id: 4, name: 'Regresar', img: 'btn4' }
        ],

        selectedButton: 1,
        maxSlot: 5,
        slots: [
          { id: 1, img: null, count: 0, fav: false },
          { id: 2, img: null, count: 0, fav: false },
          { id: 3, img: null, count: 0, fav: false },
          { id: 4, img: null, count: 0, fav: false },
          { id: 5, img: null, count: 0, fav: false },
          { id: 6, img: null, count: 0, fav: false },
          { id: 7, img: null, count: 0, fav: false },
          { id: 8, img: null, count: 0, fav: false },
          { id: 9, img: null, count: 0, fav: false },
          { id: 10, img: null, count: 0, fav: false },
          { id: 11, img: null, count: 0, fav: false },
          { id: 12, img: null, count: 0, fav: false }
        ],
        selectedSlotId: null,
        actionButtons: [
          { id: 'sell', label: 'VENDER', color1: '#91FF5E', color2: '#5EB934' },
          { id: 'fav', label: 'FAVS', color1: '#E262F5', color2: '#AC2CC3' }
        ],
        inventoryInfoOpen: false,
        selectedSlotImg: null
      },
  
      market: {
        money: '999',
        buying: false,
        currentStore: './assets/img/tienda1.png',
        selectedButton: 1,

        variantButtons: [
          { id: 1, name: 'Huevos', img: 'btn1', store: 'tienda1' },
          { id: 2, name: 'Plantas', img: 'btn2', store: 'tienda2' },
          { id: 3, name: 'Estanque', img: 'btn2', store: 'tienda3' },
          { id: 4, name: 'Regresar', img: 'btn4', store: null }
        ],

        storeItems: [
          { id: 1, img: './assets/img/item.png', x: '62%', y: '40%' },
          { id: 2, img: './assets/img/item.png', x: '75%', y: '40%' },
          { id: 3, img: './assets/img/item.png', x: '89%', y: '40%' }
        ],

        fishItems: [
          { id: 1, name: 'Trucha Arcoiris', img: './assets/img/pescado1.png', price: 99 },
          { id: 2, name: 'Tilapia Azul', img: './assets/img/pescado2.png', price: 150 },
          { id: 3, name: 'Pez Pargo', img: './assets/img/pescado3.png', price: 200 }
        ],

        showItemPanel: false,
        selectedItemId: null,
      },


    
missions:[
     { id: 1,description:'Cultiva tu primer pez',completed:true ,reward:25, claimed:false, rewardImg: './assets/img/recompenza.png' },
     { id: 2,description:'Compra una nueva especie de pez',completed:true ,reward:50, claimed:false,rewardImg: './assets/img/recompenza.png' },
     { id: 3,description:'Limpia tu estanque',completed:false ,reward:100, claimed:false,rewardImg: './assets/img/recompenza.png' },
     { id: 4,description:'vende tu primer ejemplar',completed:false ,reward:100, claimed:false,rewardImg: './assets/img/recompenza.png' },
    //{ id: 20,description:'Cultiva 10 langostinos arcoiris ',completed:false ,reward:1000, claimed:false,rewardImg: './img/recompenza.png' }, 
],
missionMoney:0,

      market: {
        money: '150',
        currentStore: './assets/img/tienda1.png',
        selectedButton: 1,

        variantButtons: [
          { id: 1, name: 'Huevos', img: 'btn1', store: 'tienda1' },
          { id: 2, name: 'Plantas', img: 'btn2', store: 'tienda2' },
          { id: 3, name: 'Estanque', img: 'btn2', store: 'tienda3' },
          { id: 4, name: 'Regresar', img: 'btn4', store: null }
        ],

        storeItems: [
          { id: 1, img: './assets/img/item.png', x: '62%', y: '40%' },
          { id: 2, img: './assets/img/item.png', x: '75%', y: '40%' },
          { id: 3, img: './assets/img/item.png', x: '89%', y: '40%' }
        ],

        fishItems: [
          { id: 1, name: 'Trucha Arcoiris', img: './assets/img/pescado1.png', price: 99 },
          { id: 2, name: 'Tilapia Azul', img: './assets/img/pescado2.png', price: 150 },
          { id: 3, name: 'Pez Pargo', img: './assets/img/pescado3.png', price: 200 }
        ],

        showItemPanel: false,
        selectedItemId: null,
      },

     images: [
        { id: 1, src: "./assets/img/peces.png", title: "Aquatic Species", content: "Nurture Your Fish", alt: "tarjeta de peces" },
        { id: 2, src: "./assets/img/filete.png", title: "Complete Missions", content: "Gather resources", alt: "tarjeta de filete empanizado " },
        { id: 3, src: "./assets/img/tesoro.png", title: "Discover Rewards", content: "Sort inventory", alt: "tarjeta de inventario" },
        { id: 4, src: "./assets/img/tienda.png", title: "Buy and Sell", content: "Trade and grow profits", alt: "tarjeta de tienda" }
      ],

      filas: 4,
      columnas: 6,
      grabbedTile: null,
      status: [
        { class: 'status0', image: '' }, //vacío
        { class: 'status1', image: './assets/img/huevo.svg' },
        { class: 'status2', image: './assets/img/pez.svg' },
        { class: 'status3', image: './assets/img/pez.svg' },
        { class: 'status4', image: './assets/img/pez.svg' }
      ],
      tiles: Array(24).fill(0)

    };
  },

  computed: {

    marketSelectedFish() {

      if (!this.market.showItemPanel) {
        return null;
      }

      const selectedFish = this.market.fishItems.find(function (fish) {
        return fish.id === this.market.selectedItemId;
      }, this);

      return selectedFish || this.market.fishItems[0];
    },
  },

  methods: {
    openModal(type) {
      if (this.modal.open) {
        return;
      }

      this.modal = { open: true, type: type };
      this.openerEl = document.activeElement;
    },

    closeModal() {
      if (!this.modal.open) {
        return;
      }


      this.modal = { open: false, type: null };
    },
    onInventoryButtonClick(button) {
      if (button.id === 4) {
        this.closeModal();
        return;
      }
      this.inventory.selectedButton = button.id;

    },
    onMarketCategoryClick(button) {
      this.market.selectedButton = button.id;
      if (button.store) {
        this.market.currentStore = `./assets/assets/img/${button.store}.png`;
      } else {

        this.onCloseMarketModal();
      }
    },

    onMarketOpenItem(id) {
      this.market.selectedItemId = id;
      this.market.showItemPanel = true;
    },

    onMarketCloseItem() {
      this.market.showItemPanel = false;
      this.market.selectedItemId = null;
    },


    onCloseMarketModal() {
      this.closeModal();
    },


  changeStatus(index) {
      this.tiles[index] = (this.tiles[index] + 1) % this.status.length;
    },
    obtainClass(index) {
      return this.status[this.tiles[index]].class;
    },
    obtainImage(index) {
      return this.status[this.tiles[index]].image;
    },
    initManualGrab(indexStatus) {
      this.grabbedTile = indexStatus;
    },
    dropIn(index) {
      if (this.grabbedTile !== null) {
        /**places egg*/
        this.tiles[index] = 1; //status1=egg

        /**after 5 minutes t changes the creature status*/
        const finalStatus = this.grabbedTile;
        setTimeout(() => {
          this.tiles[index] = finalStatus;
        }, 5000);
      }
    },
    onMarketBuy(fish) {
      if (!fish) return;

      const price = Number(fish.price) || 0;
      if (Number(this.market.money) < price) {
        alert("No tienes suficiente dinero");
        return;
      }

      this.market.buying = true;

      setTimeout(() => {
        this.market.money = Number(this.market.money) - price;

        const ok = this.addToInventory(fish);
        if (!ok) {
          alert("Inventario lleno");
        }
        this.market.buying = false;
        this.onMarketCloseItem();
      }, 300);
    },

    addToInventory(item) {
      const MAX = this.inventory.maxSlot;      
      const img = item.img;                   
      
      for (let i = 0; i < this.inventory.slots.length; i++) {
        const slot = this.inventory.slots[i];
        if (slot.img === img && slot.count < MAX) {
          slot.count++;
          return true;
        }
      }

      for (let i = 0; i < this.inventory.slots.length; i++) {
        const slot = this.inventory.slots[i];
        if (!slot.img) {
          slot.img = img;
          slot.count = 1;
          return true;
        }
      }

      return false;
    },

    onSlotSelect(id) {
  
      this.$emit('select-item', id);

      const slot = this.slots.find(s => s.id === id);
      if (slot && slot.img) {
        this.selectedSlotImg = slot.img;
        this.inventoryInfoOpen = true;
      }
    },

    onInventoryAction(actionId) {
      if (actionId === 'sell') this.sellSelectedItem();
      if (actionId === 'fav') this.toggleFavoriteSelected();
    },

    sellSelectedItem() {
      const selId = this.inventory.selectedSlotId;
      if (!selId) { alert('Selecciona un slot primero.'); return; }

      const slot = this.inventory.slots.find(s => s.id === selId);
      if (!slot || !slot.img) { alert('Ese slot está vacío.'); return; }

      const fish = this.market.fishItems.find(f => f.img === slot.img);
      const price = fish ? Number(fish.price) : 0;

  
      this.market.money = String((Number(this.market.money) || 0) + price);


      if (slot.count > 1) {
        slot.count -= 1;
      } else {
        slot.img = null;
        slot.count = 0;
        slot.fav = false;
      }

 
      this.compactInventory();
      this.reorderFavorites();

      const inv = this.$refs.invDisplay;
      if (inv && typeof inv.closeInfo === 'function') inv.closeInfo();
    },

    compactInventory() {
      const packed = this.inventory.slots
        .filter(s => s.img)
        .map(s => ({ img: s.img, count: s.count, fav: !!s.fav }));

      this.inventory.slots.forEach(s => { s.img = null; s.count = 0; s.fav = false; });
      packed.forEach((it, i) => {
        const s = this.inventory.slots[i];
        s.img = it.img;
        s.count = it.count;
        s.fav = it.fav;
      });

      const firstFilled = this.inventory.slots.find(s => s.img);
      this.inventory.selectedSlotId = firstFilled ? firstFilled.id : null;
    },
    toggleFavoriteSelected() {
      const selId = this.inventory.selectedSlotId;
      if (!selId) { alert('Selecciona un slot.'); return; }

      const slot = this.inventory.slots.find(s => s.id === selId);
      if (!slot || !slot.img) { alert('Ese slot está vacío.'); return; }

      if (!slot.fav) {

        const favCount = this.inventory.slots.filter(s => s.fav && s.img).length;
        if (favCount >= 3) { alert('Máximo 3 favoritos.'); return; }
        slot.fav = true;
      } else {
        slot.fav = false;
      }

      this.reorderFavorites();
    },

    reorderFavorites() {

      const items = this.inventory.slots
        .filter(s => s.img)
        .map(s => ({ img: s.img, count: s.count, fav: !!s.fav }));


      const favs = items.filter(i => i.fav);
      const normals = items.filter(i => !i.fav);
      const packed = [...favs, ...normals];

  
      this.inventory.slots.forEach(s => { s.img = null; s.count = 0; s.fav = false; });
      packed.forEach((it, i) => {
        const s = this.inventory.slots[i];
        s.img = it.img;
        s.count = it.count;
        s.fav = it.fav;
      });

      const firstFilled = this.inventory.slots.find(s => s.img);
      this.inventory.selectedSlotId = firstFilled ? firstFilled.id : null;
    },


    claimReward(missionIndex) {
       const mission = this.missions[missionIndex]; 
      
      if (!mission.completed) {
        return;
      }

      if (mission.claimed) {
         return;
      }
      this.market.money = parseInt(this.market.money) + 
      mission.reward;
  
      this.missionMoney += mission.reward;

mission.claimed = true;

  }


  }
});



