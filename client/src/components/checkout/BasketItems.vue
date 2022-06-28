<template>
    <div>
        <h3 class="text-uppercase">Warenkorb
    </h3>
    <div> 
        <div class="alert bg-vue mt-4">
            <div class="alert-heading">
                Keine Gutscheine im Warenkorb
            </div>
        </div>
    </div>
    <div>
        <table class="table table-borderless">
        <thead>
            <tr>
            <th>
                <div class="p-2 px-3 text-uppercase">Produkt</div>
            </th>
            <th>
                <div class="py-2 text-uppercase">Einzelpreis / Gesamt</div>
            </th>
            <th>
                <div class="py-2 text-uppercase">Anzahl</div>
            </th>
            <th>
                <div class="py-2 px-3"></div>
            </th>
            </tr>
        </thead>

        <tbody v-for="(basket, index) in basketVoucherList" :key="index">
            <td> {{basket.name}}</td>
            <td><span>{{basket.price}}€</span><span v-if="basket.totalPrice"> / {{basket.totalPrice}}€</span></td>
            <td>
                {{basket.count}}
                 <div>
                <i
                    class="fas fa-plus-circle mr-2"
                    @click="addCartItem(index)"
                    style="cursor: pointer;"
                ></i>
                <i
                    class="fas fa-minus-circle"
                    @click="removeCartItem(index)"
                     style="cursor: pointer;"
                ></i>

            </div>
            </td>

            <td>
                <i 
                    class="fa fa-trash"
                    @click="removeAllItem(index)"
                    style="cursor: pointer;"
                >
                </i>
            </td>
        </tbody>
        </table>
        <hr>
    </div>
     <basketOverview :basketPriceList="price" :priceWithTax="taxPrice" :allSelectedVouchers="basketVoucherList"/>
    </div>
</template>

<script>
import basketOverview from "@/components/checkout/BasketOverview.vue";

export default {
    name: 'BasketItems',
    props: ['basketVoucherList', 'price', 'taxPrice'],
    data() {
        return {
            totalPrice: '',
            tax: '',
            showPrice: this.price,
            showTaxPrice: this.taxPrice
          
        }
    },
    components: {basketOverview},
    methods: {
        addCartItem(index) {
            let originalPrice = this.basketVoucherList[index].price;
            this.basketVoucherList[index].originalPrice = originalPrice;
            this.basketVoucherList[index].count++;
            let price =  this.basketVoucherList[index].originalPrice * this.basketVoucherList[index].count;
            this.basketVoucherList[index].totalPrice = price;
            localStorage.removeItem("myBasketItems");
            localStorage.setItem("myBasketItems", JSON.stringify(this.basketVoucherList));
            this.calculateTotalPrice();
        },
        removeCartItem(index) {
            if ( this.basketVoucherList[index].count > 1) {
                this.basketVoucherList[index].count--;
                let originalPrice = this.basketVoucherList[index].price;
                let total = this.basketVoucherList[index].totalPrice;
                let totalPrice = total - originalPrice;
                this.basketVoucherList[index].totalPrice = totalPrice;
                this.calculateTotalPrice();
            }

            localStorage.removeItem("myBasketItems");
            localStorage.setItem("myBasketItems", JSON.stringify(this.basketVoucherList));
        },
        removeAllItem(index) {
       
            delete this.basketVoucherList[index];
            var temp = this.basketVoucherList.filter(Boolean);
            localStorage.removeItem("myBasketItems");
            localStorage.setItem("myBasketItems", JSON.stringify(temp));
            this.$router.go();
        },

        calculateTotalPrice() {

            let temp =  this.basketVoucherList;
            console.log(temp);
            let priceList = [];
            let calc = '';
            let sum = 0;
          
            temp.filter (function (elem) {
                if (elem.originalPrice) {
                    calc = parseInt(elem.count * elem.originalPrice);
                    priceList.push(calc);
                } else {
                    calc = parseInt(elem.count * elem.price);
                    priceList.push(calc);
                }
            });
             
            priceList.forEach((value) => {
                this.totalPrice = parseInt(this.totalPrice + value);
                sum += value;
              
            });
            this.price = sum.toFixed(2);
            this.tax = (sum * 0.19);
            this.taxPrice = (sum + this.tax).toFixed(2);
            //console.log( this.price);

        }

    },

    created() {
        //this.price = 111;
        console.log(this.basketList);
      
    },
    mounted() {
        this.calculateTotalPrice();
    }
    
}
</script>

<style lang="scss" scoped>
    .basket-container {
        border: 1px solid #41b883;;
    }
  
</style>