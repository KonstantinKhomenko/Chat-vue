<template>
  <div class="login-form">
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
        <el-input v-model="formData.password" type="password" />
      </el-form-item>
      <el-button type="success" plain size="small" native-type="submit" :loading="loginInProgress"
        >Login</el-button
      >
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
    ...mapGetters('auth', ['loginInProgress'])
  },

  methods: {
    ...mapActions('auth', ['login']),
    submitHandler() {
      this.$refs.loginForm.validate(isValid => {
        if (!isValid) return;
        this.login({ ...this.formData });
      });
    }
  }
};
</script>

<style scoped></style>
