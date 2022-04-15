<template>
  <div>
    <section>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group cards">
              <h2>Alle Gutscheine</h2>
              {{ this.allVouchers }}
              <li v-for="voucher in allVouchers" :key="voucher._id" class="list-group-item">
                <b>{{voucher.name}}</b>
                <span>{{voucher.price}}</span>
                <span>{{voucher.fromPerson}}</span>
                <span>{{voucher.expiryDate}}</span>
                <span v-for="file in voucher.file1" :key="file">
        
               
                 <img :src="`http://localhost:8080/api/uploads/${file}`"/>
    
                </span>
              </li>
           
            </ul>


            <ul class="list-group">
              <h2>Meine Gutscheine</h2>
              <li class="list-group-item">Name : {{ user.name }}</li>
              <li class="list-group-item">Email : {{ user.email }} </li>
            </ul>

            <li>{{ user.usertype }}</li>
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
      user: {},
      allVouchers: [],
      publicPath: process.env.BASE_URL
    };
  },
  methods: {
   async getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;

      try {
        let response = await this.$http.post("/voucher/getAllVouchers", {}, {headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
            }},
        );
        if (response) {
          console.log('test');
          console.log(response.data.data);
          this.allVouchers = response.data.data;
        }
      } catch (err) {
        console.log(err);
      }

    }
  },

  async created() {
    console.log('Home.vue');
    this.getUserDetails();
  }
};
</script>

