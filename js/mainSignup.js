const API_SERVER = window.APP_CONFIG?.apiBase ?? 'http://finalp.test';

const app = Vue.createApp({
  data() {
    return {
      submitF: "Sign Up",
      form: {
        email: "",
        name: "",
        password: "",
        farmName: "",
        farmType: "saltwater"
      }
    };
  },
  methods: {
    rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    saveUserToStorage(user) {
      const key = 'cf_users';
      const current = JSON.parse(localStorage.getItem(key) || '[]');
      current.push(user);
      localStorage.setItem(key, JSON.stringify(current));
    },
    async submitForm() {
      if (!this.form.name || !this.form.email || !this.form.password) {
        alert('Please complete all required fields.');
        return;
      }

      const newUser = {
        id: Date.now(),
        name: this.form.name,
        email: this.form.email.trim().toLowerCase(),
        password: this.form.password,
        farmName: this.form.farmName,
        farmType: this.form.farmType,
        avatar: './assets/img/perfil.png',

        hours: this.rand(20, 300),
        daysPlayed: this.rand(5, 120),
        fish: this.rand(50, 1000),
        money: this.rand(1000, 50000)
      };

      let syncWarning = null;

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            password_confirmation: newUser.password,
            farm_name: newUser.farmName,
            farm_type: newUser.farmType,
          }),
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          const details = payload?.message || 'The server rejected the registration.';
          const errors = payload?.errors ? Object.values(payload.errors).flat().join(' ') : '';
          syncWarning = [details, errors].filter(Boolean).join(' ');
        } else if (payload?.id) {
          newUser.id = payload.id;
        }
      } catch (error) {
        syncWarning = error?.message || 'Unable to reach the server.';
      }

      if (syncWarning) {
        alert(`${syncWarning}\nYour account was saved locally so you can continue playing.`);
      }

      this.saveUserToStorage(newUser);

      this.form.password = '';

      window.location.href = './login.html';
    }
  },
});
