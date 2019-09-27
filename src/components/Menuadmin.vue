<template>
  <v-app-bar app v-if="logged=='true'" class="teal lighten-3">
    <v-toolbar-title class="headline text-uppercase">
      <span>Staff Management</span>
    </v-toolbar-title>
    <div class="flex-grow-1"></div>

    <v-toolbar-items>
      <v-btn depressed @click="viewallhosstaff" value="hosstaff" :color="btncolor">Hospital staff</v-btn>
      <v-btn depressed @click="viewallphamacy" value="phamacy" :color="btncolor1">Phamacy</v-btn>
      <v-btn depressed @click="viewallphamacist" value="phamacist" :color="btncolor2">Phamacist</v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on" text>User</v-btn>
          <!-- ต้องเปลี่ยนคำว่า User ให้ขึ้นเป็น username ของUserปัจจุบันที่ใช้งานอยู่ ณ ตอนนั้น -->
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item :value="index" @click="logout($event)">{{ item }}</v-list-item>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
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
      } else if (e.currentTarget.value == "hosstaff")  {
        this.btncolor = "teal lighten-1";
        this.btncolor1 = "teal lighten-3";
        this.btncolor2 = "teal lighten-3";
        console.log(this.btncolor);
      } else if (e.currentTarget.value == "phamacy")  {
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