app.component('missions-display', {
  props: {
    missions: { type: Array, required: true },
  },


  methods: {
    exitMissions() {
      this.$emit('close-modal');
    },

    claimReward(index) {
      this.$emit('claim-reward', index);
    },
  },

 template: /*html*/ `
<div class="missions-bod">
  <div class="missions-content">
    <div class="missions-slot">

      <div class="missions-title">
        <h1 :style="{ color: 'var(--clr-white)', textAlign: 'center' }">MISSIONS</h1>
      </div>

      <div class="missions-container">
      
        <mission-card
          v-for="(mission, index) in missions"
          :key="index"
          :mission="mission"
          :index="index"
          :mission-money="missionMoney"
          @claim-reward="claimReward"
        ></mission-card>

      </div>
      
    </div>
    
    
  </div>
  
  <button class="ok-button" @click="exitMissions">OK!</button>
</div>
`,
});
