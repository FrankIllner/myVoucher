<template>
  <div class="col-12 col-md-6 offset-md-3 checkout-container mt-5">
    <stripe-element-card
      ref="elementRef"
      :pk="publishableKey"
      @token="tokenCreated"
    />
    <button @click="submit" class="btn bg-vue2 rounded-pill py-2 btn-block mt-5">Zahlen (Generate token)</button>
  </div>
</template>

<script>
import { StripeElementCard } from '@vue-stripe/vue-stripe';
export default {
  components: {
    StripeElementCard,
  },
  data () {
    this.publishableKey = "process.env.STRIPE_PUBLISHABLE_KEY";
    return {
      token: null,
    };
  },
  methods: {
    submit () {
      // this will trigger the process
      this.$refs.elementRef.submit();
    },
    tokenCreated (token) {
      console.log(token);
      // handle the token
      // send it to your server
    },
  }
};
</script>