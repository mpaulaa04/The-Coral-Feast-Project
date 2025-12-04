/**
 * StatsSection Component
 *
 * @fileoverview Leaderboard container that allows toggling between days played, fish count, and wallet balance rankings.
 *
 * @typedef {Object} StatsPlayer
 * @property {string|number} [id] Unique identifier for v-for rendering.
 * @property {string} name Display name of the player.
 * @property {string} [avatar] Path to the player's avatar image.
 * @property {number} [daysPlayed] Total days the player has logged in.
 * @property {number} [fishCount] Number of fish the player owns.
 * @property {number} [walletBalance] Balance of in-game currency.
 * @property {string} [lastPlayedAt] ISO timestamp of the last session.
 *
 * @typedef {Object} StatsSectionState
 * @property {'days'|'fish'|'money'|null} activeTab Currently expanded leaderboard category.
 * @property {string} defaultAvatar Fallback avatar image path.
 * @property {StatsPlayer[]} displayList Players currently rendered in the leaderboard.
 * @property {'days'|'fish'|'money'|null} pendingTab Tab queued to replace the active one after transitions.
 * @property {StatsPlayer[]} leavingOrder Snapshot used to time staggered leave transitions.
 * @property {number} leaveStaggerMs Delay between staggered leave animations.
 * @property {number} leaveDurationMs Total duration of the leave animation per item.
 * @property {number} enterStaggerMs Delay applied when new items enter.
 *
 * @component
 * @example
 * <stats-section
 *   :players="leaderboard"
 *   :loading="isLoading"
 *   error-message="Unable to load stats"
 * ></stats-section>
 */
