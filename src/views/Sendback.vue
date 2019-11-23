<template>
  <v-app class="admin about cyan lighten-5">
    <Menubar />
    <v-content style="margin:0px 100px 10px 0px">
      <v-dialog
        v-model="dialog_sendback"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog_sendback = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>ออร์เดอร์ที่ {{order[index].HN}}</v-toolbar-title>
          </v-toolbar>

          <v-card-title>
            <span class="headline"></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="order[index].name"
                    label="ชื่อ-นามสกุลผู้ป่วย"
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field :value="order[index].gender" label="เพศ" filled readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field :value="order[index].age" label="อายุ" filled readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field :value="order[index].dob" label="วัน/เดือน/ปีเกิด" filled readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-select :items="note" label="หมายเหตุ" outlined></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">ยาที่ต้องได้รับ</v-col>
                <v-col cols="12">
                  <!-- <p>{{ selected }}</p> -->
                  <v-checkbox
                    v-model="selected"
                    color="success"
                    label="Enalapril maleate 20 mg จำนวน 90 เม็ด"
                    value="med1"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="selected"
                    color="success"
                    label="Metformin 500 mg จำนวน 90 เม็ด"
                    value="med2"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn rounded color="success" dark @click="successItem(item)">ส่งยาคืนโรงพยาบาล</v-btn>

            <v-btn rounded color="warning" dark @click="dialog_sendback = false">ยกเลิก</v-btn>
          </v-card-actions>
          <!-- table in pop-up page for see each of order detial -->
        </v-card>
      </v-dialog>
      <v-layout>
        <v-flex d-flex xs12 sm6 md4>
          <v-layout column align-end justify-start>
            <v-btn
              width="200px"
              class="blue-grey lighten-3"
              value="ยกเลิก"
              @click="sortdata"
            >ออร์เดอร์ที่ถูกยกเลิก</v-btn>
            <v-btn
              width="200px"
              class="yellow lighten-1"
              value="กำลังขนส่งยาคืน"
              @click="sortdata"
            >ออร์เดอร์ที่กำลังส่งกลับ</v-btn>
          </v-layout>
        </v-flex>
        <v-flex class="pr-4">
          <v-card class="red" height="100%" width="1080px">
            <v-data-table
              :headers="headers"
              :items="searchbystatus"
              :search="search"
              sort-by="status"
              class="elevation-1"
            >
              <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
              </template>
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="ค้นหา"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-toolbar>
              </template>
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="item in items" :key="item.HN">
                    <td style="text-align:center">{{ item.HN }}</td>
                    <td style="text-align:left">{{ item.name }}</td>
                    <td style="text-align:left">{{ item.surname }}</td>
                    <td style="text-align:left">{{ item.duedate }}</td>
                    <td style="text-align:left">
                      <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
                    </td>
                    <td style="text-align:left">
                      <v-btn
                        color="primary"
                        v-if="item.status=='ยกเลิก'"
                        @click="dialog_sendback=true"
                      >ส่งกลับ</v-btn>
                    </td>
                  </tr>
                </tbody>
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
    for (var i = 0; i < this.order.length; i++) {
      this.searchbystatus.push(this.order[i]);
    }

    // this.date_now = today.getDate()+"/"+today.getMonth()+"/"+today.getYear()
  },
  data: () => ({
    note: ["ผู้ป่วยไม่มารับ", "ตัวยามีปัญหา"],
    date_now: "",
    search: "",
    dialog: false,
    headers: [
      {
        text: "HN",
        align: "left",
        value: "HN"
      },
      { text: "ชื่อ", value: "name" },
      { text: "นามสกุล", value: "surname" },
      { text: "วันที่ต้องมารับยา", value: "duedate" },
      { text: "สถานะ", value: "status" },
      { text: "ส่งกลับ", value: "status" }

      // ,
      // { text: "Actions", value: "action", sortable: false }
    ],
    dialog_sendback: false,
    order: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      status: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      status: 0
    },
    click: false,
    dialog: false,
    dialog_row: false,
    dialog_record: false,
    selected: [],
    index: 0,
    searchbystatus: []
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
      this.searchbystatus = [];
      var selectstatus = e.currentTarget.value;
      for (var i = 0; i < this.order.length; i++) {
        if (this.order[i].status == selectstatus) {
          this.searchbystatus.push(this.order[i]);
        }
      }
      console.log(this.searchbystatus);
    },
    getColor(status) {
      if (status == "ยกเลิก") return "red";
      else if (status == "กำลังขนส่งยาคืน") return "orange";
      else if (status == "prepare") return "light gray";
      else return "green";
    },
    sendback(item) {},
    initialize() {
      this.order = [
        {
          HN: "0041523",
          name: "ณัชชา",
          surname: "ยินดี",
          age: 40,
          gender: "หญิง",
          dob: "9 สิงหาคม 2522",
          email: "natcha_yindee@hotmail.com",
          phone: "0851477526",
          pharmacy: "บ้านเภสัชกร",
          duedate: "11/10/2562",
          status: "ยกเลิก",
          orderid: "0041523011",
          weight: "",
          height: "",
          blood: ""
        },

        {
          HN: "0048543",
          name: "วรพรรณ",
          surname: "พุ่มประทุม",
          age: 32,
          gender: "หญิง",
          dob: "8 สิงหาคม 2530",
          email: "worrapan@gmail.com",
          phone: "0864588223",
          pharmacy: "ลิขิตฟาร์มาซี",
          duedate: "11/10/2562",
          status: "ยกเลิก",
          orderid: "0048543010",
          weight: "",
          height: "",
          blood: ""
        },
        {
          HN: "0521483",
          name: "ณัฐวุฒิ",
          surname: "ตันเสวกวงษ์",
          age: 41,
          gender: "ชาย",
          dob: "20 กุมภาพันธ์ 2521",
          email: "nattawut.t@gmail.com",
          phone: "0857773239",
          pharmacy: "บ้านเภสัชกร",
          duedate: "15/10/2562",
          status: "กำลังขนส่งยาคืน",
          orderid: "0521483098",
          weight: "",
          height: "",
          blood: ""
        },
        {
          HN: "1178403",
          name: "รัศมี",
          surname: "วิภพพา",
          age: 67,
          gender: "หญิง",
          dob: "7 กรกฎาคม 2495",
          email: "ratsamee@hotmail.com",
          phone: "0834436654",
          pharmacy: "เวิลด์ ฟาร์มาซี",
          duedate: "17/11/2562",
          status: "กำลังขนส่งยาคืน",
          orderid: "1178403027",
          weight: "",
          height: "",
          blood: ""
        }
      ];
    },
    selectItem(item) {
      this.index = this.order.indexOf(item);
      dialog_sendback = true;
    },
    successItem(item) {
      this.order[this.index].status = "กำลังขนส่งยาคืน";

      this.dialog_sendback = false;
      this.sortdata();
    },
    showItem(item) {
      this.editedIndex = this.order.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    editItem(item) {
      this.editedIndex = this.order.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.order.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.order.splice(index, 1);
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
        Object.assign(this.order[this.editedIndex], this.editedItem);
      } else {
        this.order.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Sarabun&display=swap");
.admin {
  font-family: "Sarabun", sans-serif;
}
thead {
  background-color: antiquewhite;
}
</style>