<template>
    <div class="container">
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand class="logo" href="/"><img src="../../../assets/img/logo.png"></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          {{this.isLogin}}
          {{this.$userType}}
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav v-if="isLogin && userType !== 'registerBusiness'">
                    <b-nav-item href="/my-wallet">Alle Angebote/Wallet</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item class="highligting" v-if="userType !== 'registerBusiness'" href="/register-business">Partner werden</b-nav-item>
                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <div v-if="isLogin">
                        <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <b>User {{username}} </b>
                        </template>
                        <b-dropdown-item v-if="userType == 'registerBusiness'" href="/add-business-voucher">Busniness Partner! Dein Gutschein hier hinterlgen</b-dropdown-item>
                        <b-dropdown-item v-else href="/add-user-voucher">Deinen Gutschein hinterlgen</b-dropdown-item>

                        <b-dropdown-item :href="`/company/${additionalId}/userId/${u_id}`">Mein Profil</b-dropdown-item>

                        <b-dropdown-item v-if="userType == 'registerBusiness'" href="/verwaltung">Verwaltung</b-dropdown-item>

                        <b-dropdown-item @click="logUserOut" href="#">{{isLoginLabel}}</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </div>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>

</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
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
   
            if (this.$isLogin || token) {
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

<style lang="scss">
    nav .logo img {
        height: 100px;
        width: auto;
    }
    #nav-collapse .navbar-nav .nav-item a  {
        color: aliceblue; 
        span {
            color: aliceblue;
        }
    }
    #nav-collapse {
        .highligting {
            padding: 0px;
            border-radius: 10px;
            background-color: cadetblue;
        }
    }
     #nav-collapse {
        .dropdown-menu {
            background-color: lightseagreen;
            .dropdown-item:hover {
                &:hover {
                    background-color: lightblue;
                }
            }
        }
     }
</style>
