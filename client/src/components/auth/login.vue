<template>
  <div class="container">
    <div class="row">
      <div class="login-container">
        <b-form
          class="text-center border p-2 mb-4"
          style="margin-top: 70px; height: auto; padding-top: 30px !important"
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
//import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        //let response = await axios.post("/auth", this.login);
        let response = await this.$http.post("/user/login", this.login);

        let token = response.data.token;
        let userType = response.data.user.usertype;
        let additonalId = response.data.user.additionalId;
        let u_id = response.data.user._id;

        try {
          let response = await this.$http.post(
            "/user/getUserStatus",
            { u_id },
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.isActive === true) {
            localStorage.setItem("jwt", token);
          } else {
            swal(
              "Info",
              "Sie müssen evtl. Ihre E-Mails püfen und Ihren Account aktivieren",
              "info"
            );
          }
        } catch (err) {
          swal(
            "Info",
            "Sie müssen evtl. Ihre E-Mails püfen und Ihren Account aktivieren",
            "info"
          );
        }

        if (token) {
          let hasAdditional = await this.$http.post(
            "/user/checkAdditional",
            {},
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          );

          let bool_hasAdditional = hasAdditional.data.hasAdditional;

          if (userType == "registerBusiness" && !bool_hasAdditional) {
            this.$router.push("/register-additional");
          } else {
            if (userType == "registerBusiness") {
              this.$router.push("/company/" + additonalId + "/userid/" + u_id);
            } else {
              this.$router.push("/my-wallet/");
            }
          }
        }
      } catch (err) {
        this.error = err;
        swal(
          "Error",
          "Login - Fehler - prüfen Sie Ihre Eingabe bzw. haben _Sie sich freigeschaltet?",
          "error"
        );
      }
    },
  },
};
</script>
