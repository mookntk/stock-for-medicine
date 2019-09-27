<template>
    <v-app-bar app v-if="logged=='true'" class="teal lighten-3">
      <v-toolbar-title class="headline text-uppercase ">
        <span>Pharmacist</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn depressed @click="click" value="order" :color="btncolor[0]">Order</v-btn>
        <v-btn depressed @click="click" value="notification" :color="btncolor[1]">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on" 
          text
        >
          User
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title :value="index" @click="logout">{{ item }}</v-list-item-title>
          <!-- {{ item }} -->
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>
</template>

<script>
export default {
    data(){
        return{
            logged : localStorage.getItem('login'),
            items: ['ph_staff','เลขใบอนุญาต','Logout'],
            active: [false,false],
            btncolor: ["teal lighten-3","teal lighten-3"]
        }
    },
    methods: {
        logout:function(e){
            console.log(e.currentTarget)
            // console.log(localStorage.getItem('login'))
            this.$router.push('/')
        },
        click:function(e){
          console.log(e.currentTarget.value)
          if(e.currentTarget.value == "notification"){
            this.btncolor[1] = "teal lighten-1"
            this.btncolor[0] = "teal lighten-3"
            console.log(this.btncolor)
          }
          else{
            this.btncolor[0] = "teal lighten-1"
            this.btncolor[1] = "teal lighten-3"
            console.log(this.btncolor)
          }
        }
   }
}
</script>