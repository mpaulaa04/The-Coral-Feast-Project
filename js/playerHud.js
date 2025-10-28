const app = Vue.createApp({

  data() {
    return {
      modal: {
        open: false,
        type: null
      },
      openerEl: null,

      inventory: {
        profileImg: './img/perfil.png',
        buttons: [
          { id: 1, name: 'Huevos', img: 'btn1' },
          { id: 2, name: 'Plantas', img: 'btn2' },
          { id: 3, name: 'Estanque', img: 'btn2' },
          { id: 4, name: 'Regresar', img: 'btn4' }
        ],
        selectedButton: 1

      },

missions:{
    
missions:[
     { id: 1,description:'Cultiva tu primer pez',
      completed:true ,
      reward:25, 
      claimed:false,
      rewardImg: './img/recompenza.png' },
     { id: 2,description:'Compra una nueva especie de pez',completed:true ,reward:50, claimed:false,rewardImg: './img/recompenza.png' },
     { id: 3,description:'Limpia tu estanque',completed:false ,reward:100, claimed:false,rewardImg: './img/recompenza.png' },
     { id: 4,description:'vende tu primer ejemplar',completed:false ,reward:100, claimed:false,rewardImg: './img/recompenza.png' },
    //{ id: 20,description:'Cultiva 10 langostinos arcoiris ',completed:false ,reward:1000, claimed:false,rewardImg: './img/recompenza.png' },
     
],
missionMoney:0,

},
      market: {
        money: '999',
        currentStore: './img/tienda1.png',
        selectedButton: 1,

        variantButtons: [
          { id: 1, name: 'Huevos', img: 'btn1', store: 'tienda1' },
          { id: 2, name: 'Plantas', img: 'btn2', store: 'tienda2' },
          { id: 3, name: 'Estanque', img: 'btn2', store: 'tienda3' },
          { id: 4, name: 'Regresar', img: 'btn4', store: null }
        ],

        storeItems: [
          { id: 1, img: './img/item.png', x: '62%', y: '40%' },
          { id: 2, img: './img/item.png', x: '75%', y: '40%' },
          { id: 3, img: './img/item.png', x: '89%', y: '40%' }
        ],

        fishItems: [
          { id: 1, name: 'Trucha Arcoiris', img: './img/pescado1.png', price: 99 },
          { id: 2, name: 'Tilapia Azul', img: './img/pescado2.png', price: 150 },
          { id: 3, name: 'Pez Pargo', img: './img/pescado3.png', price: 200 }
        ],

        showItemPanel: false,
        selectedItemId: null,
      },
     

      filas: 4,
      columnas: 6,
      grabbedTile: null,
      status: [
        { class: 'status0', image: '' }, //vacío
        { class: 'status1', image: './img/huevo.svg' },
        { class: 'status2', image: './img/pez.svg' },
        { class: 'status3', image: './img/pez.svg' },
        { class: 'status4', image: './img/pez.svg' }
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
        this.market.currentStore = `./img/${button.store}.png`;
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


    /**autoSave:automatically saves game*/
autoSave(){

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


    claimReward(missionIndex) {
       const mission = this.missions.missions[missionIndex]; 
      
      if (!mission.completed) {
        return;
      }

      if (mission.claimed) {
         return;
      }
      this.market.money = parseInt(this.market.money) + 
      mission.reward;
  
      this.missions.missionMoney += mission.reward;

mission.claimed = true;

  }


  }
});


