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
          <textarea
            type="textarea"
            id="opening"
            class="form-control mb-5"
            placeholder="Öffnungszeiten"
            v-model="registerB.opening"
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
          <textarea
            type="textarea"
            id="aboutus"
            class="form-control mb-5"
            placeholder="Bescheibe dein Unternehmen bzw. Geschäft"
            v-model="registerB.aboutus"
            required
          />

          <MultipleUpload />

          <p>
            <!-- Speichern in button -->
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Speichern
              </button>
            </center>
          </p>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import VueJwtDecode from "vue-jwt-decode";
import MultipleUpload from '../forms/multipleUpload.vue';
export default {
  components: { MultipleUpload },
  data() {
    return {
      registerB: {
        company: "",
        street: "",
        streetNo: "",
        postcode: "",
        city: "",
        phone: "",
        opening: "",
        businessNo: "",
        userId: "",
        aboutus: "",
        file1: [],
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

        // Komponente forms/multipleUpload Methode Aufruf Callback //!! Umbennen
        let filename =  this.$root.$refs.MultipleUploads.validateFiles();
   
        // eindeutigen Bildnamen generieren
        var d = new Date();
        var tag = d.getDate();
        var monat = d.getMonth() + 1;
        var jahr = d.getFullYear();
        var stunde = d.getHours();
        var minuten = d.getMinutes();
        let currentDate = tag+monat+jahr+stunde+minuten;
      
        // Bildnamen hinzufügen multiple
        filename.forEach((value, index) => {
          console.log(value);
          console.log(index);
          let cryptFilename = currentDate + '-' + value;
          this.registerB.file1.push(cryptFilename);
        });
        
        let response = await this.$http.post("/user/registerBusiness", this.registerB, {headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          }},
        );
        
       
        if (response) {
          this.$router.push("/my-wallet");
          swal("Success", "Zusatzinfos wurden gepseichert", "success");
          // Lade Bilder in den public Ordner
          this.$root.$refs.MultipleUploads.sendFile();
        } else {
          swal("Error", "Zusatzinfos Fehler beim speichern", "Error");
        }
      } catch (err) {
        swal("Error", "Zusatzinfos - Error1", "error");
        console.log(err.response);
      }
    }
  }
};
</script>
