<template>
  <div>
    <div class="cartContainer">
      <ul>
        <li v-for="(i, idx) in state.items" :key="idx">
          <span class="img" :style="{ backgroundImage: `url(${i.imgPath})` }" />
          <span class="name badge bg-dark">{{ i.name }}</span>
          <span class="price">{{ lib.getNumberFormatted(i.price - (i.price * (i.discountPer / 100))) }}원</span>
          <button class="delete btn btn-danger" @click="remove(i.id)">삭제</button>
        </li>
      </ul>
    </div>
    <div class="buyContainer">
        <router-link to="/buy" class="buy btn btn-primary">구입하기</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import lib from "../scripts/libs"

export default {
  name: "cart",
  components: {},
  setup() {
    const state = reactive({
      items: [],
    })

    const remove = (id) => {
      axios.delete(`/api/cart/items/${id}`).then(() => {
        load();
      })
    }

    const load = () => {
      axios.get("/api/cart/items").then((response) => {
        state.items = response.data;
      })
    }

    load();
  
    return { state, lib, load, remove }
  
  }
}
</script>

<style scoped>
.cartContainer ul {
  list-style: none;
  margin: 10px;
  padding: 0;
}

.cartContainer li {
  display: flex;
  align-items: center;
  border: 1px solid #eeeeee;
  margin: 25px 0px;
  padding: 25px;
}

.cartContainer .img {
  width: 150px;
  height: 150px;
  background-size: cover;
  background-position: center;
}

.name {
  margin-left: 2rem;
}

.price {
  margin-left: 2rem;
}

.delete {
  margin-left: auto;
}

.buyContainer {
  display: flex;
  justify-content: center;
}

</style>