const app = Vue.createApp({

  data() {
    return {
submit: "Sign Up",
      email: '',
      name: '',
      password: '',
      farmName:'',
      farmType:'farmType',
    currentUser:null,
     users: []
    };
  },



// prueba de sistema
   mounted() {
    // Cargar usuarios existentes 
    const savedUsers = localStorage.getItem('tempUsers');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
      console.log('Usuarios cargados:', this.users);
    }
  },




  methods: {


// prueba de sistema

 // Validar email
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Validar contraseña
    isValidPassword(password) {
      return password.length >= 6 && 
             /[A-Z]/.test(password) && 
             /[a-z]/.test(password) && 
             /[0-9]/.test(password);
    },

   // Función genérica
valueExists(prop, value) {
  return this.users.some(user => user[prop].toLowerCase() === value.toLowerCase());
},

// 
emailExists(email) {
  return this.valueExists('email', email);
},

usernameExists(username) {
  return this.valueExists('name', username);
},

    // Crear nuevo usuario
    createNewUser() {
      if (!this.name || !this.email || !this.password || !this.farmName || !this.farmType) {
        return alert('Fill all fields');
      }

      if (!this.isValidEmail(this.email)) {
        return alert('Invalid email format');
      }

      if (this.emailExists(this.email)) {
        return alert('Email already exists!');
      }

      if (this.usernameExists(this.name)) {
        return alert('Username already taken!');
      }

      if (!this.isValidPassword(this.password)) {
        return alert('Password must be 6+ chars with uppercase, lowercase, and number');
      }

      const newUser = {
        id: Date.now(),
        name: this.name,
        email: this.email.toLowerCase(),
        password: this.password,
        farmName: this.farmName,
        farmType: this.farmType
      };
       // agregar el nuevo usaurio al array
      this.users.push(newUser);


// _______________________________________________________________________________
// pruebas con localStorage para tener acceso a estas credenciales
     localStorage.setItem('tempUsers', JSON.stringify(this.users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
// _______________________________________________________________________________

    alert('Success! ');
      window.location.href = 'lobby.html';
    },


}


});



