<template>
  <div class="reset-form">
    <h1 class="reset-form-title">Reset password</h1>
    <p class="reset-form-description">Enter a new password</p>

    <el-form :model="formData" :rules="rules" ref="resetForm">
      <el-form-item label="Email" prop="email" size="small">
        <el-input v-model="formData.email" />
      </el-form-item>

      <el-form-item label="New password" prop="password" size="small">
        <el-input
          class="form-input"
          v-model="formData.password_1"
          type="password"
          :show-password="true"
        />
        <el-input v-model="formData.password_2" type="password" :show-password="true" />
      </el-form-item>

      <div>
        <el-button type="danger" plain size="small" native-type="submit">Reset</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data: () => ({
    formData: {
      email: '',
      password_1: '',
      password_2: ''
    },
    rules: {}
  })
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

.form-input {
  margin-bottom: 10px;
}
</style>
