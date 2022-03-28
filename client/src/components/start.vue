<template>
    <div>
        <h3>Hallo, hier steht eine Erklärung - wer wir sind und was wir machen! </h3>
        <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna 
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea 
            takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, </span>
        <Login />

        <h3>Hier kurze Erklärung zum Partner Status - bieten Sie Gutscheine hier an und profitieren Sie!!</h3>
        <span>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna 
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea 
            takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        </span>

        <div class="button center">
           <router-link to="/register-business">Partner werden</router-link>
        </div>

    </div>
</template>


<script>
import Login from "@/components/auth/login";
export default {
  components: {
    Login
  }
};
</script>

<style scoped>
    .button {
        text-align: center;
        display: flex;
        justify-content: center;
    }
    .button a {
        background-color: violet;
        padding: 20px;
        border: 1px solid brown;
        color: aliceblue;
        border-radius: 10px;
        text-align: center;
        width: 50%;
        text-decoration: none;
        font-size: 20px;
    }
</style>