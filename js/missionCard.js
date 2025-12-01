
app.component('mission-card', {
  props: {
    mission: { type: Object, required: true },
    index: { type: Number, required: true }
  },

  computed: {

    statusLabel() {
      if (this.mission.claimed) return 'Completada';
      return this.mission.completed ? 'Lista' : 'Nueva';
    },

    statusClass() {
      if (this.mission.claimed) return 'mission-card__status--claimed';
      if (this.mission.completed) return 'mission-card__status--completed';
      return 'mission-card__status--new';
    },

    progressText() {
      if (typeof this.mission.progress !== 'number' || typeof this.mission.target !== 'number') {
        return '0/1';
      }

      const target = this.mission.target || 1;
      const progress = Math.min(this.mission.progress || 0, target);

      return `${progress}/${target}`;
    },

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

    levelText() {
      const current = this.mission.currentLevel || 1;
      const max = this.mission.maxLevel || 1;
      return `Nivel ${current} de ${max}`;
    },

    rewardText() {
      const reward = Number(this.mission.reward ?? 0) || 0;
      return `Recompensa: ${reward} monedas`;
    },

    canClaim() {
      return this.mission.completed && !this.mission.claimed;
    },

    tutorialCardId() {
      return this.mission.eventKey === 'pond.stock' ? 'missions-first-card' : null;
    },

    tutorialClaimId() {
      return this.mission.eventKey === 'pond.stock' ? 'missions-claim' : null;
    },
  },

  methods: {
    claimReward() {
      this.$emit('claim-reward', this.index);
    }
  },

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

