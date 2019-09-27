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
          <v-toolbar-title>Hospital Staff</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Add new hospitall staff</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.surname" label="Surname"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.username" label="username"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.password" label="password"></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>-->
                    <!-- </v-col> -->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
      { text: "Name", value: "name" },
      { text: "Surname", value: "surname" },
      { text: "username", value: "username", sortable: false },
      { text: "password", value: "password", sortable: false },
      // { text: "Carbs (g)", value: "carbs" },
      // { text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "action", sortable: false }
    ],
    hosstaff: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      surname: "",
      username: "",
      password: ""
    },
    defaultItem: {
      name: "",
      surname: "",
      username: "",
      password: ""
    }
  }),
  components: {
    Menuadmin
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Staff" : "Edit Staff";
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
          password: "1234"
        },
        {
          name: "น้ำทอง",
          surname: "วาสนา",
          username: "hos_staff02",
          password: "1235"
        },
        {
          name: "ญาณกวี",
          surname: "มหาศาล",
          username: "hos_staff03",
          password: "1236"
        },
        {
          name: "ธงปลิว",
          surname: "คงยิ่ง",
          username: "hos_staff04",
          password: "1237"
        },
        {
          name: "ยิ่งลักษณ์",
          surname: "ยิ่งชอบ",
          username: "hos_staff05",
          password: "1238"
        },
        {
          name: "สมศักดิ์",
          surname: "ทิวไทย",
          username: "hos_staff06",
          password: "1239"
        },
        {
          name: "มะลิลา",
          surname: "งามยอด",
          username: "hos_staff07",
          password: "1240"
        },
        {
          name: "งามยอด",
          surname: "บุญโต",
          username: "hos_staff08",
          password: "1241"
        },
        {
          name: "อำนาจ",
          surname: "บุญเจริญ",
          username: "hos_staff09",
          password: "1242"
        },
        {
          name: "ยุพาวรรณ",
          surname: "มานี",
          username: "hos_staff010",
          password: "1243"
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
      confirm("Are you sure you want to delete this item?") &&
        this.hosstaff.splice(index, 1);
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