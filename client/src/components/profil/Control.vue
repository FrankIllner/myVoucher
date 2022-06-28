<template>
  <div>
    <section>
      <div class="container voucher-overview mt-5">
        <div class="row">
          <div class="col-12">
            <div class="qrcode-wapper" @click="openCamera">
              <i class="fas fa-barcode"></i><span class="ml-2 ">QRCode scannen</span>
            </div>
            <div class="d-xl-none d-lg-none d-md-none" v-if="reader">
              <i class="fa-solid fa-rectangle-xmark" @click="closeCamera"></i>
              <qrcode-stream :key="_uid" :track="this.paintOutline" @init="logErrors" />
            </div>

            <div class="mt-5">
              <h4>Diese Gutscheine sind noch nicht eingelöst:</h4>
                <table>
                    <tr>
                        <th>Gutschein-ID</th>
                        <th>Gutschein-Name</th>
                        <th>Wert</th>
                        <th>gültig bis</th>
                        <th>gekauft von User</th>
                    </tr>
                    <tr v-for="boughtVouchers in allBoughtVouchers" :key="boughtVouchers._id" class="col-12 p-2">
                  
                        <td><b>{{boughtVouchers._id}}</b></td>
                        <td> {{boughtVouchers.name}}</td>
                        <td>{{boughtVouchers.price}}€</td>
                        <td>{{boughtVouchers.expiryDate}}</td>
                        <td>{{boughtVouchers.userId}}</td>
                
                    </tr>
                </table>
          
            </div>
            <div class="mt-5">
              <h4>Diese Gutscheine sind schon eingelöst</h4>
                <table>
                    <tr>
                        <th>Gutschein-ID</th>
                        <th>Gutschein-Name</th>
                        <th>Wert</th>
                        <th>gültig bis</th>
                        <th>gekauft von User</th>
                    </tr>
                    <tr v-for="boughtVouchers in allBoughtVouchersHistory" :key="boughtVouchers._id" class="col-12 p-2">
                  
                        <td><b>{{boughtVouchers._id}}</b></td>
                        <td> {{boughtVouchers.name}}</td>
                        <td>{{boughtVouchers.price}}€</td>
                        <td>{{boughtVouchers.expiryDate}}</td>
                        <td>{{boughtVouchers.userId}}</td>
                
                    </tr>
                </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: 'AllVouchers',
  components: {QrcodeStream},
  data() {
    return {
      user: {},
      allBoughtVouchers: [],
      allBoughtVouchersHistory: [],
      userId: this.$userId,
      reader: false

    };
  },
  methods: {
    async getAllBoughtVouchers () {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      let userType = this.user.usertype;
      let user_id = this.$userId;

      try {
        let response = await this.$http.post("/voucher/getAllBoughtVouchers", {user_id, userType}, {headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
            }},
        );
        console.log(response);
        if (response) {
  
            this.allBoughtVouchers = response.data.vouchers;
        }
      } catch (err) {
        console.log(err);
      }

    },
    async getAllBoughtVouchersHistory () {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      let userType = this.user.usertype;
      let user_id = this.$userId;
 
      try {
        let response = await this.$http.post("/voucher/getAllBoughtVouchersHistory", {user_id, userType}, {headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
            }},
        );
        
        if (response) {
            this.allBoughtVouchersHistory = response.data.vouchersHistory;
        }
      } catch (err) {
        console.log(err);
      }

    },

    paintOutline (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [ firstPoint, ...otherPoints ] = detectedCode.cornerPoints

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
        window.location = detectedCode.rawValue;
        
      }
    },

    logErrors (promise) {
      promise.catch(console.error)
    },

    openCamera() {
      this.reader = true;
    },
    closeCamera() {
      this.reader = false;
    },
  },

  async created() {

    this.getAllBoughtVouchers();
    this.getAllBoughtVouchersHistory();
    this.$root.$refs.AllVouchers = this;
        this.param = this.$route.params;
        console.log('#########################');
    console.log(this.param);
    
  }
};
</script>

<style lang="scss">
.voucher-overview {
  i.fa-barcode {
    border: 1px solid black;
    padding: 5px;
    font-size: 50px;
  }
  i.fa-rectangle-xmark {
    font-size: 30px;
    display: flex;
    align-items: right;
    justify-content: right;
  }
  .qrcode-wapper {
    cursor: pointer;
  }
  table {
      width: 100%;
  }
  table td {
  word-break: break-all;
  }
}
</style>

