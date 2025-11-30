
 
 app.component('login-form', {
props: {
  submitF: { type: String, required: true },
    form: { type: Object, required: true }


  },

  
  methods: {
      submitForm() {
      this.$emit('submit-form');
    }
  },

 template: /*html*/ `
 


<!-- form -->
<div class="login-form"> 
  <h2>Access account</h2>

  <div>
    <label>Email </label>
    <input type="email" v-model="form.email" placeholder="your.email@example.com">
  </div>

  <div>
    <label>Password</label>
    <input type="password" v-model="form.password" placeholder="Enter password">
  </div>



 <div class="btn-enter"> 
 <button @click="submitForm"  class="button-form">{{ submitF }}</button>

<a href="signUp.html" style="font-family: LexendDeca;">Sign Up</a>
</div>


</div>
<!-- form -->


 `,
});
