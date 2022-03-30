<template>
  <div>
    <section>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <h2>test</h2>
              <li class="list-group-item">Name : {{ user.name }}</li>
              <li class="list-group-item">Email : {{ user.email }} </li>
              <li>{{ user.usertype }}</li>
            </ul>

            <div v-if="user.usertype=='registerBusiness'">
              <p>Füge weitere Gutscheine von deinem Unternehmen hinzu!</p>
              <router-link to="/add-business-voucher">Klicke hier!</router-link>
            </div>
            
            <div v-else>
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
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      console.log(this.user);
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
  },

  created() {
    console.log('Home.vue');
    this.getUserDetails();
  }
};
</script>

