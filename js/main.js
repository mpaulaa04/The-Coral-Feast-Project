const API_SERVER = window.APP_CONFIG?.apiBase ?? 'http://finalp.test';
const DEFAULT_FISH_HARVEST_REWARD = 50;
const PLANT_EFFECT_MAX_DURATION_SECONDS = 30;
const GAME_NOTIFICATION_TYPE_PRESETS = {
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

const TOOL_USAGE_DEFINITIONS = Object.freeze([
  {
    slug: 'ph',
    label: 'Regulador de pH',
    icon: './assets/img/phMedidor.svg',
  },
  {
    slug: 'oxygen',
    label: 'Regulador de oxígeno',
    icon: './assets/img/oxyTool.svg',
  },
  {
    slug: 'temperature',
    label: 'Control de temperatura',
    icon: './assets/img/tempController.svg',
  },
  {
    slug: 'water_quality',
    label: 'Tratamiento de suciedad',
    icon: './assets/img/waterClean.svg',
  },
]);

const TOOL_USAGE_DEFINITIONS_BY_SLUG = Object.freeze(
  TOOL_USAGE_DEFINITIONS.reduce((acc, definition) => {
    acc[definition.slug] = definition;
    return acc;
  }, {})
);

const RAW_TUTORIAL_SEQUENCE = [
  {
    key: 'lobby-market',
    selector: '[data-tutorial="market-button"]',
    notification: 'Vamos al Mercado. Toca el botón Store para continuar.',
    modalType: null,
  },
  {
    key: 'market-categories',
    selector: '[data-tutorial="category-fish"]',
    notification: 'Selecciona la categoría "Peces" para ver los artículos disponibles.',
    modalType: 'market',
    arrowPosition: 'right',
    containerSelector: '[data-tutorial-container="market"]',
    notificationOffset: { x: 16, y: -40 },
  },
  {
    key: 'market-select-fish',
    selector: '[data-tutorial="fish-item"]',
    notification: 'Elige un pez para ver sus detalles.',
    modalType: 'market',
    arrowPosition: 'bottom',
    containerSelector: '[data-tutorial-container="market"]',
  },
  {
    key: 'market-buy-button',
    selector: '[data-tutorial="buy-button"]',
    notification: 'Ahora compra tu primer pez presionando Comprar.',
    modalType: 'market',
    arrowPosition: 'right',
    containerSelector: '[data-tutorial-container="market"]',
    notificationOffset: { x: 16, y: -20 },
  },
  {
    key: 'market-timer',
    selector: '[data-tutorial="market-timer"]',
    notification: 'Este temporizador indica cuándo cambian las ofertas especiales.',
    modalType: 'market',
    arrowPosition: 'bottom',
    containerSelector: '[data-tutorial-container="market"]',
  },
  {
    key: 'market-coins',
    selector: '[data-tutorial="market-coins"]',
    notification: 'Aquí ves cuántas monedas tienes disponibles. En seguida revisaremos tu inventario.',
    modalType: 'market',
    arrowPosition: 'bottom',
    containerSelector: '[data-tutorial-container="market"]',
  },
  {
    key: 'lobby-inventory',
    selector: '[data-tutorial="inventory-button"]',
    notification: 'Excelente, ahora abre tu Inventario desde este botón.',
    modalType: null,
    arrowPosition: 'left',
    notificationOffset: { x: -40, y: 0 },
  },
  {
    key: 'inventory-categories',
    selector: '[data-tutorial="inventory-category-fish"]',
    notification: 'En tu inventario, primero revisa la categoría de Peces.',
    modalType: 'inventory',
    arrowPosition: 'right',
    containerSelector: '[data-tutorial-container="inventory"]',
  },
  {
    key: 'inventory-select-fish',
    selector: '[data-tutorial="inventory-fish-slot"]',
    notification: 'Selecciona el pez que acabas de comprar para ver sus detalles.',
    modalType: 'inventory',
    arrowPosition: 'bottom',
    containerSelector: '[data-tutorial-container="inventory"]',
  },
  {
    key: 'inventory-sell-info',
    selector: '[data-tutorial="inventory-sell"]',
    notification: 'Este botón te permite vender el artículo seleccionado cuando lo necesites.',
    modalType: 'inventory',
    arrowPosition: 'top',
    containerSelector: '[data-tutorial-container="inventory"]',
    interactive: false,
  },
  {
    key: 'inventory-favorite-info',
    selector: '[data-tutorial="inventory-fav"]',
    notification: 'Con este botón marcas el artículo como favorito para tenerlo a la mano.',
    modalType: 'inventory',
    arrowPosition: 'top',
    containerSelector: '[data-tutorial-container="inventory"]',
    interactive: false,
  },
  {
    key: 'inventory-mark-favorite',
    selector: '[data-tutorial="inventory-fav"]',
    notification: 'Marca tu nuevo pez como favorito para añadirlo al acceso rápido.',
    modalType: 'inventory',
    arrowPosition: 'top',
    containerSelector: '[data-tutorial-container="inventory"]',
  },
  {
    key: 'lobby-pond-slots',
    selector: '[data-tutorial="pond-slots"]',
    notification: 'Estos son tus espacios de cultivo. Aquí sembrarás peces y plantas.',
    modalType: null,
    arrowPosition: 'top',
  },
  {
    key: 'quickpanel-tools',
    selector: '[data-tutorial="bottom-button-tools"]',
    notification: 'Este botón activa tus herramientas rápidas cuando necesites regular el estanque.',
    modalType: null,
    arrowPosition: 'top',
  },
  {
    key: 'quickpanel-overview',
    selector: '[data-tutorial="quickpanel-overview"]',
    notification: 'Aquí aparecerán tus herramientas cuando abras el panel rápido. Repasemos cada una.',
    modalType: null,
    arrowPosition: 'top',
  },
  {
    key: 'quickpanel-tool-ph',
    selector: '[data-tutorial="quickpanel-tool-ph"]',
    notification: 'Regulador de pH: úsalo cuando el nivel de pH necesite ajustes.',
    modalType: null,
    arrowPosition: 'top',
  },
  {
    key: 'quickpanel-tool-oxygen',
    selector: '[data-tutorial="quickpanel-tool-oxygen"]',
    notification: 'Regulador de oxígeno: incrementa el oxígeno para mantener a tus peces saludables.',
    modalType: null,
    arrowPosition: 'top',
  },
  {
    key: 'quickpanel-tool-temperature',
    selector: '[data-tutorial="quickpanel-tool-temperature"]',
    notification: 'Control de temperatura: úsalo cuando la temperatura del agua cambie.',
    modalType: null,
    arrowPosition: 'top',
  },
  {
    key: 'quickpanel-tool-water',
    selector: '[data-tutorial="quickpanel-tool-water"]',
    notification: 'Tratamiento de agua: limpia el estanque si notas suciedad o turbidez.',
    modalType: null,
    arrowPosition: 'top',
  },
  {
    key: 'quickpanel-supplements',
    selector: '[data-tutorial="bottom-button-supplements"]',
    notification: 'Botón suplementos: abre las herramientas para balancear tus estanques.',
    modalType: null,
    arrowPosition: 'top',
  },
  {
    key: 'quickpanel-plants',
    selector: '[data-tutorial="bottom-button-plants"]',
    notification: 'Botón plantas: úsalo para atender el ecosistema vegetal.',
    modalType: null,
    arrowPosition: 'top',
  },
  {
    key: 'quickpanel-fish',
    selector: '[data-tutorial="bottom-button-fish"]',
    notification: 'Toca el botón de Peces para ver tus peces favoritos listos para sembrar.',
    modalType: null,
    arrowPosition: 'top',
  },
  {
    key: 'pond-slot-first',
    selector: '[data-tutorial="pond-slot-first"]',
    notification: 'Arrastra el pez desde la barra rápida y suéltalo aquí para plantarlo.',
    modalType: null,
    arrowPosition: 'top',
  },
  {
    key: 'pond-life-bar',
    selector: '[data-tutorial="pond-life-bar"]',
    notification: 'Esta barra amarilla muestra la vida del pez. Si baja demasiado, aliméntalo o atiende problemas.',
    modalType: null,
    arrowPosition: 'top',
    allowOutside: true,
  },
  {
    key: 'pond-growth-timer',
    selector: '[data-tutorial="pond-growth-timer"]',
    notification: 'Este círculo indica cuánto falta para el siguiente estado del pez. Cuando se llene, pasará de fase.',
    modalType: null,
    arrowPosition: 'top',
    allowOutside: true,
  },
  {
    key: 'missions-button',
    selector: '[data-tutorial="missions-button"]',
    notification: 'Abre el panel de Misiones para reclamar tu recompensa por sembrar el pez.',
    modalType: null,
    arrowPosition: 'bottom',
  },
  {
    key: 'missions-first-card',
    selector: '[data-tutorial="missions-first-card"]',
    notification: 'Aquí verás la misión completada por sembrar tu primer pez.',
    modalType: 'missions',
    arrowPosition: 'right',
    containerSelector: '[data-tutorial-container="missions"]',
  },
  {
    key: 'missions-claim',
    selector: '[data-tutorial="missions-claim"]',
    notification: 'Pulsa “Reclamar” para recibir las monedas de esta misión.',
    modalType: 'missions',
    arrowPosition: 'bottom',
    containerSelector: '[data-tutorial-container="missions"]',
  },
];

const TUTORIAL_SEQUENCE = Object.freeze(
  RAW_TUTORIAL_SEQUENCE.map((step, index) => Object.freeze({ ...step, index }))
);

const TUTORIAL_SEQUENCE_BY_KEY = Object.freeze(
  TUTORIAL_SEQUENCE.reduce((acc, step) => {
    acc[step.key] = step;
    return acc;
  }, {})
);

window.CF_TUTORIAL_STEPS = TUTORIAL_SEQUENCE_BY_KEY;

function createInventorySlot(id) {
  return {
    id,
    img: null,
    count: 0,
    fav: false,
    inventoryItemId: null,
    name: null,
    price: 0,
    fishId: null,
    plantId: null,
    supplementId: null,
    categorySlug: null,
    metadata: null,
    pondEgg: null,
    pondAdult: null,
    pondEggDead: null,
    pondAdultDead: null,
    eggStageSeconds: null,
    juvenileStageSeconds: null,
    adultStageSeconds: null,
  };
}

const app = Vue.createApp({
  data() {
    return {
      modal: {
        open: false,
        type: null,
      },
      openerEl: null,
      draggedItem: null, // para el quick panel (stub)
      currentUser: null,
      currentPondId: null,
      pondSlotsLoading: false,
      pondSyncError: null,
      walletSyncError: null,
      walletSyncTimerId: null,
      walletSyncQueue: [],
      walletSyncSending: false,
      pendingPlantRefresh: false,
      fishCatalog: [],
      currentNotification: null,
      notificationQueue: [],
      notificationTimeoutId: null,
      notificationDurationMs: 5000,
      notificationTypes: { ...GAME_NOTIFICATION_TYPE_PRESETS },
      notificationHistory: [],
      notificationHistoryLimit: 30,
      notificationHistoryLoading: false,
      notificationHistoryError: null,
      notificationUnreadCount: 0,
      lastNotificationSync: null,
      toolUsageStats: (() => {
        const stats = {};
        TOOL_USAGE_DEFINITIONS.forEach((definition) => {
          stats[definition.slug] = { ...definition, count: 0 };
        });
        return stats;
      })(),
      tutorial: {
        loading: false,
        active: false,
        currentStep: null,
        completed: false,
        handlerCleanup: null,
        waitHandle: null,
        initialized: false,
        inventoryTargetSlotId: null,
        toolsPanelForced: false,
      },

      // =========================
      //   INVENTARIO (NUEVO)
      // =========================
      inventory: {
        onDropItem: null, // se re-asigna en mounted para usar the onDropItem principal

        selectedButton: 1,
        inventoryInfoOpen: false,
        selectedSlotImg: null,
        selectedMeta: null,
        maxSlot: 9,
        maxFishStack: 5,
        maxFavoritesPerSection: 3,
        profileImg: "./assets/img/perfil.png",
        buttons: [
          { id: 1, name: "Peces", img: "btn1" },
          { id: 2, name: "Plantas", img: "btn2" },
          { id: 3, name: "Suplementos", img: "btn4" },
          { id: 4, name: "Cerrar", img: "btnExit" },
        ],
        actionButtons: [
          { id: "sell" },
          { id: "fav" },
        ],

        sections: {
          1: {
            name: "Peces",
            selectedSlotId: null,
            slots: Array.from({ length: 12 }, (_, idx) => createInventorySlot(idx + 1)),
          },
          2: {
            name: "Plantas",
            selectedSlotId: null,
            slots: Array.from({ length: 12 }, (_, idx) => createInventorySlot(idx + 1)),
          },
          3: {
            name: "Suplementos",
            selectedSlotId: null,
            slots: Array.from({ length: 12 }, (_, idx) => createInventorySlot(idx + 1)),
          },
        },

        showItemPanel: false,
        selectedItemId: null,

        // Timer
        timerDurationSec: 60,
        timerRemainSec: 60,
        timerId: null,

        // Copias para reset de posiciones
        _defaults: null,
        _anchors: null,
      },

      inventoryCatalog: [],
      inventorySnapshot: [],
      inventorySyncing: false,
      inventorySyncQueued: false,

      // =========================
      //   MERCADO
      // =========================
      market: {
        money: "0",
        buyQty: 1,
        selectedButton: 1,
        selectedItemId: null,
        showItemPanel: false,
        buying: false,
        timerDurationSec: 300,
        timerRemainSec: 300,
        timerId: null,
        _defaults: null,
        _anchors: null,
        doubleBonusActive: false,
        doubleBonusMultiplier: 2,
        doubleBonusBaseMultiplier: 2,
        doubleBonusRemainingSec: 0,
        doubleBonusCooldownSec: 0,
        doubleBonusListingId: null,
        doubleBonusStatusSlug: 'inactive',
        doubleBonusEndsAt: null,
        doubleBonusTransitioning: false,
        doubleBonusInitialized: false,
        doubleBonusMinDuration: 45,
        doubleBonusMaxDuration: 90,
        doubleBonusMinCooldown: 120,
        doubleBonusMaxCooldown: 240,
        variantButtons: [
          { id: 1, name: "Peces", img: "btnPond" },
          { id: 2, name: "Plantas", img: "btnStore" },
          { id: 3, name: "Suplementos", img: "btnWater" },
          { id: 4, name: "Salir", img: "btnExit" },
        ],
        categories: {
          1: {
            name: "Peces",
            storeImg: "./assets/img/tienda1.png",
            shelfItems: [
              { id: 1, img: "./assets/img/item.png", x: "62%", y: "40%" },
              { id: 2, img: "./assets/img/item.png", x: "75%", y: "40%" },
              { id: 3, img: "./assets/img/item.png", x: "89%", y: "40%" },
            ],
            items: [
              {
                id: 1,
                name: "Trucha Arcoiris",
                img: "./assets/img/pescado1.png",
                price: 99,
                pondEgg: "./assets/img/huevo2.png",
                pondAdult: "./assets/img/pescado1.png",
                pondEggDead: "./assets/img/huevoM3.png",
                pondAdultDead: "./assets/img/pezMuerto3.png",
                fishId: null,
                inventorySlug: "fish-trucha-arcoiris",
              },
              {
                id: 2,
                name: "Tilapia Azul",
                img: "./assets/img/pescado2.png",
                price: 150,
                pondEgg: "./assets/img/huevo1.png",
                pondAdult: "./assets/img/pescado2.png",
                pondEggDead: "./assets/img/huevoM1.png",
                pondAdultDead: "./assets/img/pezMuerto2.png",
                fishId: null,
                inventorySlug: "fish-tilapia-azul",
              },
              {
                id: 3,
                name: "Pez Pargo",
                img: "./assets/img/pescado3.png",
                price: 200,
                pondEgg: "./assets/img/huevo3.png",
                pondAdult: "./assets/img/pescado3.png",
                pondEggDead: "./assets/img/huevoM3.png",
                pondAdultDead: "./assets/img/pezMuerto1.png",
                fishId: null,
                inventorySlug: "fish-pez-pargo",
              },
              {
                id: 4,
                name: "Langostino",
                img: "./assets/img/pescado4.svg",
                price: 350,
                pondEgg: "./assets/img/huevo4.png",
                pondAdult: "./assets/img/pescado4.svg",
                pondEggDead: "./assets/img/huevoM4.png",
                pondAdultDead: "./assets/img/pezMuerto4.svg",
                fishId: null,
                inventorySlug: "fish-langostino",
              },
            ],
          },
          2: {
            name: "Plantas",
            storeImg: "./assets/img/tienda2.png",
            shelfItems: [
              { id: 1, img: "./assets/img/item.png", x: "62%", y: "40%" },
              { id: 2, img: "./assets/img/item.png", x: "75%", y: "40%" },
              { id: 3, img: "./assets/img/item.png", x: "89%", y: "40%" },
            ],
            items: [
              { id: 1, name: "Red Alagae", img: "./assets/img/redAlgae.svg", price: 60, inventorySlug: "plant-red-algae" },
              { id: 2, name: "Elodea", img: "./assets/img/elodea.svg", price: 95, inventorySlug: "plant-anubias" },
              { id: 3, name: "Water Lettuce", img: "./assets/img/waterLettuce.svg", price: 120, inventorySlug: "plant-musgo-java" },
            ],
          },
          3: {
            name: "Suplementos",
            storeImg: "./assets/img/tienda3.png",
            shelfItems: [
              { id: 1, img: "./assets/img/comida.png", x: "62%", y: "40%" },
              { id: 2, img: "./assets/img/comida.png", x: "75%", y: "40%" },
              { id: 3, img: "./assets/img/comida.png", x: "89%", y: "40%" },
            ],
            items: [
              { id: 1, name: "Fish Pellets", img: "./assets/img/fishPellets.svg", price: 80, inventorySlug: "supplement-fish-pellets" },
              { id: 2, name: "Fish flakes", img: "./assets/img/hojuelaComida.svg", price: 180, inventorySlug: "supplement-fish-flakes" },
              { id: 3, name: "Color Bites", img: "./assets/img/colorBitesFish.svg", price: 70, inventorySlug: "supplement-color-bites" },
            ],
          },
        },
        fishItems: [],
      },

      // =========================
      //   UI HOME / CARDS
      // =========================
      images: [
        {
          id: 1,
          src: "./assets/img/peces.png",
          title: "Aquatic Species",
          content: "Nurture Your Fish",
          alt: "tarjeta de peces",
        },
        {
          id: 2,
          src: "./assets/img/filete.png",
          title: "Complete Missions",
          content: "Gather resources",
          alt: "tarjeta de filete empanizado ",
        },
        {
          id: 3,
          src: "./assets/img/tesoro.png",
          title: "Discover Rewards",
          content: "Sort inventory",
          alt: "tarjeta de inventario",
        },
        {
          id: 4,
          src: "./assets/img/tienda.png",
          title: "Buy and Sell",
          content: "Trade and grow profits",
          alt: "tarjeta de tienda",
        },
      ],

      // title: "START YOUR OWN FISH FARM",
      // play: "PLAY",
      // submit: "Sign Up",
      // enter: "Log In",
      // email: "",
      // farmerName: "",
      // password: "",
      // farmName: "",
      // farmType: "",
      // showMenu: false,
      // openGame: false,
      // logged: false,
      // showPopup: false,

      // =========================
      //   MISIONES
      // =========================
      missions: [],
      missionMoney: 0,
      localMissionsPool: [
        {
          id: "local-1",
          description: "Agrega tu primer pez al estanque",
          eventKey: 'pond.stock',
          levels: [
            { target: 1, reward: 25 },
            { target: 3, reward: 40 },
            { target: 5, reward: 60 },
            { target: 8, reward: 90 },
            { target: 12, reward: 130 },
          ],
        },
        {
          id: "local-2",
          description: "Limpia el estanque una vez",
          eventKey: 'pond.clean',
          levels: [
            { target: 1, reward: 40 },
            { target: 2, reward: 60 },
            { target: 3, reward: 80 },
            { target: 4, reward: 110 },
            { target: 5, reward: 150 },
          ],
        },
        {
          id: "local-3",
          description: "Alimenta a tus peces",
          eventKey: 'pond.feed',
          levels: [
            { target: 3, reward: 60 },
            { target: 6, reward: 80 },
            { target: 10, reward: 110 },
            { target: 15, reward: 150 },
            { target: 20, reward: 200 },
          ],
        },
        {
          id: "local-4",
          description: "Cosecha peces adultos",
          eventKey: 'pond.harvest',
          levels: [
            { target: 1, reward: 80 },
            { target: 2, reward: 110 },
            { target: 4, reward: 150 },
            { target: 6, reward: 190 },
            { target: 8, reward: 240 },
          ],
        },
        {
          id: "local-5",
          description: "Soluciona problemas de oxígeno",
          eventKey: 'pond.solve_oxygen',
          levels: [
            { target: 1, reward: 55 },
            { target: 2, reward: 75 },
            { target: 3, reward: 95 },
            { target: 4, reward: 120 },
            { target: 5, reward: 150 },
          ],
        },
        {
          id: "local-6",
          description: "Compra en el mercado",
          eventKey: 'market.purchase',
          levels: [
            { target: 1, reward: 35 },
            { target: 3, reward: 55 },
            { target: 6, reward: 80 },
            { target: 9, reward: 110 },
            { target: 12, reward: 150 },
          ],
        },
        {
          id: "local-7",
          description: "Compra peces en el mercado",
          eventKey: 'market.purchase_fish',
          levels: [
            { target: 1, reward: 45 },
            { target: 2, reward: 65 },
            { target: 4, reward: 95 },
            { target: 6, reward: 130 },
            { target: 9, reward: 170 },
          ],
        },
        {
          id: "local-8",
          description: "Compra suplementos",
          eventKey: 'market.purchase_supplies',
          levels: [
            { target: 2, reward: 70 },
            { target: 4, reward: 95 },
            { target: 6, reward: 120 },
            { target: 8, reward: 150 },
            { target: 10, reward: 190 },
          ],
        },
        {
          id: "local-9",
          description: "Realiza compras frecuentes",
          eventKey: 'market.purchase',
          levels: [
            { target: 5, reward: 90 },
            { target: 10, reward: 130 },
            { target: 15, reward: 180 },
            { target: 20, reward: 240 },
            { target: 25, reward: 310 },
          ],
        },
      ],


      // =========================
      //   JUEGO / ESTANQUE
      // =========================
      filas: 4,
      columnas: 6,
      grabbedTile: null,
      status: [
        { class: "status0", image: "" },
        { class: "status1", image: "./assets/img/huevo.svg" },
        { class: "status2", image: "./assets/img/pez.svg" },
        { class: "status3", image: "./assets/img/pez.svg" },
        { class: "status4", image: "./assets/img/pez.svg" },
      ],

      tiles: Array(24).fill(0), // índice = estado según array status
      game: {
        effectStateHydrated: false,
        filas: 4,
        columnas: 6,
        problemTimers: {
          /////////////////////////////////////////////////////////
          ph: { interval: 90, timer: null },
          oxygen: { interval: 150, timer: null },
          temperature: { interval: 210, timer: null },
        },

        repairsToday: {
          ph: 0,
          oxygen: 0,
          temperature: 0,
          waterQuality: 0,
        },
        problemsTriggeredToday: {
          ph: false,
          oxygen: false,
          temperature: false,
        },

        dirtAppliedToday: false,

        hungerIntervalSec: 45,
        hungerDamageIntervalSec: 15,
        hungerDamagePerTick: 5,

        tiles: Array.from({ length: 24 }, () => ({
          statusClass: "status0",
          imgSrc: null,

          condition: "clean",
          hasFish: false,
          hasPlant: false,
          plant: null,
          plantImg: null,
          plantPlacedAt: null,
          plantEffects: null,
          plantEffectExpiresAt: null,
          plantEffectSummary: null,
          _plantEffectSignature: null,
          growthRateMultiplier: 1,
          oxygenProtected: false,
          temperatureProtected: false,
          _plantEffectExpiredNotified: false,
          healPopup: null,
          stage: "empty",
          stageTime: 0,
          currentStageDuration: 0,
          slotId: null,
          pondId: null,
          serverStatus: "empty",
          stageStartedAt: null,
          lastFedAt: null,
          lastOxygenatedAt: null,
          lastPhAdjustedAt: null,
          lastCleanedAt: null,
          lastHungerDamageAt: null,
          harvestPrice: DEFAULT_FISH_HARVEST_REWARD,

          //TIMER CICLO DE VIDA //////////////////////////////////////////////////////////
          eggDuration: 120, // segundos para huevo a adulto
          adultDuration: 180, // segundos para cosecha automática
          alive: true,

          // VIDA DEL PEZ
          life: 100,
          maxLife: 100,

          //problemas ph, oxígeno, temperatura, calidad agua //////////////////////////////////////////////////////////
          problems: {
            ph: false,
            oxygen: false,
            temperature: false,
            waterQuality: false,
          },

          // ⭐ Alimentación
          foodUses: 0, // cuántas veces ha comido
          maxFoodUses: 3, // máximo 3 comidas
          hungry: false, // si debe ponerse rojo
          hungrySince: null,
        })),

        slots: [
          {
            id: 1,
            img: "./assets/img/slot.png",
            draggable: false,
            favoriteItem: null,
          },
          {
            id: 2,
            img: "./assets/img/slot.png",
            draggable: false,
            favoriteItem: null,
          },
          {
            id: 3,
            img: "./assets/img/slot.png",
            draggable: false,
            favoriteItem: null,
          },
          {
            id: 4,
            img: "./assets/img/slot.png",
            draggable: false,
            favoriteItem: null,
          },
        ],

        previousSlots: null,
        toolsActive: false,
        quickPanelSectionId: null,

        // Herramientas de regulación
        regulationTools: [
          {
            id: 1,
            slug: 'ph',
            name: "PH Regulator",
            img: "./assets/img/phMedidor.svg",
            count: 2,
            max: 3,
          },
          {
            id: 2,
            slug: 'oxygen',
            name: "Oxygen Regulator",
            img: "./assets/img/oxyTool.svg",
            count: 2,
            max: 3,
          },
          {
            id: 3,
            slug: 'temperature',
            name: "Temperature Control",
            img: "./assets/img/tempController.svg",
            count: 2,
            max: 3,
          },
          {
            id: 4,
            slug: 'water_quality',
            name: "Water Quality",
            img: "./assets/img/waterClean.svg",
            count: 2,
            max: 3,
          },
        ],

        inventoryButton: {
          img: "./assets/img/btnInventory.png",
          alt: "Inventory",
          text: "Inventory",
        },

        navButtons: [
          {
            id: 1,
            img: "./assets/img/btnPond.png",
            label: "Pond",
            type: "pond",
          },
          {
            id: 2,
            img: "./assets/img/btnStore.png",
            label: "Store",
            type: "market",
          },
          {
            id: 3,
            img: "./assets/img/btnMissions.png",
            label: "Missions",
            type: "missions",
          },
        ],

        bottomButtons: [
          {
            id: 1,
            event: "tools",
            img: "./assets/img/btnTools.png",
            alt: "Tools",
          },
          {
            id: 2,
            event: "clean",
            img: "./assets/img/btnPlants.png",
            alt: "Clean",
          },
          {
            id: 3,
            event: "feed",
            img: "./assets/img/btnFood.png",
            alt: "Feed",
          },
          {
            id: 4,
            event: "add-fish",
            img: "./assets/img/btnAdd.png",
            alt: "Add fish",
          },
        ],

        // Colores del timer de ciclo de vida
        timerColors: {
          egg: "hsla(41, 68%, 49%, 1.00)",
          adult: "hsla(11, 100%, 50%, 1.00)",
          ready: "hsla(147, 100%, 36%, 1.00)",
        },
      },

      //   CICLO DÍA/NOCHE //////////////////////////////////////////////////////////////////
      currentCycle: "day", // "day" and "night"
      dayTimerSec: 180,
      nightTimerSec: 180,
      timeLeft: 180,
      cycleInterval: null,
      currentDay: 1,
      dayNightTransition: {
        active: false,
        theme: "day",
        icon: "./assets/img/sol.png",
      },
      dayNightTransitionTimeoutId: null,
    };
  },

  computed: {
    // Market
    marketMaxAffordable() {
      const item = this.marketSelectedItem;
      if (!item) {
        return 0;
      }

      if (this.currentUser && !item.fishId && !item.inventoryItemId) {
        return 0;
      }

      const price = Number(item.price) || 0;
      const money = Number(this.market.money) || 0;
      return price > 0 ? Math.floor(money / price) : 0;
    },
    isAtMaxBuyQty() {
      return (
        this.market.buyQty >= this.marketMaxAffordable &&
        this.marketMaxAffordable > 0
      );
    },
    isAtMinBuyQty() {
      return this.market.buyQty <= 1;
    },
    currentCategory() {
      return this.market.categories[this.market.selectedButton] || null;
    },
    marketCatalogItems() {
      return this.currentCategory?.items || [];
    },
    marketCurrentStore() {
      return this.currentCategory?.storeImg || '';
    },
    marketShelfItems() {
      return this.currentCategory?.shelfItems || [];
    },
    marketTotalPrice() {
      const item = this.marketSelectedItem;
      const price = Number(item?.price) || 0;
      const qty = Number(this.market.buyQty) || 0;
      return price * qty;
    },
    marketSelectedItem() {
      if (!this.market.showItemPanel) {
        return null;
      }

      return (
        this.marketCatalogItems.find(
          (i) => i.id === this.market.selectedItemId
        ) || null
      );
    },

    // Inventario activo
    activeInvSection() {
      return this.inventory.sections[this.inventory.selectedButton] || null;
    },
    activeInvSlots() {
      return this.activeInvSection?.slots || [];
    },
    activeInvSelectedId() {
      return this.activeInvSection?.selectedSlotId || null;
    },
    toolUsageList() {
      return TOOL_USAGE_DEFINITIONS.map((definition) => {
        const stat = this.toolUsageStats[definition.slug] || {};
        const numericCount = Number(stat.count ?? 0);

        return {
          ...definition,
          count: Number.isFinite(numericCount) && numericCount >= 0 ? numericCount : 0,
        };
      });
    },
  },

  methods: {
    // -------- Server sync helpers --------
    loadCurrentUser() {
      try {
        const raw = localStorage.getItem('cf_current_user');
        if (!raw) {
          this.currentUser = null;
          return null;
        }

        const parsed = JSON.parse(raw);

        if (parsed && parsed.id) {
          this.currentUser = parsed;
          return parsed;
        }
      } catch (error) {
        console.warn('No se pudo leer el usuario actual del almacenamiento.', error);
      }

      this.currentUser = null;
      return null;
    },

    async fetchInventory() {
      if (!this.currentUser) {
        return;
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/inventory?user_id=${this.currentUser.id}`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo sincronizar el inventario.');
        }

        const records = Array.isArray(payload?.data) ? payload.data : [];
        this.applyInventoryFromServer(records);
      } catch (error) {
        console.warn('Error al sincronizar inventario:', error);
      }
    },

    async fetchMissions() {
      if (!this.currentUser) {
        this.loadFallbackMissions();
        return;
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/missions`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo sincronizar las misiones.');
        }

        const normalized = Array.isArray(payload?.data)
          ? payload.data
            .map((mission) => this.normalizeServerMission(mission))
            .filter((mission) => mission !== null)
          : [];

        this.missions = normalized.filter((mission) => !mission.claimed);
        this.sortMissions();
      } catch (error) {
        console.warn('Error al sincronizar misiones:', error);
        this.loadFallbackMissions();
      }
    },

    loadFallbackMissions() {
      if (this.missions.length > 0) {
        return;
      }

      const available = Array.isArray(this.localMissionsPool)
        ? [...this.localMissionsPool]
        : [];

      const base = available.slice(0, 4).map((mission, index) => {
        const levels = Array.isArray(mission.levels) && mission.levels.length > 0
          ? mission.levels
          : [{ target: mission.target ?? 1, reward: mission.reward ?? 0 }];
        const maxLevel = levels.length;
        const completed = index < 2;
        const levelIndex = 0;
        const currentLevelConfig = levels[levelIndex] || levels[levels.length - 1];
        const target = currentLevelConfig.target ?? 1;
        const reward = currentLevelConfig.reward ?? mission.reward ?? 0;

        return {
          ...mission,
          rewardImg: './assets/img/recompenza.png',
          completed,
          claimed: false,
          progress: completed ? target : 0,
          target,
          reward,
          currentLevel: 1,
          maxLevel,
          levels,
        };
      });

      this.missions = base;
      this.localMissionsPool = available.slice(base.length);
      this.sortMissions();
    },

    normalizeServerMission(rawMission = {}) {
      if (!rawMission || typeof rawMission !== 'object') {
        return null;
      }

      const reward = Number(rawMission.reward ?? 0);
      const progress = Number(rawMission.progress ?? 0);
      const target = Number(rawMission.target ?? 1);
      const currentLevel = Number(rawMission.current_level ?? 1);
      const maxLevel = Number(rawMission.max_level ?? 5);
      const sortOrder = Number(rawMission.sort_order ?? 0);
      const levels = Array.isArray(rawMission.levels) ? rawMission.levels : [];

      return {
        id: rawMission.id,
        code: rawMission.code,
        description: rawMission.description,
        reward: Number.isFinite(reward) ? reward : 0,
        rewardImg: rawMission.reward_image || './assets/img/recompenza.png',
        completed: !!rawMission.completed,
        claimed: !!rawMission.claimed,
        progress: Number.isFinite(progress) ? progress : 0,
        target: Number.isFinite(target) && target > 0 ? target : 1,
        eventKey: rawMission.event_key || null,
        isRepeatable: !!rawMission.is_repeatable,
        currentLevel: Number.isFinite(currentLevel) && currentLevel > 0 ? currentLevel : 1,
        maxLevel: Number.isFinite(maxLevel) && maxLevel > 0 ? maxLevel : 5,
        sortOrder,
        levels,
      };
    },

    mergeMissionUpdates(list) {
      if (!Array.isArray(list) || list.length === 0) {
        return;
      }

      list
        .map((mission) => this.normalizeServerMission(mission))
        .filter((mission) => mission !== null)
        .forEach((mission) => {
          const index = this.missions.findIndex((existing) => {
            if (mission.id && existing.id) {
              return existing.id === mission.id;
            }

            if (mission.code && existing.code) {
              return existing.code === mission.code;
            }

            return false;
          });

          if (index >= 0) {
            this.missions.splice(index, 1, mission);
          } else if (!mission.claimed) {
            this.missions.push(mission);
          }
        });

      this.missions = this.missions.filter((mission) => !mission.claimed);
      this.sortMissions();
    },

    handleMissionEvent(eventKey, amount = 1) {
      if (!eventKey) {
        return;
      }

      if (this.currentUser) {
        this.recordMissionEvent(eventKey, amount);
      } else {
        this.applyMissionProgressLocally(eventKey, amount);
      }
    },

    applyMissionProgressLocally(eventKey, amount = 1) {
      if (!eventKey || !Array.isArray(this.missions) || this.missions.length === 0) {
        return;
      }

      const increment = Number(amount) || 1;
      let mutated = false;

      this.missions.forEach((mission) => {
        if (mission.claimed || mission.completed) {
          return;
        }

        const missionEventKey = mission.eventKey || mission.event_key || null;
        if (missionEventKey !== eventKey) {
          return;
        }

        const currentProgress = Number(mission.progress ?? 0) || 0;
        const target = Number(mission.target ?? 1) || 1;
        const nextProgress = Math.min(target, currentProgress + increment);
        mission.progress = nextProgress;
        mission.completed = nextProgress >= target;
        mutated = true;
      });

      if (mutated) {
        this.sortMissions();
      }
    },

    async recordMissionEvent(eventKey, amount = 1) {
      if (!this.currentUser || !eventKey) {
        return;
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/missions/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            event: eventKey,
            amount,
          }),
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo actualizar la misión.');
        }

        const updated = Array.isArray(payload?.data) ? payload.data : [];
        this.mergeMissionUpdates(updated);
        this.sortMissions();
      } catch (error) {
        console.warn(`No se pudo registrar el evento de misión ${eventKey}:`, error);
      }
    },

    sortMissions() {
      if (!Array.isArray(this.missions)) {
        return;
      }

      const claimableScore = (mission) => (mission?.completed && !mission?.claimed) ? 1 : 0;
      const baseOrder = (mission) => {
        const value = Number(mission?.sortOrder);
        return Number.isFinite(value) ? value : 9999;
      };

      this.missions.sort((a, b) => {
        const diffClaimable = claimableScore(b) - claimableScore(a);
        if (diffClaimable !== 0) {
          return diffClaimable;
        }

        const diffOrder = baseOrder(a) - baseOrder(b);
        if (diffOrder !== 0) {
          return diffOrder;
        }

        const aId = a?.id ?? '';
        const bId = b?.id ?? '';
        return String(aId).localeCompare(String(bId));
      });
    },

    async fetchInventoryCatalog() {
      try {
        const response = await fetch(`${API_SERVER}/api/v1/inventory-items`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo cargar el catálogo de inventario.');
        }

        this.inventoryCatalog = Array.isArray(payload?.data) ? payload.data : [];
        this.applyInventoryCatalogToMarket();
      } catch (error) {
        console.warn('Error al cargar el catálogo de inventario:', error);
        this.inventoryCatalog = [];
      }
    },

    applyInventoryCatalogToMarket() {
      if (!Array.isArray(this.inventoryCatalog) || !this.inventoryCatalog.length) {
        return;
      }

      const itemsBySlug = this.inventoryCatalog.reduce((acc, item) => {
        if (item?.slug) {
          acc[item.slug] = item;
        }
        return acc;
      }, {});

      Object.entries(this.market.categories).forEach(([categoryId, category]) => {
        category.items.forEach((item) => {
          let match = null;

          if (item.inventorySlug && itemsBySlug[item.inventorySlug]) {
            match = itemsBySlug[item.inventorySlug];
          }

          if (!match && item.fishId) {
            match = this.inventoryCatalog.find((candidate) => candidate?.fish_id === item.fishId) || null;
          }

          if (!match) {
            return;
          }

          item.inventoryItemId = match.id;
          item.name = match.name ?? item.name;
          item.price = match.price ?? item.price;
          item.img = match.image_path ?? item.img;
          item.pondEgg = match.pond_egg_image_path ?? item.pondEgg;
          item.pondAdult = match.pond_adult_image_path ?? item.pondAdult;
          item.pondEggDead = match.pond_egg_dead_image_path ?? item.pondEggDead;
          item.pondAdultDead = match.pond_adult_dead_image_path ?? item.pondAdultDead;
          item.fishId = match.fish_id ?? item.fishId;

          if (match.metadata) {
            item.eggStageSeconds = match.metadata.egg_stage_seconds ?? item.eggStageSeconds;
            item.juvenileStageSeconds = match.metadata.juvenile_stage_seconds ?? item.juvenileStageSeconds;
            item.adultStageSeconds = match.metadata.adult_stage_seconds ?? item.adultStageSeconds;
          }

          item.categorySlug = match.category?.slug ?? item.categorySlug ?? null;

          if (match.metadata) {
            try {
              item.metadata = JSON.parse(JSON.stringify(match.metadata));
            } catch (error) {
              item.metadata = { ...match.metadata };
            }
          }

          item.plantId = match.plant_id ?? item.plantId ?? null;
          item.supplementId = match.supplement_id ?? item.supplementId ?? null;

          item.inventorySlug = match.slug ?? item.inventorySlug;
          item.categorySlug = item.categorySlug || item.metadata?.category_slug || item.metadata?.categorySlug || null;
        });
      });

      if (this.market.categories[1]) {
        this.market.fishItems = this.market.categories[1].items.map((item) => ({ ...item }));
      }
    },

    applyInventoryFromServer(records) {
      const sections = this.inventory.sections;
      const grouped = {
        1: [],
        2: [],
        3: [],
      };

      const previousSelections = {};
      Object.entries(sections).forEach(([sectionId, section]) => {
        const currentSelectionId = section?.selectedSlotId || null;
        const currentSlot = currentSelectionId
          ? section.slots.find((slot) => slot.id === currentSelectionId)
          : null;

        previousSelections[sectionId] = {
          slotId: currentSelectionId,
          inventoryItemId: currentSlot?.inventoryItemId ?? null,
          img: currentSlot?.img ?? null,
        };
      });

      const snapshot = new Set();

      records.forEach((record) => {
        const item = record?.item;
        const quantity = Number(record?.quantity ?? 0);
        const inventoryItemId = record?.inventory_item_id ?? item?.id;

        if (!item || !quantity || quantity <= 0) {
          if (inventoryItemId) {
            snapshot.add(inventoryItemId);
          }
          return;
        }

        const sectionId = this.sectionIdFromCategoryName(item?.category?.name);

        if (!sectionId || !sections[sectionId]) {
          snapshot.add(inventoryItemId);
          return;
        }

        grouped[sectionId].push({ record, item, quantity, inventoryItemId });
        snapshot.add(inventoryItemId);
      });

      Object.entries(sections).forEach(([sectionId, section]) => {
        section.slots.forEach((slot) => this.resetInventorySlot(slot));

        const entries = grouped[sectionId] || [];
        let slotIndex = 0;

        entries.forEach(({ record, item, quantity, inventoryItemId }) => {
          let remaining = quantity;
          const isFavorite = !!record.is_favorite;
          const computedLimit = this.getInventoryStackLimit(sectionId, {
            categorySlug: item.category?.slug ?? null,
            fishId: item.fish_id ?? null,
          });
          const stackLimit = computedLimit > 0 ? computedLimit : 1;

          while (remaining > 0 && slotIndex < section.slots.length) {
            const slot = section.slots[slotIndex];
            const stackCount = Math.min(stackLimit, remaining);

            this.fillInventorySlot(slot, {
              img: item.image_path || item.img || null,
              count: stackCount,
              fav: isFavorite && (remaining === quantity),
              inventoryItemId,
              name: item.name,
              price: item.price,
              fishId: item.fish_id,
              plantId: item.plant_id ?? null,
              supplementId: item.supplement_id ?? null,
              categorySlug: item.category?.slug ?? null,
              inventorySlug: item.slug ?? null,
              metadata: item.metadata ? JSON.parse(JSON.stringify(item.metadata)) : null,
              pondEgg: item.pond_egg_image_path,
              pondAdult: item.pond_adult_image_path,
              pondEggDead: item.pond_egg_dead_image_path,
              pondAdultDead: item.pond_adult_dead_image_path,
              eggStageSeconds: item.metadata?.egg_stage_seconds,
              juvenileStageSeconds: item.metadata?.juvenile_stage_seconds,
              adultStageSeconds: item.metadata?.adult_stage_seconds,
            });

            remaining -= stackCount;
            slotIndex += 1;
          }

          if (remaining > 0) {
            console.warn(`Sin espacio suficiente para el item ${item.name} en el inventario.`);
          }
        });

        this.packInventorySection(section);

        const previous = previousSelections[sectionId] || {};

        if (previous.inventoryItemId || previous.img) {
          const matchingSlot = section.slots.find((slot) => {
            if (!slot.img) {
              return false;
            }

            if (previous.inventoryItemId && slot.inventoryItemId) {
              return slot.inventoryItemId === previous.inventoryItemId;
            }

            return previous.img ? slot.img === previous.img : false;
          });

          if (matchingSlot) {
            section.selectedSlotId = matchingSlot.id;
            return;
          }
        }

        const firstFilled = section.slots.find((slot) => slot.img);
        section.selectedSlotId = firstFilled ? firstFilled.id : null;
      });

      this.inventorySnapshot = Array.from(snapshot);
      this.syncQuickPanelWithFavorites();
    },

    sectionIdFromCategoryName(name) {
      const normalized = (name || '').toLowerCase();

      if (normalized.includes('peces') || normalized.includes('fish')) {
        return 1;
      }

      if (normalized.includes('plant')) {
        return 2;
      }

      if (normalized.includes('suplement') || normalized.includes('supplement')) {
        return 3;
      }

      return null;
    },

    resetInventorySlot(slot) {
      slot.img = null;
      slot.count = 0;
      slot.fav = false;
      slot.inventoryItemId = null;
      slot.name = null;
      slot.price = 0;
      slot.fishId = null;
      slot.plantId = null;
      slot.supplementId = null;
      slot.categorySlug = null;
      slot.inventorySlug = null;
      slot.metadata = null;
      slot.pondEgg = null;
      slot.pondAdult = null;
      slot.pondEggDead = null;
      slot.pondAdultDead = null;
      slot.eggStageSeconds = null;
      slot.juvenileStageSeconds = null;
      slot.adultStageSeconds = null;
    },

    fillInventorySlot(slot, data) {
      slot.img = data.img ?? null;
      slot.count = Number(data.count ?? 0) || 0;
      slot.fav = !!data.fav;
      slot.inventoryItemId = data.inventoryItemId ?? null;
      slot.name = data.name ?? null;
      slot.price = Number(data.price ?? slot.price ?? 0) || 0;
      slot.fishId = data.fishId ?? null;
      slot.plantId = data.plantId ?? null;
      slot.supplementId = data.supplementId ?? null;
      slot.categorySlug = data.categorySlug ?? slot.categorySlug ?? null;
      slot.inventorySlug = data.inventorySlug ?? slot.inventorySlug ?? null;
      slot.metadata = data.metadata ? { ...data.metadata } : null;
      slot.pondEgg = data.pondEgg ?? null;
      slot.pondAdult = data.pondAdult ?? null;
      slot.pondEggDead = data.pondEggDead ?? null;
      slot.pondAdultDead = data.pondAdultDead ?? null;
      slot.eggStageSeconds = data.eggStageSeconds ?? null;
      slot.juvenileStageSeconds = data.juvenileStageSeconds ?? null;
      slot.adultStageSeconds = data.adultStageSeconds ?? null;
    },

    buildSlotDataFromItem(item, overrides = {}) {
      const metadataSource = item?.metadata || {};
      let metadataCopy = null;

      try {
        metadataCopy = metadataSource ? JSON.parse(JSON.stringify(metadataSource)) : null;
      } catch (error) {
        metadataCopy = typeof metadataSource === 'object' && metadataSource !== null ? { ...metadataSource } : null;
      }

      return {
        img: item.img || item.image_path || null,
        count: overrides.count ?? 1,
        fav: overrides.fav ?? false,
        inventoryItemId: item.inventoryItemId ?? item.id ?? null,
        slug: item.inventorySlug ?? item.slug ?? item.metadata?.slug ?? null,
        inventorySlug: item.inventorySlug ?? item.slug ?? item.metadata?.slug ?? null,
        name: item.name ?? null,
        price: item.price ?? 0,
        fishId: item.fishId ?? item.fish_id ?? null,
        plantId: item.plantId ?? item.plant_id ?? null,
        supplementId: item.supplementId ?? item.supplement_id ?? null,
        categorySlug: item.categorySlug ?? item.category?.slug ?? metadataSource?.category_slug ?? null,
        metadata: metadataCopy,
        pondEgg: item.pondEgg ?? item.pond_egg_image_path ?? null,
        pondAdult: item.pondAdult ?? item.pond_adult_image_path ?? null,
        pondEggDead: item.pondEggDead ?? item.pond_egg_dead_image_path ?? null,
        pondAdultDead: item.pondAdultDead ?? item.pond_adult_image_path ?? null,
        eggStageSeconds:
          overrides.eggStageSeconds ?? item.eggStageSeconds ?? metadataSource.egg_stage_seconds ?? null,
        juvenileStageSeconds:
          overrides.juvenileStageSeconds ?? item.juvenileStageSeconds ?? metadataSource.juvenile_stage_seconds ?? null,
        adultStageSeconds:
          overrides.adultStageSeconds ?? item.adultStageSeconds ?? metadataSource.adult_stage_seconds ?? null,
      };
    },

    getInventoryStackLimit(sectionId, slotData = {}) {
      const numericSection = Number(sectionId);
      const fallback = Number(this.inventory.maxSlot ?? 0) || 9;
      const fishLimit = Number(this.inventory.maxFishStack ?? 0) || 5;

      const categorySlug = (slotData?.categorySlug || '').toLowerCase();
      const isFishCategory =
        numericSection === 1 ||
        (slotData?.fishId && Number(slotData.fishId) > 0) ||
        categorySlug.includes('pez') ||
        categorySlug.includes('fish');

      return isFishCategory ? fishLimit : fallback;
    },

    resolveInventoryItemType(item) {
      if (!item) {
        return 'unknown';
      }

      const normalizeId = (value) => {
        if (value === null || value === undefined || value === '') {
          return null;
        }

        const parsed = Number(value);
        return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
      };

      const metadataType = (item?.metadata?.type || '').toLowerCase();
      const categorySlug = (item?.categorySlug || item?.category?.slug || '').toLowerCase();

      const normalizedFishId = normalizeId(item?.fishId ?? item?.fish_id);
      const normalizedPlantId = normalizeId(item?.plantId ?? item?.plant_id);
      const normalizedSupplementId = normalizeId(item?.supplementId ?? item?.supplement_id);

      if (normalizedFishId !== null) {
        item.fishId = normalizedFishId;
      }

      if (normalizedPlantId !== null) {
        item.plantId = normalizedPlantId;
      }

      if (normalizedSupplementId !== null) {
        item.supplementId = normalizedSupplementId;
      }

      const hasFish = normalizedFishId !== null;
      const hasPlant = normalizedPlantId !== null;
      const hasSupplement = normalizedSupplementId !== null;

      if (metadataType === 'plant') {
        return 'plant';
      }

      if (metadataType === 'supplement') {
        return 'supplement';
      }

      if (metadataType === 'fish') {
        return 'fish';
      }

      if (categorySlug === 'plants') {
        return 'plant';
      }

      if (categorySlug === 'supplements') {
        return 'supplement';
      }

      if (categorySlug === 'fish') {
        return 'fish';
      }

      if (hasPlant && !hasFish && !hasSupplement) {
        return 'plant';
      }

      if (hasSupplement && !hasFish && !hasPlant) {
        return 'supplement';
      }

      if (hasFish && !hasPlant && !hasSupplement) {
        return 'fish';
      }

      if (hasPlant) {
        return 'plant';
      }

      if (hasSupplement) {
        return 'supplement';
      }

      if (hasFish) {
        return 'fish';
      }

      return 'unknown';
    },

    resolveInventoryModelId(item, type) {
      if (!item) {
        return null;
      }

      const normalizeId = (value) => {
        if (value === null || value === undefined || value === '') {
          return null;
        }

        const parsed = Number(value);
        return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
      };

      const camelKey = `${type}Id`;
      const snakeKey = `${type}_id`;

      const directValue = item[camelKey] ?? item[snakeKey];
      const normalizedDirect = normalizeId(directValue);
      if (normalizedDirect !== null) {
        item[camelKey] = normalizedDirect;
        return normalizedDirect;
      }

      const nested = item[type];
      const nestedId = normalizeId(nested?.id);
      if (nestedId !== null) {
        item[camelKey] = nestedId;
        return nestedId;
      }

      if (item.inventoryItemId && Array.isArray(this.inventoryCatalog)) {
        const match = this.inventoryCatalog.find((candidate) => candidate?.id === item.inventoryItemId);
        if (match) {
          const catalogValue = match[snakeKey] ?? match[camelKey] ?? match?.[type]?.id ?? null;
          const normalizedCatalog = normalizeId(catalogValue);
          if (normalizedCatalog !== null) {
            item[camelKey] = normalizedCatalog;
            return normalizedCatalog;
          }
        }
      }

      const metadata = item.metadata && typeof item.metadata === 'object' ? item.metadata : null;
      if (metadata) {
        const metaValue = metadata[snakeKey] ?? metadata[camelKey] ?? metadata.id ?? null;
        const normalizedMeta = normalizeId(metaValue);
        if (normalizedMeta !== null) {
          item[camelKey] = normalizedMeta;
          return normalizedMeta;
        }
      }

      return null;
    },

    collectInventoryPayload() {
      const payloadMap = new Map();

      (this.inventorySnapshot || []).forEach((itemId) => {
        payloadMap.set(itemId, {
          inventory_item_id: itemId,
          quantity: 0,
          is_favorite: false,
        });
      });

      Object.values(this.inventory.sections).forEach((section) => {
        section.slots.forEach((slot) => {
          if (!slot.inventoryItemId || !slot.count) {
            return;
          }

          const entry = payloadMap.get(slot.inventoryItemId) || {
            inventory_item_id: slot.inventoryItemId,
            quantity: 0,
            is_favorite: false,
          };

          entry.quantity += slot.count;
          entry.is_favorite = entry.is_favorite || !!slot.fav;

          payloadMap.set(slot.inventoryItemId, entry);
        });
      });

      return Array.from(payloadMap.values());
    },

    async persistInventoryState() {
      if (!this.currentUser) {
        return;
      }

      if (this.inventorySyncing) {
        this.inventorySyncQueued = true;
        return;
      }

      const items = this.collectInventoryPayload();

      this.inventorySyncing = true;

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/inventory`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            user_id: this.currentUser.id,
            items,
          }),
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo guardar el inventario.');
        }

        const records = Array.isArray(payload?.data) ? payload.data : [];
        this.applyInventoryFromServer(records);
      } catch (error) {
        console.warn('Error al guardar el inventario:', error);
      } finally {
        this.inventorySyncing = false;

        if (this.inventorySyncQueued) {
          this.inventorySyncQueued = false;
          this.persistInventoryState();
        }
      }
    },

    async bootstrapFromServer() {
      const user = this.loadCurrentUser();

      if (!user) {
        this.loadFallbackMissions();
        this.resetToolUsageStats();
        return;
      }

      await this.fetchWalletBalance();
      await this.fetchFishCatalog();
      await this.fetchInventoryCatalog();
      await this.fetchPondState();
      await this.fetchInventory();
      await this.fetchToolUsage();
      await this.fetchMissions();
      await this.syncNotificationHistory();
    },

    async initializeTutorial() {
      if (this.tutorial.initialized) {
        return;
      }

      this.tutorial.initialized = true;

      if (!this.currentUser) {
        return;
      }

      this.tutorial.loading = true;

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/tutorial`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo cargar el progreso del tutorial.');
        }

        const completed = Boolean(payload?.tutorial_completed);
        const storedStep = payload?.tutorial_step || null;

        this.tutorial.completed = completed;

        if (completed) {
          this.tutorial.active = false;
          this.tutorial.currentStep = null;
          return;
        }

        const nextStep = this.determineNextTutorialStep(storedStep);

        if (!nextStep) {
          return;
        }

        this.startTutorial(nextStep.key, { notify: true, persist: false });
      } catch (error) {
        console.warn('No se pudo iniciar el tutorial guiado:', error);
      } finally {
        this.tutorial.loading = false;
      }
    },

    determineNextTutorialStep(storedStepKey) {
      if (!Array.isArray(TUTORIAL_SEQUENCE) || TUTORIAL_SEQUENCE.length === 0) {
        return null;
      }

      if (!storedStepKey) {
        return TUTORIAL_SEQUENCE[0];
      }

      return TUTORIAL_SEQUENCE_BY_KEY[storedStepKey] || TUTORIAL_SEQUENCE[0];
    },

    startTutorial(stepKey, options = {}) {
      const step = typeof stepKey === 'string'
        ? TUTORIAL_SEQUENCE_BY_KEY[stepKey]
        : stepKey;

      if (!step) {
        return;
      }

      this.tutorial.active = true;
      this.goToTutorialStep(step.key, options);
    },

    goToTutorialStep(stepKey, { notify = true, persist = true } = {}) {
      const step = TUTORIAL_SEQUENCE_BY_KEY[stepKey];

      if (!step) {
        return;
      }

      this.clearTutorialTargetListener();

      if (step.modalType) {
        this.ensureModalOpenForTutorial(step.modalType);
      } else if (this.modal.open) {
        this.ensureModalOpenForTutorial(null);
      }

      this.tutorial.currentStep = step.key;
      this.tutorial.active = true;

      if (persist && this.currentUser) {
        this.persistTutorialState({ stepKey: step.key, completed: false });
      }

      this.prepareTutorialStep(step);
      this.scheduleAutoAdvanceIfNeeded(step);
    },

    prepareTutorialStep(step) {
      if (!step) {
        return;
      }

      this.tutorial.inventoryTargetSlotId = null;

      if (step.key === 'market-categories') {
        this.market.showItemPanel = false;
        this.market.selectedItemId = null;
      }

      if (step.key === 'market-select-fish') {
        if (this.market.selectedButton !== 1) {
          this.market.selectedButton = 1;
        }
        this.market.showItemPanel = false;
        this.market.selectedItemId = null;
      }

      if (step.key === 'market-buy-button') {
        if (!this.market.showItemPanel) {
          this.market.buyQty = 1;
        }
      }

      if (step.key === 'lobby-inventory') {
        this.closeModal();
      }

      if (step.key === 'inventory-categories' || step.key === 'inventory-select-fish' || step.key === 'inventory-sell-info' || step.key === 'inventory-favorite-info' || step.key === 'inventory-mark-favorite') {
        if (this.inventory.selectedButton !== 1) {
          this.inventory.selectedButton = 1;
        }
      }

      if (step.key === 'inventory-select-fish') {
        this.clearAllSectionSelections();
        this.resetInventoryUI();
        const slotId = this.findFirstFilledInventorySlotId(1);
        this.tutorial.inventoryTargetSlotId = slotId;
      }

      if (step.key === 'lobby-pond-slots') {
        if (this.modal.open) {
          this.closeModal();
        }
        this.ensureToolsPanelHidden(true);
      }

      if (step.key === 'quickpanel-tools') {
        this.ensureToolsPanelHidden(true);
      }

      if (step.key === 'quickpanel-overview' || step.key.startsWith('quickpanel-tool-')) {
        this.ensureToolsPanelVisible();
      }

      if (['quickpanel-supplements', 'quickpanel-plants', 'quickpanel-fish', 'pond-slot-first'].includes(step.key)) {
        this.ensureToolsPanelHidden();
      }

      if (step.key === 'pond-slot-first') {
        if (this.game.quickPanelSectionId !== 1) {
          this.loadFavoritesFromSection(1);
        }
      }

      if (step.key === 'missions-button') {
        if (this.modal.open) {
          this.closeModal();
        }
        this.ensureToolsPanelHidden(true);
      }

      if (step.key === 'missions-first-card' || step.key === 'missions-claim') {
        this.ensureToolsPanelHidden(true);
        this.sortMissions();
      }
    },

    ensureToolsPanelVisible() {
      if (!this.game.toolsActive) {
        this.onTools();
        this.tutorial.toolsPanelForced = true;
        return;
      }

      if (!this.tutorial.toolsPanelForced) {
        this.tutorial.toolsPanelForced = true;
      }
    },

    ensureToolsPanelHidden(force = false) {
      if (this.game.toolsActive && (this.tutorial.toolsPanelForced || force)) {
        this.onTools();
      }

      if (force || this.tutorial.toolsPanelForced) {
        this.tutorial.toolsPanelForced = false;
      }
    },

    ensureModalOpenForTutorial(modalType) {
      if (!modalType) {
        if (this.modal.open) {
          this.closeModal();
        }
        return;
      }

      if (this.modal.open && this.modal.type === modalType) {
        return;
      }

      if (this.modal.open && this.modal.type !== modalType) {
        const target = modalType;
        this.closeModal();
        this.$nextTick(() => this.openModal(target));
        return;
      }

      this.openModal(modalType);
    },

    clearTutorialTargetListener() {
      if (this.tutorial.handlerCleanup) {
        this.tutorial.handlerCleanup();
        this.tutorial.handlerCleanup = null;
      }

      if (this.tutorial.waitHandle) {
        clearTimeout(this.tutorial.waitHandle);
        this.tutorial.waitHandle = null;
      }
    },

    scheduleAutoAdvanceIfNeeded(step) {
      if (!step) {
        return;
      }

      const autoAdvanceMap = {
        'market-timer': { next: 'market-coins', delay: 3000 },
        'market-coins': {
          next: 'lobby-inventory',
          delay: 3200,
          beforeAdvance: () => {
            if (this.modal.open && this.modal.type === 'market') {
              this.closeModal();
            }
          },
        },
        'inventory-sell-info': { next: 'inventory-favorite-info', delay: 3500 },
        'inventory-favorite-info': { next: 'inventory-mark-favorite', delay: 3500 },
        'lobby-pond-slots': { next: 'quickpanel-tools', delay: 3600 },
        'quickpanel-tools': {
          next: 'quickpanel-overview',
          delay: 3200,
          beforeAdvance: () => {
            this.ensureToolsPanelVisible();
          },
        },
        'quickpanel-overview': { next: 'quickpanel-tool-ph', delay: 3200 },
        'quickpanel-tool-ph': { next: 'quickpanel-tool-oxygen', delay: 3200 },
        'quickpanel-tool-oxygen': { next: 'quickpanel-tool-temperature', delay: 3200 },
        'quickpanel-tool-temperature': { next: 'quickpanel-tool-water', delay: 3200 },
        'quickpanel-tool-water': {
          next: 'quickpanel-supplements',
          delay: 3200,
          beforeAdvance: () => {
            this.ensureToolsPanelHidden();
          },
        },
        'quickpanel-supplements': { next: 'quickpanel-plants', delay: 3200 },
        'quickpanel-plants': { next: 'quickpanel-fish', delay: 3200 },
        'quickpanel-fish': {
          next: 'pond-slot-first',
          delay: 3500,
          beforeAdvance: () => {
            this.ensureToolsPanelHidden(true);
          },
        },
        'pond-life-bar': { next: 'pond-growth-timer', delay: 3200 },
        'pond-growth-timer': { next: 'missions-button', delay: 3200 },
        'missions-first-card': { next: 'missions-claim', delay: 3200 },
      };

      const config = autoAdvanceMap[step.key];

      if (!config) {
        return;
      }

      this.clearTutorialTargetListener();
      this.tutorial.waitHandle = setTimeout(() => {
        if (this.tutorial.currentStep === step.key) {
          if (typeof config.beforeAdvance === 'function') {
            config.beforeAdvance();
          }
        }

        if (this.tutorial.currentStep === step.key) {
          if (config.next === '__complete__') {
            this.completeTutorial();
          } else {
            this.advanceTutorialStep(config.next);
          }
        }
      }, config.delay);
    },

    async persistTutorialState({ stepKey = null, completed = false } = {}) {
      if (!this.currentUser) {
        return;
      }

      const payload = completed
        ? { tutorial_completed: true, tutorial_step: null }
        : { tutorial_completed: false, tutorial_step: stepKey };

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/tutorial`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.warn('No se pudo guardar el progreso del tutorial.');
        }
      } catch (error) {
        console.warn('No se pudo guardar el progreso del tutorial:', error);
      }
    },

    advanceTutorialStep(nextKey) {
      if (!nextKey) {
        this.completeTutorial();
        return;
      }

      this.goToTutorialStep(nextKey, { notify: true, persist: true });
    },

    onTutorialEvent(eventName, payload) {
      if (!this.tutorial.active) {
        return;
      }

      const stepKey = this.tutorial.currentStep;

      switch (stepKey) {
        case 'lobby-market':
          if (eventName === 'opened-modal' && payload === 'market') {
            this.advanceTutorialStep('market-categories');
          }
          break;
        case 'market-categories':
          if (eventName === 'selected-market-category' && payload?.id === 1) {
            this.advanceTutorialStep('market-select-fish');
          }
          break;
        case 'market-select-fish':
          if (eventName === 'opened-market-item') {
            this.advanceTutorialStep('market-buy-button');
          }
          break;
        case 'market-buy-button':
          if (eventName === 'completed-market-purchase' && payload?.success) {
            this.advanceTutorialStep('market-timer');
          }
          break;
        case 'market-timer':
          if (eventName === 'tutorial-target-click' && payload === 'market-timer') {
            this.advanceTutorialStep('market-coins');
          }
          break;
        case 'market-coins':
          if (eventName === 'closed-modal' && payload === 'market') {
            this.advanceTutorialStep('lobby-inventory');
          }
          break;
        case 'lobby-inventory':
          if (eventName === 'opened-modal' && payload === 'inventory') {
            this.advanceTutorialStep('inventory-categories');
          }
          break;
        case 'inventory-categories':
          if (eventName === 'selected-inventory-category' && payload?.id === 1) {
            this.advanceTutorialStep('inventory-select-fish');
          }
          break;
        case 'inventory-select-fish':
          if (eventName === 'selected-inventory-slot' && payload?.hasItem) {
            this.advanceTutorialStep('inventory-sell-info');
          }
          break;
        case 'inventory-mark-favorite':
          if (eventName === 'inventory-favorite-toggled' && payload?.fav) {
            this.advanceTutorialStep('lobby-pond-slots');
          }
          break;
        case 'quickpanel-fish':
          if (eventName === 'pressed-fish-button') {
            this.advanceTutorialStep('pond-slot-first');
          }
          break;
        case 'pond-slot-first':
          if (eventName === 'pond-slot-stocked' && payload?.success && Number(payload.tileIndex) === 0) {
            this.advanceTutorialStep('pond-life-bar');
          }
          break;
        case 'missions-button':
          if (eventName === 'opened-modal' && payload === 'missions') {
            this.advanceTutorialStep('missions-first-card');
          }
          break;
        case 'missions-claim':
          if (eventName === 'mission-claimed') {
            const missionKey = payload?.mission?.eventKey || payload?.mission?.event_key || null;
            if (!missionKey || missionKey === 'pond.stock') {
              this.completeTutorial();
            }
          }
          break;
        default:
          break;
      }
    },

    onTutorialTargetClick(key) {
      if (!this.tutorial.active) {
        return;
      }

      this.onTutorialEvent('tutorial-target-click', key);
    },

    async completeTutorial() {
      if (this.tutorial.completed) {
        this.tutorial.active = false;
        this.tutorial.currentStep = null;
        return;
      }

      this.clearTutorialTargetListener();
      this.tutorial.active = false;
      this.tutorial.currentStep = null;
      this.tutorial.completed = true;
      this.tutorial.inventoryTargetSlotId = null;
      this.ensureToolsPanelHidden(true);

      await this.persistTutorialState({ stepKey: null, completed: true });

      this.closeModal();

      this.notify('¡Listo! Ya conoces el Mercado, el Inventario, el estanque y tus misiones.', 'success');
    },

    async fetchFishCatalog() {
      try {
        const response = await fetch(`${API_SERVER}/api/v1/fish`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo obtener la lista de peces.');
        }

        this.fishCatalog = Array.isArray(payload?.data) ? payload.data : [];
        this.mapFishCatalogToMarket();
      } catch (error) {
        console.warn('Sincronización de peces falló:', error);
      }
    },

    mapFishCatalogToMarket() {
      const categories = this.market?.categories || {};
      const fishItems = categories[1]?.items || [];

      if (!fishItems.length || !this.fishCatalog.length) {
        return;
      }

      const catalogByName = this.fishCatalog.reduce((acc, fish) => {
        if (fish?.name) {
          acc[fish.name.toLowerCase()] = fish;
        }
        return acc;
      }, {});

      fishItems.forEach((item) => {
        const key = (item?.name || '').toLowerCase();
        const match = catalogByName[key];

        if (!match) {
          return;
        }

        item.fishId = match.id;
        item.price = match.price;
        item.eggImg = match.egg_image;
        item.adultImg = match.adult_image;
        item.eggDeadImg = match.egg_dead_image;
        item.adultDeadImg = match.adult_dead_image;
        item.eggStageSeconds = match.egg_stage_seconds;
        item.juvenileStageSeconds = match.juvenile_stage_seconds;
        item.adultStageSeconds = match.adult_stage_seconds;
      });

      this.market.fishItems = fishItems.map((item) => ({ ...item }));
    },

    async fetchPondState() {
      if (!this.currentUser) {
        return;
      }

      this.pondSlotsLoading = true;
      this.pondSyncError = null;

      try {
        const queryUser = encodeURIComponent(this.currentUser.id);
        const response = await fetch(`${API_SERVER}/api/v1/ponds?user_id=${queryUser}`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo sincronizar el estanque.');
        }

        const ponds = Array.isArray(payload?.data) ? payload.data : [];

        if (!ponds.length) {
          this.currentPondId = null;
          this.resetTilesToEmpty();
          this.currentDay = 1;
          return;
        }

        const pond = ponds[0];
        this.currentPondId = pond.id;
        this.applyPondState(pond);
      } catch (error) {
        this.pondSyncError = error?.message || 'No se pudo sincronizar el estanque.';
        console.warn('Error al cargar el estanque:', error);
      } finally {
        this.pondSlotsLoading = false;
      }
    },

    async fetchWalletBalance() {
      if (!this.currentUser) {
        return;
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/wallet`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo sincronizar la cartera.');
        }

        const balance = Number(payload?.data?.balance ?? 0);
        const normalized = Number.isFinite(balance) ? balance : 0;
        this.market.money = String(normalized);
        this.walletSyncError = null;
        this.walletSyncQueue = [];
        this.walletSyncSending = false;
      } catch (error) {
        console.warn('Error al cargar la cartera:', error);
        this.walletSyncError = error?.message || 'No se pudo sincronizar la cartera.';
      }
    },

    normalizeWalletBalance(value) {
      const numeric = Number(value);

      if (!Number.isFinite(numeric)) {
        return null;
      }

      const rounded = Math.round(numeric);
      const clamped = Math.min(Math.max(rounded, 0), Number.MAX_SAFE_INTEGER);

      return clamped;
    },

    queueWalletSync(balance, options = {}) {
      if (!this.currentUser) {
        return;
      }

      const normalized = this.normalizeWalletBalance(balance);

      if (typeof normalized !== 'number' || !Number.isFinite(normalized)) {
        return;
      }

      const payload = {
        balance: normalized,
        transactionType: options.transactionType ? String(options.transactionType) : null,
        event: options.event ? String(options.event) : null,
      };

      this.walletSyncQueue.push(payload);

      if (this.walletSyncTimerId) {
        clearTimeout(this.walletSyncTimerId);
        this.walletSyncTimerId = null;
      }

      if (options.forceImmediately) {
        this.flushWalletSync();
        return;
      }

      if (this.walletSyncSending) {
        return;
      }

      this.walletSyncTimerId = setTimeout(() => {
        this.walletSyncTimerId = null;
        this.flushWalletSync();
      }, 250);
    },

    async flushWalletSync() {
      if (this.walletSyncSending || !this.currentUser) {
        return;
      }

      const nextPayload = this.walletSyncQueue[0];

      if (!nextPayload) {
        return;
      }

      await this.persistWalletBalance(nextPayload);
    },

    async persistWalletBalance(payload = {}) {
      if (!this.currentUser) {
        return;
      }

      const target = this.normalizeWalletBalance(payload.balance);

      if (typeof target !== 'number' || !Number.isFinite(target)) {
        this.walletSyncQueue.shift();
        return;
      }

      this.walletSyncSending = true;

      const body = {
        user_id: this.currentUser.id,
        balance: target,
      };

      if (payload.transactionType) {
        body.transaction_type = payload.transactionType;
      }

      if (payload.event) {
        body.event = payload.event;
      }

      let succeeded = false;

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/wallet`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(body),
        });

        const responseBody = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(responseBody?.message || 'No se pudo actualizar la cartera.');
        }

        const serverBalance = Number(responseBody?.data?.balance);

        if (Number.isFinite(serverBalance)) {
          this.market.money = String(serverBalance);
        } else {
          this.market.money = String(target);
        }

        this.walletSyncError = null;
        succeeded = true;
      } catch (error) {
        console.warn('Error al guardar la cartera:', error);
        this.walletSyncError = error?.message || 'No se pudo actualizar la cartera.';
      } finally {
        if (succeeded) {
          this.walletSyncQueue.shift();
        }

        this.walletSyncSending = false;

        if (this.walletSyncQueue.length > 0) {
          const delay = succeeded ? 0 : 2000;

          if (this.walletSyncTimerId) {
            clearTimeout(this.walletSyncTimerId);
          }

          this.walletSyncTimerId = setTimeout(() => {
            this.walletSyncTimerId = null;
            this.flushWalletSync();
          }, delay);
        }
      }
    },

    async persistCurrentDay(day) {
      if (!this.currentUser || !this.currentPondId) {
        return;
      }

      const normalizedDay = Number(day);
      if (!Number.isFinite(normalizedDay) || normalizedDay < 1) {
        return;
      }

      const persistedDay = Math.max(1, Math.floor(normalizedDay));

      try {
        const response = await fetch(`${API_SERVER}/api/v1/ponds/${this.currentPondId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            user_id: this.currentUser.id,
            current_day: persistedDay,
          }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          console.warn(payload?.message || 'No se pudo guardar el día actual del estanque.');
        }
      } catch (error) {
        console.warn('Error al guardar el día del estanque:', error);
      }
    },

    applyPondState(pond) {
      const slots = Array.isArray(pond?.slots) ? pond.slots : [];
      const tiles = this.game.tiles;
      const max = tiles.length;
      const normalizedDay = Number(pond?.current_day);
      if (Number.isFinite(normalizedDay) && normalizedDay >= 1) {
        this.currentDay = normalizedDay;
      }
      const shouldNotify = this.game.effectStateHydrated === true;
      const activatedTiles = [];

      for (let index = 0; index < max; index++) {
        const effectResult = this.applySlotToTile(slots[index] ?? null, index);
        if (shouldNotify && effectResult?.changed && effectResult.signature) {
          const tile = tiles[index];
          if (tile?.hasPlant && tile.plantEffectSummary) {
            activatedTiles.push(tile);
          }
        }
      }

      if (shouldNotify && activatedTiles.length) {
        activatedTiles.forEach((tile) => this.announcePlantEffectActivation(tile));
      }

      if (!this.game.effectStateHydrated) {
        this.game.effectStateHydrated = true;
      }
    },

    applySlotToTile(slot, index) {
      const tile = this.game.tiles[index];
      if (!tile) {
        return { changed: false, signature: null };
      }

      const previousSignature = tile._plantEffectSignature || null;
      let effectResult = { changed: false, signature: previousSignature };

      tile.problems = tile.problems || {
        ph: false,
        oxygen: false,
        temperature: false,
        waterQuality: false,
      };

      if (!slot) {
        tile.slotId = null;
        tile.pondId = this.currentPondId;
        tile.serverStatus = 'empty';
        tile.stage = 'empty';
        tile.statusClass = 'status0';
        tile.imgSrc = null;
        tile.hasFish = false;
        tile.hasPlant = false;
        tile.plant = null;
        tile.plantImg = null;
        tile.plantPlacedAt = null;
        tile.plantEffects = null;
        tile.plantEffectExpiresAt = null;
        tile.plantEffectSummary = null;
        tile._plantEffectSignature = null;
        tile.growthRateMultiplier = 1;
        tile.oxygenProtected = false;
        tile.temperatureProtected = false;
        tile._plantEffectExpiredNotified = false;
        tile.alive = true;
        tile.stageTime = 0;
        tile.currentStageDuration = 0;
        tile._fishData = null;
        tile.harvestPrice = DEFAULT_FISH_HARVEST_REWARD;
        tile.life = tile.maxLife;
        tile.foodUses = 0;
        tile.lastFedAt = null;
        tile.lastHungerDamageAt = null;
        tile.hungry = false;
        tile.hungrySince = null;
        tile.problems.ph = false;
        tile.problems.oxygen = false;
        tile.problems.temperature = false;
        tile.problems.waterQuality = false;
        tile.healPopup = null;
        tile.lastCleanedAt = null;
        this.updateTileConditionState(tile);
        effectResult = { changed: previousSignature !== null, signature: null };
        return effectResult;
      }

      tile.slotId = slot.id;
      tile.pondId = slot.pond_id;
      tile.serverStatus = slot.status?.name || 'empty';
      tile.stageStartedAt = slot.stage_started_at || null;
      tile.lastFedAt = slot.last_fed_at || null;
      tile.lastOxygenatedAt = slot.last_oxygenated_at || null;
      tile.lastPhAdjustedAt = slot.last_ph_adjusted_at || null;
      tile.lastHungerDamageAt = slot.last_hunger_damage_at || null;
      tile.lastCleanedAt = slot.last_cleaned_at || null;

      tile.health = typeof slot.health === 'number' ? slot.health : tile.maxLife;
      tile.life = tile.health;
      tile.foodUses = slot.feeding_count ?? 0;
      tile.maxFoodUses = slot.feeding_limit ?? tile.maxFoodUses ?? 3;
      tile.hungry = !!slot.is_hungry;
      tile.hungrySince = slot.hungry_since || (tile.hungry ? new Date().toISOString() : null);

      const progressSeconds = Number(slot.stage_progress_seconds ?? 0);
      tile.stageTime = Number.isFinite(progressSeconds) ? progressSeconds : 0;

      const durationSeconds = Number(slot.stage_duration_seconds ?? 0);
      tile.currentStageDuration = durationSeconds;

      tile.hasFish = !!slot.fish && tile.serverStatus !== 'empty';
      tile.alive = tile.serverStatus !== 'dead';
      tile.stage = this.stageFromStatus(tile.serverStatus);
      tile.statusClass = this.statusClassFromStatus(tile.serverStatus);
      tile.imgSrc = this.imageFromSlot(slot, tile.serverStatus);

      if (durationSeconds > 0) {
        if (tile.stage === 'egg') {
          tile.eggDuration = durationSeconds;
        } else if (tile.stage === 'adult') {
          tile.adultDuration = durationSeconds;
        }
      }

      tile.growthRateMultiplier = 1;
      tile.plantEffects = null;
      tile.plantEffectExpiresAt = null;
      tile.plantEffectSummary = null;
      tile._plantEffectSignature = null;
      tile.oxygenProtected = false;
      tile.temperatureProtected = false;
      tile._plantEffectExpiredNotified = false;

      if (tile.hasFish) {
        tile._fishData = {
          id: slot.fish.id,
          name: slot.fish.name,
          eggImg: slot.fish.egg_image,
          adultImg: slot.fish.adult_image,
          eggDeadImg: slot.fish.egg_dead_image,
          adultDeadImg: slot.fish.adult_dead_image,
          eggStageSeconds: slot.fish.egg_stage_seconds,
          juvenileStageSeconds: slot.fish.juvenile_stage_seconds,
          adultStageSeconds: slot.fish.adult_stage_seconds,
        };

        const previousPrice = Number(tile.harvestPrice ?? 0);
        const candidatePrice = Number(
          slot.harvest_value ??
          slot.fish?.sell_price ??
          slot.fish?.price ??
          (Number.isFinite(previousPrice) && previousPrice > 0 ? previousPrice : DEFAULT_FISH_HARVEST_REWARD)
        );

        tile.harvestPrice = Number.isFinite(candidatePrice) && candidatePrice > 0
          ? candidatePrice
          : DEFAULT_FISH_HARVEST_REWARD;

        tile._fishData.sellPrice = tile.harvestPrice;
        tile._fishData.price = tile.harvestPrice;

        const eggDurationSeconds = Number(slot.fish.egg_stage_seconds ?? tile.eggDuration);
        if (Number.isFinite(eggDurationSeconds) && eggDurationSeconds > 0) {
          tile.eggDuration = eggDurationSeconds;
        }

        const adultDurationSeconds = Number(slot.fish.adult_stage_seconds ?? tile.adultDuration);
        if (Number.isFinite(adultDurationSeconds) && adultDurationSeconds > 0) {
          tile.adultDuration = adultDurationSeconds;
        }
      } else {
        tile._fishData = null;
        tile.harvestPrice = DEFAULT_FISH_HARVEST_REWARD;
      }

      if (slot.plant) {
        const plantMetadata = slot.plant.metadata && typeof slot.plant.metadata === 'object'
          ? { ...slot.plant.metadata }
          : {};

        const effectPayload = slot.plant_effect && typeof slot.plant_effect === 'object'
          ? { ...slot.plant_effect }
          : null;
        const effectState = effectPayload?.state && typeof effectPayload.state === 'object'
          ? { ...effectPayload.state }
          : (plantMetadata.effects && typeof plantMetadata.effects === 'object' ? { ...plantMetadata.effects } : null);
        const effectExpiresAt = effectPayload?.expires_at ?? null;

        tile.hasPlant = true;
        tile.plant = {
          id: slot.plant.id,
          name: slot.plant.name,
          slug: slot.plant.slug,
          image_path: slot.plant.image_path,
          oxygen_bonus: slot.plant.oxygen_bonus,
          ph_bonus: slot.plant.ph_bonus,
          health_regeneration: slot.plant.health_regeneration,
          bonuses: plantMetadata?.bonuses && typeof plantMetadata.bonuses === 'object'
            ? { ...plantMetadata.bonuses }
            : null,
          metadata: plantMetadata,
          placed_at: slot.plant.placed_at ?? null,
        };
        tile.plantImg = slot.plant.image_path;
        tile.plantPlacedAt = slot.plant.placed_at ?? null;
        tile._plantEffectExpiredNotified = false;

        const normalizedEffects = effectState ? { ...effectState } : {};
        const lifetimeSource = Number(
          normalizedEffects.lifetime_seconds ??
          normalizedEffects.duration_seconds ??
          plantMetadata?.effects?.lifetime_seconds ??
          0,
        );
        const effectiveLifetime = Number.isFinite(lifetimeSource) && lifetimeSource > 0
          ? Math.min(lifetimeSource, PLANT_EFFECT_MAX_DURATION_SECONDS)
          : PLANT_EFFECT_MAX_DURATION_SECONDS;

        if (effectiveLifetime > 0) {
          normalizedEffects.lifetime_seconds = effectiveLifetime;
        } else {
          delete normalizedEffects.lifetime_seconds;
        }

        tile.plantEffects = Object.keys(normalizedEffects).length > 0 ? { ...normalizedEffects } : null;

        if (tile.plant) {
          tile.plant.effects = tile.plantEffects ? { ...tile.plantEffects } : null;
          if (tile.plant.metadata) {
            tile.plant.metadata.effects = tile.plant.effects ? { ...tile.plant.effects } : null;
          }
        }

        const placedAtMs = tile.plantPlacedAt ? Date.parse(tile.plantPlacedAt) : NaN;
        let expiresAtMs = effectExpiresAt ? Date.parse(effectExpiresAt) : NaN;

        if (Number.isFinite(placedAtMs) && effectiveLifetime > 0) {
          const maxExpiryMs = placedAtMs + effectiveLifetime * 1000;
          if (!Number.isFinite(expiresAtMs) || expiresAtMs > maxExpiryMs) {
            expiresAtMs = maxExpiryMs;
          }
        }

        if (Number.isFinite(expiresAtMs)) {
          tile.plantEffectExpiresAt = new Date(expiresAtMs).toISOString();
        } else if (Number.isFinite(placedAtMs) && effectiveLifetime > 0) {
          tile.plantEffectExpiresAt = new Date(placedAtMs + effectiveLifetime * 1000).toISOString();
        } else {
          tile.plantEffectExpiresAt = null;
        }

        effectResult = this.applyPlantEffectModifiers(tile) || effectResult;
      } else {
        tile.hasPlant = false;
        tile.plant = null;
        tile.plantImg = null;
        tile.plantPlacedAt = null;
        tile.plantEffects = null;
        tile.plantEffectExpiresAt = null;
        tile.plantEffectSummary = null;
        tile._plantEffectSignature = null;
        tile.growthRateMultiplier = 1;
        tile.oxygenProtected = false;
        tile.temperatureProtected = false;
        tile._plantEffectExpiredNotified = false;
        effectResult = { changed: previousSignature !== null, signature: null };
      }

      tile.problems.ph = !!slot.has_ph_issue;
      tile.problems.oxygen = !!slot.has_oxygen_issue;
      tile.problems.temperature = !!slot.has_temperature_issue;
      if (Object.prototype.hasOwnProperty.call(slot, 'has_water_quality_issue')) {
        tile.problems.waterQuality = !!slot.has_water_quality_issue;
      }

      this.updateTileConditionState(tile);
      return effectResult;
    },

    clearPlantFromTile(tile) {
      if (!tile) {
        return { changed: false, signature: null };
      }

      const hadSignature = tile._plantEffectSignature != null;

      tile.hasPlant = false;
      tile.plant = null;
      tile.plantImg = null;
      tile.plantPlacedAt = null;
      tile.plantEffects = null;
      tile.plantEffectExpiresAt = null;
      tile.plantEffectSummary = null;
      tile._plantEffectSignature = null;
      tile.growthRateMultiplier = 1;
      tile.oxygenProtected = false;
      tile.temperatureProtected = false;
      tile._plantEffectExpiredNotified = false;

      this.updateTileConditionState(tile);

      return { changed: hadSignature, signature: null };
    },

    applyPlantEffectModifiers(tile) {
      if (!tile) {
        return { changed: false, signature: null };
      }

      const previousSignature = tile._plantEffectSignature || null;
      const effects = tile.plantEffects && typeof tile.plantEffects === 'object'
        ? tile.plantEffects
        : null;

      tile.growthRateMultiplier = 1;
      tile.oxygenProtected = false;
      tile.temperatureProtected = false;

      if (!effects) {
        tile.plantEffectSummary = null;
        tile._plantEffectSignature = null;
        this.updateTileConditionState(tile);
        return { changed: previousSignature !== null, signature: null };
      }

      const multiplier = this.resolvePlantGrowthMultiplier(effects);
      if (Number.isFinite(multiplier) && multiplier > 0) {
        tile.growthRateMultiplier = multiplier;
      }

      if (effects.oxygen_protection || effects.oxygen_shield) {
        tile.oxygenProtected = true;
      }

      if (effects.temperature_protection || effects.temperature_shield) {
        tile.temperatureProtected = true;
      }

      const signature = this.createPlantEffectSignature(effects);
      tile._plantEffectSignature = signature;
      tile.plantEffectSummary = this.buildPlantEffectSummary(effects, tile);

      this.updateTileConditionState(tile);

      return { changed: signature !== previousSignature, signature };
    },

    resolvePlantGrowthMultiplier(effects) {
      if (!effects || typeof effects !== 'object') {
        return 1;
      }

      const directCandidates = [
        effects.growth_multiplier,
        effects.growthMultiplier,
        effects.growth_rate_multiplier,
        effects.growthRateMultiplier,
        effects.growth_speed_multiplier,
        effects.growthSpeedMultiplier,
      ];

      for (const candidate of directCandidates) {
        const numeric = Number(candidate);
        if (Number.isFinite(numeric) && numeric > 0) {
          return numeric;
        }
      }

      const percentCandidates = [
        effects.growth_bonus_percent,
        effects.growthBonusPercent,
        effects.growth_rate_bonus,
        effects.growthRateBonus,
        effects.growth_speed_bonus,
        effects.growthSpeedBonus,
      ];

      for (const candidate of percentCandidates) {
        const numeric = Number(candidate);
        if (Number.isFinite(numeric)) {
          return 1 + numeric / 100;
        }
      }

      return 1;
    },

    createPlantEffectSignature(effects) {
      if (!effects || typeof effects !== 'object') {
        return null;
      }

      const normalizeValue = (value) => {
        if (value === null || value === undefined) {
          return null;
        }

        if (typeof value === 'number') {
          return Number(value.toFixed(6));
        }

        if (typeof value === 'boolean') {
          return value ? 1 : 0;
        }

        if (typeof value === 'string') {
          return value;
        }

        if (Array.isArray(value)) {
          return value.map(normalizeValue);
        }

        if (typeof value === 'object') {
          return Object.entries(value)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([key, nested]) => [key, normalizeValue(nested)]);
        }

        return String(value);
      };

      const normalizedEntries = Object.entries(effects)
        .filter(([, val]) => val !== undefined)
        .map(([key, val]) => [key, normalizeValue(val)])
        .sort((a, b) => a[0].localeCompare(b[0]));

      return JSON.stringify(normalizedEntries);
    },

    buildPlantEffectSummary(effects, tile) {
      if (!effects || typeof effects !== 'object') {
        return null;
      }

      const fragments = [];

      const multiplier = this.resolvePlantGrowthMultiplier(effects);
      if (Number.isFinite(multiplier) && multiplier > 0 && Math.abs(multiplier - 1) > 0.01) {
        const deltaPercent = (multiplier - 1) * 100;
        const prefix = deltaPercent > 0 ? '+' : '-';
        const formatted = this.formatPercentage(Math.abs(deltaPercent));
        fragments.push(`Crecimiento ${prefix}${formatted}%`);
      }

      if (effects.oxygen_protection || effects.oxygen_shield) {
        fragments.push('Protege oxígeno');
      }

      if (effects.temperature_protection || effects.temperature_shield) {
        fragments.push('Protege temperatura');
      }

      if (effects.health_regeneration || effects.health_regen_bonus) {
        const regen = Number(effects.health_regeneration ?? effects.health_regen_bonus);
        if (Number.isFinite(regen) && regen !== 0) {
          fragments.push(`Regenera ${regen} vida`);
        }
      }

      const lifetimeSec = Number(effects.lifetime_seconds ?? effects.duration_seconds);
      if (Number.isFinite(lifetimeSec) && lifetimeSec > 0) {
        const duration = this.describeDuration(lifetimeSec);
        if (duration) {
          fragments.push(`Dura ${duration}`);
        }
      } else if (tile?.plantEffectExpiresAt) {
        const expiresAtMs = Date.parse(tile.plantEffectExpiresAt);
        const placedAtMs = tile.plantPlacedAt ? Date.parse(tile.plantPlacedAt) : NaN;
        if (Number.isFinite(expiresAtMs) && Number.isFinite(placedAtMs)) {
          const diffSec = (expiresAtMs - placedAtMs) / 1000;
          const duration = this.describeDuration(diffSec);
          if (duration) {
            fragments.push(`Dura ${duration}`);
          }
        }
      }

      if (effects.requires_fish) {
        fragments.push('Requiere pez activo');
      }

      return fragments.length > 0 ? fragments.join(', ') : null;
    },

    formatPercentage(value) {
      const numeric = Number(value);
      if (!Number.isFinite(numeric)) {
        return '0';
      }

      const absValue = Math.abs(numeric);
      if (absValue >= 10) {
        return String(Math.round(numeric));
      }

      return String(Math.round(numeric * 10) / 10);
    },

    describeDuration(seconds) {
      if (!Number.isFinite(seconds) || seconds <= 0) {
        return null;
      }

      if (seconds < 60) {
        return `${Math.max(1, Math.round(seconds))} s`;
      }

      const minutes = seconds / 60;
      if (minutes < 60) {
        const value = minutes >= 10 ? Math.round(minutes) : Math.round(minutes * 10) / 10;
        return `${value} min`;
      }

      const hours = minutes / 60;
      const value = hours >= 10 ? Math.round(hours) : Math.round(hours * 10) / 10;
      return `${value} h`;
    },

    announcePlantEffectActivation(tile) {
      if (!tile?.hasPlant) {
        return;
      }

      const summary = tile.plantEffectSummary;
      if (!summary) {
        return;
      }

      const plantName = tile.plant?.name || 'Planta';
      this.notify(`${plantName} activó su efecto: ${summary}.`, 'success', {
        icon_image: './assets/img/alert_check.png',
      });
    },

    handlePlantEffectExpiration(tile, tileIndex) {
      if (!tile?.hasPlant) {
        return;
      }

      const expiresAtIso = tile.plantEffectExpiresAt;

      if (!expiresAtIso) {
        return;
      }

      const expiresAtMs = Date.parse(expiresAtIso);

      if (!Number.isFinite(expiresAtMs)) {
        return;
      }

      if (Date.now() < expiresAtMs) {
        return;
      }

      const alreadyNotified = tile._plantEffectExpiredNotified === true;
      const plantName = tile.plant?.name || 'La planta';
      const summary = tile.plantEffectSummary;

      this.clearPlantFromTile(tile);
      tile._plantEffectExpiredNotified = true;

      if (!alreadyNotified) {
        const details = summary ? ` (${summary})` : '';
        this.notify(`El efecto de ${plantName} terminó${details}.`, 'info', {
          icon_image: './assets/img/alert_warning.png',
        });
      }

      if (this.currentUser && !this.pendingPlantRefresh) {
        this.pendingPlantRefresh = true;
        setTimeout(() => {
          this.pendingPlantRefresh = false;
          this.fetchPondState();
        }, 750);
      }
    },

    updateTileConditionState(tile) {
      if (!tile) {
        return;
      }

      tile.problems = tile.problems || {
        ph: false,
        oxygen: false,
        temperature: false,
        waterQuality: false,
      };

      const problems = tile.problems;
      // Si está protegido por Elodea, ignora el problema de oxígeno para el tinte visual
      const oxygenIssue = problems.oxygen && !tile.oxygenProtected;
      const temperatureIssue = problems.temperature && !tile.temperatureProtected;
      const hasIssues = !!(
        problems.ph ||
        oxygenIssue ||
        temperatureIssue ||
        problems.waterQuality
      );

      tile.condition = hasIssues ? 'dirty' : 'clean';
    },

    getTileBlockingIssues(tile) {
      if (!tile) {
        return [];
      }

      const issues = [];
      const problems = tile.problems || {};
      const oxygenIssue = problems.oxygen && !tile.oxygenProtected;
      const temperatureIssue = problems.temperature && !tile.temperatureProtected;

      if (problems.ph) {
        issues.push({ slug: 'ph', label: 'pH', message: 'Ajusta el pH antes de agregar un pez.' });
      }

      if (oxygenIssue) {
        issues.push({ slug: 'oxygen', label: 'oxígeno', message: 'Oxigena el estanque antes de agregar un pez.' });
      }

      if (temperatureIssue) {
        issues.push({ slug: 'temperature', label: 'temperatura', message: 'Regula la temperatura antes de agregar un pez.' });
      }

      if (problems.waterQuality) {
        issues.push({ slug: 'waterQuality', label: 'calidad del agua', message: 'Mejora la calidad del agua antes de agregar un pez.' });
      }

      const isDirty = tile.condition === 'dirty' || problems.waterQuality || problems.ph || oxygenIssue || temperatureIssue;

      if (isDirty && issues.length === 0) {
        issues.push({ slug: 'dirty', label: 'limpieza', message: 'Limpia el estanque antes de agregar un pez.' });
      }

      return issues;
    },

    stageFromStatus(status) {
      switch (status) {
        case 'egg':
          return 'egg';
        case 'juvenile':
        case 'adult':
          return 'adult';
        case 'dead':
          return 'dead';
        default:
          return 'empty';
      }
    },

    statusClassFromStatus(status) {
      switch (status) {
        case 'egg':
          return 'status1';
        case 'juvenile':
        case 'adult':
          return 'status2';
        case 'dead':
          return 'status3';
        default:
          return 'status0';
      }
    },

    imageFromSlot(slot, status) {
      if (!slot?.fish) {
        return null;
      }

      if (status === 'egg') {
        return slot.fish.egg_image;
      }

      if (status === 'dead') {
        return slot.fish.adult_dead_image;
      }

      return slot.fish.adult_image;
    },

    resetTilesToEmpty() {
      this.game.tiles.forEach((tile) => {
        tile.slotId = null;
        tile.pondId = null;
        tile.serverStatus = 'empty';
        tile.stage = 'empty';
        tile.statusClass = 'status0';
        tile.imgSrc = null;
        tile.hasFish = false;
        tile.hasPlant = false;
        tile.plant = null;
        tile.plantImg = null;
        tile.plantPlacedAt = null;
        tile.plantEffects = null;
        tile.plantEffectExpiresAt = null;
        tile.growthRateMultiplier = 1;
        tile.oxygenProtected = false;
        tile.temperatureProtected = false;
        tile._plantEffectExpiredNotified = false;
        tile.alive = true;
        tile.stageTime = 0;
        tile.currentStageDuration = 0;
        tile._fishData = null;
        tile.harvestPrice = DEFAULT_FISH_HARVEST_REWARD;
        tile.life = tile.maxLife;
        tile.foodUses = 0;
        tile.lastFedAt = null;
        tile.lastCleanedAt = null;
        tile.lastHungerDamageAt = null;
        tile.hungrySince = null;
        tile.problems = tile.problems || {
          ph: false,
          oxygen: false,
          temperature: false,
          waterQuality: false,
        };
        tile.problems.ph = false;
        tile.problems.oxygen = false;
        tile.problems.temperature = false;
        tile.problems.waterQuality = false;
        this.updateTileConditionState(tile);
        tile.healPopup = null;
        tile.hungry = false;
      });
      this.game.effectStateHydrated = false;
    },

    async postSlotAction(action, tileIndex, extra = {}, retry = false) {
      if (!this.currentUser || !this.currentPondId) {
        console.warn('Acción ignorada: no hay usuario o estanque sincronizado.');
        return { success: false, slotData: null };
      }

      const tile = this.game.tiles[tileIndex];

      if (!tile?.slotId) {
        if (retry) {
          console.warn(`Acción ${action} ignorada: no existe slotId para tile ${tileIndex}.`);
          return { success: false, slotData: null };
        }

        await this.fetchPondState();
        return this.postSlotAction(action, tileIndex, extra, true);
      }

      try {
        const response = await fetch(this.slotActionUrl(action, this.currentPondId, tile.slotId), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ user_id: this.currentUser.id, ...extra }),
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          const message = payload?.message || `No se pudo ejecutar la acción ${action}.`;
          this.pondSyncError = message;
          console.warn(message);
          return { success: false, slotData: null };
        }

        const slotData = payload?.data ?? null;

        if (slotData) {
          const effectResult = this.applySlotToTile(slotData, tileIndex);
          this.pondSyncError = null;
          if (effectResult?.changed && effectResult.signature && this.game.effectStateHydrated) {
            const tile = this.game.tiles[tileIndex];
            if (tile?.hasPlant) {
              this.announcePlantEffectActivation(tile);
            }
          }
        }

        return { success: true, slotData };
      } catch (error) {
        console.warn(`Error al ejecutar la acción ${action}:`, error);
        this.pondSyncError = error?.message || `No se pudo ejecutar la acción ${action}.`;
        return { success: false, slotData: null };
      }
    },

    async resolveIssueOnServer(tileIndex, issueType, retry = false) {
      if (!this.currentUser || !this.currentPondId) {
        console.warn('Resolución ignorada: no hay usuario o estanque sincronizado.');
        return { success: false, slotData: null };
      }

      const tile = this.game.tiles[tileIndex];

      if (!tile?.slotId) {
        if (retry) {
          console.warn(`No existe slotId para resolver el problema ${issueType} en tile ${tileIndex}.`);
          return { success: false, slotData: null };
        }

        await this.fetchPondState();
        return this.resolveIssueOnServer(tileIndex, issueType, true);
      }

      const normalized = String(issueType || '').toLowerCase();
      const endpoint = `${API_SERVER}/api/v1/ponds/${this.currentPondId}/slots/${tile.slotId}/issues/${encodeURIComponent(normalized)}/resolve`;

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ user_id: this.currentUser.id }),
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          const message = payload?.message || `No se pudo resolver el problema ${issueType}.`;
          this.pondSyncError = message;
          console.warn(message);
          return { success: false, slotData: null };
        }

        const slotData = payload?.data ?? null;

        if (slotData) {
          this.applySlotToTile(slotData, tileIndex);
          this.pondSyncError = null;
        }

        return { success: true, slotData };
      } catch (error) {
        console.warn(`Error al resolver el problema ${issueType}:`, error);
        this.pondSyncError = error?.message || `No se pudo resolver el problema ${issueType}.`;
        return { success: false, slotData: null };
      }
    },

    slotActionUrl(action, pondId, slotId) {
      return `${API_SERVER}/api/v1/ponds/${pondId}/slots/${slotId}/${action}`;
    },

    async raiseProblemOnServer(tileIndex, type) {
      if (!this.currentUser || !this.currentPondId) {
        return;
      }

      const tile = this.game.tiles[tileIndex];

      if (!tile?.slotId) {
        return;
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/ponds/${this.currentPondId}/slots/${tile.slotId}/issues/${encodeURIComponent(type)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ user_id: this.currentUser.id }),
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          const message = payload?.message || `No se pudo registrar el problema ${type}.`;
          console.warn(message);
          return;
        }

        if (payload?.data) {
          this.applySlotToTile(payload.data, tileIndex);
        }
      } catch (error) {
        console.warn(`No se pudo registrar el problema ${type} en el servidor:`, error);
      }
    },

    performLocalFeed(tileIndex, heal = 10) {
      const tile = this.game.tiles[tileIndex];
      if (!tile) return;

      if (tile.foodUses >= tile.maxFoodUses) {
        return;
      }

      tile.foodUses += 1;
      tile.life = Math.min(tile.maxLife, tile.life + heal);
      tile.lastFedAt = new Date().toISOString();
      tile.hungry = false;
      tile.hungrySince = null;
      tile.lastHungerDamageAt = null;

      if (
        tile.life >= tile.maxLife * 0.3 ||
        tile.foodUses >= tile.maxFoodUses
      ) {
        tile.hungry = false;
      }

      tile.healPopup = `+${heal} vida`;
      setTimeout(() => {
        tile.healPopup = null;
      }, 1000);

      this.showFeedPopup(tileIndex, heal);
    },

    performLocalStock(tileIndex, item) {
      const tile = this.game.tiles[tileIndex];
      if (!tile) return;

      tile.imgSrc = item.pondEgg || item.img || null;
      tile._fishData = {
        id: item.fishId ?? null,
        name: item.name || 'Fish',
        eggImg: item.pondEgg || null,
        adultImg: item.pondAdult || null,
        eggDeadImg: item.pondEggDead || null,
        adultDeadImg: item.pondAdultDead || null,
        eggStageSeconds: item.eggStageSeconds ?? null,
        juvenileStageSeconds: item.juvenileStageSeconds ?? null,
        adultStageSeconds: item.adultStageSeconds ?? null,
      };

      const candidatePrice = Number(
        item?.sellPrice ??
        item?.salePrice ??
        item?.price ??
        item?.metadata?.sell_price ??
        item?.metadata?.price ??
        tile.harvestPrice ??
        DEFAULT_FISH_HARVEST_REWARD
      );

      tile.harvestPrice = Number.isFinite(candidatePrice) && candidatePrice > 0
        ? candidatePrice
        : DEFAULT_FISH_HARVEST_REWARD;

      tile._fishData.sellPrice = tile.harvestPrice;
      tile._fishData.price = tile.harvestPrice;

      tile.stage = 'egg';
      tile.statusClass = 'status1';
      tile.serverStatus = 'egg';
      tile.hasFish = true;
      tile.alive = true;
      tile.stageTime = 0;
      const eggDurationSeconds = Number(item.eggStageSeconds ?? tile.eggDuration);
      if (Number.isFinite(eggDurationSeconds) && eggDurationSeconds > 0) {
        tile.eggDuration = eggDurationSeconds;
      }
      tile.currentStageDuration = tile.eggDuration;
      tile.stageStartedAt = new Date().toISOString();
      tile.life = tile.maxLife;
      tile.foodUses = 0;
      tile.hungry = false;
      tile.hungrySince = null;
      tile.lastFedAt = null;
      tile.lastHungerDamageAt = null;
      tile.problems = tile.problems || {
        ph: false,
        oxygen: false,
        temperature: false,
        waterQuality: false,
      };
      tile.problems.waterQuality = false;
      tile.lastCleanedAt = new Date().toISOString();
      this.updateTileConditionState(tile);
    },

    performLocalPlant(tileIndex, item) {
      const tile = this.game.tiles[tileIndex];
      if (!tile) return;

      const metadata = item?.metadata && typeof item.metadata === 'object' ? { ...item.metadata } : null;
      const bonuses = metadata?.bonuses && typeof metadata.bonuses === 'object' ? { ...metadata.bonuses } : {};
      const effectsSource = metadata?.effects && typeof metadata.effects === 'object' ? metadata.effects : null;
      const normalizedEffects = effectsSource ? { ...effectsSource } : {};
      const stageName = String(tile.stage || tile.serverStatus || '').toLowerCase();

      if (!tile.hasFish) {
        this.notify('Necesitas un pez vivo en este espacio antes de plantar.', 'error');
        return false;
      }

      if (stageName === 'egg') {
        this.notify('No puedes aplicar plantas sobre un huevo. Espera a que nazca el pez.', 'warning');
        return false;
      }

      if (!tile.alive || stageName === 'dead') {
        this.notify('No puedes aplicar plantas sobre un pez muerto.', 'error');
        return false;
      }

      if (normalizedEffects.requires_fish && (!tile.hasFish || !tile.alive)) {
        this.notify('Necesitas un pez vivo en este espacio antes de plantar.', 'error');
        return false;
      }

      const image = item.pondAdult || item.img || item.image_path || metadata?.image_path || null;

      tile.hasPlant = true;
      tile.plant = {
        id: item.plantId ?? metadata?.id ?? null,
        name: item.name ?? metadata?.name ?? 'Planta',
        image_path: image,
        bonuses,
        effects: normalizedEffects,
        metadata,
      };
      tile.plantImg = image;
      tile.plantPlacedAt = new Date().toISOString();
      tile._plantEffectExpiredNotified = false;

      const lifetimeSource = Number(normalizedEffects.lifetime_seconds ?? metadata?.lifetime_seconds ?? 0);
      const effectiveLifetime = Number.isFinite(lifetimeSource) && lifetimeSource > 0
        ? Math.min(lifetimeSource, PLANT_EFFECT_MAX_DURATION_SECONDS)
        : PLANT_EFFECT_MAX_DURATION_SECONDS;

      if (effectiveLifetime > 0) {
        normalizedEffects.lifetime_seconds = effectiveLifetime;
        tile.plantEffectExpiresAt = new Date(Date.now() + effectiveLifetime * 1000).toISOString();
      } else {
        tile.plantEffectExpiresAt = null;
      }

      tile.plantEffects = { ...normalizedEffects };
      tile.plant.effects = tile.plantEffects ? { ...tile.plantEffects } : null;
      if (tile.plant.metadata) {
        tile.plant.metadata.effects = tile.plant.effects ? { ...tile.plant.effects } : null;
      }

      this.applyPlantEffectModifiers(tile);

      const healthBoost = Number(
        normalizedEffects.health_regeneration ?? bonuses.health_regeneration ?? 0
      );
      if (healthBoost > 0 && tile.life > 0) {
        tile.life = Math.min(tile.maxLife, tile.life + healthBoost);
        tile.healPopup = `+${healthBoost} vida`;
        setTimeout(() => {
          if (tile.healPopup === `+${healthBoost} vida`) {
            tile.healPopup = null;
          }
        }, 1000);
      }

      return true;
    },

    performLocalSupplement(tileIndex, item) {
      const tile = this.game.tiles[tileIndex];
      if (!tile || !tile.hasFish || !tile.alive || tile.stage === 'dead') {
        return false;
      }

      if (String(tile.stage || tile.serverStatus || '').toLowerCase() === 'egg') {
        return false;
      }

      const metadata = item?.metadata && typeof item.metadata === 'object' ? { ...item.metadata } : null;
      const effects = metadata?.effects && typeof metadata.effects === 'object' ? { ...metadata.effects } : {};

      const healthBoost = Number(effects.health_boost ?? 0);
      if (healthBoost > 0) {
        tile.life = Math.min(tile.maxLife, tile.life + healthBoost);
        tile.healPopup = `+${healthBoost} vida`;
        setTimeout(() => {
          if (tile.healPopup === `+${healthBoost} vida`) {
            tile.healPopup = null;
          }
        }, 1000);
      }

      if (effects.hunger_reset) {
        tile.foodUses = 0;
        tile.hungry = false;
        tile.hungrySince = null;
        tile.lastHungerDamageAt = null;
      }

      if (Number.isFinite(Number(effects.feeding_limit_bonus))) {
        const bonus = Number(effects.feeding_limit_bonus);
        if (bonus > 0) {
          const currentMax = Number(tile.maxFoodUses ?? 3) || 3;
          tile.maxFoodUses = Math.min(10, currentMax + bonus);
        }
      }

      tile.lastFedAt = new Date().toISOString();

      return true;
    },

    normalizeItemSlug(item) {
      if (!item) {
        return null;
      }

      const slugCandidate = item.slug || item.inventorySlug || item.metadata?.slug;
      return typeof slugCandidate === 'string' && slugCandidate.length > 0
        ? slugCandidate.toLowerCase()
        : null;
    },

    isFeedItem(item) {
      if (!item) {
        return false;
      }

      const metadataType = (item.metadata?.type || '').toLowerCase();
      if (metadataType === 'feed') {
        return true;
      }

      if (item.metadata && Object.prototype.hasOwnProperty.call(item.metadata, 'count_as_feed')) {
        return !!item.metadata.count_as_feed;
      }

      const slug = this.normalizeItemSlug(item);
      const feedSlugs = new Set([
        'supplement-fish-pellets',
        'supplement-fish-flakes',
        'supplement-color-bites',
        'food-can',
      ]);
      if (slug && feedSlugs.has(slug)) {
        return true;
      }

      const normalizedName = (item.name || '').toLowerCase();
      const feedNames = [
        'lata de comida',
        'fish pellets',
        'fish flakes',
        'color bites',
        'pellets',
      ];
      if (normalizedName && feedNames.includes(normalizedName)) {
        return true;
      }

      return false;
    },

    validateFeedingOpportunity(tile, options = {}) {
      if (!tile) {
        return { allowed: false, reason: 'missing-tile' };
      }

      const stage = String(tile.stage || tile.serverStatus || '').toLowerCase();
      const hasLivingFish = !!tile.hasFish && tile.alive && stage !== 'dead';

      if (!hasLivingFish) {
        return {
          allowed: false,
          reason: 'no-fish',
          message: 'No hay pez vivo para alimentar.',
        };
      }

      if (stage === 'egg') {
        return {
          allowed: false,
          reason: 'egg',
          message: 'Primero espera a que el huevo eclosione antes de alimentarlo.',
        };
      }

      if (!options.ignoreHunger && !tile.hungry) {
        return {
          allowed: false,
          reason: 'not-hungry',
          message: 'Este pez no tiene hambre en este momento.',
        };
      }

      const maxUses = Number(tile.maxFoodUses ?? 0) || 0;
      const currentUses = Number(tile.foodUses ?? 0) || 0;
      if (maxUses > 0 && currentUses >= maxUses) {
        return {
          allowed: false,
          reason: 'limit',
          message: 'Este pez ya alcanzó el límite de alimentación por hoy.',
        };
      }

      return { allowed: true, reason: null, stage };
    },

    async feedTile(tileIndex, item, options = {}) {
      const healAmount = Number.isFinite(options.heal) ? Number(options.heal) : 10;
      const consumeInventory = options.consumeInventory !== false;
      const triggerMission = options.triggerMission !== false;
      const shouldNotify = options.notify !== false;

      if (!this.currentUser) {
        this.performLocalFeed(tileIndex, healAmount);
        if (consumeInventory && item) {
          this.reduceItemCountFromSlot(item);
        }
        if (shouldNotify) {
          this.notify('Pez alimentado', 'success');
        }
        if (triggerMission) {
          this.handleMissionEvent('pond.feed');
        }
        return { success: true, consumed: consumeInventory };
      }

      const actionResult = await this.postSlotAction('feed', tileIndex);

      if (actionResult.success) {
        const tile = this.game.tiles[tileIndex];
        tile.healPopup = `+${healAmount} vida`;
        setTimeout(() => {
          if (tile.healPopup === `+${healAmount} vida`) {
            tile.healPopup = null;
          }
        }, 1000);
        this.showFeedPopup(tileIndex, healAmount);

        if (consumeInventory && item) {
          this.reduceItemCountFromSlot(item);
        }

        if (shouldNotify) {
          this.notify('Pez alimentado', 'success');
        }

        if (triggerMission) {
          this.handleMissionEvent('pond.feed');
        }

        if (!actionResult.slotData) {
          await this.fetchPondState();
        }

        return { success: true, consumed: consumeInventory };
      }

      await this.fetchPondState();
      return { success: false, consumed: false };
    },

    async applySupplement(tileIndex, item, options = {}) {
      const tile = this.game.tiles[tileIndex];
      const inventoryAlreadyConsumed = !!options.inventoryAlreadyConsumed;
      const shouldNotify = options.notify !== false;
      const triggerMission = options.triggerMission !== false;

      const supplementId = this.resolveInventoryModelId(item, 'supplement');
      if (this.currentUser && !supplementId) {
        this.notify('No se pudo identificar el suplemento seleccionado.', 'error');
        return { success: false, consumed: inventoryAlreadyConsumed };
      }

      const appliedLocally = this.performLocalSupplement(tileIndex, item);

      if (!this.currentUser) {
        let consumed = inventoryAlreadyConsumed;
        if (appliedLocally && !consumed && item) {
          this.reduceItemCountFromSlot(item);
          consumed = true;
        }

        if (appliedLocally) {
          if (shouldNotify) {
            this.notify('Suplemento aplicado', 'success');
          }
          if (triggerMission) {
            this.handleMissionEvent('pond.apply_supplement');
          }
        }

        return { success: appliedLocally, consumed };
      }

      const actionResult = await this.postSlotAction('supplement', tileIndex, {
        supplement_id: supplementId,
      });

      if (actionResult.success) {
        let consumed = inventoryAlreadyConsumed;
        if (!consumed && item) {
          this.reduceItemCountFromSlot(item);
          consumed = true;
        }

        if (shouldNotify) {
          this.notify('Suplemento aplicado', 'success');
        }

        if (triggerMission) {
          this.handleMissionEvent('pond.apply_supplement');
        }

        if (!actionResult.slotData) {
          await this.fetchPondState();
        }

        return { success: true, consumed };
      }

      await this.fetchPondState();
      return { success: false, consumed: inventoryAlreadyConsumed };
    },

    async handleFeedDrop(tileIndex, item) {
      const tile = this.game.tiles[tileIndex];
      const feedValidation = this.validateFeedingOpportunity(tile);

      if (!feedValidation.allowed) {
        if (feedValidation.message) {
          const severity = feedValidation.reason === 'no-fish' ? 'error' : 'warning';
          this.notify(feedValidation.message, severity);
        }
        return;
      }

      await this.feedTile(tileIndex, item);
    },

    // -------- Modal general --------
    openModal(type) {
      if (this.modal.open) return;
      this.modal = { open: true, type };
      this.openerEl = document.activeElement;
      this.onTutorialEvent('opened-modal', type);
    },
    closeModal() {
      if (!this.modal.open) return;
      const previousType = this.modal.type;
      this.modal = { open: false, type: null };
      if (previousType) {
        this.onTutorialEvent('closed-modal', previousType);
      }
    },

    // -------- Inventario lateral (botones) --------
    onInventoryButtonClick(button) {
      if (button.id === 4) {
        this.closeModal();
        return;
      }
      this.inventory.selectedButton = button.id;
      this.clearAllSectionSelections();
      this.resetInventoryUI();
      this.onTutorialEvent('selected-inventory-category', button);
    },
    resetInventoryUI() {
      this.inventory.inventoryInfoOpen = false;
      this.inventory.selectedSlotImg = null;
      this.inventory.selectedMeta = null;
    },
    clearAllSectionSelections() {
      for (const sec of Object.values(this.inventory.sections)) {
        sec.selectedSlotId = null;
      }
    },

    // -------- Inventory actions desde panel (VENDER / FAVS) --------
    onInventoryAction(actionId) {
      const tutorialStep = this.tutorial.active ? this.tutorial.currentStep : null;

      if (tutorialStep === 'inventory-sell-info') {
        return;
      }

      if (tutorialStep === 'inventory-favorite-info' && actionId === 'fav') {
        return;
      }

      if ((tutorialStep === 'inventory-favorite-info' || tutorialStep === 'inventory-mark-favorite') && actionId === 'sell') {
        return;
      }

      if (actionId === "sell") this.sellSelectedItem();
      if (actionId === "fav") this.toggleFavoriteSelected();
    },

    sellSelectedItem() {
      const sec = this.activeInvSection;
      if (!sec) return;

      const selId = sec.selectedSlotId;
      if (!selId) {
        alert("Selecciona un slot primero.");
        return;
      }

      const slot = sec.slots.find((s) => s.id === selId);
      if (!slot || !slot.img) {
        alert("Ese slot está vacío.");
        return;
      }

      const meta = this.findItemByImg(slot.img);
      const price = Number(slot.price ?? meta?.price ?? 0) || 0;
      const itemName = meta?.name || slot?.name || 'Artículo';
      const saleEvent = `Venta de ${itemName}`;
      const updatedBalance = (Number(this.market.money) || 0) + price;
      this.market.money = String(updatedBalance);

      let lockSlotId = null;

      if (slot.count > 1) {
        slot.count -= 1;
        lockSlotId = selId;
      } else {
        this.resetInventorySlot(slot);
      }

      this.packInventorySection(sec, { autoSelect: false, lockSlotId });

      const activeSlotId = lockSlotId || selId;
      const slotStillFilled = activeSlotId
        ? sec.slots.find((s) => s.id === activeSlotId && s.img)
        : null;

      if (slotStillFilled) {
        sec.selectedSlotId = activeSlotId;
      } else {
        const firstFilled = sec.slots.find((s) => s.img);
        sec.selectedSlotId = firstFilled ? firstFilled.id : null;
      }

      this.syncQuickPanelWithFavorites();
      this.persistInventoryState();

      if (this.currentUser) {
        this.queueWalletSync(updatedBalance, {
          transactionType: 'sale',
          event: `${saleEvent} (+${price})`,
          forceImmediately: true,
        });
      }
    },

    packInventorySection(section, options = {}) {
      if (!section) {
        return;
      }

      this.enforceFavoriteLimit(section);

      const items = section.slots
        .filter((slot) => slot.img)
        .map((slot) => ({
          ...slot,
          count: Number(slot.count ?? 0) || 0,
          fav: !!slot.fav,
          originalSlotId: slot.id,
        }));

      const favorites = items.filter((item) => item.fav);
      const normals = items.filter((item) => !item.fav);
      const ordered = [...favorites, ...normals];

      const slotCount = section.slots.length;
      const assignments = new Array(slotCount).fill(null);
      const lockSlotIdCandidate = Number(options.lockSlotId);
      const lockSlotId = Number.isFinite(lockSlotIdCandidate) && lockSlotIdCandidate >= 1
        ? Math.floor(lockSlotIdCandidate)
        : null;

      if (lockSlotId && lockSlotId <= slotCount) {
        const lockedIndex = ordered.findIndex((item) => Number(item.originalSlotId) === lockSlotId);

        if (lockedIndex !== -1) {
          assignments[lockSlotId - 1] = ordered.splice(lockedIndex, 1)[0];
        }
      }

      let cursor = 0;
      ordered.forEach((data) => {
        while (cursor < slotCount && assignments[cursor]) {
          cursor += 1;
        }

        if (cursor >= slotCount) {
          return;
        }

        assignments[cursor] = data;
      });

      section.slots.forEach((slot) => this.resetInventorySlot(slot));

      assignments.forEach((data, index) => {
        if (!data) {
          return;
        }

        const target = section.slots[index];
        this.fillInventorySlot(target, data);
        target.fav = !!data.fav;
      });

      if (options.autoSelect !== false) {
        const firstFilled = section.slots.find((slot) => slot.img);
        section.selectedSlotId = firstFilled ? firstFilled.id : null;
      }
    },

    compactInventorySection(section, options = {}) {
      this.packInventorySection(section, options);
    },

    findFirstFilledInventorySlotId(sectionId) {
      const section = this.inventory.sections?.[sectionId];

      if (!section || !Array.isArray(section.slots)) {
        return null;
      }

      const filled = section.slots.find((slot) => Boolean(slot && slot.img));
      return filled ? filled.id : null;
    },

    toggleFavoriteSelected() {
      const sec = this.activeInvSection;
      if (!sec) return;

      const selId = sec.selectedSlotId;
      if (!selId) {
        alert("Selecciona un slot.");
        return;
      }

      const slot = sec.slots.find((s) => s.id === selId);
      if (!slot || !slot.img) {
        alert("Ese slot está vacío.");
        return;
      }

      this.enforceFavoriteLimit(sec);

      if (!slot.fav) {
        const favLimit = Number(this.inventory.maxFavoritesPerSection ?? 3) || 3;
        const currentFavs = this.countFavoritesInSection(sec);

        if (currentFavs >= favLimit) {
          alert(`Máximo ${favLimit} favoritos por categoría.`);
          return;
        }
        slot.fav = true;
      } else {
        slot.fav = false;
      }

      this.reorderFavorites();
      this.persistInventoryState();

      this.onTutorialEvent('inventory-favorite-toggled', {
        sectionId: this.inventory.selectedButton,
        slotId: selId,
        fav: slot.fav,
      });
    },

    reorderFavorites() {
      const sec = this.activeInvSection;
      if (!sec) return;

      this.packInventorySection(sec);
      this.syncQuickPanelWithFavorites();
    },

    buildFavoriteItemFromSlot(slot, sectionId) {
      const meta = slot?.img ? this.findItemByImg(slot.img) || {} : {};

      const cloneMetadata = (source) => {
        if (!source || typeof source !== 'object') {
          return null;
        }

        try {
          return JSON.parse(JSON.stringify(source));
        } catch (error) {
          return { ...source };
        }
      };

      const normalizedFishId = this.resolveInventoryModelId(slot, 'fish')
        ?? (meta ? this.resolveInventoryModelId({ ...meta }, 'fish') : null);
      const normalizedPlantId = this.resolveInventoryModelId(slot, 'plant')
        ?? (meta ? this.resolveInventoryModelId({ ...meta }, 'plant') : null);
      const normalizedSupplementId = this.resolveInventoryModelId(slot, 'supplement')
        ?? (meta ? this.resolveInventoryModelId({ ...meta }, 'supplement') : null);

      const imageData = {
        pondEgg: slot?.pondEgg ?? meta.eggImg ?? meta.pondEgg ?? null,
        pondAdult: slot?.pondAdult ?? meta.adultImg ?? meta.pondAdult ?? null,
        pondEggDead: slot?.pondEggDead ?? meta.eggDeadImg ?? meta.pondEggDead ?? null,
        pondAdultDead: slot?.pondAdultDead ?? meta.adultDeadImg ?? meta.pondAdultDead ?? null,
      };

      return {
        img: slot?.img ?? meta.img ?? null,
        slug: slot?.slug ?? slot?.inventorySlug ?? meta.inventorySlug ?? meta.slug ?? null,
        ...imageData,
        fishId: normalizedFishId,
        plantId: normalizedPlantId,
        supplementId: normalizedSupplementId,
        eggStageSeconds:
          slot?.eggStageSeconds ??
          meta.eggStageSeconds ??
          meta.metadata?.egg_stage_seconds ??
          null,
        juvenileStageSeconds:
          slot?.juvenileStageSeconds ??
          meta.juvenileStageSeconds ??
          meta.metadata?.juvenile_stage_seconds ??
          null,
        adultStageSeconds:
          slot?.adultStageSeconds ??
          meta.adultStageSeconds ??
          meta.metadata?.adult_stage_seconds ??
          null,
        count: Number(slot?.count ?? 0) || 0,
        category: Number(sectionId),
        name: slot?.name ?? meta.name ?? "Item",
        inventoryItemId: slot?.inventoryItemId ?? meta.inventoryItemId ?? null,
        categorySlug: slot?.categorySlug ?? meta.categorySlug ?? meta.category?.slug ?? null,
        metadata: slot?.metadata ? cloneMetadata(slot.metadata) : cloneMetadata(meta.metadata),
        sourceSectionId: Number(sectionId) || null,
        sourceSlotId: slot?.id ?? null,
        inventorySlotId: slot?.id ?? null,
      };
    },

    countFavoritesInSection(section) {
      if (!section || !Array.isArray(section.slots)) {
        return 0;
      }

      return section.slots.filter((slot) => slot.img && slot.fav).length;
    },

    enforceFavoriteLimit(section) {
      if (!section || !Array.isArray(section.slots)) {
        return;
      }

      const limit = Number(this.inventory.maxFavoritesPerSection ?? 3) || 3;
      let favCount = 0;

      section.slots.forEach((slot) => {
        if (!slot?.img) {
          slot.fav = false;
          return;
        }

        if (slot.fav) {
          favCount += 1;
          if (favCount > limit) {
            slot.fav = false;
          }
        }
      });
    },

    // -------- Para inventory-display: metadata --------
    findItemByImg(imgPath) {
      const allCats = Object.entries(this.market.categories);
      for (const [catId, cat] of allCats) {
        const it = cat.items.find((i) => i.img === imgPath);
        if (it) return { ...it, catId: Number(catId) };
      }
      return null;
    },

    // ========= QUICK PANEL: FAVORITOS =========
    loadFavoritesFromSection(sectionId) {
      const numericId = Number(sectionId);

      if (!Number.isFinite(numericId) || !this.inventory.sections[numericId]) {
        this.game.quickPanelSectionId = null;
        this.updateQuickPanelSlots();
        return;
      }

      if (this.game.toolsActive) {
        this.onTools();
      }

      this.game.quickPanelSectionId = numericId;
      this.updateQuickPanelSlots();
    },

    updateQuickPanelSlots() {
      if (this.game.toolsActive) {
        return;
      }

      this.game.slots.forEach((slot) => {
        slot.favoriteItem = null;
      });

      const sectionId = Number(this.game.quickPanelSectionId);

      if (!Number.isFinite(sectionId) || sectionId <= 0) {
        return;
      }

      const section = this.inventory.sections[sectionId];

      if (!section) {
        return;
      }

      this.enforceFavoriteLimit(section);

      const favorites = section.slots.filter((slot) => slot.img && slot.fav);

      favorites.slice(0, 4).forEach((slot, index) => {
        this.game.slots[index].favoriteItem = this.buildFavoriteItemFromSlot(slot, sectionId);
      });
    },

    onClean() {
      // Plantas = seccion 2
      this.loadFavoritesFromSection(2);
    },
    onFeed() {
      // Estanquee = seccion 3
      this.loadFavoritesFromSection(3);
    },
    onAddFish() {
      // Huevos = sección 1
      this.loadFavoritesFromSection(1);
      this.onTutorialEvent('pressed-fish-button');
    },

    toolSlotIndexById(toolId) {
      // Encuentra el índice del slot en game.slots que contiene la herramienta con el toolId dado
      return this.game.slots.findIndex(
        (slot) =>
          slot.favoriteItem &&
          slot.favoriteItem.category === "regulation" &&
          slot.favoriteItem.toolId === toolId
      );
    },

    onTools() {
      if (this.game.toolsActive) {
        if (this.game.previousSlots) {
          this.game.previousSlots.forEach((prevSlot, index) => {
            this.game.slots[index].favoriteItem = prevSlot.favoriteItem;
          });
          this.game.previousSlots = null;
        }
        this.game.toolsActive = false;
        this.updateQuickPanelSlots();
      } else {
        this.game.previousSlots = this.game.slots.map((slot) => ({
          ...slot,
          favoriteItem: slot.favoriteItem ? { ...slot.favoriteItem } : null,
        }));

        // Cargar herramientas en los slots
        this.game.regulationTools.forEach((tool, index) => {
          if (index < 4) {
            this.game.slots[index].favoriteItem = {
              id: "tool-" + tool.id,
              toolId: tool.id,
              toolSlug: tool.slug || null,
              img: tool.img,
              count: tool.count,
              category: "regulation",
              name: tool.name,
            };
          }
        });
        this.game.toolsActive = true;
      }
    },

    useQuickItem(item) {
      if (!item) {
        return;
      }

      if (item.category === 'regulation') {
        const slug = item.toolSlug || this.resolveToolSlugById(item.toolId);

        if (slug) {
          this.recordToolUsage(slug);
        }

        const tool = this.game.regulationTools.find((t) => t.slug === slug || Number(t.id) === Number(item.toolId));

        if (tool) {
          console.log(`${tool.name} usado (uso infinito)`);
        }

        return;
      }

      console.log('Usando item:', item);
    },

    handleInventory() {
      this.openModal("inventory");
    },

    // ========= MARKET =========
    onMarketCategoryClick(button) {
      this.onTutorialEvent('selected-market-category', button);

      const tutorialLock = this.tutorial.active
        && ['market-categories', 'market-select-fish', 'market-buy-button', 'market-timer'].includes(this.tutorial.currentStep);

      if (tutorialLock && button.id === 4) {
        return;
      }

      if (button.id === 4) {
        this.onCloseMarketModal();
        return;
      }
      this.market.selectedButton = button.id;
      this.market.showItemPanel = false;
      this.market.selectedItemId = null;
    },

    onMarketOpenItem(id) {
      this.market.selectedItemId = id;
      this.market.showItemPanel = true;
      this.market.buyQty = 1;
      const item = this.marketCatalogItems.find((candidate) => candidate.id === id) || null;
      this.onTutorialEvent('opened-market-item', { id, item });
    },
    incBuyQty() {
      const maxAff = this.marketMaxAffordable;
      if (maxAff <= 0) return;
      if (this.market.buyQty < maxAff) {
        this.market.buyQty += 1;
      } else {
        this.market.buyQty = maxAff;
      }
    },
    decBuyQty() {
      if (this.market.buyQty > 1) this.market.buyQty -= 1;
    },
    onMarketCloseItem() {
      this.market.showItemPanel = false;
      this.market.selectedItemId = null;
    },
    onCloseMarketModal() {
      this.closeModal();
    },

    onMarketBuy(item) {
      const selectedItem = item || this.marketSelectedItem;
      if (!selectedItem) return;

      let price = Number(selectedItem.price) || 0;
      let money = Number(this.market.money) || 0;
      let qty = Number(this.market.buyQty) || 1;

      if (qty < 1) qty = 1;

      let purchased = 0;
      const catId = this.market.selectedButton;

      for (let i = 0; i < qty; i++) {
        if (money < price) break;

        const ok = this.addToInventory(selectedItem, catId);
        if (!ok) break;
        money -= price;
        purchased++;
      }

      this.market.money = String(money);

      if (purchased > 0) {
        if (this.currentUser) {
          const itemName = selectedItem.name || 'Artículo';
          const purchaseEvent = purchased > 1
            ? `Compra de ${itemName} x${purchased}`
            : `Compra de ${itemName}`;
          const totalCost = price * purchased;

          this.queueWalletSync(money, {
            transactionType: 'purchase',
            event: `${purchaseEvent} (-${totalCost})`,
            forceImmediately: true,
          });
        }

        this.handleMissionEvent('market.purchase', purchased);

        if (catId === 1) {
          this.handleMissionEvent('market.purchase_fish', purchased);
        }

        if (catId === 3) {
          this.handleMissionEvent('market.purchase_supplies', purchased);
        }

        this.onTutorialEvent('completed-market-purchase', {
          success: true,
          purchased,
          item: selectedItem,
        });

        this.onMarketCloseItem();
        this.persistInventoryState();
      } else {
        alert(
          "No se pudo completar la compra (dinero o espacio insuficiente)."
        );
      }
    },

    addToInventory(item, catId) {
      const sec = this.inventory.sections[catId];
      if (!sec) return false;

      const slotData = this.buildSlotDataFromItem(item);
      const computedLimit = this.getInventoryStackLimit(catId, slotData);
      const stackLimit = computedLimit > 0 ? computedLimit : 1;
      const inventoryItemId = slotData.inventoryItemId;
      const img = slotData.img;

      const normalizedCount = Number(slotData.count ?? 0) || 1;
      slotData.count = Math.min(stackLimit, normalizedCount);

      const existingSlot = sec.slots.find((slot) => {
        if (!slot.img) {
          return false;
        }

        const matches = inventoryItemId && slot.inventoryItemId
          ? slot.inventoryItemId === inventoryItemId
          : slot.img === img;

        if (!matches) {
          return false;
        }

        const currentCount = Number(slot.count ?? 0) || 0;
        return currentCount < stackLimit;
      });

      if (existingSlot) {
        const currentCount = Number(existingSlot.count ?? 0) || 0;
        const updatedData = {
          ...slotData,
          count: Math.min(stackLimit, currentCount + slotData.count),
          fav: !!existingSlot.fav,
        };

        this.fillInventorySlot(existingSlot, updatedData);

        if (existingSlot.fav) {
          this.syncQuickPanelWithFavorites();
        }

        return true;
      }

      const emptySlot = sec.slots.find((slot) => !slot.img);

      if (!emptySlot) {
        return false;
      }

      this.fillInventorySlot(emptySlot, slotData);

      return true;
    },

    // ========= TIMER MARKET =========
    startMarketTimer() {
      this.stopMarketTimer();
      this.market.timerId = setInterval(() => this.tickMarketTimer(), 1000);
    },
    stopMarketTimer() {
      if (this.market.timerId) {
        clearInterval(this.market.timerId);
        this.market.timerId = null;
      }
    },
    tickMarketTimer() {
      this.updateMarketBonusCycle();

      if (this.market.timerRemainSec > 0) {
        this.market.timerRemainSec -= 1;
        return;
      }

      this.onMarketTimeout();
      this.market.timerRemainSec = this.market.timerDurationSec;
    },
    updateMarketBonusCycle() {
      const market = this.market;

      if (market.doubleBonusTransitioning) {
        return;
      }

      if (market.doubleBonusActive) {
        if (market.doubleBonusRemainingSec > 0) {
          market.doubleBonusRemainingSec = Math.max(0, market.doubleBonusRemainingSec - 1);
          return;
        }

        market.doubleBonusTransitioning = true;
        this.deactivateMarketDoubleOffer()
          .then((listing) => this.applyMarketDoubleOffer(listing))
          .catch((error) => {
            console.warn('No se pudo desactivar la oferta especial del mercado:', error);
          })
          .finally(() => {
            market.doubleBonusTransitioning = false;
            if (!market.doubleBonusActive) {
              market.doubleBonusCooldownSec = this.randomIntInRange(
                market.doubleBonusMinCooldown,
                market.doubleBonusMaxCooldown
              );
            }
          });
        return;
      }

      if (market.doubleBonusCooldownSec > 0) {
        market.doubleBonusCooldownSec = Math.max(0, market.doubleBonusCooldownSec - 1);
        return;
      }

      const duration = this.randomIntInRange(
        market.doubleBonusMinDuration,
        market.doubleBonusMaxDuration
      );

      market.doubleBonusTransitioning = true;
      this.activateMarketDoubleOffer(duration)
        .then((listing) => this.applyMarketDoubleOffer(listing))
        .catch((error) => {
          console.warn('No se pudo activar la oferta especial del mercado:', error);
        })
        .finally(() => {
          market.doubleBonusTransitioning = false;
          if (!market.doubleBonusActive) {
            market.doubleBonusCooldownSec = this.randomIntInRange(
              market.doubleBonusMinCooldown,
              market.doubleBonusMaxCooldown
            );
          }
        });
    },
    async initMarketDoubleBonusState() {
      if (this.market.doubleBonusInitialized) {
        return;
      }

      this.market.doubleBonusInitialized = true;

      await this.fetchMarketDoubleOffer({ silent: true });

      if (!this.market.doubleBonusActive && this.market.doubleBonusCooldownSec <= 0) {
        this.market.doubleBonusCooldownSec = this.randomIntInRange(
          this.market.doubleBonusMinCooldown,
          this.market.doubleBonusMaxCooldown
        );
      }
    },
    randomIntInRange(min, max) {
      const lower = Number.isFinite(min) ? Math.floor(min) : 0;
      const upper = Number.isFinite(max) ? Math.floor(max) : lower;
      if (upper <= lower) {
        return Math.max(0, lower);
      }
      return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },
    isMarketDoubleBonusActive() {
      return !!this.market.doubleBonusActive && Number(this.market.doubleBonusRemainingSec ?? 0) > 0;
    },
    getMarketHarvestMultiplier() {
      const multiplier = Number(this.market.doubleBonusMultiplier ?? 1);
      if (!this.isMarketDoubleBonusActive() || !Number.isFinite(multiplier) || multiplier <= 1) {
        return 1;
      }
      return multiplier;
    },
    async fetchMarketDoubleOffer(options = {}) {
      const silent = !!options.silent;

      try {
        const response = await fetch(`${API_SERVER}/api/v1/market/listings/double-offer`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo obtener el estado del mercado.');
        }

        const listing = payload?.data ?? null;
        if (listing) {
          this.applyMarketDoubleOffer(listing, { silent });
        }

        return listing;
      } catch (error) {
        console.warn('No se pudo sincronizar la oferta especial del mercado:', error);
        return null;
      }
    },
    applyMarketDoubleOffer(listing, options = {}) {
      const market = this.market;
      const silent = !!options.silent;
      const wasActive = !!market.doubleBonusActive;

      if (!listing) {
        market.doubleBonusActive = false;
        market.doubleBonusListingId = null;
        market.doubleBonusStatusSlug = 'inactive';
        market.doubleBonusRemainingSec = 0;
        market.doubleBonusEndsAt = null;
        market.doubleBonusMultiplier = market.doubleBonusBaseMultiplier ?? market.doubleBonusMultiplier;
        if (!silent && wasActive) {
          this.notify('El mercado vuelve a pagar su precio normal por los peces.', 'market');
        }
        return;
      }

      market.doubleBonusListingId = listing.id ?? null;
      market.doubleBonusStatusSlug = listing.status ?? 'inactive';

      const endsAtIso = listing.ends_at ?? null;
      market.doubleBonusEndsAt = endsAtIso;

      const normalizedMultiplier = Number(
        listing.multiplier ??
        market.doubleBonusMultiplier ??
        market.doubleBonusBaseMultiplier ??
        2
      );

      let remainingSeconds = Number(listing.remaining_seconds ?? 0);
      if ((!Number.isFinite(remainingSeconds) || remainingSeconds <= 0) && endsAtIso) {
        const diffMs = Date.parse(endsAtIso) - Date.now();
        if (Number.isFinite(diffMs) && diffMs > 0) {
          remainingSeconds = Math.round(diffMs / 1000);
        }
      }

      const isActive = !!listing.active && remainingSeconds > 0;

      market.doubleBonusActive = isActive;
      market.doubleBonusRemainingSec = isActive ? Math.max(0, remainingSeconds) : 0;

      if (isActive) {
        market.doubleBonusMultiplier = Number.isFinite(normalizedMultiplier) && normalizedMultiplier > 0
          ? normalizedMultiplier
          : market.doubleBonusBaseMultiplier ?? market.doubleBonusMultiplier;
        market.doubleBonusBaseMultiplier = market.doubleBonusMultiplier;
        market.doubleBonusCooldownSec = 0;
        if (!silent && !wasActive) {
          this.notify('¡Oferta especial! El mercado paga el doble por los peces adultos durante un tiempo limitado.', 'market');
        }
      } else {
        market.doubleBonusMultiplier = market.doubleBonusBaseMultiplier ?? market.doubleBonusMultiplier;
        if (!silent && wasActive) {
          this.notify('El mercado vuelve a pagar su precio normal por los peces.', 'market');
        }
      }
    },
    async activateMarketDoubleOffer(durationSeconds) {
      const multiplier = Number(this.market.doubleBonusBaseMultiplier ?? this.market.doubleBonusMultiplier ?? 2) || 2;

      if (!this.currentUser) {
        const startsAt = new Date();
        const endsAt = new Date(startsAt.getTime() + Math.max(1, durationSeconds) * 1000);
        return {
          id: null,
          type: 'double_offer',
          status: 'active',
          multiplier,
          starts_at: startsAt.toISOString(),
          ends_at: endsAt.toISOString(),
          remaining_seconds: Math.max(1, durationSeconds),
          active: true,
        };
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/market/listings/double-offer/activate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            multiplier,
            duration_seconds: Math.max(1, Number(durationSeconds || 0)),
          }),
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          if (response.status === 409 && payload?.data) {
            return payload.data;
          }

          throw new Error(payload?.message || 'No se pudo activar la oferta especial del mercado.');
        }

        return payload?.data ?? null;
      } catch (error) {
        console.warn('Error al activar la oferta especial del mercado:', error);
        throw error;
      }
    },
    async deactivateMarketDoubleOffer() {
      if (!this.currentUser) {
        return {
          id: null,
          type: 'double_offer',
          status: 'inactive',
          multiplier: 1,
          starts_at: null,
          ends_at: new Date().toISOString(),
          remaining_seconds: 0,
          active: false,
        };
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/market/listings/double-offer/deactivate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          if (response.status === 409 && payload?.data) {
            return payload.data;
          }

          throw new Error(payload?.message || 'No se pudo desactivar la oferta especial del mercado.');
        }

        return payload?.data ?? null;
      } catch (error) {
        console.warn('Error al desactivar la oferta especial del mercado:', error);
        throw error;
      }
    },
    initMarketDefaults() {
      if (!this.market._defaults) {
        this.market._defaults = {};
        this.market._anchors = {};
        for (const [catId, cat] of Object.entries(this.market.categories)) {
          this.market._defaults[catId] = cat.shelfItems.map((it) => ({
            ...it,
          }));
          this.market._anchors[catId] = cat.shelfItems.map((it) => ({
            x: it.x,
            y: it.y,
          }));
        }

        if (!Array.isArray(this.market.fishItems) || !this.market.fishItems.length) {
          const baseFish = this.market.categories[1]?.items || [];
          this.market.fishItems = baseFish.map((item) => ({ ...item }));
        }
      }
    },
    onMarketTimeout() {
      this.resetAllShelfPositions();
      this.market.showItemPanel = false;
      this.market.selectedItemId = null;
    },


    resetAllShelfPositions() {
      for (const [catId, cat] of Object.entries(this.market.categories)) {
        const shelf = cat.shelfItems;
        const anchors = this.market._anchors?.[catId];
        if (!anchors || anchors.length === 0) continue;


        for (let i = shelf.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shelf[i], shelf[j]] = [shelf[j], shelf[i]];
        }
        const n = Math.min(shelf.length, anchors.length);
        for (let i = 0; i < n; i++) {
          shelf[i].x = anchors[i].x;
          shelf[i].y = anchors[i].y;
        }
        if (Number(catId) === 1) {
          const fish = [...cat.items]; // peces normales + langostino
          const selected = [];

          for (let i = 0; i < 3; i++) {
            const r = Math.floor(Math.random() * fish.length);
            selected.push(fish[r]);
          }
          for (let i = 0; i < 3; i++) {
            shelf[i].containedItem = selected[i];
          }
        }
      }
    },

    // ========= ESTANQUE NUMÉRICO (tiles) =========
    changeStatus(index) {
      this.tiles[index] = (this.tiles[index] + 1) % this.status.length;
    },
    obtainClass(index) {
      return this.status[this.tiles[index]].class;
    },
    obtainImage(index) {
      return this.status[this.tiles[index]].image;
    },
    initManualGrab(indexStatus) {
      this.grabbedTile = indexStatus;
    },
    dropIn(index) {
      if (this.grabbedTile !== null) {
        this.tiles[index] = 1; // coloca huevo
        const finalStatus = this.grabbedTile;
        setTimeout(() => {
          this.tiles[index] = finalStatus;
        }, 5000);
      }
    },

    // ========= DRAG & DROP =========
    onDragItem(item) {
      console.log("onDragItem:", item);
      this.draggedItem = item;
    },

    async onDropItem(tileIndex) {
      console.log("onDropItem: tile", tileIndex, "item:", this.draggedItem);
      if (!this.draggedItem) return;

      const tile = this.game.tiles[tileIndex];
      const item = this.draggedItem;
      const itemType = this.resolveInventoryItemType(item);

      if (item.toolId) {
        await this.useToolOnTile(item, tileIndex);
        this.draggedItem = null;
        return;
      }

      const treatAsFeed = this.isFeedItem(item);

      if (treatAsFeed) {
        await this.handleFeedDrop(tileIndex, item);
        this.draggedItem = null;
        return;
      }

      if (itemType === 'plant') {
        if (!tile.hasFish) {
          this.notify('Necesitas un pez vivo en este espacio antes de plantar.', 'error');
          this.draggedItem = null;
          return;
        }

        const stageName = String(tile.stage || tile.serverStatus || '').toLowerCase();

        if (stageName === 'egg') {
          this.notify('No puedes aplicar plantas sobre un huevo. Espera a que nazca el pez.', 'warning');
          this.draggedItem = null;
          return;
        }

        if (!tile.alive || stageName === 'dead') {
          this.notify('No puedes aplicar plantas sobre un pez muerto.', 'error');
          this.draggedItem = null;
          return;
        }

        const plantId = this.resolveInventoryModelId(item, 'plant');
        const metadata = item?.metadata && typeof item.metadata === 'object' ? item.metadata : null;
        const effects = metadata?.effects && typeof metadata.effects === 'object' ? metadata.effects : null;

        if (effects?.requires_fish && (!tile.hasFish || !tile.alive || tile.stage === 'dead')) {
          this.notify('Necesitas un pez vivo en este espacio antes de plantar.', 'error');
          this.draggedItem = null;
          return;
        }

        if (this.currentUser && !plantId) {
          this.notify('No se pudo identificar la planta seleccionada.', 'error');
          this.draggedItem = null;
          return;
        }

        if (!this.currentUser || !this.currentPondId) {
          if (plantId) item.plantId = plantId;
          const planted = this.performLocalPlant(tileIndex, item);
          if (!planted) {
            this.draggedItem = null;
            return;
          }
          this.reduceItemCountFromSlot(item);
          this.notify('Planta colocada en el estanque', 'success');
          this.handleMissionEvent('pond.place_plant');
          this.draggedItem = null;
          return;
        }

        const actionResult = await this.postSlotAction('plant', tileIndex, {
          plant_id: plantId,
        });

        if (actionResult.success) {
          this.reduceItemCountFromSlot(item);
          this.notify('Planta colocada en el estanque', 'success');
          this.handleMissionEvent('pond.place_plant');
          if (!actionResult.slotData) {
            await this.fetchPondState();
          }
        } else {
          await this.fetchPondState();
        }

        this.draggedItem = null;
        return;
      }

      if (itemType === 'supplement') {
        const stage = String(tile.stage || tile.serverStatus || '').toLowerCase();

        if (!tile.hasFish || !tile.alive || stage === 'dead') {
          this.notify('Necesitas un pez vivo para aplicar el suplemento.', 'error');
          this.draggedItem = null;
          return;
        }

        if (stage === 'egg') {
          this.notify('No puedes aplicar suplementos sobre un huevo. Espera a que nazca el pez.', 'warning');
          this.draggedItem = null;
          return;
        }

        await this.applySupplement(tileIndex, item);
        this.draggedItem = null;
        return;
      }

      if (tile.statusClass !== "status0") {
        this.notify('Este espacio ya está ocupado.', 'warning');
        this.draggedItem = null;
        return;
      }

      if (itemType !== 'fish') {
        this.notify('Este objeto todavía no tiene una acción en el estanque.', 'warning');
        this.draggedItem = null;
        return;
      }

      const blockingIssues = this.getTileBlockingIssues(tile);
      if (blockingIssues.length > 0) {
        const labels = blockingIssues.map((issue) => issue.label).filter(Boolean);
        const detailMessage = blockingIssues.length === 1
          ? blockingIssues[0].message
          : `Antes de agregar un pez, resuelve: ${labels.join(', ')}.`;

        this.notify(
          detailMessage,
          'warning',
          {
            title: 'Repara el estanque',
            icon_image: './assets/img/alert_warning.png',
          },
        );
        this.draggedItem = null;
        return;
      }

      const fishId = this.resolveInventoryModelId(item, 'fish');

      if (this.currentUser && !fishId) {
        this.notify('No se pudo identificar el pez seleccionado.', 'error');
        this.draggedItem = null;
        return;
      }

      if (!this.currentUser || !this.currentPondId) {
        if (fishId) item.fishId = fishId;
        this.performLocalStock(tileIndex, item);
        this.reduceItemCountFromSlot(item);
        this.notify('Agregaste un nuevo pez al estanque', 'success');
        this.handleMissionEvent('pond.stock');
        this.onTutorialEvent('pond-slot-stocked', {
          tileIndex,
          success: true,
          itemType: 'fish',
        });
        this.draggedItem = null;
        return;
      }

      const actionResult = await this.postSlotAction('stock', tileIndex, {
        fish_id: fishId,
      });

      if (actionResult.success) {
        this.reduceItemCountFromSlot(item);
        this.notify('Agregaste un nuevo pez al estanque', 'success');
        this.handleMissionEvent('pond.stock');
        this.onTutorialEvent('pond-slot-stocked', {
          tileIndex,
          success: true,
          itemType: 'fish',
        });
        if (!actionResult.slotData) {
          await this.fetchPondState();
        }
      } else {
        await this.fetchPondState();
      }

      this.draggedItem = null;
    },

    // herramienta de regulación sobre un tile
    async useToolOnTile(tool, tileIndex) {
      const tile = this.game.tiles[tileIndex];
      if (!tile) return;

      const toolMap = {
        1: { issue: 'ph', label: 'pH', mission: 'pond.solve_ph' },
        2: { issue: 'oxygen', label: 'oxígeno', mission: 'pond.solve_oxygen' },
        3: { issue: 'temperature', label: 'temperatura', mission: 'pond.solve_temperature' },
        4: { issue: 'water-quality', label: 'calidad del agua', mission: 'pond.clean' },
      };

      const config = toolMap[tool.toolId];

      if (!config) {
        console.log('Esa herramienta no está implementada');
        return;
      }

      tile.problems = tile.problems || {
        ph: false,
        oxygen: false,
        temperature: false,
        waterQuality: false,
      };

      const isWaterTool = config.issue === 'water-quality';

      if (isWaterTool) {
        const hasWaterIssue = tile.problems.waterQuality || tile.condition === 'dirty';

        if (!hasWaterIssue) {
          this.notify('Este espacio ya está limpio.', 'warning');
          return;
        }

        tile.problems.waterQuality = false;
        tile.lastCleanedAt = new Date().toISOString();
        this.updateTileConditionState(tile);
        this.notify('El agua volvió a estar limpia', 'success');

        if (this.currentUser) {
          const result = await this.resolveIssueOnServer(tileIndex, config.issue);
          if (!result.success) {
            await this.fetchPondState();
            return;
          }
        }

        this.handleMissionEvent(config.mission);
        return;
      }

      const currentIssues = tile.problems || {};
      const hasIssue = !!currentIssues[config.issue];

      if (!hasIssue) {
        this.notify(`No hay un problema de ${config.label} en este espacio.`, 'warning');
        return;
      }

      currentIssues[config.issue] = false;

      if (config.issue === 'ph') {
        tile.lastPhAdjustedAt = new Date().toISOString();
      } else if (config.issue === 'oxygen') {
        tile.lastOxygenatedAt = new Date().toISOString();
      }

      this.updateTileConditionState(tile);
      this.notify(`Problema de ${config.label.toUpperCase()} solucionado`, 'success');

      if (this.currentUser) {
        const result = await this.resolveIssueOnServer(tileIndex, config.issue);
        if (!result.success) {
          await this.fetchPondState();
          return;
        }
      }

      this.handleMissionEvent(config.mission);
    },


    startProblemTimers() {
      // PH
      this.game.problemTimers.ph.timer = setInterval(() => {
        if (!this.tutorial.completed) {
          return;
        }
        if (!this.game.problemsTriggeredToday.ph) {
          this.applyProblemToAllTiles("ph");
          this.game.problemsTriggeredToday.ph = true;
        }
      }, this.game.problemTimers.ph.interval * 1000);

      // OXÍGENO
      this.game.problemTimers.oxygen.timer = setInterval(() => {
        if (!this.tutorial.completed) {
          return;
        }
        if (!this.game.problemsTriggeredToday.oxygen) {
          this.applyProblemToAllTiles("oxygen");
          this.game.problemsTriggeredToday.oxygen = true;
        }
      }, this.game.problemTimers.oxygen.interval * 1000);

      // TEMPERATURA
      this.game.problemTimers.temperature.timer = setInterval(() => {
        if (!this.tutorial.completed) {
          return;
        }
        if (!this.game.problemsTriggeredToday.temperature) {
          this.applyProblemToAllTiles("temperature");
          this.game.problemsTriggeredToday.temperature = true;
        }
      }, this.game.problemTimers.temperature.interval * 1000);
    },

    applyProblemToAllTiles(type) {
      if (!this.tutorial.completed) {
        return;
      }
      console.log(` Activando problema ${type} en TODOS los tiles`);

      const normalizedType = String(type || '').toLowerCase();
      const labelMap = {
        ph: 'pH',
        oxygen: 'oxígeno',
        temperature: 'temperatura',
        'water-quality': 'calidad del agua',
      };

      let appliedToAny = false;

      this.game.tiles.forEach((tile, index) => {
        tile.problems = tile.problems || {
          ph: false,
          oxygen: false,
          temperature: false,
          waterQuality: false,
        };

        if (!(normalizedType in tile.problems) && normalizedType !== 'water-quality') {
          console.warn(`Tipo de problema desconocido: ${normalizedType}`);
          return;
        }

        if (normalizedType === 'water-quality') {
          if (!tile.problems.waterQuality) {
            appliedToAny = true;
          }
          tile.problems.waterQuality = true;
          tile.lastCleanedAt = null;
        } else {
          if (!tile.problems[normalizedType]) {
            appliedToAny = true;
          }
          tile.problems[normalizedType] = true;
        }

        this.updateTileConditionState(tile);
        console.log(`Tile ${index}: problema ${normalizedType} aplicado`);

        const serverTypes = ['ph', 'oxygen', 'temperature', 'water-quality'];
        if (this.currentUser && this.currentPondId && serverTypes.includes(normalizedType)) {
          this.raiseProblemOnServer(index, normalizedType);
        }
      });

      if (appliedToAny) {
        const label = labelMap[normalizedType] || normalizedType;
        this.notify(`¡Alerta! Se detectó un problema de ${label} en el estanque.`, 'warning', {
          title: 'Problema detectado',
        });
      }
    },


    stopProblemTimers() {
      const timers = this.game.problemTimers;
      for (const key in timers) {
        if (timers[key].timer) {
          clearInterval(timers[key].timer);
          timers[key].timer = null;
        }
      }
    },

    reduceItemCountFromSlot(item) {
      if (!item) {
        return;
      }

      const normalizeId = (value) => {
        const parsed = Number(value);
        return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
      };

      const targetInventoryId = item?.inventoryItemId ?? null;
      const targetImg = item?.img ?? null;

      const decrementSlot = (section, slot) => {
        if (!section || !slot || !slot.img || !slot.count) {
          return false;
        }

        const wasSelected = section.selectedSlotId;
        const targetSlotId = slot.id;
        const isActiveSection = this.activeInvSection === section;

        const nextCount = Number(slot.count ?? 0) - 1;
        slot.count = nextCount > 0 ? nextCount : 0;

        if (slot.count <= 0) {
          this.resetInventorySlot(slot);
          this.compactInventorySection(section, { autoSelect: false });

          if (isActiveSection && wasSelected === targetSlotId) {
            const sameSlot = section.slots.find((s) => s.id === targetSlotId && s.img);
            if (sameSlot) {
              section.selectedSlotId = targetSlotId;
            } else {
              const firstFilled = section.slots.find((s) => s.img);
              section.selectedSlotId = firstFilled ? firstFilled.id : null;
            }
          }
        } else {
          this.enforceFavoriteLimit(section);

          if (isActiveSection && wasSelected === targetSlotId) {
            section.selectedSlotId = targetSlotId;
          }
        }

        return true;
      };

      let modified = false;

      const directSectionId = normalizeId(
        item.sourceSectionId
        ?? item.sectionId
        ?? item.category
        ?? item.categoryId
        ?? item.category_id
      );

      const directSlotId = normalizeId(
        item.sourceSlotId
        ?? item.inventorySlotId
        ?? item.slotId
        ?? item.slot_id
      );

      if (directSectionId) {
        const section = this.inventory.sections[directSectionId];
        if (section) {
          if (directSlotId) {
            const targetSlot = section.slots.find((s) => s.id === directSlotId);
            modified = decrementSlot(section, targetSlot);
          }

          if (!modified) {
            const slot = section.slots.find((s) => {
              if (!s.img || !s.count) {
                return false;
              }

              if (targetInventoryId && s.inventoryItemId) {
                return s.inventoryItemId === targetInventoryId;
              }

              return targetImg ? s.img === targetImg : false;
            });

            if (slot) {
              modified = decrementSlot(section, slot);
            }
          }
        }
      }

      if (!modified) {
        for (const section of Object.values(this.inventory.sections)) {
          const slot = section.slots.find((s) => {
            if (!s.img || !s.count) {
              return false;
            }

            if (targetInventoryId && s.inventoryItemId) {
              return s.inventoryItemId === targetInventoryId;
            }

            return targetImg ? s.img === targetImg : false;
          });

          if (!slot) {
            continue;
          }

          modified = decrementSlot(section, slot);
          if (modified) {
            break;
          }
        }
      }

      if (!modified) {
        return;
      }

      this.syncQuickPanelWithFavorites();

      if (this.currentUser) {
        this.persistInventoryState();
      }
    },

    syncQuickPanelWithFavorites() {
      this.updateQuickPanelSlots();
    },

    resetToolUsageStats() {
      TOOL_USAGE_DEFINITIONS.forEach((definition) => {
        if (this.toolUsageStats[definition.slug]) {
          this.toolUsageStats[definition.slug].count = 0;
        }
      });
    },

    applyToolUsageRecords(records) {
      this.resetToolUsageStats();

      if (!Array.isArray(records)) {
        return;
      }

      records.forEach((entry) => {
        const slug = entry?.tool_slug;
        if (!slug || !this.toolUsageStats[slug]) {
          return;
        }

        const countValue = Number(entry?.usage_count ?? 0);
        this.toolUsageStats[slug].count = Number.isFinite(countValue) && countValue >= 0
          ? countValue
          : 0;
      });
    },

    async fetchToolUsage() {
      if (!this.currentUser) {
        this.resetToolUsageStats();
        return;
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/tool-usage`, {
          headers: {
            Accept: 'application/json',
          },
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo obtener el uso de herramientas.');
        }

        const records = Array.isArray(payload?.data) ? payload.data : [];
        this.applyToolUsageRecords(records);
      } catch (error) {
        console.warn('No se pudo cargar el uso de herramientas.', error);
      }
    },

    async recordToolUsage(toolSlug, amount = 1) {
      if (!toolSlug || !TOOL_USAGE_DEFINITIONS_BY_SLUG[toolSlug]) {
        return;
      }

      const stat = this.toolUsageStats[toolSlug];

      if (!stat) {
        return;
      }

      const previousCount = Number(stat.count ?? 0);
      const validAmount = Number.isFinite(amount) && amount > 0 ? Math.floor(amount) : 1;

      stat.count = previousCount + validAmount;

      if (!this.currentUser) {
        return;
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/tool-usage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            tool_slug: toolSlug,
            amount: validAmount,
          }),
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo registrar el uso de la herramienta.');
        }

        if (payload?.data?.usage_count !== undefined) {
          const updated = Number(payload.data.usage_count);
          stat.count = Number.isFinite(updated) && updated >= 0 ? updated : stat.count;
        }
      } catch (error) {
        stat.count = previousCount;
        console.warn('No se pudo registrar el uso de la herramienta.', error);
      }
    },

    resolveToolSlugById(toolId) {
      const idNumber = Number(toolId);
      if (!Number.isFinite(idNumber)) {
        return null;
      }

      const match = this.game.regulationTools.find((tool) => Number(tool.id) === idNumber);
      return match?.slug || null;
    },

    // ========= CICLO DÍA/NOCHE =========
    startDayNightCycle() {
      this.timeLeft = this.dayTimerSec;

      this.cycleInterval = setInterval(() => {
        this.timeLeft--;
        this.updateFishLifecycle();
        if (this.timeLeft <= 0) {
          this.toggleDayNight();
        }
      }, 1000);
    },

    triggerDayNightTransition(cycle) {
      const theme = cycle === "night" ? "night" : "day";
      const icon = theme === "day" ? "./assets/img/sol.png" : "./assets/img/luna.png";

      this.dayNightTransition.theme = theme;
      this.dayNightTransition.icon = icon;
      this.dayNightTransition.active = true;

      if (this.dayNightTransitionTimeoutId) {
        clearTimeout(this.dayNightTransitionTimeoutId);
      }

      this.dayNightTransitionTimeoutId = setTimeout(() => {
        this.dayNightTransition.active = false;
        this.dayNightTransitionTimeoutId = null;
      }, 3000);
    },

    toggleDayNight() {
      if (this.currentCycle === "day") {
        this.currentCycle = "night";
        this.timeLeft = this.nightTimerSec;

        // Se ensucia el estanque cada noche
        if (!this.game.dirtAppliedToday) {
          this.markAllTilesDirty();
          this.game.dirtAppliedToday = true;
        }
      } else {
        this.currentCycle = "day";
        this.timeLeft = this.dayTimerSec;

        this.checkDeathByDirt();

        // Cada día resetear reparaciones y suciedad
        this.currentDay++;
        this.persistCurrentDay(this.currentDay);
        this.game.repairsToday = {
          ph: 0,
          oxygen: 0,
          temperature: 0,
          waterQuality: 0,
        };
        this.game.problemsTriggeredToday = {
          ph: false,
          oxygen: false,
          temperature: false,
        };

        this.game.dirtAppliedToday = false;
      }

      this.triggerDayNightTransition(this.currentCycle);
    },

    markAllTilesDirty() {
      if (!this.tutorial.completed) {
        return;
      }
      this.applyProblemToAllTiles('water-quality');
    },

    cleanTile(index) {
      const tile = this.game.tiles[index];

      tile.problems = tile.problems || {
        ph: false,
        oxygen: false,
        temperature: false,
        waterQuality: false,
      };
      tile.problems.waterQuality = false;
      tile.lastCleanedAt = new Date().toISOString();
      this.updateTileConditionState(tile);

      // Si estaba muerto se limpiar el tile
      if (tile.stage === "dead") {
        tile.stage = "empty";
        tile.hasFish = false;
        tile.alive = true;
        tile.stageTime = 0;
        tile.currentStageDuration = 0;
        tile.statusClass = "status0";
        tile.imgSrc = null;
        tile.serverStatus = "empty";
        tile.harvestPrice = DEFAULT_FISH_HARVEST_REWARD;
      }

    },

    // CICLO DE VIDA DE PECES
    onTileClick(index) {
      const tile = this.game.tiles[index];

      if (tile.stage === "dead") {
        tile.stage = "empty";
        tile.hasFish = false;
        tile.alive = true;
        tile.stageTime = 0;
        tile.imgSrc = null;
        tile.statusClass = "status0";
        tile.serverStatus = "empty";
        tile.harvestPrice = DEFAULT_FISH_HARVEST_REWARD;
        this.notify('Retiraste un pez muerto', 'warning');
        if (this.currentUser) {
          this.postSlotAction('advance', index, { target_status: 'empty' });
        }
        return;
      }
      if (tile.stage === "ready") {
        this.harvestFish(index);
        return;
      }
      console.log(`Tile ${index}: Pez muerto eliminado por clic`);
    },

    // crecimiento por tiempo
    updateFishLifecycle() {
      this.game.tiles.forEach((tile, index) => {
        this.handlePlantEffectExpiration(tile, index);

        if (!tile.hasFish || !tile.alive) return;

        // Pez listo = no se afecta por nada y no crece más
        if (tile.stage === "ready") return;

        // Detectar problemas
        const hasProblems =
          tile.condition === "dirty" ||
          tile.problems.ph ||
          tile.problems.oxygen ||
          tile.problems.temperature;

        // Pierda vida si hay problemas en el estanque
        if (tile.stage === "egg" || tile.stage === "adult") {
          let damage = 0;

          if (tile.condition === "dirty") damage += 1;
          if (tile.problems.ph) damage += 2;
          // Solo aplica daño por oxígeno si no está protegido
          if (tile.problems.oxygen && !tile.oxygenProtected) damage += 3;
          if (tile.problems.temperature && !tile.temperatureProtected) damage += 1;

          if (damage > 0) {
            tile.life -= damage;
            console.log(
              `%cTile ${index} → Vida: ${tile.life}, Hambre: ${tile.hungry}`,
              "color: orange; font-weight: bold"
            );

            // condición de hambre balanceada
            if (
              hasProblems &&
              tile.life < tile.maxLife * 0.9 && // hambre con <90% vida
              tile.foodUses < tile.maxFoodUses
            ) {
              tile.hungry = true;
            }

            if (tile.life <= 0) {
              this.killFishOrEgg(index, tile.stage);
              return;
            }
          }
        }

        // No crece el pez mientras hayan problemas
        if (hasProblems) {
          return;
        }

        const growthMultiplier = Number(tile.growthRateMultiplier ?? 1);
        const growthIncrement = Number.isFinite(growthMultiplier) && growthMultiplier > 0
          ? growthMultiplier
          : 1;

        tile.stageTime += growthIncrement;

        const hungerInterval = Number(this.game.hungerIntervalSec ?? 60) || 60;
        const hungerDamageInterval = Number(this.game.hungerDamageIntervalSec ?? hungerInterval) || hungerInterval;
        const hungerDamage = Number(this.game.hungerDamagePerTick ?? 0) || 0;
        const fallbackGrowthDivisor = Math.max(1, growthIncrement);

        if (tile.stage === 'adult' && tile.foodUses < tile.maxFoodUses) {
          const nowMs = Date.now();
          const lastFedMs = tile.lastFedAt ? Date.parse(tile.lastFedAt) : NaN;
          const secondsSinceFed = Number.isFinite(lastFedMs)
            ? Math.max(0, (nowMs - lastFedMs) / 1000)
            : (tile.stageTime / fallbackGrowthDivisor);

          if (secondsSinceFed >= hungerInterval) {
            if (!tile.hungry) {
              tile.hungry = true;
              tile.hungrySince = new Date(nowMs).toISOString();
            }

            if (hungerDamage > 0) {
              const lastDamageMs = tile.lastHungerDamageAt ? Date.parse(tile.lastHungerDamageAt) : NaN;
              const secondsSinceDamage = Number.isFinite(lastDamageMs)
                ? Math.max(0, (nowMs - lastDamageMs) / 1000)
                : Infinity;

              if (secondsSinceDamage >= hungerDamageInterval) {
                tile.life = Math.max(0, tile.life - hungerDamage);
                tile.lastHungerDamageAt = new Date(nowMs).toISOString();

                if (tile.life <= 0) {
                  this.killFishOrEgg(index, tile.stage);
                  return;
                }
              }
            }
          }
        } else if (tile.stage === 'adult' && tile.foodUses >= tile.maxFoodUses) {
          tile.hungry = false;
          tile.hungrySince = null;
        }

        // Huevo → Adulto
        if (tile.stage === "egg") {
          if (tile.stageTime >= tile.eggDuration) {
            tile.stage = "adult";
            tile.stageTime = 0;
            tile.statusClass = "status2";
            tile.imgSrc = tile._fishData.adultImg;
            tile.foodUses = 0;
            tile.hungry = false;
            tile.serverStatus = "adult";
            tile.currentStageDuration = tile.adultDuration;

            console.log(`Tile ${index}: Huevo evolucionó a pez adulto`);
            this.notify('Un huevo ya es un pez adulto', 'success');
            if (this.currentUser) {
              this.postSlotAction('advance', index, { target_status: 'adult' });
            }
          }
          return;
        }

        if (tile.stage === "adult") {
          if (tile.stageTime >= tile.adultDuration) {
            tile.stage = "ready";
            tile.statusClass = "status2";
            tile.serverStatus = "adult";
            tile.currentStageDuration = 0;

            tile.condition = "clean";
            tile.problems.ph = false;
            tile.problems.oxygen = false;
            tile.problems.temperature = false;
            tile.hungry = false;

            console.log(`Tile ${index}: Pez está listo (READY)`);
          }
          return;
        }
      });
    },

    // muerte por suciedad cuando es de día
    checkDeathByDirt() {
      this.game.tiles.forEach((tile, index) => {
        if (!tile.hasFish || !tile.alive) return;

        // Si está sucio y es huevo o adulto va a murir
        if (tile.condition === "dirty") {
          if (tile.stage === "egg" || tile.stage === "adult") {
            this.killFishOrEgg(index, tile.stage);
            this.notify('Tu estanque está tan sucio que murió un pez.', 'error');
            console.log(
              `Tile ${index}: ${tile.stage} murió por suciedad al amanecer`
            );
          }
        }
      });
    },

    // pez o huevo muerto
    killFishOrEgg(index, previousStage) {
      const tile = this.game.tiles[index];

      if (tile && tile.hasPlant) {
        this.clearPlantFromTile(tile);
      }

      tile.stage = "dead";
      tile.alive = false;
      tile.hasFish = true;
      tile.statusClass = "status3";
      tile.serverStatus = "dead";
      tile.currentStageDuration = 0;

      // asignar imagen
      const fishData = tile._fishData || {};
      tile.imgSrc =
        previousStage === "egg"
          ? fishData.eggDeadImg || null
          : fishData.adultDeadImg || null;

      // ----CAUSA DE MUERTE----
      const problems = tile.problems || {};
      let cause = "causas desconocidas";
      if (problems.ph) {
        cause = "pH fuera de rango";
      } else if (problems.oxygen) {
        cause = "oxígeno insuficiente";
      } else if (problems.temperature) {
        cause = "temperatura inadecuada";
      } else if (problems.waterQuality) {
        cause = "mala calidad del agua";
      } else if (tile.condition === "dirty") {
        cause = "agua sucia";
      } else if (tile.hungry) {
        cause = "hambre";
      } else if (typeof tile.life === 'number' && tile.life <= 0) {
        cause = "salud agotada";
      }

      const fishName = typeof tile._fishData?.name === 'string' && tile._fishData.name.trim()
        ? tile._fishData.name.trim()
        : '';
      const isEgg = String(previousStage).toLowerCase() === 'egg';
      const subject = isEgg ? 'huevo' : 'pez';
      const label = fishName ? `${subject} ${fishName}` : subject;

      console.log(`Tile ${index}: el ${subject} murió por ${cause}`);

      this.notify(
        `Tu ${label} murió por ${cause}.`,
        'error',
        {
          title: isEgg ? 'Huevo perdido' : 'Pez perdido',
          icon_image: './assets/img/alert_x.png',
        },
      );

      if (this.currentUser) {
        this.postSlotAction('mark-dead', index);
      }
    },

    // COSECHA DE PECES LISTOS
    calculateFishHarvestReward(tile) {
      if (!tile) {
        return DEFAULT_FISH_HARVEST_REWARD;
      }

      const stored = Number(tile.harvestPrice ?? 0);
      if (Number.isFinite(stored) && stored > 0) {
        return Math.round(stored);
      }

      const dataPrice = Number(tile._fishData?.sellPrice ?? tile._fishData?.price ?? 0);
      if (Number.isFinite(dataPrice) && dataPrice > 0) {
        return Math.round(dataPrice);
      }

      return DEFAULT_FISH_HARVEST_REWARD;
    },
    async harvestFish(index) {
      const tile = this.game.tiles[index];

      // Agregar dinero (RECOMPENSA)
      const baseReward = this.calculateFishHarvestReward(tile);
      const multiplier = this.getMarketHarvestMultiplier();
      const totalReward = Math.round(baseReward * multiplier);

      const currentMoney = Number.parseInt(this.market.money ?? "0", 10);
      const newBalance = Number.isFinite(currentMoney) ? currentMoney + totalReward : totalReward;
      this.market.money = String(newBalance);
      if (this.currentUser) {
        const fishName = (tile?._fishData?.name || '').trim() || 'Pez';
        const harvestEvent = `Cosecha de ${fishName}`;

        this.queueWalletSync(newBalance, {
          transactionType: 'harvest',
          event: `${harvestEvent} (+${totalReward})`,
          forceImmediately: true,
        });
      }
      console.log(`Tile ${index}: Pez cosechado +${totalReward} monedas (base ${baseReward})`);

      if (multiplier > 1) {
        this.notify(`¡Bonanza en el mercado! Recibiste x${multiplier} (${totalReward} monedas) por tu pez adulto.`, 'market');
      } else {
        this.notify(`¡Pez cosechado! +${totalReward} monedas`, 'success');
      }
      // Limpiar completamente el tile
      tile.stage = "empty";
      tile.hasFish = false;
      tile.alive = true;
      tile.stageTime = 0;
      tile.statusClass = "status0";
      tile.imgSrc = null;
      tile.serverStatus = "empty";
      tile.harvestPrice = DEFAULT_FISH_HARVEST_REWARD;

      if (this.currentUser) {
        const result = await this.postSlotAction('harvest', index);

        if (!result.success) {
          await this.fetchPondState();
        } else {
          this.handleMissionEvent('pond.harvest');
          if (!result.slotData) {
            await this.fetchPondState();
          }
        }
      }
    },

    showFeedPopup(tileIndex, amount) {
      const tiles = document.querySelectorAll(".tile");
      const tileEl = tiles[tileIndex];
      if (!tileEl) return;

      const popup = document.createElement("div");
      popup.classList.add("feed-popup");
      popup.textContent = `+${amount} VIDA`;

      tileEl.appendChild(popup);

      setTimeout(() => popup.remove(), 1000);
    },

    feedFish(tileIndex) {
      const tile = this.game.tiles[tileIndex];
      if (!tile.hasFish || !tile.alive) return;

      const stage = String(tile.stage || tile.serverStatus || '').toLowerCase();
      if (stage === 'egg') {
        this.notify('No puedes alimentar un huevo. Espera a que nazca el pez.', 'warning');
        return;
      }

      if (!tile.hungry) {
        this.notify('Este pez no tiene hambre en este momento.', 'warning');
        return;
      }

      const amount = 10; // vida que recupera
      tile.life = Math.min(tile.life + amount, tile.maxLife);
      tile.lastFedAt = new Date().toISOString();
      tile.hungry = false;
      tile.hungrySince = null;
      tile.lastHungerDamageAt = null;
      tile.foodUses = Math.min(tile.maxFoodUses, (Number(tile.foodUses ?? 0) || 0) + 1);

      this.showFeedPopup(tileIndex, amount);

      console.log(` Tile ${tileIndex}: Pez alimentado (+${amount} vida)`);
      if (this.currentUser) {
        this.postSlotAction('feed', tileIndex);
      }
      this.handleMissionEvent('pond.feed');
    },

    // ========= MISIONES =========
    async claimReward(missionIndex) {
      const mission = this.missions[missionIndex];

      if (!mission || !mission.completed || mission.claimed) {
        return;
      }

      if (!this.currentUser) {
        const rewardAmount = Number(mission.reward ?? 0) || 0;
        this.market.money = String(
          parseInt(this.market.money || "0", 10) + rewardAmount
        );

        this.missionMoney += rewardAmount;
        this.notify(`Recompensa obtenida: +${mission.reward} monedas`, "mission");

        const nextLevel = Number(mission.currentLevel ?? 1) + 1;
        const maxLevel = Number(mission.maxLevel ?? 5);

        if (nextLevel <= maxLevel) {
          const levels = Array.isArray(mission.levels) && mission.levels.length
            ? mission.levels
            : [{ target: mission.target, reward: mission.reward }];
          const nextConfig = levels[nextLevel - 1] || levels[levels.length - 1];

          mission.currentLevel = nextLevel;
          mission.progress = 0;
          mission.target = nextConfig?.target ?? mission.target;
          mission.reward = nextConfig?.reward ?? mission.reward;
          mission.completed = false;
          mission.claimed = false;
        } else {
          this.missions.splice(missionIndex, 1);

          const recycled = {
            ...mission,
            currentLevel: 1,
            progress: 0,
            target: mission.levels?.[0]?.target ?? mission.target,
            reward: mission.levels?.[0]?.reward ?? mission.reward,
            completed: false,
            claimed: false,
          };

          if (recycled.levels?.length) {
            this.localMissionsPool.push(recycled);
          }

          const newMission = this.generateNewMission();
          if (newMission) {
            this.missions.push(newMission);
          }
        }

        this.sortMissions();

        this.onTutorialEvent('mission-claimed', {
          mission,
          missionIndex,
          success: true,
        });

        return;
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/missions/${mission.id}/claim`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudo reclamar la misión.');
        }

        const updatedMission = payload?.data ? this.normalizeServerMission(payload.data) : null;
        const balance = Number(payload?.wallet?.balance);

        if (Number.isFinite(balance)) {
          this.market.money = String(balance);
        }

        this.missionMoney += mission.reward;
        this.notify(`Recompensa obtenida: +${mission.reward} monedas`, "mission");

        if (updatedMission) {
          this.mergeMissionUpdates([updatedMission]);
        }

        await this.fetchMissions();
        this.sortMissions();

        this.onTutorialEvent('mission-claimed', {
          mission,
          missionIndex,
          success: true,
        });
      } catch (error) {
        console.warn('No se pudo reclamar la misión:', error);
      }
    },

    generateNewMission() {
      if (!Array.isArray(this.localMissionsPool) || this.localMissionsPool.length === 0) {
        return null;
      }

      const randomIndex = Math.floor(Math.random() * this.localMissionsPool.length);
      const base = this.localMissionsPool[randomIndex];
      const levels = Array.isArray(base.levels) && base.levels.length > 0
        ? base.levels
        : [{ target: base.target ?? 1, reward: base.reward ?? 0 }];
      const levelConfig = levels[0];

      const newMission = {
        ...base,
        id: `${base.id}-${Date.now()}`,
        completed: false,
        claimed: false,
        rewardImg: './assets/img/recompenza.png',
        progress: 0,
        target: levelConfig?.target ?? base.target ?? 1,
        reward: levelConfig?.reward ?? base.reward ?? 0,
        currentLevel: 1,
        maxLevel: levels.length,
        levels,
      };

      this.localMissionsPool.splice(randomIndex, 1);

      return newMission;
    },

    // ========= NOTIFICACIONES =========
    notify(message, type = 'default', options = {}) {
      const notification = this.buildNotificationPayload(message, type, options);

      if (!notification) {
        return;
      }

      const persistSetting = Object.prototype.hasOwnProperty.call(options || {}, 'persistToServer')
        ? options.persistToServer
        : true;

      if (persistSetting && this.currentUser && this.currentUser.id) {
        let persistOverrides = {};

        if (persistSetting === true) {
          persistOverrides = {};
        } else if (typeof persistSetting === 'string') {
          persistOverrides = { type: persistSetting };
        } else if (typeof persistSetting === 'object') {
          persistOverrides = persistSetting;
        }

        this.persistNotificationRecord(notification, persistOverrides);
      }

      if (!this.currentNotification) {
        this.showNotification(notification);
        return;
      }

      this.notificationQueue = [notification];
      this.processNotificationQueue(true);
    },

    buildNotificationPayload(message, type, options = {}) {
      const text = (message || '').toString().trim();
      if (!text) {
        return null;
      }

      const slug = this.normalizeNotificationType(type);
      const palette = this.getNotificationPalette(slug);

      const notification = {
        id: Date.now() + Math.random(),
        message: text,
        type: slug,
        slug,
        colors: palette,
        title: options && options.title ? options.title : null,
        icon: options && options.icon ? options.icon : null,
        icon_image: options && options.icon_image ? options.icon_image : null,
      };

      if (!notification.title && palette && palette.title) {
        notification.title = palette.title;
      }

      return notification;
    },

    normalizeNotificationType(type) {
      const slug = (type || 'default').toString().toLowerCase();

      const legacyMap = {
        pond: 'success',
        mission: 'success',
        default: 'default',
        market: 'market',
        info: 'warning',
      };

      return legacyMap[slug] || slug;
    },

    getNotificationPalette(slug) {
      return this.notificationTypes[slug]
        || this.notificationTypes.default
        || GAME_NOTIFICATION_TYPE_PRESETS.default;
    },

    normalizeServerNotification(raw) {
      if (!raw || typeof raw !== 'object') {
        return null;
      }

      const content = (raw.content ?? raw.message ?? '').toString();

      let slug = 'default';
      const rawType = raw.type ?? raw.notification_type ?? null;

      if (typeof rawType === 'string') {
        slug = this.normalizeNotificationType(rawType);
      } else if (rawType && typeof rawType === 'object' && rawType.slug) {
        slug = this.normalizeNotificationType(rawType.slug);
      } else if (raw.slug) {
        slug = this.normalizeNotificationType(raw.slug);
      }

      const palette = this.getNotificationPalette(slug);

      const typePayload = rawType && typeof rawType === 'object'
        ? {
          slug: rawType.slug || slug,
          name: rawType.name || null,
          default_title: rawType.default_title || null,
          background_color: rawType.background_color || null,
          text_color: rawType.text_color || null,
          border_color: rawType.border_color || null,
        }
        : {
          slug,
          name: null,
          default_title: palette?.title || null,
          background_color: palette?.background || null,
          text_color: palette?.text || null,
          border_color: palette?.border || null,
        };

      return {
        id: raw.id ?? `${slug}-${Date.now()}`,
        slug,
        title: raw.title || typePayload.default_title || palette?.title || null,
        content,
        createdAt: raw.created_at ?? null,
        readAt: raw.read_at ?? null,
        isRead: Boolean(raw.is_read),
        type: typePayload,
        palette,
      };
    },

    recordNotificationHistoryEntry(rawEntry, { prepend = true } = {}) {
      const entry = this.normalizeServerNotification(rawEntry);

      if (!entry || !entry.id) {
        return;
      }

      const list = Array.isArray(this.notificationHistory)
        ? [...this.notificationHistory]
        : [];

      const existingIndex = list.findIndex((item) => item && item.id === entry.id);

      if (existingIndex >= 0) {
        list.splice(existingIndex, 1);
      }

      if (prepend) {
        list.unshift(entry);
      } else {
        list.push(entry);
      }

      const limit = Number(this.notificationHistoryLimit);

      if (Number.isFinite(limit) && limit > 0 && list.length > limit) {
        list.length = limit;
      }

      this.notificationHistory = list;
      this.recalculateNotificationUnreadCount();
    },

    recalculateNotificationUnreadCount() {
      const unread = Array.isArray(this.notificationHistory)
        ? this.notificationHistory.reduce((count, item) => count + (item && item.isRead ? 0 : 1), 0)
        : 0;

      this.notificationUnreadCount = unread;
    },

    async syncNotificationHistory(limit = 20) {
      if (!this.currentUser || !this.currentUser.id) {
        return;
      }

      if (this.notificationHistoryLoading) {
        return;
      }

      this.notificationHistoryLoading = true;
      this.notificationHistoryError = null;

      const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 50) : 20;

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/notifications?limit=${safeLimit}`, {
          headers: { Accept: 'application/json' },
          credentials: 'include',
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudieron sincronizar las notificaciones.');
        }

        const records = Array.isArray(payload?.data) ? payload.data : [];
        const normalized = records
          .map((item) => this.normalizeServerNotification(item))
          .filter(Boolean);

        this.notificationHistory = normalized;

        const unread = Number(payload?.meta?.unread_count);

        if (Number.isFinite(unread) && unread >= 0) {
          this.notificationUnreadCount = unread;
        } else {
          this.recalculateNotificationUnreadCount();
        }

        this.lastNotificationSync = Date.now();
      } catch (error) {
        this.notificationHistoryError = error;
        console.warn('No se pudieron sincronizar las notificaciones:', error);
      } finally {
        this.notificationHistoryLoading = false;
      }
    },

    async markAllNotificationsRead() {
      if (!this.currentUser || !this.currentUser.id) {
        return;
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/notifications/mark-all-read`, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload?.message || 'No se pudieron marcar como leídas.');
        }

        this.notificationHistory = this.notificationHistory.map((item) => {
          if (!item) {
            return item;
          }

          return {
            ...item,
            isRead: true,
            readAt: item.readAt || new Date().toISOString(),
          };
        });

        this.notificationUnreadCount = 0;
      } catch (error) {
        console.warn('No se pudieron marcar las notificaciones como leídas:', error);
      }
    },

    async persistNotificationRecord(notification, overrides = {}) {
      if (!notification || !this.currentUser || !this.currentUser.id) {
        return;
      }

      const fallbackEntry = this.normalizeServerNotification({
        id: notification.id,
        title: notification.title,
        content: notification.message,
        type: { slug: notification.type || notification.slug || 'default' },
        created_at: new Date().toISOString(),
        is_read: false,
      });

      const overrideObject = (overrides && typeof overrides === 'object') ? overrides : {};

      const contentSource = Object.prototype.hasOwnProperty.call(overrideObject, 'content')
        ? overrideObject.content
        : notification.message;

      const content = (contentSource || '').toString().trim();

      if (!content) {
        return;
      }

      const rawType = Object.prototype.hasOwnProperty.call(overrideObject, 'type')
        ? overrideObject.type
        : (notification.type || notification.slug || 'default');

      const type = this.normalizeNotificationType(rawType || 'default');

      const payload = {
        type,
        content,
      };

      const rawTitle = Object.prototype.hasOwnProperty.call(overrideObject, 'title')
        ? overrideObject.title
        : notification.title;

      if (rawTitle) {
        payload.title = rawTitle.toString().slice(0, 255);
      }

      try {
        const response = await fetch(`${API_SERVER}/api/v1/users/${this.currentUser.id}/notifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        const responsePayload = await response.json().catch(() => ({}));

        if (!response.ok) {
          console.warn('No se pudo registrar la notificación en el servidor:', responsePayload?.message || response.statusText);
          if (fallbackEntry) {
            this.recordNotificationHistoryEntry(fallbackEntry);
          }
          return;
        }

        const serverEntry = this.normalizeServerNotification(responsePayload?.data || responsePayload);

        if (serverEntry) {
          this.recordNotificationHistoryEntry(serverEntry);
          return;
        }

        if (fallbackEntry) {
          this.recordNotificationHistoryEntry(fallbackEntry);
        }
      } catch (error) {
        console.warn('No se pudo registrar la notificación en el servidor:', error);
        if (fallbackEntry) {
          this.recordNotificationHistoryEntry(fallbackEntry);
        }
      }
    },

    async loadNotificationTypes() {
      try {
        const response = await fetch(`${API_SERVER}/api/v1/notification-types`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'No se pudieron cargar los tipos de notificación.');
        }

        const map = { ...GAME_NOTIFICATION_TYPE_PRESETS };
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
        console.warn('Sincronización de tipos de notificación falló:', error);
      }
    },

    showNotification(notification) {
      if (!notification) {
        return;
      }

      if (this.currentNotification) {
        this.clearNotificationTimeout();
        this.currentNotification = null;
      }

      if (!notification.colors) {
        notification.colors = this.getNotificationPalette(notification.type);
      }

      this.clearNotificationTimeout();
      this.currentNotification = notification;

      try {
        const audio = new Audio('./assets/sounds/health-pickup-6860.mp3');
        audio.volume = 0.4;
        audio.play();
      } catch (error) {
        console.warn('No se pudo reproducir el sonido de notificación:', error);
      }

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
    //notificaciones que necesitan aparecer 1 vez al dia 
    // ADMINISTRACION DE NOTIFICACIONES diarias , comida, ph, oxigeno 


    // ========= PLACEHOLDERS LOGIN / HOME =========
    Signup() { },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    createNewUser() { },
    openToggleMenu() {
      this.showMenu = !this.showMenu;
    },
    openPlayIf() { },
    closeSession() { },
    autoSave() { },
    Login() { },
    OpenInfo() {
      this.showPopup = !this.showPopup;
    },

    // NUEVO
    // ========= SONIDO =========
    playSound(src) {
      try {
        const audio = new Audio(src);
        audio.volume = 0.3;
        audio.play();
      } catch (error) {
        console.warn('ERROR', error);
      }
    },

  },

  mounted() {
    this.inventory.onDropItem = (tileIndex) => this.onDropItem(tileIndex);
    this.loadNotificationTypes();
    this.initMarketDefaults();
    this.initMarketDoubleBonusState();
    this.bootstrapFromServer()
      .then(() => {
        this.initializeTutorial();
      })
      .catch(() => {
        this.initializeTutorial();
      });
    this.startMarketTimer();
    this.startDayNightCycle();
    this.startProblemTimers();
  },
  beforeUnmount() {
    this.stopMarketTimer();
    this.stopProblemTimers();
    this.clearTutorialTargetListener();
    if (this.cycleInterval) {
      clearInterval(this.cycleInterval);
      this.cycleInterval = null;
    }
    if (this.walletSyncTimerId) {
      clearTimeout(this.walletSyncTimerId);
      this.walletSyncTimerId = null;
    }
    if (this.dayNightTransitionTimeoutId) {
      clearTimeout(this.dayNightTransitionTimeoutId);
      this.dayNightTransitionTimeoutId = null;
    }
  },
});
