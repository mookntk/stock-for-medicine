<template>
  <v-app class="admin cyan lighten-5">
    <Menu />
    <v-content style="margin:20px">
      <v-row>
        <v-col align="left" style="font-size:25px">{{date}}</v-col>
      </v-row>
      <v-row>
        <v-col align="left" style="font-size:22px;">{{pharmacy_name}}</v-col>
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
              <td>{{ item.order }}</td>
              <td>
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
import Menu from "../components/menubar_hos";
export default {
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
      pharmacy_name: "บ้านเภสัช",
      click: false,
      dialog: false,
      selected: [],
      pharmacy: "",
      headers: [
        {
          text: "รหัสออร์เดอร์",
          align: "left",
          sortable: true,
          value: "name"
        },
        { text: "ชื่อผู้ป่วย", value: "order" },
        { text: "วันรับยา", value: "status" },
        { text: "แก้ไข/ลบ", value: "status" }
      ],
      order: [
        {
          name: "บ้านเภสัชกร",
          order: [
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
          name: "ลิขิตฟาร์มาซี",
          order: 10,
          status: "ยังไม่ได้จัดส่ง"
        },
        {
          name: "ร้านฟาร์มาซี สาย2",
          order: 12,
          status: "ยังไม่ได้จัดส่ง"
        },
        {
          name: "เวิลด์ ฟาร์มาซี",
          order: 10,
          status: "ยังไม่ได้จัดส่ง"
        },
        {
          name: "ซิตี้ฟาร์มาซี",
          order: 25,
          status: "ยังไม่ได้จัดส่ง"
        }
      ],
      date: "",
      selectedpharmacy: ""
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
      alert(item.name);
    },
    save() {
      this.dialog = false;
      var count = 0;
      var i = 0;
      for (i = 0; i < this.order.length; i++) {
        if (this.order[i].status == "ยังไม่ได้จัดส่ง") {
          if (this.selectedpharmacy == this.order[i].name) {
            this.order[i].order++;
            count++;
            break;
          }
        }
      }
      if (count == 0) {
        var new_order = {
          name: this.selectedpharmacy,
          order: 1,
          status: "ยังไม่ได้จัดส่ง"
        };
        this.order.push(new_order);
      }
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
</style>