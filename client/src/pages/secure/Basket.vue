<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3 basket-container mt-5">
   
        <basketItems :basketVoucherList="allItems" />

       
      </div>
    </div>
  </div>
</template>
<script>
import basketItems from "@/components/checkout/BasketItems.vue";

export default {
  name: 'Basket',
  data() {
    return {
      allItems: [],
    }
  },
  components: {
    basketItems
  },
  methods: {
    async getAllItems() {
      let basketItemList = localStorage.getItem("myBasketItems");

      if(basketItemList) {
        this.allItems = JSON.parse(basketItemList);
      }

    }
  },
  created() {
    this.getAllItems();
  }
};
</script>