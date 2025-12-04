/**
 * InventoryInfo Component
 *
 * @fileoverview Inventory side panel that provides detailed information about the selected item, including species data, bonuses, and pricing.
 *
 * @component
 * @example
 * <inventory-info
 *   :show="isPanelVisible"
 *   :img="selectedItemImg"
 *   :item="selectedInventoryItem"
 *   @close="handleClose"
 * ></inventory-info>
 */
app.component('inventory-info', {
  /**
   * @typedef {Object} InventoryItemMeta
   * @property {string} [commonName]
   * @property {string} [displayName]
   * @property {string} [latinName]
   * @property {string} [scientificName]
   * @property {string} [description]
   * @property {string} [summary]
   * @property {Object} [bonuses]
   * @property {number} [bonuses.oxygen]
   * @property {number} [bonuses.ph]
   * @property {number} [bonuses.health_regeneration]
   * @property {Object} [effects]
   * @property {number} [effects.lifetime_seconds]
   * @property {boolean} [hunger_reset]
   * @property {boolean} [hungerReset]
   * @property {number} [feeding_limit_bonus]
   * @property {number} [feedingLimitBonus]
   */

  /**
   * @typedef {Object} InventoryItem
   * @property {string} [name]
   * @property {number|string} [price]
   * @property {string} [img]
   * @property {number} [catId]
   * @property {InventoryItemMeta} [metadata]
   * @property {string} [categorySlug]
   * @property {{ slug?: string }} [category]
   * @property {string} [inventorySlug]
   * @property {string} [slug]
   */

  /**
   * Component props - Data received from parent component
   * @typedef {Object} InventoryInfoProps
   * @property {boolean} show - Flag indicating whether the panel is visible
   * @property {string|null} img - Default image to display when the item lacks one
   * @property {InventoryItem|null} item - Inventory item selected by the player
   */
  props: {
    /** @type {boolean} Controls panel visibility */
    show: { type: Boolean, default: false },
    /** @type {string|null} Fallback image for items without a defined asset */
    img:  { type: String,  default: null },
    /** @type {InventoryItem|null} Currently selected inventory item */
    item: { type: Object,  default: null }
  },
  emits: ['close'],

  /**
   * Computed helpers for styling and data normalization
   * @namespace InventoryInfoComputed
   */
  computed: {
    /**
     * Determines the modifier class applied to the info panel depending on the item kind.
     * @memberof InventoryInfoComputed
     * @returns {Object<string, boolean>} Map of CSS class flags keyed by kind
     */
    panelKindClass() {
      const kind = this.dataCard.kind;
      return {
        'kind-fish': kind === 'fish',
        'kind-plant': kind === 'plant',
        'kind-element': kind === 'element',
        'kind-supplement': kind === 'supplement',
        'kind-generic': kind === 'generic',
      };
    },

    /**
     * Normalizes the currently selected item into a data structure suitable for display.
     * Includes fallback presets for known asset keys and categories.
     * @memberof InventoryInfoComputed
     * @returns {Object} Structured data describing the item being inspected
     */
    dataCard() {
      const formatNumber = (value, suffix = '') => {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) {
          return suffix ? `— ${suffix}` : '—';
        }
        return `${numeric}${suffix}`;
      };

      const buildFishDetails = (base, key) => {
        if (key.includes('trucha')) {
          return { ...base, kind: 'fish', latin: '(Oncorhynchus mykiss)', desc: 'Pez de agua dulce originario de América del Norte.', oxy: '6.0–9.0 mg/L', ph: '6.5–8.0', feed: 'Larvas 2–3 veces/día' };
        }
        if (key.includes('tilapia')) {
          return { ...base, kind: 'fish', latin: '(Oreochromis aureus)', desc: 'Especie resistente y de rápido crecimiento.', oxy: '5.5–8.0 mg/L', ph: '6.0–8.5', feed: 'Pellets/larvas 2/día' };
        }
        if (key.includes('pargo')) {
          return { ...base, kind: 'fish', latin: '(Lutjanus sp.)', desc: 'Pez marino de cuerpo alargado y comprimido.', oxy: '4.0–5.8 mg/L', ph: '6.5–8.5', feed: 'Larvas ≤2/día' };
        }
        return { ...base, kind: 'fish', latin: '', desc: '', oxy: '—', ph: '—', feed: '—' };
      };

      const buildPlantDetails = (base, slug, nameKey, metadata = {}) => {
        const bonuses = metadata.bonuses || {};
        const effects = metadata.effects || {};
        const oxygen = bonuses.oxygen ?? metadata.oxygenBonus ?? metadata.oxygen_bonus;
        const ph = bonuses.ph ?? metadata.phBonus ?? metadata.ph_bonus;
        const regen = bonuses.health_regeneration
          ?? metadata.healthRegeneration
          ?? metadata.health_regeneration;
        const duration = effects.lifetime_seconds
          ?? metadata.duration
          ?? metadata.lifetimeSeconds
          ?? null;

        const presetMap = {
          'plant-red-algae': {
            desc: 'Alga roja que impulsa el oxígeno del estanque.',
          },
          'plant-anubias': {
            desc: 'Rizomatosa resistente, perfecta para principiantes.',
          },
          'plant-musgo-java': {
            desc: 'Musgo epífito ideal como refugio para alevines.',
          },
        };

        let preset = presetMap[slug];
        if (!preset) {
          if (nameKey.includes('algae')) preset = presetMap['plant-red-algae'];
          if (nameKey.includes('anubias')) preset = presetMap['plant-anubias'];
          if (nameKey.includes('musgo') || nameKey.includes('java')) preset = presetMap['plant-musgo-java'];
        }

        const scientificName = metadata.latinName || metadata.scientificName;
        const description = metadata.description
          || metadata.summary
          || preset?.desc
          || 'Planta acuática que aporta estabilidad al ecosistema.';

        return {
          ...base,
          kind: 'plant',
          desc: description,
          latin: scientificName || base.latin || '',
          oxygen: oxygen !== undefined ? `+${oxygen} O₂` : '—',
          ph: ph !== undefined ? `+${ph} pH` : '—',
          regeneration: regen !== undefined ? `+${regen} salud` : '—',
          duration: duration ? `${duration}s` : null,
          growthStage: metadata.growthStage || metadata.stage || null,
          maintenance: metadata.maintenance || metadata.care || null,
          harvest: metadata.harvest || metadata.yield || null,
        };
      };

      const buildSupplementDetails = (base, slug, metadata = {}) => {
        const effects = metadata.effects || {};
        const health = metadata.health_boost
          ?? metadata.healthBoost
          ?? effects.health_boost
          ?? effects.healthBoost;
        const hungerReset = metadata.hunger_reset
          ?? metadata.hungerReset
          ?? effects.hunger_reset
          ?? effects.hungerReset;
        const feedingBonus = metadata.feeding_limit_bonus
          ?? metadata.feedingLimitBonus
          ?? effects.feeding_limit_bonus
          ?? effects.feedingLimitBonus;

        const presetMap = {
          'supplement-fish-pellets': {
            desc: 'Pellets balanceados que aceleran la recuperación de tus peces.',
            effect: 'Sube la vitalidad tras cada alimentación.',
          },
          'supplement-fish-flakes': {
            desc: 'Hojuelas ligeras para un mantenimiento diario sin excesos.',
            effect: 'Alimento versátil para mantener el apetito estable.',
          },
          'supplement-color-bites': {
            desc: 'Aperitivo premium que resalta el color natural de tus peces.',
            effect: 'Ideal para eventos o recompensas rápidas.',
          },
        };

        const preset = presetMap[slug] || {};
        const description = metadata.description
          || metadata.summary
          || preset.desc
          || 'Suplemento diseñado para apoyar a tus peces en momentos clave.';
        const caution = metadata.caution || metadata.warnings || metadata.cautions;
        const dosage = metadata.dosage
          ?? metadata.recommendedDose
          ?? metadata.dose
          ?? null;
        const frequency = metadata.frequency
          ?? metadata.recommendedFrequency
          ?? null;
        const interactions = metadata.interactions
          ?? metadata.compatibility
          ?? null;

        return {
          ...base,
          kind: 'supplement',
          desc: description,
          effect: metadata.effect || preset.effect || null,
          healthBoost: health !== undefined ? `+${health} salud` : '—',
          hunger: hungerReset ? 'Restablece el hambre' : 'Sin reseteo de hambre',
          feedingBonus: Number(feedingBonus) > 0 ? `+${feedingBonus} usos` : 'Sin bono extra',
          caution,
          dosage,
          frequency,
          interactions,
        };
      };

      const buildElementDetails = (base, key) => {
        if (key.includes('roca')) {
          return { ...base, kind: 'element', desc: 'Decoración para refugio y estética.', type: 'Decoración', effect: 'Refugio / reduce estrés', durability: 'Alta' };
        }
        if (key.includes('filtro')) {
          return { ...base, kind: 'element', desc: 'Equipo básico para limpieza y circulación.', type: 'Equipo', effect: 'Filtrado ~200 L/h', durability: 'Media' };
        }
        if (key.includes('red')) {
          return { ...base, kind: 'element', desc: 'Herramienta para manejo de peces.', type: 'Herramienta', effect: 'Captura selectiva', durability: 'Media' };
        }
        return { ...base, kind: 'element', desc: '', type: '—', effect: '—', durability: '—' };
      };

      const resolvePrice = (value) => {
        const numeric = Number(value);
        if (Number.isFinite(numeric)) {
          return numeric;
        }
        return value ?? '—';
      };

      if (this.item) {
        const metadata = this.item.metadata || {};
        const rawCategorySlug = this.item.categorySlug
          ?? metadata.type
          ?? this.item.category?.slug
          ?? metadata.category
          ?? '';
        const categorySlug = String(rawCategorySlug).toLowerCase();
        const catId = Number(this.item.catId ?? NaN);
        const slug = (this.item.inventorySlug || this.item.slug || '').toLowerCase();
        const nameKey = (this.item.name || '').toLowerCase();

        const baseName = this.item.name
          || metadata.commonName
          || metadata.displayName
          || 'ITEM';

        const base = {
          name: baseName,
          price: resolvePrice(this.item.price ?? metadata.price ?? metadata.cost),
          img: this.item.img || metadata.img || this.img || null,
          kind: 'generic',
          desc: '',
        };

        if (categorySlug.includes('fish') || catId === 1) {
          return buildFishDetails(base, nameKey);
        }

        if (categorySlug.includes('plant') || catId === 2 || metadata.type === 'plant') {
          return buildPlantDetails(base, slug, nameKey, metadata);
        }

        if (categorySlug.includes('supplement') || categorySlug.includes('suplement') || catId === 3 || metadata.type === 'supplement') {
          return buildSupplementDetails(base, slug, metadata);
        }

        if (categorySlug.includes('element')) {
          return buildElementDetails(base, nameKey);
        }

        return { ...base, kind: 'generic' };
      }

      const key = (this.img || '').toLowerCase();

      if (key.includes('pescado1')) {
        return buildFishDetails({ name: 'TRUCHA ARCOIRIS', price: '—', img: this.img }, 'trucha');
      }
      if (key.includes('pescado2')) {
        return buildFishDetails({ name: 'TILAPIA AZUL', price: '—', img: this.img }, 'tilapia');
      }
      if (key.includes('pescado3')) {
        return buildFishDetails({ name: 'PEZ PARGO', price: '—', img: this.img }, 'pargo');
      }

      if (key.includes('redalgae') || key.includes('planta1')) {
        return buildPlantDetails({ name: 'Red Algae', price: '—', img: this.img }, 'plant-red-algae', 'red algae', {
          bonuses: { oxygen: 12, ph: 4, health_regeneration: 3 },
          effects: { lifetime_seconds: 30 },
        });
      }
      if (key.includes('planta2')) {
        return buildPlantDetails({ name: 'Anubias', price: '—', img: this.img }, 'plant-anubias', 'anubias', {
          bonuses: { oxygen: 8, ph: 6, health_regeneration: 2 },
          effects: { lifetime_seconds: 30 },
        });
      }
      if (key.includes('planta3')) {
        return buildPlantDetails({ name: 'Musgo Java', price: '—', img: this.img }, 'plant-musgo-java', 'musgo', {
          bonuses: { oxygen: 10, ph: 5, health_regeneration: 4 },
          effects: { lifetime_seconds: 30 },
        });
      }

      if (key.includes('fishpellets')) {
        return buildSupplementDetails({ name: 'Fish Pellets', price: '—', img: this.img }, 'supplement-fish-pellets', {
          health_boost: 12,
          hunger_reset: true,
          feeding_limit_bonus: 1,
        });
      }
      if (key.includes('hojuela') || key.includes('fishflakes')) {
        return buildSupplementDetails({ name: 'Fish Flakes', price: '—', img: this.img }, 'supplement-fish-flakes', {
          health_boost: 8,
          hunger_reset: false,
          feeding_limit_bonus: 0,
        });
      }
      if (key.includes('colorbites')) {
        return buildSupplementDetails({ name: 'Color Bites', price: '—', img: this.img }, 'supplement-color-bites', {
          health_boost: 10,
          hunger_reset: true,
          feeding_limit_bonus: 0,
        });
      }

      if (key.includes('estanque1')) {
        return buildElementDetails({ name: 'Roca decorativa', price: '—', img: this.img }, 'roca');
      }
      if (key.includes('estanque2')) {
        return buildElementDetails({ name: 'Kit de herramientas', price: '—', img: this.img }, 'kit');
      }
      if (key.includes('estanque3')) {
        return buildElementDetails({ name: 'Red pequeña', price: '—', img: this.img }, 'red');
      }

      return {
        name: 'ITEM',
        price: '—',
        img: this.img,
        kind: 'generic',
        desc: '',
        latin: '',
        oxy: '—',
        ph: '—',
        feed: '—',
        oxygen: '—',
        regeneration: '—',
        duration: null,
        type: '—',
        effect: '—',
        durability: '—',
      };
    }
  },

  /**
   * Template markup for the inventory info panel
   */
  template: /*html*/`
  <transition name="fade">
    <div v-if="show" class="invinfo-panel" :class="panelKindClass">
      <div class="invinfo-close" @click="$emit('close')">
        <img src="./assets/img/btn-x.png" alt="Cerrar" draggable="false" />
      </div>

      <div class="invinfo-content">
        <div class="invinfo-grid">
          <div class="info-left">
            <img class="invinfo-fish" :src="dataCard.img || img" :alt="dataCard.name"/>
            <div class="title">{{ dataCard.name }}</div>
            <div class="latin" v-if="dataCard.latin"><em>{{ dataCard.latin }}</em></div>
            <div class="desc" v-if="dataCard.desc">{{ dataCard.desc }}</div>
          </div>

          <div class="info-divider"></div>

          <div class="info-right">
            <div class="info-subtitle">DETALLES</div>

            <template v-if="dataCard.kind === 'fish'">
              <div class="info-row"><span class="label">Oxígeno:</span> {{ dataCard.oxy }}</div>
              <div class="info-row"><span class="label">pH:</span> {{ dataCard.ph }}</div>
              <div class="info-row"><span class="label">Alimentación:</span> {{ dataCard.feed }}</div>
            </template>

            <template v-else-if="dataCard.kind === 'plant'">
              <div class="info-row"><span class="label">Oxígeno:</span> {{ dataCard.oxygen }}</div>
              <div class="info-row"><span class="label">pH:</span> {{ dataCard.ph }}</div>
              <div class="info-row"><span class="label">Regeneración:</span> {{ dataCard.regeneration }}</div>
              <div class="info-row" v-if="dataCard.duration"><span class="label">Duración:</span> {{ dataCard.duration }}</div>
              <div class="info-row" v-if="dataCard.growthStage"><span class="label">Etapa:</span> {{ dataCard.growthStage }}</div>
              <div class="info-row" v-if="dataCard.maintenance"><span class="label">Mantenimiento:</span> {{ dataCard.maintenance }}</div>
              <div class="info-row" v-if="dataCard.harvest"><span class="label">Cosecha:</span> {{ dataCard.harvest }}</div>
            </template>

            <template v-else-if="dataCard.kind === 'supplement'">
              <div class="info-row"><span class="label">Salud:</span> {{ dataCard.healthBoost }}</div>
              <div class="info-row"><span class="label">Hambre:</span> {{ dataCard.hunger }}</div>
              <div class="info-row"><span class="label">Límite extra:</span> {{ dataCard.feedingBonus }}</div>
              <div class="info-row" v-if="dataCard.effect"><span class="label">Efecto:</span> {{ dataCard.effect }}</div>
              <div class="info-row" v-if="dataCard.caution"><span class="label">Precaución:</span> {{ dataCard.caution }}</div>
              <div class="info-row" v-if="dataCard.dosage"><span class="label">Dosis:</span> {{ dataCard.dosage }}</div>
              <div class="info-row" v-if="dataCard.frequency"><span class="label">Frecuencia:</span> {{ dataCard.frequency }}</div>
              <div class="info-row" v-if="dataCard.interactions"><span class="label">Interacciones:</span> {{ dataCard.interactions }}</div>
            </template>

            <template v-else-if="dataCard.kind === 'element'">
              <div class="info-row"><span class="label">Tipo:</span> {{ dataCard.type }}</div>
              <div class="info-row"><span class="label">Efecto:</span> {{ dataCard.effect }}</div>
              <div class="info-row"><span class="label">Durabilidad:</span> {{ dataCard.durability }}</div>
            </template>

            <div class="info-row">
              <span class="label">Precio de compra:</span> ₡{{ dataCard.price }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  `
});
