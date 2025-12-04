/**
 * TutorialOverlay Component
 *
 * @fileoverview Guided experience overlay that highlights UI elements and displays step-by-step instructions.
 *
 * @typedef {Object} TutorialStepConfig
 * @property {string} title Heading displayed in the tutorial notification.
 * @property {string} message Body text guiding the player through the step.
 * @property {string} targetSelector CSS selector pointing to the element to spotlight.
 * @property {string} [containerSelector] Optional selector that constrains the overlay bounds.
 * @property {('top'|'right'|'bottom'|'left')} [arrowPosition] Placement of the guiding arrow relative to the target.
 * @property {{x:number,y:number}} [notificationOffset] Pixel adjustments applied to notification positioning.
 * @property {boolean} [allowOutside=false] When true interactions outside the target remain enabled.
 * @property {boolean} [interactive=true] Allows interacting with the highlighted element when true.
 *
 * @typedef {Object} TutorialOverlayState
 * @property {boolean} arrowBounce Controls bounce animation on the arrow graphic.
 * @property {((event:PointerEvent|MouseEvent|TouchEvent)=>boolean)|null} pointerHandler Guard attached to the document.
 * @property {Element|null} currentTarget DOM node currently highlighted.
 * @property {Element|null} currentContainer Container defining overlay bounds.
 * @property {number|null} targetPollId requestAnimationFrame handle used while polling the target.
 * @property {number|null} containerPollId requestAnimationFrame handle used while polling the container.
 * @property {Element|null} lastHighlightedTarget Last DOM node that received the highlight state.
 *
 * @component
 * @example
 * <tutorial-overlay
 *   :step="activeStep"
 *   :active="isTutorialActive"
 * ></tutorial-overlay>
 */
