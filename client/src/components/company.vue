<template>
    <div class="container-main">
      <div class="container">
        <div class="aboutus">
        <h1 class="mt-5">Mein Unternhemen: {{compnayData.company}}</h1>
        <div class="mt-3">{{compnayData.aboutus}}</div>
        </div>
        <div class="row mt-5">
          <div class="col-xs-12 col-md-6">
             {{compnayData.street}} {{compnayData.streetNo}} <br />
             {{compnayData.postcode}}  {{compnayData.city}} <br />
          </div>
          <div class="col-xs-12 col-md-6">
            {{compnayData.businessNo}} <br />
            {{compnayData.opening}} <br />
            {{compnayData.phone}}
          </div>
        </div>
        <div class="row mt-3">
          <h2>Meine Gutscheine</h2>
        </div>
      </div>
    </div>
</template>

<script>

export default {

  name: "Company",
  data() {
    return {
      param: "",
      compnayData: ""
    };
  },
  async mounted() {
    let token = localStorage.getItem("jwt");
    this.param = this.$route.params;
    let additionalId = {additionalId: this.param.id};
    let responseCompany = await this.$http.post("/user/findCompany", additionalId, {headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      }},
    );
    if (responseCompany) {
      this.compnayData = responseCompany.data.dataCompany[0];
    }
  }

}
</script>
