/**
 * StatUser Component
 *
 * @fileoverview Displays leaderboard information for a single player entry.
 *
 * @typedef {Object} StatUserRecord
 * @property {string} name Display name of the player.
 *
 * @component
 * @example
 * <stat-user
 *   :user="{ name: 'CoralMaster' }"
 *   :position="1"
 *   avatar="./assets/img/avatar.png"
 *   metric-label="PTS"
 *   :metric-value="3250"
 *   extra-info="+150 this week"
 * ></stat-user>
 */
app.component('stat-user', {
    props: {
        /**
         * Player record associated with the leaderboard entry.
         * @type {import('vue').PropOptions<StatUserRecord>}
         */
        user: { type: Object, required: true },
        /**
         * Numeric position within the leaderboard.
         * @type {import('vue').PropOptions<number>}
         */
        position: { type: Number, required: true },
        /**
         * Avatar image path displayed beside the user details.
         * @type {import('vue').PropOptions<string>}
         */
        avatar: { type: String, required: true },
        /**
         * Label describing the primary metric (e.g., PTS, XP).
         * @type {import('vue').PropOptions<string>}
         */
        metricLabel: { type: String, required: true },
        /**
         * Value associated with the primary leaderboard metric.
         * @type {import('vue').PropOptions<number|string>}
         */
        metricValue: { type: [Number, String], required: true },
        /**
         * Optional secondary detail shown under the primary metric.
         * @type {import('vue').PropOptions<string|undefined>}
         */
        extraInfo: { type: String, required: false }
    },
    template: /*html*/`
    <div class="stat-user stats-card-content">
      <img class="stat-user__avatar" :src="avatar" alt="profile image" />

      <div class="stat-user__info">
        <p class="stat-user__name">#{{ position }} · {{ user.name }}</p>
        <p class="stat-user__metric">{{ metricValue }} {{ metricLabel }}</p>
        <p v-if="extraInfo" class="stat-user__extra">{{ extraInfo }}</p>
      </div>
    </div>
  `
});
