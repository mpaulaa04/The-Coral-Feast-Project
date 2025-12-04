/**
 * Login Form Component
 *
 * @fileoverview User authentication form component that handles email and password input,
 * form submission, and navigation to signup page.
 * 
 *
 * @component
 * @example
 * <login-form
 *   :submit-f="'Login'"
 *   :form="userForm"
 *   @submit-form="handleLoginSubmit">
 * </login-form>
 */
app.component("login-form", {
  /**
   * Component props - Data received from parent component
   * @typedef {Object} LoginFormProps
   * @property {string} submitF - Button text label for the submit button
   * @property {Object} form - User form data object containing email and password
   * @property {string} form.email - User's email address input value
   * @property {string} form.password - User's password input value
   */
  props: {
    /** @type {string} Submit button display text */
    submitF: { type: String, required: true },
    /** @type {Object} Form data object with user credentials */
    form: { type: Object, required: true },
  },

  /**
   * Component methods for user interaction handling
   * @namespace LoginFormMethods
   */
  methods: {
    /**
     * Handles form submission and emits event to parent component
     * Validates form data and triggers authentication process in parent
     * @memberof LoginFormMethods
     * @fires LoginForm#submit-form
     * @example
     * // In parent component:
     * // @submit-form="handleLoginSubmit"
     */
    submitForm() {
      this.$emit("submit-form");
    },
  },


  template: /*html*/ `
    <!-- Login Form Container -->
    <div class="login-form">
      <!-- Form Title -->
      <h2>Access account</h2>

      <!-- Email Input Section -->
      <div>
        <label>Email </label>
        <input type="email" v-model="form.email" placeholder="your.email@example.com">
      </div>

      <!-- Password Input Section -->
      <div>
        <label>Password</label>
        <input type="password" v-model="form.password" placeholder="Enter password">
      </div>

      <!-- Action Buttons Container -->
      <div class="btn-enter">
        <!-- Submit Button - Triggers authentication -->
        <button @click="submitForm" class="button-form">{{ submitF }}</button>

        <!-- Navigation Link - Routes to signup page -->
        <a href="signUp.html" style="font-family: LexendDeca;">Sign Up</a>
      </div>
    </div>
  `,
});
