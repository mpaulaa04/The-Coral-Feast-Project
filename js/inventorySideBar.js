/**
 * InventorySideBar Component
 *
 * @fileoverview Renders the sidebar for the inventory panel, including profile image and category buttons.
 *
 * @component
 * @example
 * <inventory-side-bar
 *   :profile-img="userProfileImg"
 *   :buttons="categoryButtons"
 *   :selected-button="selectedCategoryId"
 *   @button-click="handleCategoryClick"
 * ></inventory-side-bar>
 */
app.component('inventory-side-bar', {

  /**
   * Component props - Data received from parent component
   * @typedef {Object} InventoryCategoryButton
   * @property {number} id - Unique identifier for the button/category
   * @property {string} name - Display name for the button/category
   * @property {string} img - Image filename (without extension) for the button/category
   */
  props: {
    /**
     * Profile image URL for the user
     * @type {string}
     */
    profileImg: { type: String, required: true },
    /**
     * Array of category button definitions to render
     * @type {InventoryCategoryButton[]}
     */
    buttons: { type: Array, required: true },
    /**
     * ID of the currently selected button/category
     * @type {number}
     */
    selectedButton: { type: Number, required: true }
  },

  /**
   * Events emitted by this component
   * @event button-click
   */
  emits: ['button-click'],

  /**
   * Component methods exposed to the template
   * @namespace InventorySideBarMethods
   */
  methods: {
    /**
     * Returns the image source path for a given button/category.
     * @memberof InventorySideBarMethods
     * @param {InventoryCategoryButton} btn - The button/category object
     * @returns {string} Asset path for the button image
     */
    imgSrc(btn) { return `./assets/img/${btn.img}.png`; },

    /**
     * Plays a sound and emits the button-click event when a button is clicked.
     * @memberof InventorySideBarMethods
     * @param {InventoryCategoryButton} btn - The button/category object
     * @fires InventorySideBar#button-click
     */
    onClick(btn) {
      const audio = new Audio('./assets/sounds/select-menu-47560.mp3');
      audio.play();
      this.$emit('button-click', btn);
    }
  },
  /**
   * Template markup for the inventory sidebar UI
   */
  template: /*html*/`
    <!-- inventory sidebar -->
    <div class="inventory-header">
      <h2 class="inventory-title">INVENTARIO</h2>
      <div class="profile-section">
        <img :src="profileImg" alt="Perfil" class="profile-img" />
      </div>

      <div
        v-for="btn in buttons"
        :key="btn.id"
        class="inventory-btn"
        :class="{ active: selectedButton === btn.id }"
        :data-tutorial="btn.id === 1 ? 'inventory-category-fish' : null"
        @click="onClick(btn)"
      >
        <span>{{ btn.name }}</span>
        <img :src="imgSrc(btn)" :alt="btn.name">
      </div>
    </div>
    <!-- inventory sidebar -->
  `
});
