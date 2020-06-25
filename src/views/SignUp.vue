<template>
  <div class="register-page">
    <div class="register-form-wrap">
      <div class="register-form-image">
        <img src="@/assets/register-page-bg.png" alt="" />
      </div>
      <RegisterForm />
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'SignUp',
  components: {
    RegisterForm
  }
};
</script>

<style scoped>
.register-page {
  background-color: #d5e4e4;
  height: 100vh;
  min-height: 780px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-form-wrap {
  width: 100%;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 30px 90px #a7d7d9;
  height: 600px;
  overflow: hidden;
}

.register-form-image {
  height: 100%;
  overflow: hidden;
}

.register-form-image img {
  display: block;
  height: 100%;
}
</style>
