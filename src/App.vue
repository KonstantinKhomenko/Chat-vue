<template>
  <div id="app">
    <Notifier />
    <router-view />
  </div>
</template>

<script>
import Notifier from '@/components/Notification.vue';

export default {
  components: {
    Notifier
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
}
</style>
