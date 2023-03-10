<template>
  <div class="card shadow-sm">
    <span class="img" :style="{ backgroundImage: `url(${item.imgPath})` }" />
    <div class="card-body">
      <p class="card-text">
        {{ item.name }}
        <span class="discount badge bg-danger">{{ item.discountPer }}%</span>
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button class="btn btn-primary" @click="addToCart(item.id)">구입하기</button>
        </div>
        <div class="priceContainer">
          <small class="price text-muted">{{ lib.getNumberFormatted(item.price) }}원</small>
          <small class="real text-muted">{{ lib.getNumberFormatted(item.price - (item.price * (item.discountPer / 100)))}}원</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import lib from "../scripts/libs"
export default {
  name: "Card",
  components: {},
  props: {
    item: Object,
  },
  setup() {

    const addToCart = (id) => {
      axios.post(`/api/cart/items/${id}`).then(() => {
        console.log('success');
      });
    }

    return { lib, addToCart }
  }
}
</script>

<style scoped>
.card .img {
  display: inline-block;
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
}

.card .card-body .priceContainer {
  display: flex;
  column-gap: 1rem;
}

.card .card-body .price {
  text-decoration: line-through;
}
</style>