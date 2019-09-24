<template>
    <v-app-bar app v-if="logged=='true'">
      <v-toolbar-title class="headline text-uppercase ">
        <span>STOCK FOR MEDICINE</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="click" value="order">Order</v-btn>
        <v-btn text @click="click" value="notification">
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
            active: [false,false]
        }
    },
    methods: {
        logout:function(e){
            console.log(e.currentTarget)
            // console.log(localStorage.getItem('login'))
            // this.$router.push('/')
        },
        click:function(e){
          console.log(e.currentTarget.value)
          if(e.currentTarget.value == "notification"){
            this.active[1] = true
            this.active[0] = false
            console.log(this.active)
          }
          else{
            this.active[0] = true
            this.active[1] = false
            console.log(this.active)
          }
        }
   }
}
</script>