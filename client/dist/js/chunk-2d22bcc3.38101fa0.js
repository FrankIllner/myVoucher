(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22bcc3"],{f102:function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"container"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-6 offset-lg-3 col-sm-10 offset-sm-1"},["register"==this.register.usertype?t("h3",[e._v(e._s(this.register.infoCustomer))]):t("h3",[e._v(e._s(this.register.infoBusiness))]),t("form",{staticClass:"text-center border border-primary p-5",staticStyle:{"margin-top":"70px",height:"auto","padding-top":"100px !important"},on:{submit:function(r){return r.preventDefault(),e.registerUser.apply(null,arguments)}}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.register.name,expression:"register.name"}],staticClass:"form-control mb-5",attrs:{type:"text",id:"name",placeholder:"Name",required:""},domProps:{value:e.register.name},on:{input:function(r){r.target.composing||e.$set(e.register,"name",r.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:e.register.email,expression:"register.email"}],staticClass:"form-control mb-5",attrs:{type:"email",id:"email",placeholder:"E-Mail",required:""},domProps:{value:e.register.email},on:{input:function(r){r.target.composing||e.$set(e.register,"email",r.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:e.register.password,expression:"register.password"}],staticClass:"form-control mb-5",attrs:{type:"password",id:"password",placeholder:"Password"},domProps:{value:e.register.password},on:{input:function(r){r.target.composing||e.$set(e.register,"password",r.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:e.register.usertype,expression:"register.usertype"}],staticClass:"form-control mb-5",attrs:{type:"text",id:"usertype",required:""},domProps:{value:e.register.usertype},on:{input:function(r){r.target.composing||e.$set(e.register,"usertype",r.target.value)}}}),t("p",[t("center",[t("button",{staticClass:"btn btn-primary btn-block w-75 my-4",attrs:{type:"submit"}},[e._v(" Sign in ")])])],1),t("div",[t("p",[e._v("Bist du schon regisrtiert? Wenn ja, dann Log Dich ein!")]),t("router-link",{attrs:{to:"/"}},[e._v("Klicke hier!")])],1)])])])])},i=[],a=t("1940"),o=t.n(a),n={data(){return{register:{name:"",email:"",password:"",usertype:this.$route.name,infoCustomer:"Melde Dich an und speichere Deine ganzen Papier Gutscheine in die App! ",infoBusiness:"Werde Partner bei uns und verdiene mit den Verkauf...."}}},methods:{async registerUser(){try{let e=await this.$http.post("user/register",this.register),r=e.data.token;r?(localStorage.setItem("jwt",r),this.$router.push("/"),o()("Success","Registration Was successful","success")):o()("Error","Something Went Wrong","Error")}catch(e){let r=e.response;console.log(r),o()("Error",r.data.message,"error"),409==r.status?o()("Error",r.data.message,"error"):o()("Error",r.data.err.message,"error")}}},props:{user:{type:String,required:!1}}},l=n,u=t("2877"),p=Object(u["a"])(l,s,i,!1,null,null,null);r["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d22bcc3.38101fa0.js.map