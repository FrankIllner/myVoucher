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
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      voucher: {
        selectedCategory: null,
         options: [
          { value: null, text: 'Um welchen Gutschein Kategorie handelt es sich' },
          { value: '1', text: 'Massage' },
          { value: '2', text: 'Bücher' },
          { value: '3', text: 'Kultur' },
          { value: '4', text: 'Basteln' },
          { value: '5', text: 'Sport' },
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
       
    
        if (response) {
          let voucherBusinessId = response.data.data._id;
          const formData = new FormData();
          formData.append('voucherId', voucherBusinessId);
          formData.append('url', window.location.host);
    
          axios.post('/qr', formData,
          {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          .then(function (response) {
    
              if (!response.data) {
                  console.log('Problem by generate QR-Code');
              } else {
                  console.log('QR-Code was Generate');
              }
          })

          let o_additionalId = await this.$http.post("/user/getAdditionalId", {userId}, {headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                }},
          );

          if (o_additionalId) {
              let currentAdditionalId = o_additionalId.data.o_additional[0].additionalId;
              this.$router.push("/company/" + currentAdditionalId + "/userid/" + userId);
          }
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



