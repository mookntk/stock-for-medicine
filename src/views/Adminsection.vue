<template>
  <v-app class="admin cyan lighten-5">
    <Menuadmin />
    <v-content>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="3"
            sm="8"
            md="5"
            align="center"
            justify="center"
          >
          <h1 >ยินดีต้อนรับท่านเข้าสู่หน้าการจัดการเจ้าหน้าที่ :)</h1>
          </v-col>
        </v-row>
      <!-- <v-btn @click="logout">logout</v-btn> -->
    </v-content>
  </v-app>
</template>

<script>
// import ConnectDatabase from '../server/server'
import axios from "axios";
import Menuadmin from "../components/Menuadmin";
import Hospitalstaff from "../components/Hospitalstaff";
import Phamacy from "../components/Phamacy";
import Phamacist from "../components/Phamacist";
import Medicine from "../components/Medicine";
export default {
  data() {
    return {};
  },
  components: {
    Menuadmin,
    Hospitalstaff,
    Phamacy,
    Phamacist,
    Medicine
  }
  //   },
  //   methods: {
  //     logout: function() {
  //       localStorage.setItem("login", "false");
  //       console.log(localStorage.getItem("login"));
  //       this.$router.push("/");
  //     }
  //   }
};
</script>
