app.component('missions-display', {
  props: {
    missions: { type: Array, required: true },
    missionMoney: { type: Number, required: true }
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
  <div class="missions-content" data-tutorial-container="missions">
    
    <div class="missions-title">
      <h1 :style="{ color: 'var(--clr-white)', textAlign: 'center' }">MISSIONS</h1>
    </div>

    <div class="missions-container">
      <template v-if="missions.length">
        <mission-card
          v-for="(mission, index) in missions"
          :key="index"
          :mission="mission"
          :index="index"
          @claim-reward="claimReward"
        ></mission-card>
      </template>

      <div
        v-else
        class="missions-empty"
        :style="{ color: 'var(--clr-white)', fontFamily: 'LexendDeca', textAlign: 'center' }"
      >
        No hay misiones activas por ahora.
      </div>
    </div>
    
  </div>
  
  <button class="ok-button" @click="exitMissions">OK!</button>
</div>
`,
});
