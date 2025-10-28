const app = Vue.createApp({

  data() {
    return {
      login: "Log In",
      email: '',
      password: '',
        loginUser: null,
      users: [],
      alert:''
    };
  },


  // prueba de sistema
mounted() {
  const savedUsers = localStorage.getItem('tempUsers');
  if (savedUsers) {
    this.users = JSON.parse(savedUsers);
  }
  console.log('Usuarios cargados:', this.users);
},

  methods: {

    // prueba de sistema
/**Login:looks for  created accounts to open them*/
 // Validar email
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Login 
    searchUser() {
      if (!this.email || !this.password) {
        return alert('Enter email and password');
      }

      if (!this.isValidEmail(this.email)) {
        return alert('Invalid email format');
      }

      // Buscar usuario
      const user = this.users.find(user => 
        user.email.toLowerCase() === this.email.toLowerCase() && 
        user.password === this.password
      );


      //localstorage par aguardar en el almacenamiento local, sirve apra pruebas en todo el proyecto
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Welcome back, ' + user.name + '! ');
        window.location.href = 'lobby.html';
      } else {
        alert('Invalid credentials');
      }
    }
  }
});



