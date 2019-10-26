<template>
  <v-app class="admin cyan lighten-5">
    <Menu />
    <v-content style="margin:20px">
      <v-dialog v-model="dialog_row" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog_row = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{pharmacy}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialog_row = false">จัดส่งยา</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-row></v-row>
          <v-row style="margin:20px">
            <v-col cols="12" sm="12">
              <v-data-table
                v-model="selected"
                :items="order[index].orders"
                :items-per-page="10"
                class="elevation-1"
                :headers="sub_headers"
              >
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr
                      v-for="item in items"
                      :key="item.name"
                      @click="selectItem(item)"
                      :class="{'selectedRow': item === selectedItem}"
                    >
                      <td>{{ item.order_id }}</td>
                      <td style="text-align:center">{{ item.name }}</td>
                      <td style="text-align:center">{{ item.due_date }}</td>
                      <td style="text-align:center">
                        <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      <v-row>
        <v-col align="left" style="font-size:25px">ประวัติการจัดส่งยา</v-col>
      </v-row>

      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="order"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr
              v-for="item in items"
              :key="item.name"
              @click="selectItem(item)"
              :class="{'selectedRow': item === selectedItem}"
            >
              <td>{{ item.name }}</td>
              <td style="text-align:center">{{ item.orders.length }}</td>
              <td style="text-align:center">{{ item.create_date }}</td>
              <td style="text-align:center">{{ item.receive_date }}</td>
              <td style="text-align:center">
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-content>
  </v-app>
</template>

