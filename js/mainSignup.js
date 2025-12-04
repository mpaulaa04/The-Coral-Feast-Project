/**
 * Main Signup Vue App
 *
 * @fileoverview Entry point for the signup page Vue application. Handles user registration, form validation, notifications, and server communication.
 * @namespace SignupPage
 * @version 1.0.0
 * @author mpaulaa04
 *
 * @example
 * // This script is loaded in signUp.html and provides the Vue app context for signup-form and related components.
 * <script src="./js/mainSignup.js"></script>
 */
const API_SERVER = window.APP_CONFIG?.apiBase ?? 'http://The-Coral-Feast-Project-Backend.test';
const SIGNUP_NOTIFICATION_TYPE_PRESETS = {
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
      submitF: 'Sign Up',
      form: {
        email: '',
        name: '',
        password: '',
        farmName: '',
        farmType: 'saltwater',
      },
      currentNotification: null,
      notificationQueue: [],
      notificationTimeoutId: null,
      notificationDurationMs: 5000,
      notificationTypes: { ...SIGNUP_NOTIFICATION_TYPE_PRESETS },
      hoverAudio: null,
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
    validateEmailFormat(email) {
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    },
    playOceloteHoverSound() {
      if (!this.hoverAudio) {
        this.hoverAudio = new Audio('./assets/sounds/cat.mp3');
      } else {
        this.hoverAudio.currentTime = 0;
      }

      const playPromise = this.hoverAudio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    },
    translateGeneralError(message) {
      const text = (message || '').toString();
      const normalized = text.toLowerCase();

      if (normalized.includes('invalid')) {
        return 'Revisa los campos con errores.';
      }

      if (normalized.includes('unable to reach') || normalized.includes('timed out')) {
        return 'No se pudo conectar con el servidor.';
      }

      if (normalized.includes('server rejected')) {
        return 'El servidor rechazó el registro.';
      }

      return text || 'Ocurrió un error al crear la cuenta.';
    },
    translateValidation(field, message) {
      const normalized = (message || '').toString().toLowerCase();

      if (field === 'name') {
        if (normalized === 'required' || normalized.includes('required')) {
          return 'Debes ingresar tu nombre.';
        }
        if (normalized.includes('max')) {
          return 'El nombre no puede tener más de 255 caracteres.';
        }
        return 'Revisa el nombre ingresado.';
      }

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
          return 'Debes ingresar una contraseña.';
        }
        if (normalized.includes('at least') || normalized.includes('min')) {
          return 'La contraseña debe tener al menos 8 caracteres.';
        }
        return 'Revisa la contraseña ingresada.';
      }

      if (field === 'password_confirmation') {
        return 'Las contraseñas deben coincidir.';
      }

      if (field === 'farm_name') {
        if (normalized === 'required' || normalized.includes('required')) {
          return 'Debes ingresar el nombre de tu granja.';
        }
        if (normalized.includes('max')) {
          return 'El nombre de la granja no puede tener más de 255 caracteres.';
        }
        return 'Revisa el nombre de la granja.';
      }

      if (field === 'farm_type') {
        if (normalized === 'required' || normalized.includes('required')) {
          return 'Selecciona un tipo de granja.';
        }
        if (normalized.includes('in:')) {
          return 'Selecciona un tipo de granja válido.';
        }
        return 'Revisa el tipo de granja seleccionado.';
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
      return this.notificationTypes[slug] || this.notificationTypes.default || SIGNUP_NOTIFICATION_TYPE_PRESETS.default;
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
    validateForm() {
      if (!this.form.name.trim()) {
        this.notify(this.translateValidation('name', 'required'), 'error');
        return false;
      }

      const email = (this.form.email || '').trim().toLowerCase();
      if (!email) {
        this.notify(this.translateValidation('email', 'required'), 'error');
        return false;
      }

      if (!this.validateEmailFormat(email)) {
        this.notify(this.translateValidation('email', 'invalid'), 'error');
        return false;
      }

      if (!this.form.password) {
        this.notify(this.translateValidation('password', 'required'), 'error');
        return false;
      }

      if ((this.form.password || '').length < 8) {
        this.notify(this.translateValidation('password', 'at least 8'), 'error');
        return false;
      }

      if (!this.form.farmName.trim()) {
        this.notify(this.translateValidation('farm_name', 'required'), 'error');
        return false;
      }

      if (!['saltwater', 'freshwater'].includes(this.form.farmType)) {
        this.notify(this.translateValidation('farm_type', 'in: saltwater,freshwater'), 'error');
        return false;
      }

      return true;
    },
    async fetchNotificationTypes() {
      try {
        const response = await fetch(`${API_SERVER}/api/v1/notification-types`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudieron cargar los tipos de alerta.');
        }

        const map = { ...SIGNUP_NOTIFICATION_TYPE_PRESETS };
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
      if (!this.validateForm()) {
        return;
      }

      const email = (this.form.email || '').trim().toLowerCase();

      const newUser = {
        id: Date.now(),
        name: this.form.name.trim(),
        email,
        password: this.form.password,
        farmName: this.form.farmName.trim(),
        farmType: this.form.farmType,
        avatar: './assets/img/perfil.png',

        hours: this.rand(20, 300),
        daysPlayed: this.rand(5, 120),
        fish: this.rand(50, 1000),
        money: this.rand(1000, 50000),
      };

      let serverAccepted = false;
      let allowLocalCreation = false;

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

        if (response.ok && payload?.id) {
          newUser.id = payload.id;
          serverAccepted = true;
        } else if (!response.ok) {
          const handled = this.notifyValidationErrors(payload?.errors);
          const message = payload?.message;

          if (!handled && message) {
            this.notify(this.translateGeneralError(message), 'error');
          } else if (!handled) {
            this.notify('Ocurrió un error al crear la cuenta.', 'error');
          }

          return;
        }
      } catch (error) {
        allowLocalCreation = true;
        this.notify(`${this.translateGeneralError(error?.message || 'Unable to reach the server.')} Guardaremos tu cuenta localmente.`, 'warning');
      }

      if (!serverAccepted && !allowLocalCreation) {
        return;
      }

      this.saveUserToStorage(newUser);

      const successMessage = serverAccepted
        ? 'Cuenta creada correctamente.'
        : 'Cuenta creada correctamente (datos locales).';

      this.notify(successMessage, 'success');

      this.form.password = '';

      setTimeout(() => {
        window.location.href = './login.html';
      }, 1500);
    },
  },
  mounted() {
    this.fetchNotificationTypes();
  },
  beforeUnmount() {
    this.clearNotificationTimeout();
  },
});
