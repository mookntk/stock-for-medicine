<template>
  <v-app>
    <v-content >
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      logged : localStorage.getItem('login')
    }
  },
  mounted(){
    this.logged = localStorage.getItem('login')
    console.log("logged "+this.logged)
  }
};
</script>
