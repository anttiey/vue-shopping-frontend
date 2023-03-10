<template>
    <div>
        <h1>마이페이지에 오신 걸 환영합니다!</h1>
        <ul>
            <li v-if="$store.state.account.role === 1">Role: 관리자</li>
            <li v-if="$store.state.account.role === 0">Role: 일반 회원</li>
        </ul>
    </div>
</template>

<script>
import store from "@/scripts/store"
export default {
    name: "mypage",
    components: {},
    setup() {
        
    }
}
</script>

<style scoped>
    h1 {
        display: flex;
        justify-content: center;
    }

    li {
        list-style: none;
    }
</style>