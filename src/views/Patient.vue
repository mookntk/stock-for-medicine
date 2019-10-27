<template>
  <v-app class="font cyan lighten-5">
    <Menu />
    <v-content style="margin:20px">
      <v-row>
        <v-col align="left" style="font-size:25px">ข้อมูลผู้ป่วย</v-col>
        <v-col align="right">
          <v-dialog v-model="dialog_edit" persistent max-width="700px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">+ เพิ่มข้อมูลผู้ป่วยรายใหม่</v-btn>
            </template>
            <v-card class="blue-grey lighten-5 font">
              <v-card-title>
                <span>{{formTitle}}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" align="right">HN: {{patients[index].HN}}</v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="editedItem.name" label="ชื่อ" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="editedItem.surname" label="นามสกุล" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field v-model="editedItem.gender" label="เพศ" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <v-text-field v-model="editedItem.age" label="อายุ" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="editedItem.dob" label="วัน/เดือน/ปีเกิด" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="editedItem.email" label="อีเมล" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="editedItem.phone" label="เบอร์โทรศัพท์" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field v-model="editedItem.address" label="ที่อยู่" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-select label="ร้านขายยา" outlined v-model="editedItem.pharmacy"></v-select>
                      <!-- <v-text-field v-model="editedItem.pharmacy" label="ร้านขายยา" outlined></v-text-field> -->
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
        </v-col>
      </v-row>
      <!-- End of Add new patient -->

      <!-- watch patient history -->
      <v-dialog
        v-model="dialog_record"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card class="font">
          <v-card-title class="teal lighten-2 elevation-3">
            <v-btn icon dark @click="dialog_record = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <span>ข้อมูลผู้ป่วย</span>
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
                <v-col cols="12" sm="6">
                  <v-text-field :value="patients[index].email" label="อีเมล" filled readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="patients[index].phone"
                    label="เบอร์โทรศัพท์"
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field :value="patients[index].pharmacy" label="ร้านขายยา" filled readonly></v-text-field>
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

      <!-- <v-dialog v-model="dialog_edit" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">แก้ไขข้อมูลผู้ป่วย</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field :value="patients[index].email" label="อีเมล" filled readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="patients[index].phone"
                    label="เบอร์โทรศัพท์"
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field :value="patients[index].address" label="ที่อยู่" filled readonly></v-text-field>
                </v-col>
              </v-row>
              <v-data-table :headers="record_headers" :items="patients[index].record"></v-data-table>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>-->
      <!-- end of edit patient imformation -->

      <!-- Data Table of patient page -->
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
      <!-- Data Table of patient page -->
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
      editedIndex: -1,
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
        { text: "ประวัติการตรวจ", align: "center", value: "history" },
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
          HN: "0041523",
          name: "ณัชชา",
          surname: "ยินดี",
          age: 40,
          gender: "หญิง",
          dob: "9 สิงหาคม 2522",
          email: "natcha_yindee@hotmail.com",
          phone: "0851477526",
          pharmacy: "บ้านเภสัชกร",
          address: "2/2 ม.5 พุทธมณฑล จ.นครปฐม 73130",
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
          HN: "0048543",
          name: "วรพรรณ",
          surname: "พุ่มประทุม",
          age: 32,
          gender: "หญิง",
          dob: "8 สิงหาคม 2530",
          email: "worrapan@gmail.com",
          phone: "0864588223",
          pharmacy: "ลิขิตฟาร์มาซี",
          address: "2/2 ม.5 พุทธมณฑล จ.นครปฐม 73130",
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
          HN: "0521483",
          name: "ณัฐพล",
          surname: "ตันเสวกวงษ์",
          age: 41,
          gender: "ชาย",
          dob: "20 กุมภาพันธ์ 2521",
          email: "nattapol.t@gmail.com",
          phone: "0857773239",
          pharmacy: "บ้านเภสัชกร",
          address: "2/2 ม.5 พุทธมณฑล จ.นครปฐม 73130",
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
          HN: "0065893",
          name: "วริศรา",
          surname: "ใจดี",
          age: 30,
          gender: "หญิง",
          dob: "20 กรกฎาคม 2532",
          email: "ploy_warisara@hotmail.com",
          phone: "0852880026",
          pharmacy: "เวิลด์ ฟาร์มาซี",
          address: "2/2 ม.5 พุทธมณฑล จ.นครปฐม 73130",
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
          HN: "0011254",
          name: "ภควัตน์",
          surname: "อัศววิวัฒน์",
          age: 28,
          gender: "ชาย",
          dob: "15 กันยายน 2534",
          email: "phakawat@hotmail.com",
          phone: "0851856921",
          pharmacy: "ร้านฟาร์มาซี สาย2",
          address: "2/2 ม.5 อ.พานทอง จ.ชลบุรี 20160",
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
      editedItem: {
        HN: "0011254",
        name: "",
        surname: "",
        age: null,
        gender: "",
        dob: "",
        email: "",
        phone: "",
        pharmacy: "",
        address: "",
        record: []
      },
      defaultItem: {
        HN: "0011254",
        name: "",
        surname: "",
        age: null,
        gender: "",
        dob: "",
        email: "",
        phone: "",
        pharmacy: "",
        address: "",
        record: []
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "ข้อมูลผู้ป่วยรายใหม่"
        : "แก้ไขข้อมูลผู้ป่วย";
    }
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
      this.editedIndex = this.patients.indexOf(item);
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
      console.log(this.editedItem);
      if (this.editedIndex > -1) {
        Object.assign(this.patients[this.editedIndex], this.editedItem);
      } else {
        console.log(this.editedItem);
        this.patients.push(this.editedItem);
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
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Sarabun&display=swap");
.admin {
  font-family: "Sarabun", sans-serif;
}
thead {
  background-color: #ffd54f;
}
</style>