<template>
    <v-app-bar app v-if="logged=='true'">
      <v-toolbar-title class="headline text-uppercase">
        <span>STOCK FOR MEDICINE</span>
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
</template>

<script>
export default {
    data(){
        return{
            logged : localStorage.getItem('login')
        }
    }
}
</script>