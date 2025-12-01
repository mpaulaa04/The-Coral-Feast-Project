const API_SERVER = window.APP_CONFIG?.apiBase ?? 'http://The-Coral-Feast-Project-Backend.test';

const app = Vue.createApp({
    data() {
        return {
            players: [],
            loadingPlayers: false,
            playersError: null,
        };
    },
    methods: {
        async loadPlayers() {
            this.loadingPlayers = true;
            this.playersError = null;

            try {
                const response = await fetch(`${API_SERVER}/api/v1/stats`);
                const payload = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(payload?.message || 'No se pudieron cargar las estadísticas de jugadores.');
                }

                const records = Array.isArray(payload?.data) ? payload.data : [];

                this.players = records.map((record) => ({
                    id: record.id,
                    name: record.name || 'Jugador sin nombre',
                    avatar: record.avatar_url || null,
                    daysPlayed: Number(record.days_played ?? 0) || 0,
                    fishCount: Number(record.fish_count ?? 0) || 0,
                    walletBalance: Number(record.wallet_balance ?? 0) || 0,
                    lastPlayedAt: record.last_played_at || null,
                }));
            } catch (error) {
                console.warn('Error al cargar estadísticas:', error);
                this.playersError = error?.message || 'No se pudieron cargar las estadísticas de jugadores.';
                this.players = [];
            } finally {
                this.loadingPlayers = false;
            }
        }
    },
    created() {
        this.loadPlayers();
    }
});