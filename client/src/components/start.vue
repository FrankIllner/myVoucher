<template>
    <div class="fullscreen-image">
        <div class="container">
            <div class="row">
                <div class="block col-12 col-md-6 mt-5">
                    <h3>Hallo, hier steht eine Erklärung - wer wir sind und was wir machen! </h3>
                    <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna 
                        aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea 
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, </span>
                
                </div>
                
                <div class="block col-12 col-md-6 mt-5">
                    <h3>Hier kurze Erklärung zum Partner Status - bieten Sie Gutscheine hier an und profitieren Sie!!</h3>
                    <span>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna 
                    </span>
                </div>
                <div class="col-12 mt-5">
                    <div class="button center" v-if="this.$userType !== 'registerBusiness'">
                        <router-link to="/register-business">Partner werden</router-link>
                    </div>
                </div>
                <div class="col-12">
                    <div v-if="isLogin">  
                        <Login />
                    </div>
                </div>
            </div>
        
        </div>
    </div>
</template>


<script>
import Login from "@/components/auth/Login";
export default {
    components: {
        Login
    },
    data() {
        return { 
            isLogin: !this.$isLogin
        }
    }
};
</script>

<style lang="scss">
    .fullscreen-image {
   

        .block {
            background-color: azure;
            padding: 10px;
         
        }

    }
    .login-container {
        form {
            border-radius: 10px;
            background-color: azure;
        }
    }
    .button {
        text-align: center;
        display: flex;
        justify-content: center;
    }
    .button a {
        background-color: cadetblue;
        padding: 20px;
        border: 1px solid brown;
        color: black;
        border-radius: 10px;
        text-align: center;
        width: 50%;
        text-decoration: none;
        font-size: 20px;
    }
</style>