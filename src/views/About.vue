<template>
  <v-app class="about">
    <Menubar/>
    <v-content>
    <h1>This is an about page</h1>
    <v-btn @click="logout">logout</v-btn>
    </v-content>
  </v-app>
</template>

<script>
// import ConnectDatabase from '../server/server'
import axios from 'axios'
import Menubar from '../components/Menubar'
  export default {
  data(){
      return{
      }
      
    },
    components: {
    Menubar
  },
    methods: {
        logout:function(){
            localStorage.setItem('login','false')
            console.log(localStorage.getItem('login'))
            this.$router.push('/')
        }
   }
}
</script>
