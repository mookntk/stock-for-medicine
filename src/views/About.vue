<template>
  <v-app class="about cyan lighten-5">
    <Menubar/>
    <v-content>
      {{date_now}}
    <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="calories"
    class="elevation-1 "
  >
    <template v-slot:item.carbs="{ item }">
      <v-chip :color="getColor(item.carbs)" dark>{{ item.carbs }}</v-chip>
    </template>
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Today</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <div class="flex-grow-1 "></div>
        <div class="flex-grow-1"></div>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
    <!-- <v-btn @click="logout">logout</v-btn> -->
    </v-content>
  </v-app>
</template>

<script>
// import ConnectDatabase from '../server/server'
import axios from 'axios'
import Menubar from '../components/Menubar_phar'
export default {

    components: {
    Menubar
  },
  mounted(){
    var today = new Date();
    this.date_now = today
    // this.date_now = today.getDate()+"/"+today.getMonth()+"/"+today.getYear()
  },
  data: () => ({
      date_now:'',
      search:'',
      dialog: false,
      headers: [
        {
          text: 'HN',
          align: 'left',
          value: 'name',
        },
        { text: 'Name', value: 'calories' },
        { text: 'Due date', value: 'fat' },
        { text: 'Status', value: 'carbs' },
        // { text: 'Actions', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      dialog:function(e){
        alert(e.currentTarget)
      },
      logout:function(){
        localStorage.setItem('login','false')
        console.log(localStorage.getItem('login'))
        this.$router.push('/')
    },
    getColor (status) {
        if (status == "cancel") return 'red'
        else if (status == "ongoing") return 'orange'
        else return 'green'
      },
      initialize () {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: "success",
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: "ongoing",
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: "success",
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: "success",
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: "ongoing",
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: "ongoing",
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: "cancel",
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
}
</script>
