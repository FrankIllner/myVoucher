<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <h3>Partner User! Hallo {{this.user.name}} - hier kannst du deine Gutscheine erstellen! </h3>
        <b-form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="addBusinessVoucher"
        >
          <b-form-select id="category" v-model="voucher.selectedCategory" :options="voucher.options"></b-form-select>
          <div class="mt-3">Selected: <strong>{{ voucher.selectedCategory }}</strong></div>
          
          <b-input
            type="text"
            id="name"
            class="form-control mb-5"
            placeholder="Gutschein-Name z.B. Buch 20€"
            v-model="voucher.name"
            
          />
          <b-input
            type="text"
            id="price"
            class="form-control mb-5"
            placeholder="Gutschein-Wert"
            v-model="voucher.price"
            required
          />
          <b-form-datepicker id="expiryDate" v-model="voucher.expiryDate" class="mb-2"></b-form-datepicker>
          <p>Value: '{{ voucher.expiryDate }}'</p>
        
          <p>
            <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Gutschein gnerieren!
            </button>
            </center>
          </p>
        </b-form>
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
      voucher: {
        selectedCategory: null,
         options: [
          { value: null, text: 'Wählen Sie ein Gutschein Layout' },
          { value: '1', text: 'Dark' },
          { value: '2', text: 'Light' },
          { value: '3', text: 'normal' },
        ],
        expiryDate: '',
        name: "",
        price: "",
        userId: ""
      }
    };
  },
  methods: {
    async addBusinessVoucher() {
      try {
        let token = localStorage.getItem("jwt");
        let userId = this.user._id;
        this.voucher.userId = userId;
   
        let response = await this.$http.post("/voucher/addBusinessVoucher", this.voucher, {headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          }},
        );
     
        //let token = response.data.token;
        if (response) {
          swal("Success", "Voucher - wurde anglegt", "success");
        } else {
          swal("Error", "Gutschein - Error2", "Error");
        }
      } catch (err) {
        swal("Error", "Gutschein - Error1", "error");
        console.log(err.response);
      }
    }
  },
   created() {
        let token = localStorage.getItem("jwt");
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
    }
};
</script>



