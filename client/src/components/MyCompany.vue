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
          <h2 v-if="voucherData.length > 0">Wir bieten diese Gutscheine an</h2>

          <div class="myVoucher card col-md-3 col-sm-4 col-xs-12" v-for="voucher in voucherData" :key="voucher._id" v-bind:id="voucher._id">
            <div class="item">
              <h6>Gutschein: {{voucher.name}}</h6>
              <span>Wert: {{voucher.price}}</span><br />
              <span>güktig bis: {{voucher.expiryDate}}</span>
              
              <div class="postion-bottom">
                <div v-if="sameUser">
                  <span class="mt-4 mb-2"> <img :src="`/qr/images/${voucher._id}.png`" /></span>
                  <span> <a href="#" class="mr-3" @click="edit(voucher._id)">editieren</a></span>
                  <span><a href="#" class="mr-4" @click="del(voucher._id)">löschen</a></span>
                  <span><a href="#">drucken</a></span>
                  <a href="#" v-text="`http://192.168.178.26:8080/toBasket/${voucher._id}`" v-bind="`http://192.168.178.26:8080/toBasket/${voucher._id}`"> foo</a>
                </div>
                <div v-else>
                  <a href="#" class="mr-5" @click="addVoucher(voucher._id)">in den Warenkorb</a>
                  <router-link to="#">Details</router-link>
                </div>
              </div>
            </div>
          </div>
          <p v-if="sameUser"> <router-link to="/add-business-voucher">Fügen Sie einen Gutschein hinzu!</router-link></p>
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
      basketItemObj: '',
      selectedUserid: "",
      count: "1",
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

    },
    async addVoucher(voucher_id) {
      let token = localStorage.getItem("jwt");
      let toBasket = await this.$http.post("/voucher/toBasket", {voucher_id}, {headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        }},
      );
      
      if (toBasket) {
        let basketItemObj = toBasket.data.dataBasket[0];
        basketItemObj.count = this.count;
        // Parse the serialized data back into an aray of objects
        var addVoucher = JSON.parse(localStorage.getItem('myBasketItems')) || [];
        addVoucher.push(basketItemObj);
          // Re-serialize the array back into a string and store it in localStorage
        localStorage.setItem('myBasketItems', JSON.stringify(addVoucher));
        this.$router.push('/basket/')
      }
    }
  },

  async created() {
    this.getCompany();
    this.getAllMyVouchers();
    this.checkCurrentUer();
    this.param = this.$route.params;
    let voucherId =  this.param.vid;
    console.log(voucherId)
    if (voucherId) {
      this.addVoucher(voucherId);
    }
  }
}
</script>

<style lang="scss" scoped >
      .card {
        display: inline-grid;
        border: none;
        min-height: 250px;
        a {
            text-decoration: none;
        }
        .item {
            border-radius: 10px;
            box-shadow: 2px 2px 6px 3px;
            margin: 5px;
            padding: 10px 5px;
            .postion-bottom {
              position: absolute;
              bottom: 20px;
            }
        }
      }
</style>