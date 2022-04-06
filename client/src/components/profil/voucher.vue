<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <h3>Hallo {{this.user.name}}</h3>
        <b-form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="addvoucher"
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

          <b-input
            type="text"
            id="fromPerson"
            class="form-control mb-5"
            placeholder="erhalten von z.B. Mama"
            v-model="voucher.fromPerson"
          />

         <upload />

          <!--
          <div>
          <b-form-file
            v-model="voucher.file1"
            type="file"
            id="file1"
            placeholder="Fotografiere und hoch laden"
            drop-placeholder="Wähle ..."
            @change="selectFile( )"
          ></b-form-file>
           <a v-on:click="sendFile( )">Submit</a>
          </div>
          -->
         
          <p>
            <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Gutschein speichern
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
import Upload from '../forms/upload.vue'
export default {
  components: { Upload },
  data() {
    return {
      voucher: {
        selectedCategory: null,
         options: [
          { value: null, text: 'Um welchen Gutschein Kategorie handelt es sich' },
          { value: '1', text: 'Massage' },
          { value: '2', text: 'Bücher' },
          { value: '3', text: 'Kultur' },
        ],
        expiryDate: "",
        name: "",
        price: "",
        fromPerson: "",
        file1: []
        //file1: null
      }
    };
  },
  methods: {
    async addvoucher() {
      try {
        let token = localStorage.getItem("jwt");
        let decoded = VueJwtDecode.decode(token);
         
        this.user = decoded;
   
        let response = await this.$http.post("/voucher/addUsersVoucher", this.voucher, {headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          }},
        );
     
        //let token = response.data.token;
        // Todo pruefen ob response ok ist
        if (response) {
          swal("Success", "Voucher - Registration Was successful", "success");
          this.$root.$refs.Upload.sendFile();

        } else {
          swal("Error", "Gutschein - Error2", "Error");
        }
      } catch (err) {
        swal("Error", "Gutschein - Error1", "error");
        console.log(err.response);
      }
    },


  },
   created() {
        let token = localStorage.getItem("jwt");
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
    },

};
</script>



