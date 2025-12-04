/**
 * MissionsDisplay Component
 *
 * @fileoverview Renders the missions panel, showing a list of mission cards and allowing users to claim rewards or close the modal.
 * @namespace MissionsDisplay
 * @version 1.0.0
 *
 * @component
 * @example
 * <missions-display
 *   :missions="missionsArray"
 *   :mission-money="userMoney"
 *   @claim-reward="handleClaimReward"
 *   @close-modal="handleCloseModal"
 * ></missions-display>
 */
app.component('missions-display', {

  /**
   * Component props - Data received from parent component
   * @typedef {Object} MissionData
   * @property {string} description - Mission description
   * @property {number} progress - Current progress value
   * @property {number} target - Target value to complete the mission
   * @property {boolean} completed - Whether the mission is completed
   * @property {boolean} claimed - Whether the reward has been claimed
   * @property {number} currentLevel - Current mission level
   * @property {number} maxLevel - Maximum mission level
   * @property {number} reward - Reward amount (coins)
   * @property {string} rewardImg - Image for the reward
   * @property {string} eventKey - Key for tutorial or event tracking
   */
  props: {
    /**
     * Array of mission objects to display
     * @type {MissionData[]}
     */
    missions: { type: Array, required: true },
    /**
     * Current user money for missions context
     * @type {number}
     */
    missionMoney: { type: Number, required: true }
  },


  /**
   * Component methods exposed to the template
   * @namespace MissionsDisplayMethods
   */
  methods: {
    /**
     * Emits the close-modal event when the OK button is clicked
     * @memberof MissionsDisplayMethods
     * @fires MissionsDisplay#close-modal
     */
    exitMissions() {
      this.$emit('close-modal');
    },

    /**
     * Emits the claim-reward event when a mission reward is claimed
     * @memberof MissionsDisplayMethods
     * @param {number} index - Index of the mission being claimed
     * @fires MissionsDisplay#claim-reward
     */
    claimReward(index) {
      this.$emit('claim-reward', index);
    },
  },

  /**
   * Template markup for the missions display UI
   */
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
