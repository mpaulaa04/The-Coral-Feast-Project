const API_SERVER = window.APP_CONFIG?.apiBase ?? 'http://The-Coral-Feast-Project-Backend.test';
const LOGIN_NOTIFICATION_TYPE_PRESETS = {
  default: {
    background: '#1A365D',
    text: '#FFFFFF',
    border: '#2A4365',
    title: 'Aviso',
  },
  success: {
    background: '#2F855A',
    text: '#FFFFFF',
    border: '#22543D',
    title: 'Correcto',
  },
  error: {
    background: '#C53030',
    text: '#FFFFFF',
    border: '#822727',
    title: 'Error',
  },
  warning: {
    background: '#D69E2E',
    text: '#1A202C',
    border: '#B7791F',
    title: 'Alerta',
  },
  market: {
    background: '#6B46C1',
    text: '#FFFFFF',
    border: '#553C9A',
    title: 'Oferta especial',
  },
};

const app = Vue.createApp({
  data() {
    return {
      submitF: 'Log In',
      form: { email: '', password: '' },
      currentNotification: null,
      notificationQueue: [],
      notificationTimeoutId: null,
      notificationDurationMs: 5000,
      notificationTypes: { ...LOGIN_NOTIFICATION_TYPE_PRESETS },
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
    validateEmailFormat(email) {
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    },
    translateGeneralError(message) {
      const text = (message || '').toString();
      const normalized = text.toLowerCase();

      if (normalized.includes('credentials')) {
        return 'Las credenciales proporcionadas son incorrectas.';
      }

      if (normalized.includes('login failed')) {
        return 'El servidor rechazó el inicio de sesión.';
      }

      if (normalized.includes('unable to reach') || normalized.includes('timed out')) {
        return 'No se pudo conectar con el servidor.';
      }

      return text || 'Ocurrió un error al iniciar sesión.';
    },
    translateValidation(field, message) {
      const normalized = (message || '').toString().toLowerCase();

      if (field === 'email') {
        if (normalized === 'required' || normalized.includes('required')) {
          return 'Debes ingresar tu correo.';
        }
        if (normalized.includes('valid email') || normalized.includes('valid') || normalized.includes('email')) {
          return 'El correo debe ser válido (ej. usuario@gmail.com).';
        }
        if (normalized.includes('taken')) {
          return 'Ese correo ya está registrado.';
        }
        return 'Revisa el correo electrónico ingresado.';
      }

      if (field === 'password') {
        if (normalized === 'required' || normalized.includes('required')) {
          return 'Debes ingresar tu contraseña.';
        }
        if (normalized.includes('at least') || normalized.includes('min')) {
          return 'La contraseña debe tener al menos 8 caracteres.';
        }
        return 'Revisa la contraseña ingresada.';
      }

      return message || 'Revisa la información proporcionada.';
    },
    notifyValidationErrors(errors) {
      if (!errors || typeof errors !== 'object') {
        return false;
      }

      let handled = false;
      Object.entries(errors).forEach(([field, messages]) => {
        const list = Array.isArray(messages) ? messages : [messages];
        list.forEach((rawMessage) => {
          const friendly = this.translateValidation(field, rawMessage);
          this.notify(friendly, 'error');
          handled = true;
        });
      });

      return handled;
    },
    normalizeType(type) {
      const slug = (type || 'default').toString().toLowerCase();

      if (slug === 'info') {
        return 'warning';
      }

      return slug;
    },
    getTypeColors(slug) {
      return this.notificationTypes[slug] || this.notificationTypes.default || LOGIN_NOTIFICATION_TYPE_PRESETS.default;
    },
    notify(message, type = 'default', options = {}) {
      const text = (message || '').toString().trim();
      if (!text) {
        return;
      }

      const slug = this.normalizeType(type);
      const colors = this.getTypeColors(slug);

      const notification = {
        id: Date.now() + Math.random(),
        message: text,
        type: slug,
        slug,
        colors,
      };

      if (options && options.title) {
        notification.title = options.title;
      }

      if (!notification.title && colors && colors.title) {
        notification.title = colors.title;
      }

      if (!this.currentNotification) {
        this.showNotification(notification);
        return;
      }

      this.notificationQueue = [notification];
      this.processNotificationQueue(true);
    },
    showNotification(notification) {
      if (!notification) {
        return;
      }

      if (this.currentNotification) {
        this.clearNotificationTimeout();
        this.currentNotification = null;
      }

      this.clearNotificationTimeout();
      this.currentNotification = notification;

      const duration = Number.isFinite(this.notificationDurationMs)
        ? Math.max(1000, this.notificationDurationMs)
        : 5000;

      this.notificationTimeoutId = setTimeout(() => {
        this.currentNotification = null;
        this.clearNotificationTimeout();
        this.processNotificationQueue();
      }, duration);
    },
    processNotificationQueue(forceImmediate = false) {
      if (forceImmediate && this.currentNotification) {
        this.clearNotificationTimeout();
        this.currentNotification = null;
      }

      if (this.notificationQueue.length === 0) {
        return;
      }

      if (this.currentNotification) {
        return;
      }

      const next = this.notificationQueue.shift();
      if (next) {
        this.showNotification(next);
      }
    },
    clearNotificationTimeout() {
      if (this.notificationTimeoutId) {
        clearTimeout(this.notificationTimeoutId);
        this.notificationTimeoutId = null;
      }
    },
    async fetchNotificationTypes() {
      try {
        const response = await fetch(`${API_SERVER}/api/v1/notification-types`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudieron cargar los tipos de alerta.');
        }

        const map = { ...LOGIN_NOTIFICATION_TYPE_PRESETS };
        const records = Array.isArray(payload?.data) ? payload.data : [];

        records.forEach((record) => {
          const slug = (record?.slug || '').toLowerCase();
          if (!slug) {
            return;
          }

          map[slug] = {
            background: record.background_color || map.default.background,
            text: record.text_color || map.default.text,
            border: record.border_color || map.default.border,
            title: record.default_title || map.default.title,
          };
        });

        this.notificationTypes = map;
      } catch (error) {
        console.warn('No se pudieron sincronizar los tipos de notificación:', error);
      }
    },
    async submitForm() {
      const email = (this.form.email || '').trim().toLowerCase();
      const pass = this.form.password || '';

      if (!email) {
        this.notify(this.translateValidation('email', 'required'), 'error');
        return;
      }

      if (!this.validateEmailFormat(email)) {
        this.notify(this.translateValidation('email', 'valid'), 'error');
        return;
      }

      if (!pass) {
        this.notify(this.translateValidation('password', 'required'), 'error');
        return;
      }

      let serverUser = null;
      let serverError = null;
      let successMessage = null;
      let usedFallback = false;

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
          successMessage = 'Inicio de sesión correcto.';
        } else if (!response.ok) {
          const handled = this.notifyValidationErrors(payload?.errors);
          const generalMessage = payload?.message;

          if (!handled && generalMessage) {
            this.notify(this.translateGeneralError(generalMessage), 'error');
          } else if (!handled) {
            this.notify('Ocurrió un error al iniciar sesión.', 'error');
          }

          serverError = generalMessage || 'Login failed on the server.';
        }
      } catch (error) {
        serverError = error?.message || 'Unable to reach the server.';
        this.notify(this.translateGeneralError(serverError), 'error');
      }

      if (!serverUser) {
        const users = this.getUsers();
        const fallback = users.find(
          (u) => (u.email || '').toLowerCase() === email && (u.password || '') === pass,
        );

        if (!fallback) {
          this.notify(this.translateGeneralError(serverError || 'Invalid credentials.'), 'error');
          return;
        }

        serverUser = {
          id: fallback.id,
          email: fallback.email,
          name: fallback.name,
        };

        if (!successMessage) {
          successMessage = serverError
            ? 'Inicio de sesión correcto (datos locales).'
            : 'Inicio de sesión correcto.';
        }
        usedFallback = true;
      } else if (!successMessage) {
        successMessage = 'Inicio de sesión correcto.';
      }

      localStorage.setItem('cf_current_user', JSON.stringify(serverUser));

      if (usedFallback && serverError) {
        this.notify('No se pudo sincronizar con el servidor. Iniciaste sesión con datos guardados.', 'warning');
      }

      this.notify(successMessage, 'success');

      setTimeout(() => {
        window.location.href = './lobby.html';
      }, 1200);
    },
  },
  mounted() {
    this.fetchNotificationTypes();
  },
  beforeUnmount() {
    this.clearNotificationTimeout();
  },
});



