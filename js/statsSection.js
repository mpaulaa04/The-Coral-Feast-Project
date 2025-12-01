app.component('stats-section', {
    props: {
        players: Array
    },
    data() {
        return {
            // No section open initially
            activeTab: null,
            defaultAvatar: './assets/img/perfil.png',
            displayList: [],
            pendingTab: null,
            leavingOrder: [],
            leaveStaggerMs: 90,
            leaveDurationMs: 500,
            enterStaggerMs: 90
        };
    },
    computed: {
        listHours() {
            return [...(this.players || [])].sort((a, b) => (b.hours || 0) - (a.hours || 0));
        },
        listFish() {
            return [...(this.players || [])].sort((a, b) => (b.fish || 0) - (a.fish || 0));
        },
        listMoney() {
            return [...(this.players || [])].sort((a, b) => (b.money || 0) - (a.money || 0));
        },
        currentLabel() {
            if (this.activeTab === 'hours') return 'hours';
            if (this.activeTab === 'fish') return 'fish';
            if (this.activeTab === 'money') return 'money';
            return '';
        }
    },
    methods: {
        getListByTab(tab) {
            if (tab === 'hours') return this.listHours;
            if (tab === 'fish') return this.listFish;
            if (tab === 'money') return this.listMoney;
            return [];
        },
        setTab(tab) {
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
        handleOutsideClick(e) {
            // Close panels if click occurs outside this component
            if (this.$el && !this.$el.contains(e.target)) {
                this.leavingOrder = this.displayList.slice();
                this.displayList = [];
                this.activeTab = null;
            }
        },
        formatMoney(val) {
            if (val == null) return '';
            return '¢' + Number(val).toLocaleString('es-CR');
        },
        avatarFor(user) {
            return user?.avatar || this.defaultAvatar;
        },
        formattedValue(u) {
            if (this.activeTab === 'money') return this.formatMoney(u.money);
            if (this.activeTab === 'fish') return u.fish;
            if (this.activeTab === 'hours') return u.hours;
            return '';
        },
        extraInfo(u) {
            if (this.activeTab === 'hours') return (u.daysPlayed || 0) + ' days played';
            return '';
        },
        // Transition-group hooks for staggered leave and enter
        beforeLeave(el) {
            const count = this.leavingOrder.length || 1;
            const idx = Number(el.dataset.index || 0);
            // Bottom (higher idx) leaves first => smaller delay
            const delay = (count - idx - 1) * this.leaveStaggerMs;
            el.style.transitionDelay = `${delay}ms`;
        },
        enter(el) {
            const idx = Number(el.dataset.index || 0);
            const delay = idx * this.enterStaggerMs;
            el.style.transitionDelay = `${delay}ms`;
        }
    },
    mounted() {
        document.addEventListener('click', this.handleOutsideClick, { passive: true });
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    template: /*html*/`
    <div class="stats-layout">
      <!-- Tabs menu -->
      <div class="stats-tabs">
        <button class="stats-tab" :class="{ active: activeTab==='hours' }" @click.stop="setTab('hours')">DÍAS JUGADOS</button>
        <button class="stats-tab" :class="{ active: activeTab==='fish' }" @click.stop="setTab('fish')">PECES</button>
        <button class="stats-tab" :class="{ active: activeTab==='money' }" @click.stop="setTab('money')">DINERO</button>
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
