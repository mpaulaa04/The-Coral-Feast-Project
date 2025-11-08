
app.component('mission-card', {
 props: {
    mission:{ type: Object, required: true },
      index: { type: Number, required: true }
  },

computed:{

  reactiveStatus(){
 return this.mission.completed ? 'COMPLETED' : 'NEW';
  }
},

  methods: {
claimReward() {
      this.$emit('claim-reward', this.index);
    }
  },

template: /*html*/`
<div class="missions-cards">
  
      
     <div class="mission-status" :style="{ color: 'var(--clr-white)' }">
        {{ reactiveStatus}}
      </div>

           <div class="mission-description" :style="{ color: 'var(--clr-white)', fontFamily: 'LexendDeca' }">
        {{ mission.description }}
      </div>

      <div class="mission-reward" :class="{ 'locked': !mission.completed }">
        <img
          v-if="mission.completed && !mission.claimed"
          :src="mission.rewardImg"
           class="reward-img"
          alt="reward"
          @click="claimReward"
        />
      </div>
      
    </div>

  
`
});

