<template>
    <div class="container-main">
      <div class="container company">

        <div class="aboutus" v-for="company in companyData" :key="company._id" >

          <h1 class="mt-5">Mein Unternhemen: {{company.company}}</h1>
          <div class="mt-3">{{company.aboutus}}</div>
          
          <div class="row mt-5">
            <div class="col-xs-12 col-md-6">
              {{company.street}} {{company.streetNo}} <br />
              {{company.postcode}}  {{company.city}} <br />
            </div>
            <div class="col-xs-12 col-md-6">
              {{company.businessNo}} <br />
              {{company.opening}} <br />
              {{company.phone}}
            </div>
          </div>
          <div class="group cards rows">
            
                <div class="item">
                
                  <VueSlickCarousel v-bind="settings">
                    <div v-for="file in company.file1" :key="file">
                        <img :src="`http://localhost:8080/api/uploads/${file}`" />
                    </div>
                  </VueSlickCarousel>
              </div>
            
          </div>
        </div>
        <div class="mt-3">
          <h2>Wir bieten diese Gutscheine an</h2>

          <div class="myVoucher card" v-for="voucher in voucherData" :key="voucher._id" v-bind:id="voucher._id">
            <div>
              <span>Gutschein: {{voucher.name}}</span>
              <span>Wert: {{voucher.price}}</span>
              <span>güktig bis: {{voucher.expiryDate}}</span>
              {{sameUser}}
              <div v-if="sameUser"><span>editieren</span><span>löschen</span></div>
              <div v-else><router-link to="/basket">weiter mit diesem Gutschein</router-link></div>

            </div>
          </div>
          <p> <router-link to="/add-business-voucher">Fügen Sie einen Gutschein hinzu!</router-link></p>
        </div>
      </div>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import VueJwtDecode from "vue-jwt-decode";
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  name: "Company",
  components: {VueSlickCarousel},
  data() {
    return { 
      param: "",
      companyData: [],
      voucherData: [],
      userid: '',
      sameUser: '',
      selectedUserid: "",
       settings: {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow : 3,
        slidesToScroll : 3
      },
    };
  },
  methods: {
    async getCompany() {
      let token = localStorage.getItem("jwt");
      this.param = this.$route.params;
      let additionalId = {additionalId: this.param.aid};

      let responseCompany = await this.$http.post("/user/findCompany", additionalId, {headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        }},
      );
      console.log(responseCompany);
      if (responseCompany) {
        this.companyData = responseCompany.data.dataCompany;
      }
    
    },
    async getAllMyVouchers() {
      let token = localStorage.getItem("jwt");
      
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
      }
    
      this.param = this.$route.params;
      let userid =  this.param.uid;
     
  
      let responseVoucher = await this.$http.post("/voucher/findVouchers", {userid}, {headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        }},
      );

      if (responseVoucher) {
        this.voucherData = responseVoucher.data.dataVouchers;
      }
    },
    checkCurrentUer() {
      this.param = this.$route.params;
      let selectedUserid =  this.param.uid;
      let token = localStorage.getItem("jwt");
      this.sameUser = false;
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
        this.userid = this.user._id;
      }
      if (selectedUserid === this.userid) {
        this.sameUser = true;
      }

    }
  },

  async created() {
    this.getCompany();
    this.getAllMyVouchers();
    this.checkCurrentUer();
  }
}
</script>

<style scoped>
  
</style>