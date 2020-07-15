<template>
  <div class="chats-list">
    <template v-for="(chat, index) in publicChats">
      <ChatsListItem
        :key="index"
        :chat="chat"
        @selectChat="onChatSelect"
        :is-selected="selectedChatId === chat._id"
        :chat-ids-pool="chatIdsPool"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Emitters from '@/plugins/socket/emitters';
import Listeners from '@/plugins/socket/listeners';
import ChatsListItem from '@/components/ChatsListItem.vue';

export default {
  name: 'ChatsList',
  components: {
    ChatsListItem
  },

  data: () => ({
    chatIdsPool: []
  }),

  computed: {
    ...mapGetters('chats', ['publicChats', 'selectedChatId']),
    ...mapGetters('user', ['user'])
  },

  watch: {
    user: 'setChatOnGetUser',
    publicChats: 'connectToChats'
  },

  methods: {
    ...mapActions('chats', ['getPublicChats', 'selectChat']),

    setChatId(id) {
      this.selectChat(id);
      this.removeChatIdFromPool(id);
    },

    onChatSelect(id) {
      if (id === this.selectedChatId) return;

      this.setChatId(id);
      this.$router.push({ query: { chatId: id } });
    },

    setChatOnGetUser(user) {
      if (!this.$route.query.chatId || !user._id) return;

      this.setChatId(this.$route.query.chatId);
    },

    setChatIdToPool(id) {
      const isExist = this.chatIdsPool.some(chatId => chatId === id);
      if (isExist) return;

      this.chatIdsPool.push(id);
    },

    connectToChats(chats) {
      chats.forEach(chat => {
        this.$socket.emit(Emitters.SELECT_CHAT, { chatId: chat._id });
      });
    },

    removeChatIdFromPool(id) {
      if (!this.chatIdsPool.length) return;

      const index = this.chatIdsPool.findIndex(existId => existId === id);

      if (index !== -1) {
        this.chatIdsPool.splice(index, 1);
      }
    }
  },

  mounted() {
    this.getPublicChats();

    this.$socket.on(Listeners.NEW_MESSAGE, data => {
      if (data.chat !== this.selectedChatId) {
        this.setChatIdToPool(data.chat);
      }
    });
  }
};
</script>
