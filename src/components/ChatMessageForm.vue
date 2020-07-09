<template>
  <div class="chat-message-form">
    <template v-if="!isJoin">
      <div class="join-chat">
        <span class="join-text">Please join chat</span>
        <el-button type="primary" size="small" @click="joinChat">
          Join
        </el-button>
      </div>
    </template>

    <template v-else>
      <el-input v-model="text" type="textarea" class="message-control" @input="onInputMessage" />
      <el-button type="primary" icon="el-icon-message" circle @click="submitMsg" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'ChatMessageForm',
  data: () => ({
    text: ''
  }),

  props: {
    isJoin: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    joinChat() {
      this.$emit('joinChat');
    },
    onInputMessage() {
      this.$emit('typing');
    },
    submitMsg() {
      this.$emit('submitMessage', this.text);
      this.text = '';
    }
  }
};
</script>

<style scoped>
.chat-message-form {
  margin-top: auto;
  display: flex;
  padding: 20px 30px;
  background-color: #fff;
  align-items: center;
}

.join-chat {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.join-text {
  margin-right: 10px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
}

.message-control >>> .el-textarea__inner {
  border: none;
  margin-right: 20px;
  resize: none;
}
</style>
