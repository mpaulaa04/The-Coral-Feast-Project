app.component('market-header', {
  props: {
    money: { type: [String, Number], required: true },
    remainSec: { type: Number, required: true },
    durationSec: { type: Number, default: 300 }
  },
  computed: {
    mm() { return String(Math.floor(this.remainSec / 60)).padStart(2, '0'); },
    ss() { return String(this.remainSec % 60).padStart(2, '0'); }
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
