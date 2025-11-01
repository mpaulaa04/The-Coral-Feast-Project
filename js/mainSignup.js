const app = Vue.createApp({
  data() {
    return {
      submitF: "Sign Up",
       form: {
        email: "",
        name: "",
        password: "",
        farmName: "",
        farmType: "saltwater"
      }
    };
  },
  methods: {
   submitForm() {
      console.log("formulario enviado");
      window.location.href = './lobby.html'; 
    }
  },
});
