<template>
  <div>
    <section>
      <div class="container voucher-overview mt-5">
        <div class="row">
          <div class="col-md-12">
            <div>
              <h2>Gutschein kaufen</h2>
           
              <div class="group cards row">
                <div v-for="business in allBusiness" :key="business._id" class="col-xs-12 col-sm-6 col-md-4 p-2">
                  <router-link :to="'/company/' + business._id + '/userid/' + business.userId">
                    <div class="item">
                      <p><b>{{business.company}}</b></p>
                      <span>{{business.street}} {{business.streetNo}}</span><br />
                      <span>{{business.postcode}} {{business.city}}</span><br />
                      <span>{{business.phone}}</span><br />
                      <span>{{business.businessNo}}</span><br />
                       <span>{{business.userId}}</span><br />
                    </div>
                  </router-link>
                </div>
            
              </div>
            </div>

            <div class="mt-5">
              <h2>Meine gekauften Gutscheine</h2>
              <div class="group cards row">
               
                <div v-for="boughtVouchers in allBoughtVouchers" :key="boughtVouchers._id" class="col-xs-12 col-sm-6 col-md-4 p-2">
                  <div class="item">
                    <p><b>{{boughtVouchers.name}}</b></p>
                    <span><label>Gutschein-Wert: </label> {{boughtVouchers.price}}€</span><br />
                    <span><label>Bekommen von: </label>{{boughtVouchers.fromPerson}}</span><br />
                    <span><label>Gutschein läuft am </label> {{boughtVouchers.expiryDate}} ab</span>
                    <span> <img :src="`/qr/images/${user_id}-${boughtVouchers._id}.png`" /></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5">
              <h2>Meine Gutscheine</h2>
              <div class="group cards row">
               
                <div v-for="voucher in allVouchers" :key="voucher._id" class="col-xs-12 col-sm-6 col-md-4 p-2">
                  <div class="item">
                    <p><b>{{voucher.name}}</b></p>
                    <span><label>Gutschein-Wert: </label> {{voucher.price}}€</span><br />
                    <span><label>Bekommen von: </label>{{voucher.fromPerson}}</span><br />
                    <span><label>Gutschein läuft am </label> {{voucher.expiryDate}} ab</span>
                    <VueSlickCarousel v-bind="settings">
                      <div v-for="file in voucher.file1" :key="file">
                            <img :src="`/api/uploads/${file}`"/>
                      </div>
                    </VueSlickCarousel>
                  </div>
                </div>
              </div>
            </div>
           
            <div class="mt-5" v-if="user.usertype=='registerBusiness'">
              <p>Füge weitere Gutscheine von deinem Unternehmen hinzu!</p>
              <router-link to="/add-business-voucher">Klicke hier!</router-link>
            </div>
            
            <div class="mt-5" v-else>
              <p>Füge weitere deiner privaten Gutscheine hinzu!</p>
              <router-link to="/add-user-voucher">Klicke hier!</router-link>
            </div>

          </div>

        </div>
      </div>
    </section>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import VueSlickCarousel from 'vue-slick-carousel'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'AllVouchers',
  components: {VueSlickCarousel},
  data() {
    return {
      user: {},
      allVouchers: [],
      allBusiness: [],
      allBoughtVouchers: [],
      userId: this.$userId,
      user_id: '',
      settings: {
        arrows: true,
        dots: true,
        slidesToShow : 1,
        slidesToScroll : 1
      },
    };
  },
  methods: {
   async getUserVoucherDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
  
      try {
        let response = await  this.$http.post("/voucher/getAllVouchers",  {}, {headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
            }},
        );
        if (response) {
           console.log(response);
          this.allVouchers = response.data.data;
        }
      } catch (err) {
        console.log(err);
      }

    },
    async getAllBusiness() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;

      try {
        let response = await this.$http.post("/user/getAllBusiness", {}, {headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
            }},
        );
       console.log(response)
        if (response) {
          this.allBusiness = response.data.data;
        }
      } catch (err) {
        console.log(err);
      }

    },
    async getAllBoughtVouchers () {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      let userType = this.user.usertype;
      let user_id =  this.user._id;
      this.user_id = user_id;
      try {
        let response = await this.$http.post("/voucher/getAllBoughtVouchers", {user_id, userType}, {headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
            }},
        );

        if (response) {
         this.allBoughtVouchers = response.data.vouchers;
        }
      } catch (err) {
        console.log(err);
      }

    },
    checkUserType() {
      const userId = this.$userId;
      
      let companyId = this.$companyId;
      this.param = this.$route.params;
      let companyid =  this.param.aid;
      if (companyId == '') {
        companyId = companyid;
      }

      if (this.$userType === 'registerBusiness') {
        this.$router.push("/company/" + companyId + "/userid/" + userId);
      }
    }
  },

  async created() {

    this.checkUserType();
    this.getUserVoucherDetails();
    this.getAllBusiness();
    this.getAllBoughtVouchers();
    this.$root.$refs.AllVouchers = this;
    
  }
};
</script>

<style lang="scss">
  .voucher-overview .group img {
    width: 100%;
    height: auto;
  }
  .voucher-overview .slick-prev:before, .voucher-overview .slick-next:before {
    color: blueviolet !important;
  }
  .voucher-overview .cards {
      a {
        text-decoration: none;
      }
     .item {
      border: 1px solid #CCC;
      border-radius: 10px;
      box-shadow: 2px 2px 6px 3px;
      margin: 5px;
      padding: 10px;
      height: 100%;
      width: max-content;
    }
  }
</style>

