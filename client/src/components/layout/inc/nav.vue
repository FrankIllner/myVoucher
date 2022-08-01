<template>
    <div class="container">
            <div class="row header-headlines">
                <div class="logo col-3"><a href="/"><img src="../../../assets/img/logo.png"></a></div>
                <div class="col-8" v-if="isLogin && userType !== 'registerBusiness'">
                    <a href="/my-wallet" class="d-block">Alle Angebote/Wallet</a>
                </div>
            </div>
            <div class="">
                <!-- Right aligned nav items -->
                 <Slide right>
                    <div v-if="isLogin" class="d-block">
                    
                       <b>User {{username}} </b><br />
                        <a v-if="userType == 'registerBusiness'" href="/add-business-voucher">Deine Gutscheine  hinterlgen</a><br />

                        <a v-if="userType == 'registerBusiness'" :href="`/company/${additionalId}/userId/${u_id}`">Mein Profil</a>
                        <a v-else href="/my-wallet">Mein Wallet</a>
                        <br />
                        <a v-if="userType == 'registerBusiness'" href="/verwaltung">Verwaltung</a><br />

                        <a @click="logUserOut" href="#">{{isLoginLabel}}</a><br />
                     
                    </div>
                    <div class="d-block">
                        <a class="highligting" v-if="userType !== 'registerBusiness'" href="/register-business">Partner werden</a><br />
                        <a class="highligting" href="/agb">AGB's</a><br />
                        <a class="highligting" href="/wir">Über uns</a><br />
                        <a class="highligting" href="/kontakt">Kontakt</a><br />
                    </div>
                 </Slide>
            </div>
    </div>

</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import { Slide } from 'vue-burger-menu';
export default {
    components: {Slide},
    data() {
        return { 
            isLoginLabel: '',
            isLogin: '',
            userType: '',
            username: '',
            u_id: '',
            additionalId: ''
        }
    },
    methods: {
        logUserOut() {
            localStorage.removeItem("jwt");
            this.$router.push("/");
            location.reload();
        },
        async checklogin () {
            let token = localStorage.getItem("jwt");
            let decoded = VueJwtDecode.decode(token);
            this.user = decoded;
            let checkUserId = this.user._id;
            try {
                let response = await this.$http.post("/user/getUserStatus", {checkUserId}, {headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    }},
                );
                    
                if (response.data.isActive === true) {
                    let decoded = VueJwtDecode.decode(token);
                    this.user = decoded;
                    this.isLogin = true;
                    this.username = this.user.name;
                    this.userType = this.user.usertype;
                    let u_id = this.user._id;
                    this.u_id = u_id;
                    this.isLoginLabel = "Logout";
                
                    try {
                        let response = await this.$http.post("/user/getAdditionalId", {u_id}, {headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json',
                            }},
                        );
                        console.log(response);
                        if (response) {
                            this.additionalId = response.data.o_additional[0].additionalId;
                        }
                    } catch (err) {
                        console.log(err);
                    }

                } else {
                    this.username = '';
                    this.isLoginLabel = "Login";
                    this.isLogin = false;
                }
            } catch (err) {
                console.log(err);
            }
   
        }
    },
    created() {
          this.checklogin();
    },
    watch: {
        $route () {
            this.checklogin();
        }
    }

};
</script>
