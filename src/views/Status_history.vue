<template>
  <v-app class="font cyan lighten-5">
    <Menu />
    <v-content style="margin:20px">
      <v-row>
        <v-col align="left" style="font-size:25px">ออร์เดอร์ที่กำลังจัดส่ง</v-col>
      </v-row>
      <!-- <v-row>
        <v-col align="left" style="font-size:20px">{{date}}</v-col>
      </v-row>-->
      <v-data-table :headers="headers" :items="order" :items-per-page="10" class="elevation-1">
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td style="text-align:left">{{ order.indexOf(item)+1}}</td>
              <td style="text-align:center">{{ item.create_date}}</td>
              <td style="text-align:center">{{ item.orders.length }}</td>
              <td style="text-align:center">
                <v-icon small class="mr-2" @click="showItem(item)">mdi-eye</v-icon>
              </td>
              <td style="text-align:center">
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog_order" persistent max-width="1000px">
        <v-card class="blue-grey lighten-5 font">
          <v-card-title>
            <span>ยาที่ได้รับ</span>
          </v-card-title>
          <v-card-text>
            <v-expansion-panels multiple focusable>
              <v-expansion-panel v-for="(item,i) in order[index].orders" :key="i">
                <v-expansion-panel-header>ออร์เดอร์ที่ {{order[index].orders.indexOf(item)+1}} {{item.name}}</v-expansion-panel-header>
                <v-expansion-panel-content>
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
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" @click="dialog_order = false">ปิด</v-btn>
            <v-btn
              color="green lighten-1"
              @click="dialog_order = false"
              v-if="order[index].status!='ได้รับยาแล้ว'"
            >ได้รับยาครบ</v-btn>
            <v-btn
              color="red lighten-1"
              @click="dialog_order = false"
              v-if="order[index].status!='ได้รับยาแล้ว'"
            >ยาไม่ครบตามจำนวน</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>
<script>
import Menu from "../components/Menubar_phar";
export default {
  data() {
    return {
      date: "",
      dialog_order: false,
      headers: [
        {
          text: "ลำดับที่",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "วันที่จัดส่งยา", align: "center", value: "order" },
        { text: "จำนวนออร์เดอร์", align: "center", value: "order" },
        { text: "ยาที่ได้รับ", align: "center", value: "order" },
        { text: "สถานะ", align: "center", value: "status" }
      ],
      index: 0,
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
          receive_date: "",
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
          status: "กำลังจัดส่ง"
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
          receive_date: "",
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
          status: "กำลังจัดส่ง"
        },
        {
          id: 4,
          name: "ซิตี้ฟาร์มาซี",
          create_date: "25 กรกฏาคม 2562",
          receive_date: "",
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
          status: "ได้รับยาแล้ว"
        }
      ]
    };
  },
  methods: {
    showItem(item) {
      this.index = this.order.indexOf(item);
      this.dialog_order = true;
    },
    getColor(status) {
      if (status == "หยุดชั่วคราว") return "red";
      else if (status == "กำลังจัดส่ง") return "grey";
      else return "green";
    }
  },
  components: {
    Menu
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