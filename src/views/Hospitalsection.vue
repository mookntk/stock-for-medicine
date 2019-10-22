<template>
  <v-app class="admin cyan lighten-5">
    <Menu />
    <v-content style="margin:20px">
      <v-row>
        <v-col align="left" style="font-size:18px">{{date}}</v-col>
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
                    <v-col cols="12" sm="6" md="6">
                      ชื่อผู้ป่วย
                      <v-text-field required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      นามสกุล
                      <v-text-field required></v-text-field>
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
                      <v-text-field :label="picker" @click="click=!click" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      ร้านขายยา
                      <v-select
                        :items="['บ้านเภสัชกร','Gingerbread','Ice cream sandwich','Eclair']"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <tr @click="showAlert(props.item)">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.order }}</td>
            <td class="text-xs-right">{{ props.item.status }}</td>
          </tr>
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
      click: false,
      dialog: false,
      selected: [],
      pharmacy: "",
      headers: [
        {
          text: "ชื่อร้านขายยา",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "จำนวนออร์เดอร์", value: "order" },
        { text: "สถานะ", value: "status" }
      ],
      desserts: [
        {
          name: "บ้านเภสัชกร",
          order: 5,
          value: false,
          status: "ทำการขนส่ง"
        },
        {
          name: "Ice cream sandwich",
          order: 10,
          value: false,
          status: 9.0
        },
        {
          name: "Eclair",
          order: 12,
          value: false,
          status: 16.0
        },
        {
          name: "Cupcake",
          order: 10,
          value: false,
          status: 3.7
        },
        {
          name: "Gingerbread",
          order: 25,
          value: false,
          status: 16.0
        }
      ],
      date: ""
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
    showAlert(a) {
      //   if (event.target.classList.contains("btn__content")) return;
      console.log("sss");
      alert("Alert! \n" + a.name);
    },
    save() {
      for (var i = 0; i < this.desserts.length; i++) {}
    }
  }
  //   },
  //   methods: {
  //     logout: function() {
  //       localStorage.setItem("login", "false");
  //       console.log(localStorage.getItem("login"));
  //       this.$router.push("/");
  //     }
  //   }
};
</script>
