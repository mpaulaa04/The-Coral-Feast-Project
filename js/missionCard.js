
/**
 * MissionCard Component
 *
 * @fileoverview Renders a mission card with progress, status, level, and reward information. Allows claiming rewards for completed missions.
 * @namespace MissionCard
 * @version 1.0.0
 *
 * @component
 * @example
 * <mission-card
 *   :mission="missionData"
 *   :index="missionIndex"
 *   @claim-reward="handleClaimReward"
 * ></mission-card>
 */
app.component('mission-card', {

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
     * Mission data object containing all state for the mission card
     * @type {MissionData}
     */
    mission: { type: Object, required: true },
    /**
     * Index of the mission in the list
     * @type {number}
     */
    index: { type: Number, required: true }
  },

  /**
   * Computed properties for mission card display
   * @namespace MissionCardComputed
   */
  computed: {

    /**
     * Returns the status label for the mission (Completada, Lista, Nueva)
     * @memberof MissionCardComputed
     * @returns {string}
     */
    statusLabel() {
      if (this.mission.claimed) return 'Completada';
      return this.mission.completed ? 'Lista' : 'Nueva';
    },

    /**
     * Returns the CSS class for the mission status
     * @memberof MissionCardComputed
     * @returns {string}
     */
    statusClass() {
      if (this.mission.claimed) return 'mission-card__status--claimed';
      if (this.mission.completed) return 'mission-card__status--completed';
      return 'mission-card__status--new';
    },

    /**
     * Returns the progress text (e.g., "3/5")
     * @memberof MissionCardComputed
     * @returns {string}
     */
    progressText() {
      if (typeof this.mission.progress !== 'number' || typeof this.mission.target !== 'number') {
        return '0/1';
      }

      const target = this.mission.target || 1;
      const progress = Math.min(this.mission.progress || 0, target);

      return `${progress}/${target}`;
    },

    /**
     * Returns the progress percent as a string (e.g., "60%")
     * @memberof MissionCardComputed
     * @returns {string}
     */
    progressPercent() {
      if (typeof this.mission.progress !== 'number' || typeof this.mission.target !== 'number') {
        return '0%';
      }

      const target = this.mission.target || 1;
      if (target <= 0) return '0%';

      const progress = Math.min(this.mission.progress || 0, target);
      const percent = Math.min(100, Math.round((progress / target) * 100));

      return `${percent}%`;
    },

    /**
     * Returns the level text (e.g., "Nivel 2 de 5")
     * @memberof MissionCardComputed
     * @returns {string}
     */
    levelText() {
      const current = this.mission.currentLevel || 1;
      const max = this.mission.maxLevel || 1;
      return `Nivel ${current} de ${max}`;
    },

    /**
     * Returns the reward text (e.g., "Recompensa: 100 monedas")
     * @memberof MissionCardComputed
     * @returns {string}
     */
    rewardText() {
      const reward = Number(this.mission.reward ?? 0) || 0;
      return `Recompensa: ${reward} monedas`;
    },

    /**
     * Returns true if the reward can be claimed
     * @memberof MissionCardComputed
     * @returns {boolean}
     */
    canClaim() {
      return this.mission.completed && !this.mission.claimed;
    },

    /**
     * Returns the tutorial card ID for onboarding
     * @memberof MissionCardComputed
     * @returns {string|null}
     */
    tutorialCardId() {
      return this.mission.eventKey === 'pond.stock' ? 'missions-first-card' : null;
    },

    /**
     * Returns the tutorial claim ID for onboarding
     * @memberof MissionCardComputed
     * @returns {string|null}
     */
    tutorialClaimId() {
      return this.mission.eventKey === 'pond.stock' ? 'missions-claim' : null;
    },
  },


  /**
   * Component methods exposed to the template
   * @namespace MissionCardMethods
   */
  methods: {
    /**
     * Emits the claim-reward event when the claim button is clicked
     * @memberof MissionCardMethods
     * @fires MissionCard#claim-reward
     */
    claimReward() {
      this.$emit('claim-reward', this.index);
    }
  },

  /**
   * Template markup for the mission card UI
   */
  template: /*html*/`
<div class="mission-card" :data-tutorial="tutorialCardId">
  <div class="mission-card__status" :class="statusClass">
    {{ statusLabel }}
  </div>

  <div class="mission-card__body">
    <div class="mission-card__header">
      <span class="mission-card__title">{{ mission.description }}</span>
      <span class="mission-card__level">{{ levelText }}</span>
    </div>

    <div class="mission-card__info-row">
      <span class="mission-card__progress-text">{{ progressText }}</span>
      <span class="mission-card__reward-text">{{ rewardText }}</span>
    </div>

    <div class="mission-card__progress-bar">
      <div class="mission-card__progress-fill" :style="{ width: progressPercent }"></div>
    </div>
  </div>

  <div class="mission-card__actions">
    <button
      v-if="canClaim"
      class="mission-card__claim"
      type="button"
      :data-tutorial="tutorialClaimId"
      @click="claimReward"
    >
      Reclamar
    </button>
    <img
      v-else
      :src="mission.rewardImg"
      class="mission-card__reward-icon"
      alt="Recompensa"
    />
  </div>
</div>
`
});

