/**
 * SignUpForm Component
 *
 * @fileoverview Registration form component that captures user credentials and farm details.
 *
 * @component
 * @example
 * <signup-form
 *   :form="signupForm"
 *   :submit-f="'Sign Up'"
 *   @submit-form="handleSignup"
 * ></signup-form>
 */
app.component('signup-form', {
  /**
   * @typedef {Object} SignUpFormModel
   * @property {string} name - Player display name entered by the user
   * @property {string} email - Contact email used for account creation
   * @property {string} password - Password chosen for the new account
   * @property {string} farmName - Name assigned to the player's farm
   * @property {string} farmType - Selected farm type, either "saltwater" or "freshwater"
   */

  /**
   * Component props - Data received from parent component
   * @typedef {Object} SignUpFormProps
   * @property {string} submitF - Text displayed on the submit button
   * @property {SignUpFormModel} form - Reactive form model bound to the inputs
   */
  props: {
    /** @type {string} Text label for the primary submit button */
    submitF: { type: String, required: true },
    /** @type {SignUpFormModel} Reactive signup form fields */
    form: { type: Object, required: true },
  },

  /**
   * Component methods exposed to the template
   * @namespace SignUpFormMethods
   */
  methods: {
    /**
     * Emits the submit event so the parent component can handle account creation.
     * @memberof SignUpFormMethods
     * @fires SignUpForm#submit-form
     * @example
     * <signup-form @submit-form="createAccount" />
     */
    submitForm() {
      this.$emit('submit-form');
    },
  },

  /**
   * Template markup for the signup form UI
   */
  template: /* html */`
    <!-- signup form -->
    <section class="signup-form">
      <h2>CREATE ACCOUNT</h2>

      <div>
        <label>User Name</label>
        <input type="text" v-model="form.name" placeholder="Enter your name" required>
      </div>

      <div>
        <label>Email</label>
        <input type="email" v-model="form.email" placeholder="your.email@example.com" required>
      </div>

      <div>
        <label>Password</label>
        <input type="password" v-model="form.password" placeholder="Create a password" required>
      </div>

      <div>
        <label>Farm Name</label>
        <input type="text" v-model="form.farmName" placeholder="Name your farm" required>
      </div>

      <div>
        <label>Farm Type</label>
        <select v-model="form.farmType" required>
          <option value="saltwater">Saltwater</option>
          <option value="freshwater">Freshwater</option>
        </select>
      </div>

      <div class="btn-enter">
        <button @click="submitForm" type="button" class="button-form">Sign Up</button>
        <a href="login.html" style="font-family: LexendDeca;">Login</a>
      </div>
    </section>
    <!-- signup form -->
  `,
});
