<template>
    <div></div>

</template>

<script>
import swal from "sweetalert";
import Vue from "vue";
export default {

    methods: {
        async userActivated(userId) {
            try {
                let token = localStorage.getItem("jwt");
          
                let response = await this.$http.post("/user/userActivated", {userId}, {headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    }},
                );
                console.log('response');
                console.log(response);
                console.log(response.data);
                if (response.data.isActivated === true) {
                     swal("Info", "Ihr Account ist freigeschaltet - sie können nun alle Funtion von Kieztreu nutzen!", "info");
                     localStorage.removeItem('jwt');
                     Vue.prototype.$isLogin = false;
                     this.$router.push("/");
                  
                } else {
                  swal("Info", "Account konnte nicht freigeschaktet werden1", "info");
                }
            } catch (err) {
                swal("Info", "Account konnte nicht freigeschaktet werden2", "info");
            }

        }

    },

    async created() {
        this.param = this.$route.params;
        let userId =  this.param.userId;
        this.userActivated(userId);
    }

};
</script>