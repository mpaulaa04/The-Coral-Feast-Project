app.component('market-header', {
  props: { money: { type:[String,Number], required:true } },
  template: `
    <div class="market-bar">
      <div class="market-title">MERCADO</div>
      <div class="wallet site-inner" style="justify-content:flex-end">
        <img src="./img/moneda.png" alt="Moneda" />
        <div class="money-box"><span class="money-value">₡{{ money }}</span></div>
      </div>
    </div>
  `
});
