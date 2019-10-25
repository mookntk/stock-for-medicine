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
        </v-card>
      </v-dialog>
      <v-row>
        <v-col align="left" style="font-size:25px">{{date}}</v-col>
        <v-col justify="right" align="right">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">สร้างออร์เดอร์</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">สร้างออร์เดอร์</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-date-picker v-model="picker" v-if="click"></v-date-picker>
                  <v-row>
                    <v-col cols="12" sm="6" md="12" align="right">order id : {{order_id}}</v-col>
                    <v-col cols="12" sm="6" md="6">
                      ชื่อผู้ป่วย
                      <v-text-field required v-model="order_name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      นามสกุล
                      <v-text-field required v-model="order_surname"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      โรค
                      <v-text-field required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      ยา
                      <v-text-field required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      วันที่รับยา
                      <v-text-field
                        :label="picker"
                        @click="click=!click"
                        required
                        v-model="order_date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      ร้านขายยา
                      <v-select :items="order" @change="selectpharmacy" item-text="name"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
            <!-- <v-form ref="form" v-model="valid" lazy-validation class="white">
              <v-text-field :counter="20" :rules="nameRules" label="ชื่อผู้ป่วย" required></v-text-field>
              <v-text-field :counter="20" :rules="nameRules" label="" required></v-text-field>
              <v-text-field :rules="emailRules" label="E-mail" required></v-text-field>

              <v-select
                v-model="selectedpharmacy"
                :items="order"
                item-text="name"
                :rules="[v => !!v || 'Item is required']"
                label="Item"
                required
              ></v-select>

              <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

              <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

              <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
            </v-form>-->
          </v-dialog>
        </v-col>
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
        { text: "สถานะ", align: "center", value: "status" }
      ],
      order: [
        {
          id: 0,
          name: "บ้านเภสัชกร",
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
          status: "ทำการขนส่ง"
        },
        {
          id: 1,
          name: "ลิขิตฟาร์มาซี",
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
          status: "ยังไม่ได้จัดส่ง"
        },
        {
          id: 2,
          name: "ร้านฟาร์มาซี สาย2",

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
          status: "ยังไม่ได้จัดส่ง"
        },
        {
          id: 3,
          name: "เวิลด์ ฟาร์มาซี",

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
          status: "ยังไม่ได้จัดส่ง"
        },
        {
          id: 4,
          name: "ซิตี้ฟาร์มาซี",

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
          status: "ยังไม่ได้จัดส่ง"
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
      if (status == "ยังไม่ได้จัดส่ง") return "red";
      else return "green";
    },
    selectItem(item) {
      this.index = item.id;
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