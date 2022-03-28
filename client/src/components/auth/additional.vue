<template>
  <div class="container">
    <div class="row">
      <h3 class="center-text">Um Partner bei uns zu werden, benötigen wir noch folgende Daten: </h3>
      <div class="col-lg-8 offset-lg-2 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="registerUserBusiness"
        >
          <input
            type="text"
            id="Firma"
            class="form-control mb-5"
            placeholder="Firmen Name"
            v-model="registerB.company"
            required
          />
          <input
            type="text"
            id="street"
            class="form-control mb-5"
            placeholder="Straße"
            v-model="registerB.street"
            required
          />
          <input
            type="text"
            id="streetNo"
            class="form-control mb-5"
            placeholder="Straßen Nr."
            v-model="registerB.streetNo"
            required
          />

          <input
            type="text"
            id="postcode"
            class="form-control mb-5"
            placeholder="PLZ"
            v-model="registerB.postcode"
            required
          />
          <input
            type="text"
            id="city"
            class="form-control mb-5"
            placeholder="Stadt"
            v-model="registerB.city"
            required
          />
          <input
            type="text"
            id="phone"
            class="form-control mb-5"
            placeholder="Telefon"
            v-model="registerB.phone"
            required
          />
          <input
            type="text"
            id="businessNo"
            class="form-control mb-5"
            placeholder="Gewerbenummer"
            v-model="registerB.businessNo"
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
            <p>Sind Sie bei uns schon Partner? Wenn ja, dann Log Dich hier ein!</p>
            <router-link to="/">Klicke hier!</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      registerB: {
        company: "",
        street: "",
        streetNo: "",
        postcode: "",
        city: "",
        phone: "",
        businessNo: "",
        userId: ""
      }
    };
  },
  methods: {
    async registerUserBusiness() {
      try {
        let token = localStorage.getItem("jwt");
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
        let userId = this.user._id;
        this.registerB.userId = userId;
    
   
        let response = await this.$http.post("/user/registerBusiness", this.registerB, {headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          }},
        );
    
      
        if (response) {
         
          this.$router.push("/my-voucher");
          swal("Success", "Registration Was successful", "success");

        } else {
          swal("Error", "Something Went Wrong", "Error");
        }
      } catch (err) {
        let error = err.response;
     
         swal("Error", error.data.message, "error");
        if (error.status == 409) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    }
  }
};
</script>
