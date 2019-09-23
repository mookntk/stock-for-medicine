<template>
    <v-app id="inspire" class="cyan lighten-4" >
     <div style="position:absolute;width:100%">
        <v-alert border="left" v-if="loader" type="error" > Incorrect username or password </v-alert> 
     </div>
    <v-content >
      <v-container 
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12" width="400px" height="300px">
              <v-toolbar
                class = "teal lighten-2"
                dark
                flat
              >
                <v-toolbar-title>Stock For Medicine</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model = "username"
                  >
                  </v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    :type="showpass?'text':'password'"
                    :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="password"
                    @click:append="showpass = !showpass"
                  >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="teal lighten-2 white--text" large block  :loading="loader" @click="login" >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
// import ConnectDatabase from '../server/server'
import axios from 'axios'
  export default {
  data(){
      return{
          username:"hos_staff",
          password:"1234",
          type:"",
          data:"",
          loader: false,
          showpass: false
      }
    },
    mounted(){
        // axios.post("http://localhost:3000/user/"+"hos_staff")
        // .then(res => {
        //     this.data=res.data
        //     console.log(this.data)}
        
        // )
        // this.allRecords();
        // ConnectDatabase(con);
        
    },
    methods: {
        hidepass:function(){
          this.hidepassword = this.hidepassword === "password" ? "text" : "password"
        },
        login:function(){
            axios.post("http://localhost:3000/user/hos_staff")
        .then(res => {
            this.data=res.data
            console.log(this.data)
            if(this.data[0].password==this.password){
              this.$router.push('/about')
            }
            else{
              this.loader = true
            }}

        )
        //     var size = 0;
        // for (var key in this.data) {
        //         if (this.data.hasOwnProperty(key)) size++;
        //     }
        // console.log(this.data[0])
        
        }
   }
}

</script>

<style scope>
.login-container{
    margin-top: 5%;
    margin-bottom: 5%;
}
.login-form-1{
    padding: 5%;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-1 h3{
    text-align: center;
    color: #333;
}
.login-form-2{
    padding: 5%;
    background: #0062cc;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3{
    text-align: center;
    color: #fff;
}
.login-container form{
    padding: 10%;
}
.btnSubmit
{
    width: 50%;
    border-radius: 1rem;
    padding: 1.5%;
    border: none;
    cursor: pointer;
}
.login-form-1 .btnSubmit{
    font-weight: 600;
    color: #fff;
    background-color: #0062cc;
}
.login-form-2 .btnSubmit{
    font-weight: 600;
    color: #0062cc;
    background-color: #fff;
}
.login-form-2 .ForgetPwd{
    color: #fff;
    font-weight: 600;
    text-decoration: none;
}
.login-form-1 .ForgetPwd{
    color: #0062cc;
    font-weight: 600;
    text-decoration: none;
}

</style>