app.component('stats-section', {
    props: {
        /**
         * Collection of players used to populate the leaderboard views.
         * @type {import('vue').PropOptions<StatsPlayer[]>}
         */
        players: {
            type: Array,
            default: () => [],
        },
        /**
         * Disables user interaction and indicates that data is being fetched.
         * @type {import('vue').PropOptions<boolean>}
         */
        loading: {
            type: Boolean,
            default: false,
        },
        /**
         * Error message displayed when the leaderboard cannot be retrieved.
         * @type {import('vue').PropOptions<string|null>}
         */
        errorMessage: {
            type: String,
            default: null,
        },
    },
    /**
     * Local state controlling which leaderboard is displayed and how transitions animate.
     * @returns {StatsSectionState}
     */
    data() {
        return {
            activeTab: null,
            defaultAvatar: './assets/img/perfil.png',
            displayList: [],
            pendingTab: null,
            leavingOrder: [],
            leaveStaggerMs: 90,
            leaveDurationMs: 500,
            enterStaggerMs: 90,
        };
    },
    computed: {
        /**
         * Players sorted by total days played in descending order.
         * @returns {StatsPlayer[]}
         */
        listDays() {
            return [...(this.players || [])]
                .sort((a, b) => (b.daysPlayed || 0) - (a.daysPlayed || 0));
        },
        /**
         * Players sorted by fish count in descending order.
         * @returns {StatsPlayer[]}
         */
        listFish() {
            return [...(this.players || [])]
                .sort((a, b) => (b.fishCount || 0) - (a.fishCount || 0));
        },
        /**
         * Players sorted by wallet balance in descending order.
         * @returns {StatsPlayer[]}
         */
        listMoney() {
            return [...(this.players || [])]
                .sort((a, b) => (b.walletBalance || 0) - (a.walletBalance || 0));
        },
        /**
         * Label used when displaying the leaderboard metric.
         * @returns {string}
         */
        currentLabel() {
            if (this.activeTab === 'days') return 'días';
            if (this.activeTab === 'fish') return 'peces';
            if (this.activeTab === 'money') return 'monedas';
            return '';
        }
    },
    methods: {
        /**
         * Returns the leaderboard list associated with the given tab name.
         * @param {'days'|'fish'|'money'} tab Selected tab identifier.
         * @returns {StatsPlayer[]}
         */
        getListByTab(tab) {
            if (tab === 'days') return this.listDays;
            if (tab === 'fish') return this.listFish;
            if (tab === 'money') return this.listMoney;
            return [];
        },
        /**
         * Handles toggling between leaderboard tabs with staged transitions.
         * @param {'days'|'fish'|'money'} tab Requested tab identifier.
         * @returns {void}
         */
        setTab(tab) {
            if (this.loading) {
                return;
            }

            if (!this.players || this.players.length === 0) {
                return;
            }

            if (this.activeTab === tab) {
                // Close current: fade out bottom -> top
                this.leavingOrder = this.displayList.slice();
                this.displayList = [];
                this.activeTab = null;
                return;
            }

            if (!this.displayList.length) {
                // First open: just show the new list
                this.activeTab = tab;
                this.displayList = this.getListByTab(tab);
                return;
            }

            // Switch with staged exit then enter
            this.pendingTab = tab;
            this.leavingOrder = this.displayList.slice();
            // Trigger leaves
            this.displayList = [];
            const count = this.leavingOrder.length || 1;
            const totalLeave = (count - 1) * this.leaveStaggerMs + this.leaveDurationMs + 60;
            setTimeout(() => {
                this.activeTab = this.pendingTab;
                this.displayList = this.getListByTab(this.pendingTab);
                this.pendingTab = null;
            }, totalLeave);
        },
        /**
         * Closes the active leaderboard when the user clicks outside the component.
         * @param {MouseEvent} e Document click event.
         * @returns {void}
         */
        handleOutsideClick(e) {
            if (this.$el && !this.$el.contains(e.target)) {
                this.leavingOrder = this.displayList.slice();
                this.displayList = [];
                this.activeTab = null;
            }
        },
        /**
         * Formats a numeric amount as a colon-prefixed currency string.
         * @param {number|string|null} val Raw currency value.
         * @returns {string}
         */
        formatMoney(val) {
            if (val == null) return '';
            return '¢' + Number(val).toLocaleString('es-CR');
        },
        /**
         * Formats a date string into a localized short date.
         * @param {string} dateString ISO timestamp or parseable date.
         * @returns {string}
         */
        formatDate(dateString) {
            if (!dateString) return '';

            const date = new Date(dateString);
            if (Number.isNaN(date.getTime())) {
                return '';
            }

            return date.toLocaleDateString('es-CR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        },
        /**
         * Resolves the appropriate avatar image for a player.
         * @param {StatsPlayer} user Player record.
         * @returns {string}
         */
        avatarFor(user) {
            return user?.avatar || this.defaultAvatar;
        },
        /**
         * Picks the correct metric value to display based on the active tab.
         * @param {StatsPlayer} u Player record.
         * @returns {string|number}
         */
        formattedValue(u) {
            if (this.activeTab === 'money') return this.formatMoney(u.walletBalance);
            if (this.activeTab === 'fish') return u.fishCount;
            if (this.activeTab === 'days') return u.daysPlayed;
            return '';
        },
        /**
         * Provides supplementary information shown underneath the primary metric.
         * @param {StatsPlayer} u Player record.
         * @returns {string}
         */
        extraInfo(u) {
            if (this.activeTab === 'days') {
                const formatted = this.formatDate(u.lastPlayedAt);
                return formatted ? `Última sesión: ${formatted}` : '';
            }
            return '';
        },
        /**
         * Transition hook that staggers list item leave animations from bottom to top.
         * @param {HTMLElement} el Element leaving the DOM.
         * @returns {void}
         */
        beforeLeave(el) {
            const count = this.leavingOrder.length || 1;
            const idx = Number(el.dataset.index || 0);
            const delay = (count - idx - 1) * this.leaveStaggerMs;
            el.style.transitionDelay = `${delay}ms`;
        },
        /**
         * Transition hook that staggers list item enter animations from top to bottom.
         * @param {HTMLElement} el Element entering the DOM.
         * @returns {void}
         */
        enter(el) {
            const idx = Number(el.dataset.index || 0);
            const delay = idx * this.enterStaggerMs;
            el.style.transitionDelay = `${delay}ms`;
        }
    },
    /**
     * Registers the outside click handler when the component mounts.
     * @returns {void}
     */
    mounted() {
        document.addEventListener('click', this.handleOutsideClick, { passive: true });
    },
    /**
     * Removes the outside click handler prior to unmounting.
     * @returns {void}
     */
    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    watch: {
        /**
         * Resets the leaderboard when the players collection empties or refreshes.
         * @param {StatsPlayer[]} newPlayers Updated players list.
         * @returns {void}
         */
        players(newPlayers) {
            if (!Array.isArray(newPlayers) || newPlayers.length === 0) {
                this.displayList = [];
                this.activeTab = null;
                return;
            }

            if (this.activeTab) {
                this.displayList = this.getListByTab(this.activeTab);
            }
        }
    },
    template: /*html*/`
    <div class="stats-layout">
            <div class="stats-status" v-if="errorMessage || (!loading && !(players && players.length))">
                        <p v-if="errorMessage" class="stats-status__message">{{ errorMessage }}</p>
                        <p v-else class="stats-status__message">No hay jugadores registrados todavía.</p>
            </div>

      <!-- Tabs menu -->
            <div class="stats-tabs">
                                <button class="stats-tab" :disabled="loading || !players.length" :class="{ active: activeTab==='days' }" @click.stop="setTab('days')">DÍAS JUGADOS</button>
                <button class="stats-tab" :disabled="loading || !players.length" :class="{ active: activeTab==='fish' }" @click.stop="setTab('fish')">PECES</button>
                <button class="stats-tab" :disabled="loading || !players.length" :class="{ active: activeTab==='money' }" @click.stop="setTab('money')">DINERO</button>
      </div>

        <!-- Staged bottom-up leave, then top-down enter -->
        <transition-group name="reorder" tag="div" class="stats-list stats-scroll"
          @before-leave="beforeLeave" @enter="enter">
          <div v-for="(u, i) in displayList" :key="u.id || u.name" class="stats-card stats-card--large"
               :class="{ 'stats-card--top': i === 0 }" :data-index="i">
            <stat-user
              :user="u"
              :avatar="avatarFor(u)"
              :position="i + 1"
              :metric-label="currentLabel"
              :metric-value="formattedValue(u)"
              :extra-info="extraInfo(u)"
            />
          </div>
        </transition-group>
    </div>
  `
});
