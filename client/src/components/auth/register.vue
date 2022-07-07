<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <h3 v-if="this.register.usertype=='register'">{{this.register.infoCustomer}}</h3>
        <h3 v-else>{{this.register.infoBusiness}}</h3>
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="registerUser"
        >
          <input
            type="text"
            id="name"
            class="form-control mb-5"
            placeholder="Name"
            v-model="register.name"
            required
          />
          <input
            type="email"
            id="email"
            class="form-control mb-5"
            placeholder="E-Mail"
            v-model="register.email"
            required
          />

          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="register.password"
          />

          <!-- was fuer eine Anmaldung User/Business-User -->
          <input
            type="text"
            id="usertype"
            class="form-control mb-5"
            v-model="register.usertype"
            required
          />

          <p>
            <!-- Sign in button -->
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Sign in
              </button>
            </center>
          </p>

          <div>
            <p>Bist du schon regisrtiert? Wenn ja, dann Log Dich ein!</p>
            <router-link to="/">Klicke hier!</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";

export default {
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: "",
        usertype: this.$route.name,
        infoCustomer:  'Melde Dich an und speichere Deine ganzen Papier Gutscheine in die App! ',
        infoBusiness: 'Werde Partner bei uns und verdiene mit den Verkauf....'
      }
    };
  },

  methods: {
    async registerUser() {
      try {
        let response = await this.$http.post("user/register", this.register);
        let token = response.data.token;
      
        if (token) {
          const formData = new FormData();
          formData.append('name', this.register.name);
          formData.append('mail', this.register.email);
          formData.append('sendMailRegist', true);
  
          axios.post('/mail', formData,
          {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          .then(function (response) {
            console.log('mailObj');
              console.log(response);
              if (!response.data) {
                  console.log('E-Mail konnte nicht gesendet werden');
              } else {
                  console.log('E-Mail gesendet!');
              }

          })
          localStorage.setItem("jwt", token);
          this.$router.push("/");
          swal("Success", "Super - du bekommst eine E-Mail von uns! ", "success");

        } else {
          swal("Error", "Something Went Wrong", "Error");
        }
      } catch (err) {
        let error = err.response;
        console.log(error);
         swal("Error", error.data.message, "error");
        if (error.status == 409) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    }
  },
   props: {
    user: {
      type: String,
      required: false,

    },
  }
};
</script>
