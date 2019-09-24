<template>
  <v-app class="admin">
    <Menuadmin />
    <v-content>
      <h1>Welcome to Staff Management Page!</h1>
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
export default {
  data() {
    return {};
  },
  components: {
    Menuadmin,
    Hospitalstaff,
    Phamacy,
    Phamacist
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
