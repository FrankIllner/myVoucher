<template>
    <div class="container">
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand class="logo" href="/"><img src="../../../assets/img/logo.png"></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="/my-wallet">Dein Wallet</b-nav-item>
                </b-navbar-nav>

            <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item class="highligting" href="/register-business">Partner werden</b-nav-item>
                    <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <b>User</b>
                    </template>
                    <b-dropdown-item href="/add-business-voucher">Busniness Partner! Dein Gutschein hier hinterlgen</b-dropdown-item>
                    <b-dropdown-item href="/add-user-voucher">Normaler User! Dein Gutschein hier hinterlgen</b-dropdown-item>

                    <b-dropdown-item href="/profile">Dein Profile</b-dropdown-item>
                    <b-dropdown-item href="/verwaltung">Verwaltung</b-dropdown-item>

                    <b-dropdown-item @click="logUserOut" href="#">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>

</template>

<script>
export default {

  methods: {
   logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
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
            border: 1px solid red;
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
