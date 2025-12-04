/**
 * Game Notifications Component
 *
 * @fileoverview Notification popup component that displays game events, achievements, and alerts.
 *
 * @component
 * @example
 * <game-notifications
 *   :current="notificationObject"
 * ></game-notifications>
 */
app.component("game-notifications", {
  /**
   * Component props - Data received from parent component
   * @typedef {Object} GameNotificationsProps
   * @property {Object|null} current - Current notification object to display
   * @property {string} current.title - Notification title text
   * @property {string} current.message - Notification message content
   * @property {string|Object} current.type - Notification type (string or object with slug property)
   * @property {string} current.slug - Alternative type identifier for notification
   * @property {Object} current.colors - Custom color palette for notification
   * @property {string} current.icon_image - URL path to custom icon image
   * @property {string} current.icon - Unicode emoji or symbol for notification
   */
  props: {
    /** @type {Object|null} Current notification */
    current: { type: Object, default: null },
  },

  /**
   * Component reactive data
   * @typedef {Object} GameNotificationsData
   * @property {Object} defaultPalettes - Predefined color schemes for notification types
   * @property {Object} defaultPalettes.default - Default palette (blue)
   * @property {Object} defaultPalettes.success - Success palette (green)
   * @property {Object} defaultPalettes.error - Error palette (red)
   * @property {Object} defaultPalettes.warning - Warning palette (orange)
   * @property {Object} defaultPalettes.market - Market palette (purple)
   */
  data() {
    return {
      /**
       * Predefined color palettes for different notification types
       * Each palette contains background, text, and border colors
       * @type {Object}
       */
      defaultPalettes: {
        default: {
          background: "#1A365D",
          text: "#FFFFFF",
          border: "#2A4365",
        },
        success: {
          background: "#2F855A",
          text: "#FFFFFF",
          border: "#22543D",
        },
        error: {
          background: "#C53030",
          text: "#FFFFFF",
          border: "#822727",
        },
        warning: {
          background: "#D69E2E",
          text: "#1A202C",
          border: "#B7791F",
        },
        market: {
          background: "#6B46C1",
          text: "#FFFFFF",
          border: "#553C9A",
        },
      },
    };
  },

  /**
   * Computed properties for dynamic notification display
   * @namespace GameNotificationsComputed
   */
  computed: {
    /**
     * Determines the notification type slug/identifier
     * Extracts and normalizes type from various notification object formats
     * @memberof GameNotificationsComputed
     * @returns {string} Lowercase notification type slug
     * @example
     * // Returns 'success', 'error', 'warning', 'market', 'info', or 'default'
     */
    typeSlug() {
      if (!this.current) {
        return "default";
      }

      const { type } = this.current;

      if (typeof type === "string") {
        return type.toLowerCase();
      }

      if (type && typeof type === "object" && type.slug) {
        return type.slug.toLowerCase();
      }

      if (this.current.slug) {
        return String(this.current.slug).toLowerCase();
      }

      return "default";
    },

    /**
     * Determines the color palette for current notification
     * Checks for custom colors, object type colors, or uses default palette
     * @memberof GameNotificationsComputed
     * @returns {Object} Color palette object with background, text, and border
     * @example
     * // Returns { background: '#2F855A', text: '#FFFFFF', border: '#22543D' }
     */
    palette() {
      if (!this.current) {
        return this.defaultPalettes.default;
      }

      const objectType = this.current.type;

      if (this.current.colors && typeof this.current.colors === "object") {
        return this.normalizePalette(this.current.colors);
      }

      if (objectType && typeof objectType === "object") {
        return this.normalizePalette({
          background: objectType.background_color,
          text: objectType.text_color,
          border: objectType.border_color,
        });
      }

      return (
        this.defaultPalettes[this.typeSlug] || this.defaultPalettes.default
      );
    },

    /**
     * Generates CSS custom properties (variables) for notification styling
     * Maps palette colors to CSS variables for consistent theming
     * @memberof GameNotificationsComputed
     * @returns {Object} CSS variables object for v-bind:style
     */
    popupStyle() {
      return {
        "--notification-bg": this.palette.background,
        "--notification-border": this.palette.border,
        "--notification-text": this.palette.text,
        "--notification-accent": this.palette.border,
      };
    },

    /**
     * Determines the icon image URL for current notification
     * Prioritizes custom icon, then maps based on notification type
     * @memberof GameNotificationsComputed
     * @returns {string} Path to notification icon image file
     * @example
     * // Returns './assets/img/alert_check.png', './assets/img/alert_x.png', etc.
     */
    iconImage() {
      if (this.current && this.current.icon_image) {
        return this.current.icon_image;
      }

      const map = {
        success: "./assets/img/alert_check.png",
        error: "./assets/img/alert_x.png",
        warning: "./assets/img/alert_warning.png",
        market: "./assets/img/alert_market.png",
        info: "./assets/img/alert_warning.png",
        default: "./assets/img/alert_check.png",
      };

      return map[this.typeSlug] || map.default;
    },
    iconSymbol() {
      if (this.current && this.current.icon) {
        return this.current.icon;
      }

      const map = {
        success: "🎉",
        error: "🔥",
        warning: "⚠️",
        market: "🪙",
        info: "💡",
        default: "🐟",
      };

      return map[this.typeSlug] || map.default;
    },
  },
  methods: {
    normalizePalette(palette) {
      const normalized = palette || {};
      return {
        background:
          normalized.background_color ||
          normalized.background ||
          this.defaultPalettes.default.background,
        text:
          normalized.text_color ||
          normalized.text ||
          this.defaultPalettes.default.text,
        border:
          normalized.border_color ||
          normalized.border ||
          this.defaultPalettes.default.border,
      };
    },
  },

 
  template: /* html */ `
    <!-- Notifications Container -->
    <div class="notifications-wrapper">
      <!-- Transition Animation Wrapper -->
      <transition name="notification-slide">
        <!-- Notification Popup Article -->
        <article
          v-if="current"
          class="notification-popup"
          :class="typeSlug"
          :style="popupStyle"
        >
          <!-- Decorative Halo Effect -->
          <span class="notification-popup__halo" aria-hidden="true"></span>

          <!-- Icon Container - Image or Emoji -->
          <span class="notification-popup__icon" aria-hidden="true">
            <!-- Custom Icon Image -->
            <img
              v-if="iconImage"
              :src="iconImage"
              loading="lazy"
              alt=""
            />
            <!-- Fallback Emoji Icon -->
            <span v-else>{{ iconSymbol }}</span>
          </span>

          <!-- Content Section - Title and Message -->
          <div class="notification-popup__content">
            <!-- Optional Title -->
            <strong v-if="current.title" class="notification-popup__title">{{ current.title }}</strong>
            <!-- Notification Message -->
            <p class="notification-popup__message">{{ current.message }}</p>
          </div>
        </article>
      </transition>
    </div>
  `,
});
