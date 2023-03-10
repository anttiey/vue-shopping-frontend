<template>
  <div class="container">
    <div class="py-5 text-center">
      <h2>주문하기</h2>
    </div>
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3"><span class="text-muted">Your cart</span><span
            class="badge badge-secondary badge-pill">3</span></h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-condensed" v-for="(i, idx) in state.items" :key="idx">
            <div>
              <h6 class="my-0">{{ i.name }}</h6>
            </div><span class="text-muted">{{ lib.getNumberFormatted(i.price - (i.price * (i.discountPer / 100))) }}원</span>
          </li>
          <li class="list-group-item d-flex justify-content-between"><span>Total (\)</span><strong>{{ lib.getNumberFormatted(computedPrice) }}원</strong></li>
        </ul>
      </div>
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">주문자 정보</h4>
        <div class="needs-validation" novalidate="">
          <div class="row"></div>
          <div class="mb-3"><label for="username">이름</label>
            <div class="input-group">
              <div class="input-group-prepend"><span class="input-group-text">@</span></div><input type="text"
                class="form-control" id="username" v-model="state.form.name">
              <div class="invalid-feedback" style="width:100%;"> Your username is required. </div>
            </div>
          </div>
          <div class="mb-3"><label for="address">주소</label><input type="text" class="form-control" id="address"
              v-model="state.form.address">
            <div class="invalid-feedback"> Please enter your shipping address. </div>
          </div>
          <div class="row"></div>
          <hr class="mb-4">
          <div class="custom-control custom-checkbox"></div>
          <div class="custom-control custom-checkbox"></div>
          <h4 class="mb-3">결제 수단</h4>
          <div class="d-block my-3">
            <div class="custom-control custom-radio"><input id="credit" name="paymentMethod" type="radio"
                class="custom-control-input" value="credit" v-model="state.form.payment"><label class="custom-control-label"
                for="credit">Credit card</label></div>
            <div class="custom-control custom-radio"><input id="debit" name="paymentMethod" type="radio"
                class="custom-control-input" value="debit" v-model="state.form.payment"><label class="custom-control-label" for="debit">Debit
                card</label></div>
            <div class="custom-control custom-radio"><input id="paypal" name="paymentMethod" type="radio"
                class="custom-control-input" value="paypal" v-model="state.form.payment"><label class="custom-control-label" for="paypal">Paypal</label>
            </div>
          </div>
          <div class="mb-3"><label for="cc-name">Name on card</label><input type="text" class="form-control"
                id="cc-name" v-model="state.form.cardNumber"><small class="text-muted">Full name as displayed on card</small>
              <div class="invalid-feedback"> Name on card is required </div>
          </div>
          <hr class="mb-4"><button class="btn btn-primary btn-lg btn-block" @click="submit()">결제하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive, computed } from "vue";
import router from "@/scripts/router";
import lib from "../scripts/libs";

export default {
  name: "buy",
  components: {},
  setup() {

    const state = reactive({
      items: [],
      form: {
        name: "",
        address: "",
        payment: "",
        cardNumber: "",
        items: ""
      }
    })

    const load = () => {
      axios.get("/api/cart/items").then((response) => {
        state.items = response.data;
      })
    }

    const submit = () => {
      axios.post("/api/orders").then(() => {
        router.push({path: "/success"}) // 주문 완료되면 주문 완료 페이지로 이동
      })
    }

    const computedPrice = computed(() => {
      let result = 0;

      for (let i of state.items) {
        result += i.price - (i.price * (i.discountPer / 100));
      }
      
      return result;
    })

    load();


    return { state, load, lib, computedPrice, submit }

  }
}
</script>

<style scoped></style>