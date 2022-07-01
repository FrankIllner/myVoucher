<template>
    <div>
        <div class="bg-light rounded-pill px-4 pt-3 text-uppercase font-weight-bold">
        Bestellübersicht
        </div>
        <div class="p-4">
            
        <ul class="list-unstyled mb-4">
            <li class="d-flex justify-content-between pb-3">
            <strong class="text-muted">Zwischensumme </strong><strong>{{basketPriceList}}€</strong>
            </li>
            <li class="d-flex justify-content-between py-3">
            <strong class="text-muted">MwSt.</strong><strong>19%</strong>
            </li>
            <li class="d-flex justify-content-between py-3">
            <strong class="text-muted">Gesamtkosten</strong>
            <h5 class="font-weight-bold">{{priceWithTax}}</h5>
            </li>
        </ul>
  
        <button
            class="btn bg-vue2 rounded-pill py-2 btn-block"
            @click="buyVoucher(allSelectedVouchers)"
        >KAUFEN</button>
        </div>
    </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import swal from "sweetalert";
import axios from "axios";

export default {
    name: 'BasketOverview',
    props: ['basketPriceList', 'priceWithTax', 'allSelectedVouchers'],


    methods: {
        async buyVoucher(vouchers) {
       
            let token = localStorage.getItem("jwt");
      
            if (token) {
                let decoded = VueJwtDecode.decode(token);
                this.user = decoded;
            }
           
            let user_id = this.user._id;
            let partner_id = vouchers[0].userId;
            let offer_voucher_id = vouchers[0]._id;
            let status = false
           
            let params = {
                user_id,
                partner_id,
                offer_voucher_id,
                status
            }
            let buyVoucher = await this.$http.post("/voucher/buyVoucher", params, {headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                }},
            );
            
            if (buyVoucher) {
          
            const formData = new FormData();
            formData.append('buy_id', buyVoucher.data.dataBuyBasket._id);
            formData.append('user_id', user_id);
            formData.append('partner_id', partner_id);
            formData.append('offer_voucher_id', offer_voucher_id);
            formData.append('status', status);
            formData.append('url', window.location.host);
            formData.append('buyVoucherQr', true);
    
            axios.post('/qr', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(function (response) {
                console.log(response);
                if (!response.data) {
                    console.log('Problem by generate QR-Code');
                } else {
                    console.log('QR-Code was Generate');
                }

            })
                localStorage.removeItem("myBasketItems");
                this.$router.push("/checkout/");
            } else {
                swal("Error", "Probleme beim Kauf des Gutschein - Error-13343", "Error");
            }
        }

    },
    created() {
       
    }
    
}
</script>
<style lang="scss" scoped>
    .basket-container {
        border: 1px solid #41b883;;
    }
  
</style>