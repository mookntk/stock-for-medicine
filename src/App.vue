<template>
  <v-app>
    <v-app-bar app v-if="logged=='true'">
      <v-toolbar-title  v-if="logged" class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content >
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Login from './components/Login'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Login
  },
  data(){
    return {
      logged : localStorage.getItem('login')
    }
  },
  mounted(){
    console.log("logged "+this.logged)
  }
};
</script>
