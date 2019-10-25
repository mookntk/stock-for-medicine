<template>
  <v-app class="admin cyan lighten-5">
    <Menu />
    <v-content style="margin:20px">
      <v-col justify="right" align="right">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">+ เพิ่มข้อมูลผู้ป่วยรายใหม่</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">ข้อมูลผู้ป่วยรายใหม่</span>
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
        </v-dialog>
      </v-col>

      <v-dialog
        v-model="dialog_record"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title>
            <span class="headline">ข้อมูลผู้ป่วย</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="patient_selected"
                    label="ชื่อ-นามสกุลผู้ป่วย"
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field :value="patients[index].gender" label="เพศ" filled readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field :value="patients[index].age" label="อายุ" filled readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field
                    :value="patients[index].dob"
                    label="วัน/เดือน/ปีเกิด"
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-data-table :headers="record_headers" :items="patients[index].record"></v-data-table>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog_record = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_edit" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">แก้ไขข้อมูลผู้ป่วย</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field :value="patient_selected" label="ชื่อ-นามสกุลผู้ป่วย"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field :value="patients[index].gender" label="เพศ"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field :value="patients[index].age" label="อายุ"></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field :value="patients[index].dob" label="วัน/เดือน/ปีเกิด"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog_edit = false">ปิด</v-btn>
            <v-btn color="blue darken-1" text @click="save">เสร็จสิ้น</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table :headers="headers" :items="patients" :items-per-page="10" class="elevation-1">
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td>{{ item.HN }}</td>
              <td style="text-align:center">{{ item.name }} {{item.surname}}</td>
              <td style="text-align:center">{{ item.email }}</td>
              <td style="text-align:center">{{ item.phone }}</td>
              <td style="text-align:center">{{ item.pharmacy}}</td>
              <td style="text-align:center">
                <v-icon small class="mr-2" @click="showItem(item)">mdi-eye</v-icon>
              </td>
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
import Menu from "../components/menubar_hos";
export default {
  data() {
    return {
      dialog: false,
      dialog_record: false,
      dialog_edit: false,
      index: 0,
      headers: [
        {
          text: "HN",
          align: "left",
          sortable: false,
          value: "hn"
        },
        { text: "ชื่อ-นามสกุลผู้ป่วย", align: "center", value: "name" },
        { text: "อีเมล", align: "center", value: "email" },
        { text: "เบอร์โทรศัพท์", align: "center", value: "phone" },
        { text: "ร้านขายยา", align: "center", value: "pharmacy" },
        { text: "ประวัติและยา", align: "center", value: "history" },
        { text: "แก้ไข/ลบ", align: "center", value: "edit" }
      ],
      record_headers: [
        {
          text: "ลำดับที่",
          align: "right",
          sortable: true,
          value: "no"
        },
        { text: "วันที่บันทึก", align: "center", value: "date" },
        { text: "น้ำหนัก", align: "center", value: "weight" },
        { text: "ส่วนสูง", align: "center", value: "height" },
        { text: "ความดันเลือด", align: "center", value: "pressure" },
        { text: "ผู้ตรวจ", align: "center", value: "pharmacist" }
      ],
      patients: [
        {
          id: 0,
          HN: "0041523",
          name: "ณัชชา",
          surname: "ยินดี",
          age: 40,
          gender: "หญิง",
          dob: "9 สิงหาคม 2522",
          email: "natcha_yindee@hotmail.com",
          phone: "0851477526",
          pharmacy: "บ้านเภสัชกร",
          record: [
            {
              no: 1,
              date: "15 มีนาคม 2562",
              weight: 60,
              height: 167,
              pressure: "130/85",
              pharmacist: "เอก เวสโกสิทธิ์"
            },
            {
              no: 2,
              date: "20 ตุลาคม 2562",
              weight: 59,
              height: 167,
              pressure: "120/83",
              pharmacist: "เอก เวสโกสิทธิ์"
            }
          ]
        },
        {
          id: 1,
          HN: "0048543",
          name: "วรพรรณ",
          surname: "พุ่มประทุม",
          age: 32,
          gender: "หญิง",
          dob: "8 สิงหาคม 2530",
          email: "worrapan@gmail.com",
          phone: "0864588223",
          pharmacy: "ลิขิตฟาร์มาซี",
          record: [
            {
              no: 1,
              date: "15 มีนาคม 2562",
              weight: 60,
              height: 167,
              pressure: "130/85",
              pharmacist: "เอก เวสโกสิทธิ์"
            },
            {
              no: 2,
              date: "20 ตุลาคม 2562",
              weight: 59,
              height: 167,
              pressure: "120/83",
              pharmacist: "เอก เวสโกสิทธิ์"
            }
          ]
        },
        {
          id: 2,
          HN: "0521483",
          name: "ณัฐวุฒิ",
          surname: "ตันเสวกวงษ์",
          age: 41,
          gender: "ชาย",
          dob: "20 กุมภาพันธ์ 2521",
          email: "nattawut.t@gmail.com",
          phone: "0857773239",
          pharmacy: "บ้านเภสัชกร",
          record: [
            {
              no: 1,
              date: "15 มีนาคม 2562",
              weight: 60,
              height: 167,
              pressure: "130/85",
              pharmacist: "เอก เวสโกสิทธิ์"
            },
            {
              no: 2,
              date: "20 ตุลาคม 2562",
              weight: 59,
              height: 167,
              pressure: "120/83",
              pharmacist: "เอก เวสโกสิทธิ์"
            }
          ]
        },
        {
          id: 3,
          HN: "0065893",
          name: "วริศรา",
          surname: "ใจดี",
          age: 30,
          gender: "หญิง",
          dob: "20 กรกฎาคม 2532",
          email: "ploy_warisara@hotmail.com",
          phone: "0852880026",
          pharmacy: "เวิลด์ ฟาร์มาซี",
          record: [
            {
              no: 1,
              date: "15 มีนาคม 2562",
              weight: 60,
              height: 167,
              pressure: "130/85",
              pharmacist: "เอก เวสโกสิทธิ์"
            },
            {
              no: 2,
              date: "20 ตุลาคม 2562",
              weight: 59,
              height: 167,
              pressure: "120/83",
              pharmacist: "เอก เวสโกสิทธิ์"
            }
          ]
        },
        {
          id: 4,
          HN: "0011254",
          name: "ภควัตน์",
          surname: "อัศววิวัฒน์",
          age: 28,
          gender: "ชาย",
          dob: "15 กันยายน 2534",
          email: "phakawat@hotmail.com",
          phone: "0851856921",
          pharmacy: "ร้านฟาร์มาซี สาย2",
          record: [
            {
              no: 1,
              date: "20 กุมภาพันธ์ 2562",
              weight: 70,
              height: 175,
              pressure: "125/82",
              pharmacist: "สลิลลา วีระรัตน์"
            },
            {
              no: 2,
              date: "20 กันยายน 2562",
              weight: 69,
              height: 175,
              pressure: "120/80",
              pharmacist: "สลิลลา วีระรัตน์"
            },
            {
              no: 3,
              date: "15 ธันวาคม 2562",
              weight: 69,
              height: 175,
              pressure: "110/75",
              pharmacist: "สลิลลา วีระรัตน์"
            }
          ]
        }
      ],
      patient_selected: null,
      editedItem: null
    };
  },
  components: {
    Menu
  },
  methods: {
    showItem(item) {
      this.patient_selected = item.name + " " + item.surname;
      this.index = this.patients.indexOf(item);
      this.dialog_record = true;
    },
    editItem(item) {
      this.index = this.patients.indexOf(item);
      this.patient_selected = item.name + " " + item.surname;
      this.editedItem = Object.assign({}, item);
      this.dialog_edit = true;
    },
    deleteItem(item) {
      const index = this.patients.indexOf(item);
      confirm(
        "คุณต้องการที่จะลบข้อมูลผู้ป่วยใช่หรือไม่?\nคุณ" +
          item.name +
          " " +
          item.surname
      ) && this.patients.splice(index, 1);
    },
    save() {
      if (this.index > -1) {
        Object.assign(this.patients[this.index], this.editedItem);
      } else {
        this.patients.push(this.editedItem);
      }

      this.dialog_edit = false;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Sarabun&display=swap");
.admin {
  font-family: "Sarabun", sans-serif;
}

/* table,
th,
td {
  border: 1px solid black;
} */
</style>