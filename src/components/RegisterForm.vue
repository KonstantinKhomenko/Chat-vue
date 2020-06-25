<template>
  <div class="register-form">
    <h2>Registration</h2>
    <p class="register-form-description">Enter your email and password to register</p>

    <el-form
      :model="formData"
      :rules="rules"
      ref="registerForm"
      @submit.native.prevent="submitHandler"
    >
      <el-form-item label="Email" prop="email" size="small">
        <el-input v-model="formData.email" />
      </el-form-item>

      <el-form-item label="Password" prop="pass_1" size="small">
        <el-input v-model="formData.pass_1" type="password" :show-password="true" />
      </el-form-item>

      <el-form-item prop="pass_2" size="small">
        <el-input v-model="formData.pass_2" type="password" :show-password="true" />
      </el-form-item>

      <div>
        <el-button type="success" plain size="small" native-type="submit" :loading="loginInProgress"
          >Register</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RegisterForm',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('Password should be at least 6 characters'));
      } else if (value !== this.formData.pass_2) {
        callback(new Error('Passwords must match'));
      } else {
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (value !== this.formData.pass_1) {
        callback(new Error('Passwords must match'));
      } else {
        if (this.formData.pass_1 !== '') {
          this.$refs.registerForm.validateField('pass_1');
        }
        callback();
      }
    };

    return {
      formData: {
        email: '',
        pass_1: '',
        pass_2: ''
      },

      rules: {
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
        ],
        pass_1: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        pass_2: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },

  computed: {
    ...mapGetters('auth', ['loginInProgress'])
  },

  methods: {
    ...mapActions('auth', ['register']),
    submitHandler() {
      this.$refs.registerForm.validate(isValid => {
        if (!isValid) return;
        this.register({ ...this.formData });
      });
    }
  }
};
</script>

<style scoped>
.register-form {
  padding: 20px 80px;
  width: 400px;
}

.register-form-description {
  margin-bottom: 30px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
}
</style>
