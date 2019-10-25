<template>
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
</template>
<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "ชื่อร้านขายยา",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "จำนวนออร์เดอร์", align: "center", value: "order" },
        { text: "สถานะ", align: "center", value: "status" }
      ]
    };
  }
};
</script>

<style scoped>
</style>