<script>
// import ConnectDatabase from '../server/server'
import axios from "axios";
import Menu from "../components/menubar_hos";
export default {
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
      order_id: 1,
      order_name: null,
      order_surname: null,
      order_date: null,
      click: false,
      dialog: false,
      dialog_row: false,
      selected: [],
      pharmacy: "",
      index: 0,
      headers: [
        {
          text: "ชื่อร้านขายยา",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "จำนวนออร์เดอร์", align: "center", value: "order" },
        { text: "วันที่สร้างออร์เดอร์", align: "center", value: "order" },
        { text: "วันที่ร้านยาได้รับ", align: "center", value: "order" },
        { text: "สถานะ", align: "center", value: "status" }
      ],
      sub_headers: [
        {
          text: "เลขออร์เดอร์",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "ชื่อ-นามสกุลผู้ป่วย", align: "center", value: "order" },
        { text: "วันรับยา", align: "center", value: "status" },
        { text: "คร", align: "center", value: "status" }
      ],
      order: [
        {
          id: 0,
          name: "บ้านเภสัชกร",
          create_date: "20 กรกฏาคม 2562",
          receive_date: "22 กรกฎาคม 2562",
          orders: [
            {
              order_id: 1,
              name: "วันชัย ศุภจตุรัส",
              due_date: "15 ตุลาคม 2562"
            },
            {
              order_id: 3,
              name: "เอก เวสโกสิทธิ์",
              due_date: "9 มีนาคม 2562"
            },
            {
              order_id: 15,
              name: "วิชัย วิทุรวงศ์",
              due_date: "30 สิงหาคม 2562"
            }
          ],
          status: "ได้รับยาแล้ว"
        },
        {
          id: 1,
          name: "ลิขิตฟาร์มาซี",
          create_date: "10 กรกฏาคม 2562",
          receive_date: "18 กรกฎาคม 2562",
          orders: [
            {
              order_id: 2,
              name: "สุกรี ฉัตรรัตนกุลชัย",
              due_date: "12 กันยายน 2562"
            },
            {
              order_id: 5,
              name: "สมาน พิทยาพิบูลพงศ์",
              due_date: "20 มีนาคม 2562"
            },
            {
              order_id: 11,
              name: "วิชัย วิทุรวงศ์",
              due_date: "30 สิงหาคม 2562"
            },
            {
              order_id: 39,
              name: "นภาพรรณ วัฒนประดิษฐ",
              due_date: "30 สิงหาคม 2562"
            },
            {
              order_id: 40,
              name: "เฉลิม ศรีเมือง",
              due_date: "15 มกราคม 2562"
            }
          ],
          status: "รอการจัดยา"
        },
        {
          id: 2,
          name: "ร้านฟาร์มาซี สาย2",
          create_date: "15 มีนาคม 2562",
          receive_date: "18 มีนาคม 2562",

          orders: [
            {
              order_id: 1,
              name: "วันชัย ศุภจตุรัส",
              due_date: "15 ตุลาคม 2562"
            },
            {
              order_id: 3,
              name: "เอก เวสโกสิทธิ์",
              due_date: "9 มีนาคม 2562"
            }
          ],
          status: "หยุดชั่วคราว"
        },
        {
          id: 3,
          name: "เวิลด์ ฟาร์มาซี",
          create_date: "11 สิงหาคม 2562",
          receive_date: "15 สิงหาคม 2562",
          orders: [
            {
              order_id: 1,
              name: "นภาพรรณ วิทุรวงศ์",
              due_date: "15 ตุลาคม 2562"
            },
            {
              order_id: 3,
              name: "เอก เวสโกสิทธิ์",
              due_date: "9 มีนาคม 2562"
            },
            {
              order_id: 15,
              name: "สลิลลา พิทยาพิบูลพงศ์",
              due_date: "30 สิงหาคม 2562"
            },
            {
              order_id: 15,
              name: "สุทธิพงศ์ ภัทรมังกร",
              due_date: "30 สิงหาคม 2562"
            },
            {
              order_id: 15,
              name: "วิชัย วิทุรวงศ์",
              due_date: "30 สิงหาคม 2562"
            }
          ],
          status: "รอการจัดส่ง"
        },
        {
          id: 4,
          name: "ซิตี้ฟาร์มาซี",
          create_date: "25 กรกฏาคม 2562",
          receive_date: "29 กรกฎาคม 2562",
          orders: [
            {
              order_id: 1,
              name: "สุทธิพงศ์ ภัทรมังกร",
              due_date: "15 ตุลาคม 2562"
            },
            {
              order_id: 3,
              name: "เอก เวสโกสิทธิ์",
              due_date: "9 มีนาคม 2562"
            },
            {
              order_id: 15,
              name: "เฉลิม วัฒนประดิษฐ",
              due_date: "30 สิงหาคม 2562"
            }
          ],
          status: "กำลังจัดส่ง"
        }
      ],
      date: "",
      selectedpharmacy: "",
      selectedItem: ""
    };
  },
  mounted() {
    var day = [
      "วันอาทิตย์",
      "วันจันทร์",
      "วันอังคาร",
      "วันพุธ",
      "วันพฤหัสบดี",
      "วันศุกร์",
      "วันเสาร์"
    ];
    var month = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม"
    ];
    var date = new Date();
    var date_format =
      day[date.getDay()] +
      " " +
      date.getDate() +
      " " +
      month[date.getMonth()] +
      " " +
      (date.getFullYear() + 543);

    this.date = date_format;
  },
  components: {
    Menu
  },
  methods: {
    getColor(status) {
      if (status == "หยุดชั่วคราว") return "red";
      else if (status == "รอการจัดส่ง") return "grey";
      else if (status == "รอการจัดยา") return "grey";
      else if (status == "กำลังจัดส่ง") return "orange";
      else return "green";
    },
    selectItem(item) {
      this.index = this.order.indexOf(item);
      if (item.status == "") {
      }
      this.pharmacy = item.name;
      this.dialog_row = true;
    },
    save() {
      this.dialog = false;
      var count = 0;
      var i = 0;
      var new_detail = {
        order_id: this.order_id,
        name: this.order_name + " " + this.order_surname,
        due_date: this.picker
      };
      console.log(new_detail);
      for (i = 0; i < this.order.length; i++) {
        if (this.order[i].status == "ยังไม่ได้จัดส่ง") {
          if (this.selectedpharmacy == this.order[i].name) {
            this.order[i].orders.push(new_detail);
            count++;
            console.log(this.order);
            break;
          }
        }
      }
      if (count == 0) {
        var new_order = {
          id: this.order.length,
          name: this.selectedpharmacy,
          orders: [new_detail],
          status: "ยังไม่ได้จัดส่ง"
        };
        this.order.push(new_order);
      }
      this.order_id++;
      this.order_name = "";
      this.order_surname = "";
      this.order_date = "";
    },
    selectpharmacy(e) {
      this.selectedpharmacy = e;
      console.log(this.selectedpharmacy);
    }
  },
  computed: {
    formtitle() {
      if (true) {
      }
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Sarabun&display=swap");
.admin {
  font-family: "Sarabun", sans-serif;
}
thead {
  background-color: antiquewhite;
}
</style>