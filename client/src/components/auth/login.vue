<template>
  <div class="container">
    <div class="row">
      <div class="login-container">
        <b-form
          class="text-center border p-2 mb-4"
          style="margin-top:70px;height:auto;padding-top:30px !important;"
          @submit.prevent="loginUser"
        >
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="login.email"
            required
          />

          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="login.password"
            required
          />

          <!-- Sign in button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign in
            </button>
          </center>

          <div>
            <span>Bist du schon Registriert?</span>
            <p>Wenn nicht - dann melde dich schnell an!</p>
            <router-link to="/register">Klicke Hier!</router-link>
          </div>

         
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/user/login", this.login);
        let token = response.data.token;
        let userType = response.data.user.usertype;
        
  
        localStorage.setItem("jwt", token);

        if (token) {
          swal("Success", "Login Successful", "Error");

          let hasAdditional = await this.$http.post("/user/checkAdditional", {}, {headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
              }},
          );
          let bool_hasAdditional = hasAdditional.data.hasAdditional;
          console.log(bool_hasAdditional);
          if (userType == 'registerBusiness' && !bool_hasAdditional) {
             this.$router.push("/register-additional");
          } else {
             this.$router.push("/my-wallet/");
          }
         
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err.response);
      }
    }
  }
};
</script>

<style scoped>

  .login-container {
    display: flex;
    margin: auto;
  }

</style>