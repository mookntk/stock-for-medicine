<template>
    <v-app id="inspire" class="cyan lighten-4" >
     <div style="position:absolute;width:100%">
        <v-alert border="left" v-if="alert" type="error" > Incorrect username or password </v-alert> 
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
                <v-toolbar-title>Hospital</v-toolbar-title>
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
                    required
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
                    required
                    @click:append="showpass = !showpass"
                    @keyup.enter = "login"
                  >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="teal lighten-2 white--text" large block  @click="login" >Login</v-btn>
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
          password:"",
          type:"",
          data:"",
          alert: false,
          showpass: false
      }
    },
    mounted(){
      // console.log(localStorage.getItem(login))
      if(localStorage.getItem('login')==true){
        this.$router.push('/about')
      }
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
              this.alert = false
              localStorage.setItem('login', true)
              console.log(localStorage.getItem('login'))
              this.$router.push('/admin')
            }
            else{
              this.alert = true
            }}
        )
        },
        entertologin(e){

        }
   }
}
</script>