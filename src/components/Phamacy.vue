<template>
  <v-app class="admin cyan lighten-5">
    <Menuadmin />
    <v-data-table
      :search="search"
      :headers="headers"
      :items="phamacy"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>ร้านขายยา</v-toolbar-title>
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
              <v-btn color="primary" dark class="mb-2" v-on="on">เพิ่มร้านขายยา</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="ชื่อร้านขายยา"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.address" label="ที่อยู่"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.subdistrict" label="ตำบล/แขวง"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.district" label="อำเภอ/เขต"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.province" label="จังหวัด"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.telno" label="เบอร์ติดต่อ"></v-text-field>
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
        <v-icon small class="mr-5" @click="deleteItem(item)">mdi-delete</v-icon>
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
      { text: "ชื่อร้านขายยา", value: "name" },
      { text: "ที่อยู่", value: "address" },
      { text: "ตำบล / แขวง", value: "subdistrict" },
      { text: "อำเภอ/เขต", value: "district" },
      { text: "จังหวัด", value: "province" },
      { text: "เบอร์ติดต่อ", value: "telno", sortable: false  },
      { text: "แก้ไข / ลบ", value: "action", sortable: false }
    ],
    phamacy: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      address: "",
      subdistrict: "",
      distrcit: "",
      province: "",
      telno: ""
    },
    defaultItem: {
      name: "",
      address: "",
      subdistrict: "",
      distrcit: "",
      province: "",
      telno: ""
    }
  }),
  components: {
    Menuadmin
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มร้านขายยา" : "แก้ไขข้อมูลร้านขายยา";
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
      this.phamacy = [
        {
          name: "เอสอีซี.ฟาร์มาซี",
          address: "เลขที่ 123 ถนนจอมทอง ",
          subdistrict: "จอมทอง",
          district: "จอมทอง",
          province: "กรุงเทพ",
          telno: "02-49300121"
        },
        {
          name: "บัณฑิตเภสัช",
          address: "เลขที่ 200/1 หมู่5",
          subdistrict: "",
          district: "พุทธมณฑล",
          province: "นครปฐม",
          telno: "02-8002405"
        },
        {
          name: "รักษ์ยาเภสัช",
          address: "เลขที่ 135/175 หมู่5",
          subdistrict: "",
          district: "พุทธมณฑล",
          province: "นครปฐม",
          telno: "02-8003653"
        },
        {
          name: "บ้านเภสัชกร",
          address: "เลขที่ 136/10 หมู่ 6",
          subdistrict: "",
          district: "พุทธมณฑล",
          province: "นครปฐม",
          telno: "02-8893442"
        },
        {
          name: "ฟาสซิโน ตลาดศาลายา",
          address: "เลขที่ 13 นฐ.4006",
          subdistrict: "",
          district: "พุทธมณฑล",
          province: "นครปฐม",
          telno: "02-0248957"
        },
        {
          name: "บัณฑิตฟาม่า",
          address: "เลขที่ 889/6",
          subdistrict: "",
          district: "พุทธมณฑล",
          province: "นครปฐม",
          telno: "02-8893206"
        },
        {
          name: "มิตรประชาเมดิคัล",
          address: "เลขที่ 71/11 หมู่ที่ 5 ",
          subdistrict: "",
          district: "พุทธมณฑล",
          province: "นครปฐม",
          telno: "086-1054105"
        },
        {
          name: "ศาลายาเภสัช",
          address: "เลขที่ 66/12 หมู่ที่ 4 ",
          subdistrict: "",
          district: "พุทธมณฑล",
          province: "นครปฐม",
          telno: "02-8892038"
        },
        {
          name: "นิยมเภสัช",
          address: "ศูนย์อาหาร ซอยบ้านตั้งสิน",
          subdistrict: "",
          district: "พุทธมณฑล",
          province: "นครปฐม",
          telno: "087-4905988"
        },
        {
          name: "ศาลายาดรัก",
          address: "เลขที่ 97",
          subdistrict: "",
          district: "พุทธมณฑลสาย4",
          province: "นครปฐม",
          telno: "02-8141574"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.phamacy.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.phamacy.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.phamacy.splice(index, 1);
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
        Object.assign(this.phamacy[this.editedIndex], this.editedItem);
      } else {
        this.phamacy.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>