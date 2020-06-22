<template>
  <div class="home">
    <h1>Home</h1>
    <el-button type="danger" @click="logoutUser">Logout</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Home',

  methods: {
    ...mapActions('auth', ['logout']),
    async logoutUser() {
      await this.logout();
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>
