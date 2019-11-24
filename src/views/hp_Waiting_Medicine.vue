<template>
  <v-app class="font cyan lighten-5">
    <Menu />
    <v-content style="margin:20px">
      <v-row>
        <v-col align="left" style="font-size:25px">{{date}}</v-col>
        <v-col justify="right" align="right">
          <v-btn color="primary" dark v-on="on" @click="prepare_medicine">ทำการจัดยา</v-btn>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog_edit" persistent max-width="700px">
        <v-card class="blue-grey lighten-5 font">
          <v-card-title>
            <span>แก้ไขข้อมูล</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.patient" label="ชื่อ-นามสกุล" outlined readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field label="ร้านขายยา" outlined v-model="editedItem.name" readonly></v-text-field>
                </v-col>
              </v-row>
              <v-row v-for="(item,subindex) in editedItem.medicine" :key="item">
                <v-col cols="12" sm="7">
                  <v-text-field
                    v-model="editedItem.medicine[subindex].name"
                    outlined
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field v-model="editedItem.medicine[subindex].qty" outlined></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-label>{{editedItem.medicine[subindex].unit}}</v-label>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close" rounded color="red lighten-1" large>ปิด</v-btn>
            <v-btn rounded color="green lighten-1" large @click="save">เสร็จสิ้น</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
              :class="{'selectedRow': item === selectedItem}"
            >
              <td style="vertical-align: middle">
                <v-checkbox primary hide-details v-model="item.checkbox"></v-checkbox>
              </td>
              <td style="text-align:center">{{ item.order_id }}</td>
              <td style="text-align:center">{{ item.patient }}</td>
              <td style="text-align:center">{{ item.create_date }}</td>
              <td style="text-align:center">{{ item.name }}</td>
              <td style="text-align:center">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <br />

      <v-row style="margin:20px">
        <v-label style="font-size:18px">ยาขาด</v-label>
      </v-row>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="order"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:header="{props}">
          <tr>
            <th>
              <v-checkbox primary hide-details label="เลือกทั้งหมด" v-model="selectAll"></v-checkbox>
            </th>
            <!-- <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th> -->
          </tr>
        </template>
        <template v-slot:body="{ items }">
          <tbody>
            <tr
              v-for="item in items"
              :key="item.name"
              :class="{'selectedRow': item === selectedItem}"
            >
              <td style="vertical-align: middle">
                <v-checkbox primary hide-details></v-checkbox>
              </td>
              <td style="text-align:center">{{ item.order_id }}</td>
              <td style="text-align:center">{{ item.patient }}</td>
              <td style="text-align:center">{{ item.create_date }}</td>
              <td style="text-align:center">{{ item.name }}</td>
              <td style="text-align:center">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
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
      dialog_edit: false,
      headers: [
        {
          text: " ",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "เลขออร์เดอร์",
          align: "center",
          sortable: false,
          value: "name"
        },
        { text: "ชื่อ-นามสกุลผู้ป่วย", align: "center", value: "order" },
        { text: "วันที่สร้างออร์เดอร์", align: "center", value: "order" },
        { text: "ร้านขายยา", align: "center", value: "order" },
        { text: "แก้ไข/ยกเลิก", align: "center", value: "status" }
      ],
      sub_headers: [
        {
          text: "เลขออร์เดอร์",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "ชื่อ-นามสกุลผู้ป่วย", align: "center", value: "order" },
        { text: "วันที่สร้างออร์เดอร์", align: "center", value: "order" },
        { text: "วันนัดรับยา", align: "center", value: "status" },
        { text: "ข้อมูลยา", align: "center", value: "status" }
      ],
      order: [
        {
          order_id: 234,
          name: "บ้านเภสัชกร",
          patient: "วันชัย ศุภจตุรัส",
          create_date: "20 กรกฏาคม 2562",
          receive_date: "22 กรกฎาคม 2562",
          checkbox: false,
          medicine: [
            {
              tmt: "1234",
              name: "พารา",
              qty: 3,
              unit: "tablet"
            },
            { tmt: "1234", name: "ทิฟฟี่", qty: 3, unit: "tablet" }
          ],
          orders: [
            {
              order_id: 1,
              name: "วันชัย ศุภจตุรัส",
              create_date: "7 ตุลาคม 2562",
              due_date: "15 ตุลาคม 2562"
            },
            {
              order_id: 3,
              name: "เอก เวสโกสิทธิ์",
              create_date: "2 มีนาคม 2562",
              due_date: "9 มีนาคม 2562"
            },
            {
              order_id: 15,
              name: "วิชัย วิทุรวงศ์",
              create_date: "7 สิงหาคม 2562",
              due_date: "30 สิงหาคม 2562"
            }
          ],
          status: "หยุดชั่วคราว"
        },
        {
          order_id: 309,
          name: "ลิขิตฟาร์มาซี",
          patient: "สุกรี ฉัตรรัตนกุลชัย",
          create_date: "22 กรกฎาคม 2562",
          receive_date: "",
          checkbox: true,
          medicine: [
            {
              tmt: "1234",
              name: "พารา",
              qty: 3,
              unit: "tablet"
            },
            { tmt: "1234", name: "ทิฟฟี่", qty: 3, unit: "tablet" }
          ],
          orders: [
            {
              order_id: 2,
              name: "สุกรี ฉัตรรัตนกุลชัย",
              create_date: "7 กันยายน 2562",
              due_date: "12 กันยายน 2562"
            },
            {
              order_id: 5,
              name: "สมาน พิทยาพิบูลพงศ์",
              create_date: "10 มีนาคม 2562",
              due_date: "20 มีนาคม 2562"
            },
            {
              order_id: 11,
              name: "วิชัย วิทุรวงศ์",
              create_date: "15 สิงหาคม 2562",
              due_date: "30 สิงหาคม 2562"
            },
            {
              order_id: 39,
              name: "นภาพรรณ วัฒนประดิษฐ",
              create_date: "7 สิงหาคม 2562",
              due_date: "30 สิงหาคม 2562"
            },
            {
              order_id: 40,
              name: "เฉลิม ศรีเมือง",
              create_date: "7 มกราคม 2562",
              due_date: "15 มกราคม 2562"
            }
          ],
          status: "รอการจัดยา"
        },
        {
          order_id: 801,
          name: "ร้านฟาร์มาซี สาย2",
          patient: "เอก เวสโกสิทธิ์",
          create_date: "15 มีนาคม 2562",
          receive_date: "18 มีนาคม 2562",
          checkbox: false,
          medicine: [
            {
              tmt: "1234",
              name: "พารา",
              qty: 3,
              unit: "tablet"
            },
            { tmt: "1234", name: "ทิฟฟี่", qty: 3, unit: "tablet" }
          ],

          orders: [
            {
              order_id: 1,
              name: "วันชัย ศุภจตุรัส",
              create_date: "7 ตุลาคม 2562",
              due_date: "15 ตุลาคม 2562"
            },
            {
              order_id: 3,
              name: "เอก เวสโกสิทธิ์",
              create_date: "1 มีนาคม 2562",
              due_date: "9 มีนาคม 2562"
            }
          ],
          status: "หยุดชั่วคราว"
        },
        {
          order_id: 227,
          name: "เวิลด์ ฟาร์มาซี",
          patient: "สลิลลา พิทยาพิบูลพงศ์",
          create_date: "22 กรกฎาคม 2562",
          receive_date: "",
          checkbox: false,
          medicine: [
            {
              tmt: "1234",
              name: "พารา",
              qty: 3,
              unit: "tablet"
            },
            { tmt: "1234", name: "ทิฟฟี่", qty: 3, unit: "tablet" }
          ],
          orders: [
            {
              order_id: 1,
              name: "นภาพรรณ วิทุรวงศ์",
              create_date: "5 ตุลาคม 2562",
              due_date: "15 ตุลาคม 2562"
            },
            {
              order_id: 3,
              name: "เอก เวสโกสิทธิ์",
              create_date: "5 ตุลาคม 2562",
              due_date: "9 มีนาคม 2562"
            },
            {
              order_id: 15,
              name: "สลิลลา พิทยาพิบูลพงศ์",
              create_date: "5 สิงหาคม 2562",
              due_date: "30 สิงหาคม 2562"
            },
            {
              order_id: 15,
              name: "สุทธิพงศ์ ภัทรมังกร",
              create_date: "5 สิงหาคมม 2562",
              due_date: "30 สิงหาคม 2562"
            },
            {
              order_id: 15,
              name: "วิชัย วิทุรวงศ์",
              create_date: "5 สิงหาคม 2562",
              due_date: "30 สิงหาคม 2562"
            }
          ],
          status: "รอการจัดส่ง"
        },
        {
          order_id: 456,
          name: "ซิตี้ฟาร์มาซี",
          patient: "สุทธิพงศ์ ภัทรมังกร",
          create_date: "25 กรกฏาคม 2562",
          receive_date: "",
          checkbox: false,
          medicine: [
            {
              tmt: "1234",
              name: "พารา",
              qty: 3,
              unit: "tablet"
            },
            { tmt: "1234", name: "ทิฟฟี่", qty: 3, unit: "tablet" }
          ],
          orders: [
            {
              order_id: 1,
              name: "สุทธิพงศ์ ภัทรมังกร",
              create_date: "10 ตุลาคม 2562",
              due_date: "15 ตุลาคม 2562"
            },
            {
              order_id: 3,
              name: "เอก เวสโกสิทธิ์",
              create_date: "5 มีนาคม 2562",
              due_date: "9 มีนาคม 2562"
            },
            {
              order_id: 15,
              name: "เฉลิม วัฒนประดิษฐ",
              create_date: "15 สิงหาคม 2562",
              due_date: "30 สิงหาคม 2562"
            }
          ],
          status: "กำลังจัดส่ง"
        }
      ],
      date: "",
      selectedpharmacy: "",
      selectedItem: "",
      order_selected: "",
      editedItem: ""
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
    changestatus() {
      if (this.order[this.index].status == "รอการจัดส่ง") {
        this.order[this.index].status = "กำลังจัดส่ง";
      } else if (this.order[this.index].status == "รอการจัดยา") {
        this.order[this.index].status = "รอการจัดส่ง";
      } else if (this.order[this.index].status == "หยุดชั่วคราว") {
        this.order[this.index].status = "รอการจัดยา";
      }
      this.dialog_row = false;
    },
    prepare_medicine() {
      this.$router.push("/about");
    },
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
        if (this.order[i].status != "กำลังจัดส่ง") {
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
          status: "รอการจัดยา"
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
    },
    show_med(item) {},
    deleteItem(item) {
      console.log("delete item");
      const index = this.order.indexOf(item);
      confirm(
        "คุณต้องการที่จะลบออร์เดอร์ใช่หรือไม่?\nคุณ" + item.patient + " "
      ) && this.order.splice(index, 1);
    },
    editItem(item) {
      this.index = this.order.indexOf(item);
      //   this.editedIndex = this.order.indexOf(item);
      this.order_selected = item.name;
      this.editedItem = Object.assign({}, item);
      this.dialog_edit = true;
    },
    save() {
      console.log(this.editedItem);
      if (this.index > -1) {
        Object.assign(this.order[this.index], this.editedItem);
      } else {
        console.log(this.editedItem);
        this.order.push(this.editedItem);
      }
      this.close();
    },
    close() {
      console.log(this.editedIndex);
      this.dialog_edit = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  },
  computed: {
    formtitle() {
      if (this.order[this.index].status == "หยุดชั่วคราว") {
        return "ได้รับยาเรียบร้อย";
      } else if (this.order[this.index].status == "รอการจัดส่ง") {
        return "จัดส่ง";
      } else if (this.order[this.index].status == "รอการจัดยา") {
        return "จัดยาเรียบร้อย";
      } else if (this.order[this.index].status == "กำลังจัดส่ง") {
        return "";
      } else if (this.order[this.index].status == "ได้รับยาแล้ว") {
        return "";
      }
    },
    selectAll() {
      var count = 0;
      var i;
      if (se)
        for (let key in this.order) {
          if (this.order.hasOwnProperty(key)) {
            this.order[key].checkbox = true;
          }
        }
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Sarabun&display=swap");
.font {
  font-family: "Sarabun", sans-serif;
}
thead {
  background-color: #ffd54f;
}
</style>