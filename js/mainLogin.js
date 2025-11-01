const app = Vue.createApp({

  data() {
    return {
      submitF: "Log In",
      form:{email: '',
      password: '',
      }
    };
  },


  methods: {
submitForm() {
      console.log("formulario enviado");
      window.location.href = './lobby.html'; 
    }
    }
  
});



