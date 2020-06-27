<template>
  <div class="login-form">
    <h1>Welcome</h1>
    <p class="login-form-description">Welcome to the live chat! Please login to join.</p>

    <el-form
      :model="formData"
      :rules="rules"
      @submit.native.prevent="submitHandler"
      ref="loginForm"
    >
      <el-form-item label="Email" prop="email" size="small">
        <el-input v-model="formData.email" />
      </el-form-item>

      <el-form-item label="Password" prop="password" size="small">
        <el-input v-model="formData.password" type="password" :show-password="true" />
      </el-form-item>

      <router-link :to="{ name: 'ForgotPassword' }">
        <ElLink type="info">Forgot password? Reset password</ElLink>
      </router-link>

      <div class="form-action">
        <el-button type="success" plain size="small" native-type="submit" :loading="loginInProgress"
          >Login</el-button
        >
      </div>

      <router-link :to="{ name: 'SignUp' }">
        <ElLink type="primary">Don't have account? Sign Up</ElLink>
      </router-link>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginForm',
  data: () => ({
    formData: {
      email: '',
      password: ''
    },
    rules: {
      email: [
        { required: true, message: 'Please input email address', trigger: 'blur' },
        { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
      ],
      password: [{ required: true, message: 'Please input password', trigger: 'blur' }]
    }
  }),

  computed: {
    ...mapGetters('auth', ['loginInProgress', 'isLoggedIn'])
  },

  watch: {
    isLoggedIn: 'redirectToHome'
  },

  methods: {
    ...mapActions('auth', ['login']),
    submitHandler() {
      this.$refs.loginForm.validate(isValid => {
        if (!isValid) return;
        this.login({ ...this.formData });
      });
    },

    redirectToHome(val) {
      if (val) {
        this.$router.push({ name: 'Home' });
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  padding: 20px 80px;
  width: 350px;
}

.login-form-description {
  margin-bottom: 30px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
}

.form-action {
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
