<template>
  <header>
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-4 py-4">
              <h4 class="text-white">사이트맵</h4>
              <p class="text-white" v-if="$store.state.account.token && $store.state.account.role">관리자</p>
              <ul class="list-unstyled">
                <li><router-link class="text-white" to="/">메인 화면</router-link></li>
                <li><router-link class="text-white" to="/success" v-if="$store.state.account.token">주문 내역</router-link></li>
                <li><router-link class="text-white" to="/mypage" v-if="$store.state.account.token">마이페이지</router-link></li>
                <li>
                  <router-link class="text-white" to="/login" v-if="!$store.state.account.token">로그인</router-link>
                  <a @click="logout()" class="text-white" to="/login" v-else>로그아웃</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container">
          <router-link to="/" class="navbar-brand d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            <strong>Album</strong>
          </router-link>
          <router-link class="cartButton" to="/cart" v-if="$store.state.account.token">
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </button>
          </router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
</template>

<script>
import store from '@/scripts/store';
import router from '@/scripts/router';
import axios from 'axios';

  export default {
    name: "Header",
    components: {},
    setup() {
      const logout = () => {
        axios.post("/api/account/logout").then(() => {
          store.commit('setToken', 0);
          router.push({path: "/"});
        })
      }
      return { logout }
    }
  }
</script>

<style scoped>
.cartButton {
  margin-left: auto;
  margin-right: 1rem;
}
</style>