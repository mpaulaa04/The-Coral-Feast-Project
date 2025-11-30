const API_SERVER = window.APP_CONFIG?.apiBase ?? 'http://finalp.test';

const app = Vue.createApp({
  data() {
    return {
      submitF: "Log In",
      form: { email: '', password: '' },
    };
  },
  methods: {
    getUsers() {
      const key = 'cf_users';
      try {
        const arr = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(arr) ? arr : [];
      } catch {
        return [];
      }
    },
    async submitForm() {
      const email = (this.form.email || '').trim().toLowerCase();
      const pass = this.form.password || '';
      if (!email || !pass) {
        alert('Please enter email and password.');
        return;
      }

      let serverUser = null;
      let serverError = null;

      try {
        const response = await fetch(`${API_SERVER}/api/v1/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email,
            password: pass,
          }),
        });

        const payload = await response.json().catch(() => ({}));

        if (response.ok && payload?.user) {
          serverUser = {
            id: payload.user.id,
            email: payload.user.email,
            name: payload.user.name,
          };
        } else if (!response.ok) {
          serverError = payload?.message || 'Login failed on the server.';
        }
      } catch (error) {
        serverError = error?.message || 'Unable to reach the server.';
      }

      if (!serverUser) {
        const users = this.getUsers();
        const fallback = users.find(u => (u.email || '').toLowerCase() === email && (u.password || '') === pass);

        if (!fallback) {
          alert(serverError || 'Invalid credentials.');
          return;
        }

        if (serverError) {
          console.warn('Server login issue:', serverError);
        }

        serverUser = {
          id: fallback.id,
          email: fallback.email,
          name: fallback.name,
        };
      }

      localStorage.setItem('cf_current_user', JSON.stringify(serverUser));
      window.location.href = './lobby.html';
    }
  }
});