app.component('tutorial-overlay', {
    props: {
        /**
         * Identifier of the tutorial step to display.
         * @type {import('vue').PropOptions<string|null>}
         */
        step: {
            type: String,
            default: null,
        },
        /**
         * Toggles the visibility of the overlay and spotlight.
         * @type {import('vue').PropOptions<boolean>}
         */
        active: {
            type: Boolean,
            default: false,
        },
    },
    /**
     * Reactive state backing the overlay interaction guards and DOM references.
     * @returns {TutorialOverlayState}
     */
    data() {
        return {
            arrowBounce: true,
            pointerHandler: null,
            currentTarget: null,
            currentContainer: null,
            targetPollId: null,
            containerPollId: null,
            lastHighlightedTarget: null,
        };
    },
    computed: {
        /**
         * Resolves the merged tutorial configuration for the active step.
         * @returns {TutorialStepConfig|null}
         */
        config() {
            const globalSteps = window.CF_TUTORIAL_STEPS || {};
            const defaults = {
                'lobby-market': {
                    title: 'Bienvenido al Mercado',
                    message: '¡Hola! Comencemos visitando el Mercado para comprar tu primer pez. Toca el botón de Market para continuar.',
                    targetSelector: '[data-tutorial="market-button"]',
                    arrowPosition: 'bottom',
                },
                'market-categories': {
                    title: 'Categorías del Mercado',
                    message: 'Selecciona la categoría "Peces" para ver los artículos disponibles.',
                    targetSelector: '[data-tutorial="category-fish"]',
                    arrowPosition: 'right',
                    containerSelector: '[data-tutorial-container="market"]',
                    notificationOffset: { x: 16, y: -40 },
                },
                'market-select-fish': {
                    title: 'Selecciona un Pez',
                    message: 'Toca cualquier pez para ver sus detalles y poder comprarlo.',
                    targetSelector: '[data-tutorial="fish-item"]',
                    arrowPosition: 'bottom',
                    containerSelector: '[data-tutorial-container="market"]',
                },
                'market-buy-button': {
                    title: 'Comprar',
                    message: 'Perfecto! Ahora toca el botón de Comprar para agregarlo a tu inventario.',
                    targetSelector: '[data-tutorial="buy-button"]',
                    arrowPosition: 'right',
                    containerSelector: '[data-tutorial-container="market"]',
                    notificationOffset: { x: 16, y: -20 },
                },
                'market-timer': {
                    title: 'Temporizador de Ofertas',
                    message: 'Este temporizador muestra cuándo cambian las ofertas especiales del mercado.',
                    targetSelector: '[data-tutorial="market-timer"]',
                    arrowPosition: 'bottom',
                    containerSelector: '[data-tutorial-container="market"]',
                },
                'market-coins': {
                    title: 'Tus Monedas',
                    message: 'Aquí puedes ver cuántas monedas tienes disponibles. En un momento continuamos.',
                    targetSelector: '[data-tutorial="market-coins"]',
                    arrowPosition: 'bottom',
                    containerSelector: '[data-tutorial-container="market"]',
                    allowOutside: true,
                },
                'lobby-inventory': {
                    title: 'Abramos el Inventario',
                    message: 'Excelente compra. Cierra el mercado y usa este botón para abrir tu Inventario.',
                    targetSelector: '[data-tutorial="inventory-button"]',
                    arrowPosition: 'left',
                    notificationOffset: { x: -40, y: 0 },
                },
                'inventory-categories': {
                    title: 'Categorías de Inventario',
                    message: 'Selecciona la categoría de Peces para ver lo que acabas de comprar.',
                    targetSelector: '[data-tutorial="inventory-category-fish"]',
                    arrowPosition: 'right',
                    containerSelector: '[data-tutorial-container="inventory"]',
                },
                'inventory-select-fish': {
                    title: 'Selecciona tu Pez',
                    message: 'Toca el pez que compraste para mostrar sus detalles.',
                    targetSelector: '[data-tutorial="inventory-fish-slot"]',
                    arrowPosition: 'bottom',
                    containerSelector: '[data-tutorial-container="inventory"]',
                },
                'inventory-sell-info': {
                    title: 'Botón Vender',
                    message: 'Este botón te permite vender el artículo seleccionado cuando lo necesites.',
                    targetSelector: '[data-tutorial="inventory-sell"]',
                    arrowPosition: 'top',
                    containerSelector: '[data-tutorial-container="inventory"]',
                    interactive: false,
                },
                'inventory-favorite-info': {
                    title: 'Botón Favoritos',
                    message: 'Marca artículos como favoritos para agregarlos al acceso rápido.',
                    targetSelector: '[data-tutorial="inventory-fav"]',
                    arrowPosition: 'top',
                    containerSelector: '[data-tutorial-container="inventory"]',
                    interactive: false,
                },
                'inventory-mark-favorite': {
                    title: 'Marca como Favorito',
                    message: 'Ahora toca el botón de favorito para guardar este pez en la barra rápida.',
                    targetSelector: '[data-tutorial="inventory-fav"]',
                    arrowPosition: 'top',
                    containerSelector: '[data-tutorial-container="inventory"]',
                },
                'lobby-pond-slots': {
                    title: 'Tus Espacios de Cultivo',
                    message: 'Estos son los espacios donde sembrarás peces y plantas. Cada casilla representa un vivero.',
                    targetSelector: '[data-tutorial="pond-slots"]',
                    arrowPosition: 'top',
                },
                'quickpanel-tools': {
                    title: 'Botón de Herramientas',
                    message: 'Este botón activa tus herramientas rápidas cuando necesites regular el estanque.',
                    targetSelector: '[data-tutorial="bottom-button-tools"]',
                    arrowPosition: 'top',
                },
                'quickpanel-overview': {
                    title: 'Panel Rápido',
                    message: 'Aquí aparecerán tus herramientas cuando abras el panel rápido. Repasemos cada una.',
                    targetSelector: '[data-tutorial="quickpanel-overview"]',
                    arrowPosition: 'top',
                },
                'quickpanel-tool-ph': {
                    title: 'Regulador de pH',
                    message: 'Usa esta herramienta cuando el nivel de pH necesite ajustarse en los estanques.',
                    targetSelector: '[data-tutorial="quickpanel-tool-ph"]',
                    arrowPosition: 'top',
                },
                'quickpanel-tool-oxygen': {
                    title: 'Regulador de Oxígeno',
                    message: 'Aumenta el oxígeno del agua para mantener a tus peces saludables.',
                    targetSelector: '[data-tutorial="quickpanel-tool-oxygen"]',
                    arrowPosition: 'top',
                },
                'quickpanel-tool-temperature': {
                    title: 'Control de Temperatura',
                    message: 'Controla la temperatura del agua cuando las condiciones cambien.',
                    targetSelector: '[data-tutorial="quickpanel-tool-temperature"]',
                    arrowPosition: 'top',
                },
                'quickpanel-tool-water': {
                    title: 'Tratamiento de Agua',
                    message: 'Aplica este suplemento cuando el agua se vea turbia o contaminada.',
                    targetSelector: '[data-tutorial="quickpanel-tool-water"]',
                    arrowPosition: 'top',
                },
                'quickpanel-supplements': {
                    title: 'Botón Suplementos',
                    message: 'Desde aquí accedes a los suplementos para mantener tus estanques en equilibrio.',
                    targetSelector: '[data-tutorial="bottom-button-supplements"]',
                    arrowPosition: 'top',
                },
                'quickpanel-plants': {
                    title: 'Botón Plantas',
                    message: 'Este botón te permite interactuar con las plantas del estanque.',
                    targetSelector: '[data-tutorial="bottom-button-plants"]',
                    arrowPosition: 'top',
                },
                'quickpanel-fish': {
                    title: 'Botón Peces',
                    message: 'Toca el botón de Peces para abrir tus peces favoritos.',
                    targetSelector: '[data-tutorial="bottom-button-fish"]',
                    arrowPosition: 'top',
                },
                'pond-slot-first': {
                    title: 'Siembra tu Pez',
                    message: 'Arrastra el pez de la barra rápida y suéltalo en esta casilla para plantarlo.',
                    targetSelector: '[data-tutorial="pond-slot-first"]',
                    arrowPosition: 'top',
                    allowOutside: true,
                },
                'pond-life-bar': {
                    title: 'Vida del Pez',
                    message: 'Esta barra amarilla muestra la salud del pez. Manténla alta alimentándolo y cuidando el estanque.',
                    targetSelector: '[data-tutorial="pond-life-bar"]',
                    arrowPosition: 'top',
                    allowOutside: true,
                },
                'pond-growth-timer': {
                    title: 'Progreso de Crecimiento',
                    message: 'El círculo se llena con el tiempo e indica cuándo el pez pasará a la siguiente fase.',
                    targetSelector: '[data-tutorial="pond-growth-timer"]',
                    arrowPosition: 'top',
                    allowOutside: true,
                },
                'missions-button': {
                    title: 'Revisa tus Misiones',
                    message: 'Abre el panel de Misiones para reclamar la recompensa que acabas de desbloquear.',
                    targetSelector: '[data-tutorial="missions-button"]',
                    arrowPosition: 'bottom',
                },
                'missions-first-card': {
                    title: 'Misión Completada',
                    message: 'Esta misión reconoce que sembraste tu primer pez. Vamos a reclamarla.',
                    targetSelector: '[data-tutorial="missions-first-card"]',
                    arrowPosition: 'right',
                    containerSelector: '[data-tutorial-container="missions"]',
                },
                'missions-claim': {
                    title: 'Reclama tu Premio',
                    message: 'Pulsa el botón Reclamar para recibir las monedas de esta misión.',
                    targetSelector: '[data-tutorial="missions-claim"]',
                    arrowPosition: 'bottom',
                    containerSelector: '[data-tutorial-container="missions"]',
                },
            };

            const base = defaults[this.step];

            if (!base) {
                return null;
            }

            const overrides = globalSteps[this.step] || {};
            const targetSelector = overrides.selector || base.targetSelector;

            if (!targetSelector) {
                return null;
            }

            return {
                title: overrides.title || base.title,
                message: overrides.notification || base.message,
                targetSelector,
                arrowPosition: overrides.arrowPosition || base.arrowPosition || 'bottom',
                containerSelector: overrides.containerSelector || base.containerSelector || null,
                notificationOffset: overrides.notificationOffset || base.notificationOffset || { x: 0, y: 0 },
                allowOutside: overrides.allowOutside ?? base.allowOutside ?? false,
                interactive: overrides.interactive ?? (base.interactive ?? true),
            };
        },
        /**
         * Bounding rectangle used to clip the overlay when a container is supplied.
         * @returns {{top:number,left:number,width:number,height:number}}
         */
        overlayRect() {
            if (!this.currentContainer) {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            }

            const rect = this.currentContainer.getBoundingClientRect();

            return {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            };
        },
        /**
         * Inline styles for positioning the overlay when constrained to a container.
         * @returns {Record<string, string>}
         */
        overlayStyle() {
            if (!this.currentContainer) {
                return {};
            }

            const rect = this.overlayRect;
            const right = Math.max(0, window.innerWidth - (rect.left + rect.width));
            const bottom = Math.max(0, window.innerHeight - (rect.top + rect.height));

            return {
                top: `${rect.top}px`,
                left: `${rect.left}px`,
                right: `${right}px`,
                bottom: `${bottom}px`,
            };
        },
        /**
         * Calculates the spotlight position and size around the highlighted element.
         * @returns {Record<string, string>}
         */
        spotlightStyle() {
            if (!this.currentTarget) {
                return {};
            }

            const targetRect = this.currentTarget.getBoundingClientRect();
            const overlayRect = this.overlayRect;

            return {
                width: `${targetRect.width}px`,
                height: `${targetRect.height}px`,
                top: `${targetRect.top - overlayRect.top}px`,
                left: `${targetRect.left - overlayRect.left}px`,
            };
        },
        /**
         * Derives arrow placement relative to the highlighted element.
         * @returns {Record<string, string>}
         */
        arrowStyle() {
            if (!this.currentTarget) {
                return {};
            }

            const targetRect = this.currentTarget.getBoundingClientRect();
            const overlayRect = this.overlayRect;
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
            const arrowSize = Math.max(24, Math.min(40, viewportWidth * 0.05));
            const offset = Math.max(12, Math.min(24, viewportHeight * 0.03));
            const scale = arrowSize / 40;
            const centerX = targetRect.left + targetRect.width / 2 - overlayRect.left;
            const centerY = targetRect.top + targetRect.height / 2 - overlayRect.top;

            let left = centerX;
            let top = targetRect.bottom - overlayRect.top + offset;
            let transform = 'translateX(-50%) rotate(180deg)';

            switch (this.config?.arrowPosition) {
                case 'top':
                    top = targetRect.top - overlayRect.top - arrowSize - offset;
                    transform = 'translateX(-50%)';
                    break;
                case 'bottom':
                    top = targetRect.bottom - overlayRect.top + offset;
                    transform = 'translateX(-50%) rotate(180deg)';
                    break;
                case 'left':
                    left = targetRect.left - overlayRect.left - arrowSize - offset;
                    top = centerY;
                    transform = 'translateY(-50%) rotate(-90deg)';
                    break;
                case 'right':
                    left = targetRect.right - overlayRect.left + offset;
                    top = centerY;
                    transform = 'translateY(-50%) rotate(90deg)';
                    break;
                default:
                    break;
            }

            transform = `${transform} scale(${scale})`;

            return {
                left: `${left}px`,
                top: `${top}px`,
                transform,
            };
        },
        /**
         * Positions the tutorial notification near the spotlight while respecting viewport clamps.
         * @returns {Record<string, string>}
         */
        notificationStyle() {
            if (!this.currentTarget) {
                return {};
            }

            const targetRect = this.currentTarget.getBoundingClientRect();
            const overlayRect = this.overlayRect;
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
            const margin = Math.max(12, Math.min(24, viewportWidth * 0.04));
            const minWidth = 200;
            const availableWidth = Math.max(minWidth, overlayRect.width - margin * 2);
            const baseWidth = Math.max(minWidth, Math.min(320, viewportWidth * 0.6));
            const notifWidth = Math.min(baseWidth, availableWidth);
            const notifHeight = Math.max(140, Math.min(200, viewportHeight * 0.35));
            const offset = Math.max(14, Math.min(26, viewportHeight * 0.035));
            const verticalGap = Math.max(24, Math.min(64, viewportHeight * 0.1));
            const horizontalGap = Math.max(24, Math.min(64, viewportWidth * 0.08));
            const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

            let left = targetRect.left + targetRect.width / 2 - overlayRect.left - notifWidth / 2;
            let top = targetRect.bottom - overlayRect.top + offset + verticalGap;

            switch (this.config?.arrowPosition) {
                case 'top':
                    top = targetRect.top - overlayRect.top - (offset + verticalGap + notifHeight);
                    break;
                case 'bottom':
                    top = targetRect.bottom - overlayRect.top + offset + verticalGap;
                    break;
                case 'left':
                    left = targetRect.left - overlayRect.left - notifWidth - (offset + horizontalGap);
                    top = targetRect.top + targetRect.height / 2 - overlayRect.top - notifHeight / 2;
                    break;
                case 'right':
                    left = targetRect.right - overlayRect.left + offset + horizontalGap;
                    top = targetRect.top + targetRect.height / 2 - overlayRect.top - notifHeight / 2;
                    break;
                default:
                    break;
            }

            const maxLeft = Math.max(margin, overlayRect.width - notifWidth - margin);
            const maxTop = Math.max(margin, overlayRect.height - notifHeight - margin);

            const offsetCfg = this.config?.notificationOffset || {};
            left += offsetCfg.x || 0;
            top += offsetCfg.y || 0;

            left = clamp(left, margin, maxLeft);
            top = clamp(top, margin, maxTop);

            return {
                left: `${left}px`,
                top: `${top}px`,
                width: `${notifWidth}px`,
            };
        },
    },
    methods: {
        /**
         * Finds the overlay container element if the active step defines one.
         * @returns {Element|null}
         */
        locateContainer() {
            if (!this.config?.containerSelector) {
                return null;
            }

            return document.querySelector(this.config.containerSelector);
        },
        /**
         * Locates the target element referenced by the active tutorial step.
         * @returns {Element|null}
         */
        locateTarget() {
            if (!this.config?.targetSelector) {
                return null;
            }

            return document.querySelector(this.config.targetSelector);
        },
        /**
         * Continuously polls for the container element until it becomes available.
         * @returns {void}
         */
        startContainerPolling() {
            this.stopContainerPolling();

            const attempt = () => {
                if (!this.active) {
                    this.containerPollId = null;
                    return;
                }

                const container = this.locateContainer();

                if (container || !this.config?.containerSelector) {
                    this.currentContainer = container;
                    this.containerPollId = null;
                    this.startTargetPolling();
                    this.updatePositions();
                    return;
                }

                this.containerPollId = requestAnimationFrame(attempt);
            };

            attempt();
        },
        /**
         * Cancels any pending container polling loop.
         * @returns {void}
         */
        stopContainerPolling() {
            if (this.containerPollId) {
                cancelAnimationFrame(this.containerPollId);
                this.containerPollId = null;
            }
        },
        /**
         * Polls the DOM for the required target element, highlighting it when found.
         * @returns {void}
         */
        startTargetPolling() {
            this.stopTargetPolling();

            const attempt = () => {
                if (!this.active) {
                    this.targetPollId = null;
                    return;
                }

                const target = this.locateTarget();

                if (target) {
                    this.currentTarget = target;
                    this.setTargetActive();
                    this.updatePositions();
                    this.targetPollId = null;
                    return;
                }

                this.targetPollId = requestAnimationFrame(attempt);
            };

            attempt();
        },
        /**
         * Cancels any pending target polling loop.
         * @returns {void}
         */
        stopTargetPolling() {
            if (this.targetPollId) {
                cancelAnimationFrame(this.targetPollId);
                this.targetPollId = null;
            }
        },
        /**
         * Triggers a re-render so computed positioning styles refresh.
         * @returns {void}
         */
        updatePositions() {
            this.$forceUpdate();
        },
        /**
         * Tracks the currently highlighted DOM node to avoid repeated work.
         * @returns {void}
         */
        setTargetActive() {
            if (this.currentTarget === this.lastHighlightedTarget) {
                return;
            }

            this.lastHighlightedTarget = this.currentTarget;
        },
        /**
         * Clears the stored target references.
         * @returns {void}
         */
        clearActiveTarget() {
            this.lastHighlightedTarget = null;
            this.currentTarget = null;
        },
        /**
         * Prevents pointer interactions outside the highlighted element when necessary.
         * @param {PointerEvent|MouseEvent|TouchEvent} event Native interaction event.
         * @returns {boolean}
         */
        allowOnlyTargetInteractions(event) {
            if (!this.currentTarget) {
                return true;
            }

            if (this.config?.allowOutside) {
                return true;
            }

            const isFromOverlay = this.$el?.contains(event.target);
            const isWithinTarget = this.currentTarget === event.target || this.currentTarget.contains(event.target);
            const interactive = this.config?.interactive !== false;

            if (!interactive && isWithinTarget) {
                event.preventDefault();
                event.stopImmediatePropagation();
                return false;
            }

            if (isWithinTarget || isFromOverlay) {
                return true;
            }

            event.preventDefault();
            event.stopImmediatePropagation();
            return false;
        },
        /**
         * Installs the global pointer guards that restrict user interaction.
         * @returns {void}
         */
        attachGuards() {
            const handler = (event) => this.allowOnlyTargetInteractions(event);
            document.addEventListener('pointerdown', handler, true);
            document.addEventListener('pointerup', handler, true);
            document.addEventListener('click', handler, true);
            document.addEventListener('touchstart', handler, true);
            document.addEventListener('touchend', handler, true);
            this.pointerHandler = handler;
        },
        /**
         * Removes any previously attached pointer guards.
         * @returns {void}
         */
        detachGuards() {
            if (!this.pointerHandler) {
                return;
            }

            const handler = this.pointerHandler;
            document.removeEventListener('pointerdown', handler, true);
            document.removeEventListener('pointerup', handler, true);
            document.removeEventListener('click', handler, true);
            document.removeEventListener('touchstart', handler, true);
            document.removeEventListener('touchend', handler, true);
            this.pointerHandler = null;
        },
        /**
         * Re-evaluates the active container and target for the current step.
         * @returns {void}
         */
        refreshTargets() {
            this.stopTargetPolling();
            this.stopContainerPolling();
            this.clearActiveTarget();

            if (!this.active || !this.config) {
                return;
            }

            if (this.config.containerSelector) {
                this.startContainerPolling();
            } else {
                this.currentContainer = null;
                this.startTargetPolling();
            }
        },
        /**
         * Clears polling state and references when the overlay deactivates.
         * @returns {void}
         */
        clearState() {
            this.stopTargetPolling();
            this.stopContainerPolling();
            this.clearActiveTarget();
            this.currentContainer = null;
        },
    },
    watch: {
        /**
         * Restarts discovery whenever the tutorial step changes.
         * @returns {void}
         */
        step() {
            this.refreshTargets();
        },
        /**
         * Attaches or releases DOM listeners based on overlay visibility.
         * @param {boolean} value Active flag.
         * @returns {void}
         */
        active(value) {
            if (value) {
                this.refreshTargets();
            } else {
                this.clearState();
            }
        },
    },
    /**
     * Establishes resize/scroll listeners and prepares guards when the component mounts.
     * @returns {void}
     */
    mounted() {
        window.addEventListener('resize', this.updatePositions);
        window.addEventListener('scroll', this.updatePositions, true);
        document.body.classList.add('tutorial-active');
        this.attachGuards();

        this.$nextTick(() => {
            if (this.active) {
                this.refreshTargets();
            }
        });
    },
    /**
     * Cleans up global listeners and guards prior to unmounting the component.
     * @returns {void}
     */
    beforeUnmount() {
        window.removeEventListener('resize', this.updatePositions);
        window.removeEventListener('scroll', this.updatePositions, true);
        this.clearState();
        this.detachGuards();
        document.body.classList.remove('tutorial-active');
    },
    template: /*html*/`
    <div v-if="active && config && currentTarget" class="tutorial-overlay" :style="overlayStyle">
        <div class="tutorial-spotlight" :style="spotlightStyle"></div>

        <div class="tutorial-arrow" :style="arrowStyle">
            <div class="tutorial-arrow__inner" :class="{ 'tutorial-arrow__inner--bounce': arrowBounce }">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M20 5 L20 35 M20 35 L10 25 M20 35 L30 25"
                          stroke="var(--clr-teal)"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </div>
        </div>

        <div class="tutorial-notification" :style="notificationStyle">
            <div class="tutorial-notification__header">
                <h3 class="tutorial-notification__title">{{ config.title }}</h3>
            </div>
            <p class="tutorial-notification__message">{{ config.message }}</p>
        </div>
    </div>
    `,
});
