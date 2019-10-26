<template>
  <v-app class="admin cyan lighten-5">
    <Menuadmin />
    <v-data-table
      :search="search"
      :headers="headers"
      :items="medicine"
      sort-by="generic"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>การจัดการข้อมูลยา</v-toolbar-title>
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
              <v-btn color="primary" dark class="mb-2" v-on="on">+ เพิ่มข้อมูลยา</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.TMT" label="รหัสยา (TMT)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.generic" label="ชื่อสามัญ"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.trade" label="ชื่อทางการค้า"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.strenght" label="ปริมาณยา (strenght)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.price" label="ราคาต่อหนึ่งปริมาณยา (price/strenght)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.unit" label="รูปแบบยา (unit)"></v-text-field>
                    </v-col>
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
      { text: "รหัสยา (TMT)", value: "TMT" },
      { text: "ชื่อสามัญ", value: "generic",align:"center" },
      { text: "ชื่อทางการค้า", value: "trade",align:"center" },
      { text: "ปริมาณยา (strenght)", value: "strenght",align:"center", sortable: false },
      { text: "ราคาต่อหนึ่งปริมาณยา (price/strenght)", value: "price",align:"center", sortable: false },
      { text: "รูปแบบยา (unit)", value: "unit",align:"center", sortable: false },
      
      { text: "แก้ไข / ลบ", value: "action",align:"center", sortable: false }
    ],
    medicine: [],
    editedIndex: -1,
    editedItem: {
      TMT: "",
      generic: "",
      trade: "",
      strenght: "",
      price:"",
      unit: ""
    },
    defaultItem: {
      TMT: "",
      generic: "",
      trade: "",
      strenght: "",
      price:"",
      unit: ""
    }
  }),
  components: {
    Menuadmin
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มข้อมูลยา" : "แก้ไขข้อมูลยา";
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
      this.medicine = [
        {
          TMT: "0000XXXX",
          generic: "AAA",
          trade: "AAA",
          strenght: "100",
          price:"250",
          unit: "Tablet"
        },
        {
          TMT: "0000YYYY",
          generic: "BBB",
          trade: "BBB",
          strenght: "200",
          price:"140",
          unit: "Tablet"
        },
        {
          TMT: "0000ZZZ",
          generic: "CCC",
          trade: "CCC",
          strenght: "300",
          price:"270",
          unit: "Tablet"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.medicine.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.medicine.indexOf(item);
      confirm("คุณแน่ใจหรือที่จะลบข้อมูลยานี้?") &&
        this.medicine.splice(index, 1);
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
        Object.assign(this.medicine[this.editedIndex], this.editedItem);
      } else {
        this.medicine.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>