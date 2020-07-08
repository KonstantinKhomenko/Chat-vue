<template>
  <main class="current-chat">
    <template v-if="!selectedChatId">
      <NoSelectedChat />
    </template>

    <template v-else>
      <ChatMessages :messages="currentChatMessages" :current-user-id="user._id" />
      <ChatMessageForm :is-join="isUserJoinSelectedChat" @joinChat="onJoinChat" />
    </template>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Emitters from '@/plugins/socket/emitters';
import Listeners from '@/plugins/socket/listeners';
import NoSelectedChat from '@/components/NoSelectedChat.vue';
import ChatMessages from '@/components/ChatMessages.vue';
import ChatMessageForm from '@/components/ChatMessageForm.vue';

export default {
  name: 'CurrentChat',
  components: {
    NoSelectedChat,
    ChatMessages,
    ChatMessageForm
  },

  computed: {
    ...mapGetters('chats', ['selectedChatId', 'currentChatMessages']),
    ...mapGetters('user', ['user', 'fullName']),
    isUserJoinSelectedChat() {
      return this.user.chats.includes(this.selectedChatId);
    }
  },

  methods: {
    ...mapActions('user', ['getUser']),
    onJoinChat() {
      this.$socket.emit(Emitters.JOIN_CHAT, {
        chatId: this.selectedChatId,
        userName: this.fullName,
        userId: this.user._id
      });
    }
  },

  mounted() {
    this.$socket.on(Listeners.NEW_USER_JOIN, ({ userId }) => {
      if (userId === this.user._id) {
        this.getUser(this.user.email);
      }
    });
  }
};
</script>

<style scoped>
.current-chat {
  background-color: #fdfcfe;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
}
</style>
