<template>
  <v-app class="about cyan lighten-5">
    <Menubar />
    <v-content>
      <v-layout>
        <v-flex d-flex xs12 sm6 md4>
          <v-layout column align-end justify-start>
            <v-btn width="200px" class="blue-grey lighten-3" value="all" @click="sortdata">ALL</v-btn>
            <v-btn width="200px" class="green lighten-1" value="success" @click="sortdata">SUCCESS</v-btn>
            <v-btn width="200px" class="orange lighten-1" value="ongoing" @click="sortdata">ONGOING</v-btn>
            <v-btn width="200px" class="red lighten-1" value="cancel" @click="sortdata">CANCEL</v-btn>
          </v-layout>
        </v-flex>
        <v-flex class="pr-4">
          <v-card class="red" height="100%" width="1350px">
            <v-data-table
              :headers="headers"
              :items="desserts"
              :search="search"
              sort-by="calories"
              class="elevation-1"
            >
              <template v-slot:item.carbs="{ item }">
                <v-chip :color="getColor(item.carbs)" dark>{{ item.carbs }}</v-chip>
              </template>
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Today</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <div class="flex-grow-1"></div>
                  <div class="flex-grow-1"></div>
                  <!-- <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
                  ></v-text-field>-->
                  <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                            </v-col>
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
              <template>
                <v-dialog v-model="dialogdetail" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">OrderDetails</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                          </v-col>
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
              </template>

              <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="showItem(item)">mdi-pencil</v-icon>
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
// import ConnectDatabase from '../server/server'

import Menubar from "../components/Menubar_phar";
export default {
  components: {
    Menubar
  },
  mounted() {
    var today = new Date();
    this.date_now = today;
    // this.date_now = today.getDate()+"/"+today.getMonth()+"/"+today.getYear()
  },
  data: () => ({
    date_now: "",
    search: "",
    dialog: false,
    headers: [
      {
        text: "HN",
        align: "left",
        value: "name"
      },
      { text: "Name", value: "calories" },
      { text: "Surname", value: "fat" },
      { text: "Due date", value: "fat" },
      { text: "Status", value: "carbs" },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogdetail(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    dialog: function(e) {
      alert(e.currentTarget);
    },
    dialogdetail: function(e) {
      alert(e.currentTarget);
    },
    logout: function() {
      localStorage.setItem("login", "false");
      console.log(localStorage.getItem("login"));
      this.$router.push("/");
    },
    sortdata: function(e) {
      console.log(e.currentTarget.value);
      if (e.currentTarget.value == "all") {
        this.search = "";
      } else if (e.currentTarget.value == "success") {
        this.search = "success";
      } else if (e.currentTarget.value == "ongoing") {
        this.search = "ongoing";
      } else if (e.currentTarget.value == "cancel") {
        this.search = "cancel";
      }
    },
    getColor(status) {
      if (status == "cancel") return "red";
      else if (status == "ongoing") return "orange";
      else return "green";
    },
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: "success"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: "ongoing"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: "success"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: "success"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: "ongoing"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: "ongoing"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: "cancel"
        }
      ];
    },

    showItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
