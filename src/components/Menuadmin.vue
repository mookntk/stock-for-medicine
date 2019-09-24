<template>
  <v-app-bar app v-if="logged=='true'">
    <v-toolbar-title class="headline text-uppercase">
      <span>Staff Management</span>
    </v-toolbar-title>
    <div class="flex-grow-1"></div>

    <v-toolbar-items>
      <v-btn text @click="viewallhosstaff">Hospital staff</v-btn>
      <v-btn text @click="viewallphamacy">Phamacy</v-btn>
      <v-btn text @click="viewallphamacist">Phamacist</v-btn>

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
      items: ["ชื่อ-สกุล", "Logout"]
    };
  },
  methods: {
    logout: function() {
      localStorage.setItem("login", "false");
      console.log(localStorage.getItem("login"));
      this.$router.push("/");
    },
    viewallhosstaff: function(){
        this.$router.push('/hospitalstaff')
    },
    viewallphamacy: function(){
        this.$router.push('/phamacy')
    },
    viewallphamacist: function(){
        this.$router.push('/phamacist')
    }
    }
  
};
</script>