<template>
  <v-app class="about cyan lighten-5">
    <Menubar />
    <v-content style="margin:0px 100px 10px 0px">
      <v-dialog v-model="dialog_row" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <!-- tool-bar -->
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog_row = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>ออร์เดอร์ที่ {{order.orderid}}</v-toolbar-title>
            <!-- <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="successItem(item)">ผู้ป่วยรับยาเรียบร้อย</v-btn>
            </v-toolbar-items>-->
          </v-toolbar>
          <!-- tool-bar -->

          <v-card-title>
            <span class="headline"></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field :value="order.name" label="ชื่อ-นามสกุลผู้ป่วย" filled readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field :value="order.gender" label="เพศ" filled readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field :value="order.age" label="อายุ" filled readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field :value="order.dob" label="วัน/เดือน/ปีเกิด" filled readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="6">
                  <v-text-field :value="order.status" label="สถานะ" filled readonly></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">กรอกข้อมูลผู้ป่วย</v-col>
                <v-col>
                  <v-text-field cols="12" label="น้ำหนัก" filled clearable></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field cols="12" label="ส่วนสูง" filled clearable></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field cols="12" label="ความดัน" filled clearable></v-text-field>
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
            <v-btn
              rounded
              color="success"
              dark
              text
              @click="successItem(item)"
            >ผู้ป่วยรับยาเรียบร้อย</v-btn>

            <v-btn rounded color="warning" dark text @click="dialog_row = false">ยกเลิก</v-btn>
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
              value="all"
              @click="sortdata"
            >ออร์เดอร์ทั้งหมด</v-btn>
            <v-btn
              width="200px"
              class="gray lighten-1"
              value="prepare"
              @click="sortdata"
            >ออร์เดอร์ที่ต้องเตรียมจัดยา</v-btn>
            <v-btn
              width="200px"
              class="orange lighten-1"
              value="ready"
              @click="sortdata"
            >ออร์เดอร์ที่พร้อมจำหน่าย</v-btn>
            <v-btn
              width="200px"
              class="green lighten-1"
              value="success"
              @click="sortdata"
            >ออร์เดอร์ที่สำเร็จแล้ว</v-btn>
            <v-btn
              width="200px"
              class="red lighten-1"
              value="cancel"
              @click="sortdata"
            >ออร์เดอร์ที่ต้องยกเลิก</v-btn>
          </v-layout>
        </v-flex>
        <v-flex class="pr-4">
          <v-card class="red" height="100%" width="1080px">
            <v-data-table
              :headers="headers"
              :items="order"
              :search="search"
              sort-by="status"
              class="elevation-1"
            >
              <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
              </template>
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Today</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <div class="flex-grow-1"></div>

                  
                </v-toolbar>
              </template>
              <template v-slot:body="{ items }">
          <tbody>
            <tr
              v-for="item in items"
              :key="item.HN"
              @click="selectItem(item)"
              :class="{'selectedRow': item === selectedItem}"
            >
              <td style="text-align:center">{{ item.HN }}</td>
              <td style="text-align:left">{{ item.name }}</td>
              <td style="text-align:left">{{ item.surname }}</td>
              <td style="text-align:left">{{ item.duedate }}</td>
              <td style="text-align:left">
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
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
        value: "HN"
      },
      { text: "ชื่อ", value: "name" },
      { text: "นามสกุล", value: "surname" },
      { text: "วันที่ต้องมารับยา", value: "duedate" },
      { text: "สถานะ", value: "status" }
      // ,
      // { text: "Actions", value: "action", sortable: false }
    ],
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
    index: 0
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
      } else if (e.currentTarget.value == "prepare") {
        this.search = "prepare";
      } else if (e.currentTarget.value == "ready") {
        this.search = "ready";
      } else if (e.currentTarget.value == "success") {
        this.search = "success";
      } else if (e.currentTarget.value == "cancel") {
        this.search = "cancel";
      }
    },
    getColor(status) {
      if (status == "cancel") return "red";
      else if (status == "ready") return "orange";
      else if (status == "prepare") return "light gray";
      else return "green";
    },
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
          status: "success",
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
          status: "ready",
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
          status: "success",
          orderid: "0521483098",
          weight: "",
          height: "",
          blood: ""
        },
        {
          HN: "0065893",
          name: "วริศรา",
          surname: "ใจดี",
          age: 30,
          gender: "หญิง",
          dob: "20 กรกฎาคม 2532",
          email: "ploy_warisara@hotmail.com",
          phone: "0852880026",
          pharmacy: "เวิลด์ ฟาร์มาซี",
          duedate: "17/10/2562",
          status: "success",
          orderid: "0065893013",
          weight: "",
          height: "",
          blood: ""
        },
        {
          HN: "0011254",
          name: "ภควัตน์",
          surname: "อัศววิวัฒน์",
          age: 28,
          gender: "ชาย",
          dob: "15 กันยายน 2534",
          email: "phakawat@hotmail.com",
          phone: "0851856921",
          pharmacy: "ร้านฟาร์มาซี สาย2",
          duedate: "18/10/2562",
          status: "ready",
          orderid: "0011254009",
          weight: "",
          height: "",
          blood: ""
        },
        {
          HN: "0033754",
          name: "ภาคิน",
          surname: "วัฒนพิพัฒน์",
          age: 78,
          gender: "ชาย",
          dob: "31 ตุลาคม 2484",
          email: "phakin@hotmail.com",
          phone: "0886048834",
          pharmacy: "ร้านฟาร์มาซี สาย2",
          duedate: "18/10/2562",
          status: "ready",
          orderid: "003375521",
          weight: "",
          height: "",
          blood: ""
        },
        {
          HN: "0030964",
          name: "อำนวย",
          surname: "วิไกล",
          age: 34,
          gender: "ชาย",
          dob: "7 ธันวาคม 2528",
          email: "OOnuy@hotmail.com",
          phone: "0800066645",
          pharmacy: "ร้านฟาร์มาซีแสนดี",
          duedate: "15/12/2562",
          status: "prepare",
          orderid: "003096422",
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
          status: "cancel",
          orderid: "1178403027",
          weight: "",
          height: "",
          blood: ""
        }
      ];
    },
    selectItem(item) {
      var index = this.order.indexOf(item)

      if(this.order[index].status == "ready"){
        this.index = this.order;
        console.log(this.order[index]);
        this.order = item;
        this.dialog_row = true;
      }
    },
    successItem(item) {
      console.log("success order");
      console.log(this.order);
      if (this.order.status == "ready") {
        this.order.status = "success";
      }
      this.dialog_row = false;
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
