<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn @click="logout">logout</v-btn>
  </div>
</template>

<script>
// import ConnectDatabase from '../server/server'
import axios from 'axios'
  export default {
  data(){
      return{
      }
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