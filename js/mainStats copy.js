const app = Vue.createApp({
    data() {
        return {
            players: []
        };
    },
    methods: {
        loadPlayers() {
            const key = 'cf_users';
            const stored = JSON.parse(localStorage.getItem(key) || '[]');
            this.players = Array.isArray(stored) ? stored : [];
        }
    },
    created() {
        this.loadPlayers();
    }
});