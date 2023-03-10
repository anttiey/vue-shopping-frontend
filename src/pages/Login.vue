<template>
  <div class="text-center">
    <form class="form-signin" @submit.prevent>
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus
        @keyup.enter="submit()" 
        v-model="state.form.email"> <!-- Enter 누르면 Submit 됨 -->
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required
        @keyup.enter="submit()" 
        v-model="state.form.password">
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" @keyup.enter="submit()">Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" @click="submit()">Sign in</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue"; 
import store from "@/scripts/store";
import router from "@/scripts/router";

  export default {
    name: "Login",
    components: {},
    setup() {
      const state = reactive({
        form: {
          email: "",
          password: "",
        }
      })

      const submit = () => {
        axios.post("/api/account/login", state.form).then((res) => {
          store.commit('setToken', res.data);
          console.log(res.data);
          window.alert("로그인 성공!");
          router.push({path: "/"});
        }).catch(() => {
          window.alert("로그인 정보가 존재하지 않습니다.");
        })
      }

      return { state, submit }
    }
  }
</script>

<style scoped>
  .form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>