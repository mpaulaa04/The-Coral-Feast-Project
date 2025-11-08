
 app.component('signup-form', {
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
 
 <!-- signup form -->
<section class="signup-form"> 
  <h2>CREATE ACCOUNT</h2>

  <div>
    <label >User Name</label>
    <input type="text" v-model="form.name" placeholder="Enter your name" required>
  </div> 

  <div>
    <label>Email </label>
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
 `
});
