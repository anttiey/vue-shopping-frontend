<template>
  <body>
    <Header />
    <RouterView />
    <Footer />
  </body>
</template>

<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import store from "@/scripts/store"

import { useRoute } from "vue-router"
import { watch } from "vue"
import axios from "axios"

export default {
  name: "App",
  components: { Header, Footer },
  setup() {
    const check = () => {
      axios.get("/api/account/check").then(({ data }) => {
        console.log(data);
        store.commit("setToken", data.id || 0);
        store.commit("setAdmin", data.admin || 0);
      })
    };

    const route = useRoute();

    watch(route, () => { /* route 함수가 바뀔 때마다 check 함수 실행 */
      check();
    })

    return { check }
  }
}
</script>

<style>
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }

  .b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
  }

  .b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
  }

  .bi {
    vertical-align: -.125em;
    fill: currentColor;
  }

  .nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
  }

  .nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
</style>
