/**
 * @typedef {Object} MarketHeaderProps
 * @property {string|number} money - Wallet balance displayed in the header.
 * @property {number} remainSec - Remaining seconds for the market reset timer.
 * @property {number} durationSec - Total duration of the countdown timer.
 */

/**
 * Header bar for the market modal, displaying the countdown timer and wallet balance.
 * @component
 */
app.component('market-header', {
  props: {
    /**
     * Wallet balance displayed in the header.
     * @type {import('vue').PropOptions<string|number>}
     */
    money: { type: [String, Number], required: true },
    /**
     * Remaining seconds for the market reset timer.
     * @type {import('vue').PropOptions<number>}
     */
    remainSec: { type: Number, required: true },
    /**
     * Total timer duration used when rendering the countdown.
     * @type {import('vue').PropOptions<number>}
     */
    durationSec: { type: Number, default: 300 }
  },
  computed: {
    /**
     * Minutes portion of the remaining timer rendered as two digits.
     * @returns {string}
     */
    mm() {
      return String(Math.floor(this.remainSec / 60)).padStart(2, '0');
    },
    /**
     * Seconds portion of the remaining timer rendered as two digits.
     * @returns {string}
     */
    ss() {
      return String(this.remainSec % 60).padStart(2, '0');
    }
  },
  template: `
    <div class="market-bar">
      <div class="market-title">MERCADO</div>

      <div class="wallet site-inner" style="justify-content:flex-end; gap:10px">

        <div class="market-label" style="font-weight:700; color:white;">RESETEO EN:</div>
        <div class="market-timer-box" data-tutorial="market-timer"
             @click.stop="$root.onTutorialTargetClick('market-timer')">
          <span class="timer-digits">{{ mm }}:{{ ss }}</span>
        </div>

        <img src="./assets/img/moneda.png" alt="Moneda" />
        <div class="money-box" data-tutorial="market-coins"
             @click.stop="$root.onTutorialTargetClick('market-coins')">
          <span class="money-value">₡{{ money }}</span>
        </div>
      </div>
    </div>
  `
});
