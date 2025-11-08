app.component('market-header', {
  props: { money: { type:[String,Number], required:true } },
  template: /*html*/`
    <div class="market-bar">
      <div class="market-title">MERCADO</div>
      <div class="wallet site-inner" style="justify-content:flex-end">
        <img src="./assets/img/moneda.png" alt="Moneda" />
        <div class="money-box"><span class="money-value">₡{{ money }}</span></div>
      </div>
    </div>
  `
});
