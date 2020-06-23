<template>
  <div class="reset-page">
    <div class="reset-form-wrap">
      <div class="reset-form-image">
        <img src="@/assets/reset-page-bg.png" alt="" />
      </div>

      <ResetForm />
    </div>
  </div>
</template>

<script>
import ResetForm from '@/components/ResetForm.vue';

export default {
  name: 'ForgotPassword',
  components: {
    ResetForm
  }
};
</script>

<style scoped>
.reset-page {
  background-color: #d5e4e4;
  height: 100vh;
  min-height: 780px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reset-form-wrap {
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

.reset-form-image {
  height: 100%;
  overflow: hidden;
}

.reset-form-image img {
  display: block;
  height: 100%;
}
</style>
