<template>
  <v-app-bar app class="teal lighten-3">
    <v-toolbar-title class="headline text-uppercase">
      <span>Pharmacist</span>
      <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn depressed @click="click" value="order" :color="btncolor">Order</v-btn>
      <v-btn depressed @click="click" value="notification" :color="btncolor1">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" text>User</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title :value="index" @click="logout">{{ item }}</v-list-item-title>
          <!-- {{ item }} -->
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      logged: localStorage.getItem("login"),
      items: ["ชื่อ-สกุล", "Logout"],
      btncolor: "teal lighten-3",
      btncolor1: "teal lighten-3",
      btncolor2: "teal lighten-3"
    };
  },
  methods: {
    logout: function() {
      localStorage.setItem("login", "false");
      console.log(localStorage.getItem("login"));
      this.$router.push("/");
    },

    viewallhosstaff: function(e) {
      console.log(e.currentTarget.value);
      if (e.currentTarget.value == "hosstaff") {
        this.btncolor = "teal lighten-1";
        this.btncolor1 = "teal lighten-3";
        this.btncolor2 = "teal lighten-3";
        console.log(this.btncolor);
      } else if (e.currentTarget.value == "phamacy") {
        this.btncolor = "teal lighten-3";
        this.btncolor1 = "teal lighten-1";
        this.btncolor2 = "teal lighten-3";
        console.log(this.btncolor);
      } else if (e.currentTarget.value == "phamacist") {
        this.btncolor = "teal lighten-3";
        this.btncolor1 = "teal lighten-3";
        this.btncolor2 = "teal lighten-1";
        console.log(this.btncolor);
      }
      this.$router.push("/hospitalstaff");
    },

    viewallphamacy: function(e) {
      console.log(e.currentTarget.value);
      if (e.currentTarget.value == "phamacy") {
        this.btncolor = "teal lighten-3";
        this.btncolor1 = "teal lighten-1";
        this.btncolor2 = "teal lighten-3";
        console.log(this.btncolor);
      } else if (e.currentTarget.value == "้hosstaff") {
        this.btncolor = "teal lighten-1";
        this.btncolor1 = "teal lighten-3";
        this.btncolor2 = "teal lighten-3";
        console.log(this.btncolor);
      } else if (e.currentTarget.value == "้phamacist") {
        this.btncolor = "teal lighten-3";
        this.btncolor1 = "teal lighten-3";
        this.btncolor2 = "teal lighten-1";
        console.log(this.btncolor);
      }
      this.$router.push("/phamacy");
    },

    viewallphamacist: function(e) {
      console.log(e.currentTarget.value);
      if (e.currentTarget.value == "phamacist") {
        this.btncolor = "teal lighten-3";
        this.btncolor1 = "teal lighten-3";
        this.btncolor2 = "teal lighten-1";
        console.log(this.btncolor);
      } else if (e.currentTarget.value == "hosstaff") {
        this.btncolor = "teal lighten-1";
        this.btncolor1 = "teal lighten-3";
        this.btncolor2 = "teal lighten-3";
        console.log(this.btncolor);
      } else if (e.currentTarget.value == "phamacy") {
        this.btncolor = "teal lighten-3";
        this.btncolor1 = "teal lighten-1";
        this.btncolor2 = "teal lighten-3";
        console.log(this.btncolor);
      }
      this.$router.push("/phamacist");
    }
  }
};
</script>