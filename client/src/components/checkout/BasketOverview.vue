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
        >Zur Kasse</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BasketOverview',
    props: ['basketPriceList', 'priceWithTax'],


    methods: {
        calculateTotalPrice() {
            
        }

    },
    created() {
       this.calculateTotalPrice();
    }
    
}
</script>
<style lang="scss" scoped>
    .basket-container {
        border: 1px solid #41b883;;
    }
  
</style>