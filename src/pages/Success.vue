<template>
  <div>주문이 완료되었습니다.</div>
  <ul>
    <li v-for="(i, idx) in state.orders" :key="idx">
      {{ i.name }}
      {{ i.address }}
      {{ i.payment }}
      {{ i.cardNumber }}
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';

export default {
  name: "success",
  components: {},
  setup() {

    const state = reactive({
      orders: []
    })

    axios.get("/api/orders").then((response) => {
      state.orders = response.data;
    })

    return { state }
  }
}
</script>

<style scoped>
</style>