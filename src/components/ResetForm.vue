<template>
  <div class="reset-form">
    <h3>Forgot password?</h3>
    <p class="reset-form-description">Enter email to reset password</p>

    <el-form :model="formData" :rules="rules" ref="resetForm" @submit.native.prevent="onSubmit">
      <el-form-item prop="email" size="small">
        <el-input v-model="formData.email" />
      </el-form-item>

      <div>
        <el-button type="primary" plain size="small" native-type="submit" :loading="loginInProgress"
          >Reset</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ResetForm',
  data: () => ({
    formData: { email: '' },
    rules: {
      email: [
        { required: true, message: 'Please input email address', trigger: 'blur' },
        { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
      ]
    }
  }),

  computed: {
    ...mapGetters('auth', ['loginInProgress'])
  },

  methods: {
    ...mapActions('auth', ['resetPassword']),
    onSubmit() {
      this.$refs.resetForm.validate(isValid => {
        if (!isValid) return;
        this.resetPassword(this.formData.email);
      });
    }
  }
};
</script>

<style scoped>
.reset-form {
  padding: 20px 80px;
  width: 350px;
}

.reset-form-description {
  margin-bottom: 30px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
}
</style>
