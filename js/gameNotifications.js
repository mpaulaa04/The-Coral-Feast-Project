app.component('game-notifications', {
  props: {
    current: { type: Object, default: null },
  },
  data() {
    return {
      defaultPalettes: {
        default: {
          background: '#1A365D',
          text: '#FFFFFF',
          border: '#2A4365',
        },
        success: {
          background: '#2F855A',
          text: '#FFFFFF',
          border: '#22543D',
        },
        error: {
          background: '#C53030',
          text: '#FFFFFF',
          border: '#822727',
        },
        warning: {
          background: '#D69E2E',
          text: '#1A202C',
          border: '#B7791F',
        },
        market: {
          background: '#6B46C1',
          text: '#FFFFFF',
          border: '#553C9A',
        },
      },
    };
  },
  computed: {
    typeSlug() {
      if (!this.current) {
        return 'default';
      }

      const { type } = this.current;

      if (typeof type === 'string') {
        return type.toLowerCase();
      }

      if (type && typeof type === 'object' && type.slug) {
        return type.slug.toLowerCase();
      }

      if (this.current.slug) {
        return String(this.current.slug).toLowerCase();
      }

      return 'default';
    },
    palette() {
      if (!this.current) {
        return this.defaultPalettes.default;
      }

      const objectType = this.current.type;

      if (this.current.colors && typeof this.current.colors === 'object') {
        return this.normalizePalette(this.current.colors);
      }

      if (objectType && typeof objectType === 'object') {
        return this.normalizePalette({
          background: objectType.background_color,
          text: objectType.text_color,
          border: objectType.border_color,
        });
      }

      return this.defaultPalettes[this.typeSlug] || this.defaultPalettes.default;
    },
    popupStyle() {
      return {
        '--notification-bg': this.palette.background,
        '--notification-border': this.palette.border,
        '--notification-text': this.palette.text,
        '--notification-accent': this.palette.border,
      };
    },
    iconImage() {
      if (this.current && this.current.icon_image) {
        return this.current.icon_image;
      }

      const map = {
        success: './assets/img/alert_check.png',
        error: './assets/img/alert_x.png',
        warning: './assets/img/alert_warning.png',
        market: './assets/img/alert_market.png',
        info: './assets/img/alert_warning.png',
        default: './assets/img/alert_check.png',
      };

      return map[this.typeSlug] || map.default;
    },
    iconSymbol() {
      if (this.current && this.current.icon) {
        return this.current.icon;
      }

      const map = {
        success: '🎉',
        error: '🔥',
        warning: '⚠️',
        market: '🪙',
        info: '💡',
        default: '🐟',
      };

      return map[this.typeSlug] || map.default;
    },
  },
  methods: {
    normalizePalette(palette) {
      const normalized = palette || {};
      return {
        background: normalized.background_color
          || normalized.background
          || this.defaultPalettes.default.background,
        text: normalized.text_color
          || normalized.text
          || this.defaultPalettes.default.text,
        border: normalized.border_color
          || normalized.border
          || this.defaultPalettes.default.border,
      };
    },
  },
  template: /* html */`
    <div class="notifications-wrapper">
      <transition name="notification-slide">
        <article
          v-if="current"
          class="notification-popup"
          :class="typeSlug"
          :style="popupStyle"
        >
          <span class="notification-popup__halo" aria-hidden="true"></span>
          <span class="notification-popup__icon" aria-hidden="true">
            <img
              v-if="iconImage"
              :src="iconImage"
              loading="lazy"
              alt=""
            />
            <span v-else>{{ iconSymbol }}</span>
          </span>
          <div class="notification-popup__content">
            <strong v-if="current.title" class="notification-popup__title">{{ current.title }}</strong>
            <p class="notification-popup__message">{{ current.message }}</p>
          </div>
        </article>
      </transition>
    </div>
  `,
});