app.component('stat-user', {
    props: {
        user: Object,
        position: Number,
        avatar: String,
        metricLabel: String,
        metricValue: [Number, String],
        extraInfo: String
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
