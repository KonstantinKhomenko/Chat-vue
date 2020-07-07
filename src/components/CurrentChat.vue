<template>
  <main class="current-chat">
    <template v-if="!selectedChatId">
      <NoSelectedChat />
    </template>

    <template v-else>
      <ChatMessages :messages="currentChatMessages" :current-user-id="user._id"/>
      <ChatMessageForm />
    </template>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters('user', ['user'])
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
