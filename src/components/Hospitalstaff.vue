<template>
  <v-app class="admin cyan lighten-5">
    <Menuadmin />
    <v-data-table
      :search="search"
      :headers="headers"
      :items="hosstaff"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>เภสัชกรโรงพยาบาล</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">+ เพิ่มเภสัชกรของโรงพยาบาล</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="ชื่อ"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.surname" label="นามสกุล"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.username" label="ชื่อผู้ใช้"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" label="email"></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>-->
                    <!-- </v-col> -->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close">ยกเลิก</v-btn>
                <v-btn color="blue darken-1" text @click="save">เสร็จสิ้น</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-6" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small class="mr-6" @click="deleteItem(item)">mdi-delete</v-icon>
        <v-icon small @click="forgetpw(item)">mdi-email-send</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import Menuadmin from "../components/Menuadmin";
export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      { text: "ชื่อ", value: "name" },
      { text: "นามสกุล", value: "surname" },
      { text: "username", value: "username"},
      { text: "อีเมล",value: "email"},
      // { text: "password", value: "password", sortable: false },
      { text: "แก้ไข / ลบ / ส่งรหัสผ่านใหม่ให้ผู้ใช้", value: "action", sortable: false }
    ],
    hosstaff: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      surname: "",
      username: "",
      email: ""
    },
    defaultItem: {
      name: "",
      surname: "",
      username: "",
      email: ""
    }
  }),
  components: {
    Menuadmin
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มเภสัชกรของโรงพยาบาล" : "แก้ไขข้อมูลเภสัชกรของโรงพยาบาล";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.hosstaff = [
        {
          name: "บุญมณี",
          surname: "พิไลลักษณ์",
          username: "hos_staff01",
          email: "x01@hotmal.com"
          // password: "1234"
        },
        {
          name: "น้ำทอง",
          surname: "วาสนา",
          username: "hos_staff02",
          email: "xx02@hotmal.com"
          // password: "1235"
        },
        {
          name: "ญาณกวี",
          surname: "มหาศาล",
          username: "hos_staff03",
          email: "xxx03@hotmal.com"
          // password: "1236"
        },
        {
          name: "ธงปลิว",
          surname: "คงยิ่ง",
          username: "hos_staff04",
          email: "xxx04@hotmal.com"
          // password: "1237"
        },
        {
          name: "ยิ่งลักษณ์",
          surname: "ยิ่งชอบ",
          username: "hos_staff05",
          email: "xxx05@hotmal.com"
          // password: "1238"
        },
        {
          name: "สมศักดิ์",
          surname: "ทิวไทย",
          username: "hos_staff06",
          email: "xxx06@hotmal.com"
          // password: "1239"
        },
        {
          name: "มะลิลา",
          surname: "งามยอด",
          username: "hos_staff07",
          email: "xxx07@hotmal.com"
          // password: "1240"
        },
        {
          name: "งามยอด",
          surname: "บุญโต",
          username: "hos_staff08",
          email: "xxx08@hotmal.com"
          // password: "1241"
        },
        {
          name: "อำนาจ",
          surname: "บุญเจริญ",
          username: "hos_staff09",
          email: "xxx09@hotmal.com"
          // password: "1242"
        },
        {
          name: "ยุพาวรรณ",
          surname: "มานี",
          username: "hos_staff010",
          email: "xxx10@hotmal.com"
          // password: "1243"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.hosstaff.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.hosstaff.indexOf(item);
      confirm("คุณแน่ใจหรือที่จะลบเจ้าหน้าที่เภสัชกรคนนี้?") &&
        this.hosstaff.splice(index, 1);
    },

    forgetpw(item) {
      const index = this.hosstaff.indexOf(item);
      confirm("คุณแน่ใจหรือที่จะส่งรหัสผ่านใหม่ให้ผู้ใช้คนนี้?");
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.hosstaff[this.editedIndex], this.editedItem);
      } else {
        this.hosstaff.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>