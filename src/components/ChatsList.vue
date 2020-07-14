<template>
  <div class="chats-list">
    <template v-for="(chat, index) in publicChats">
      <ChatsListItem
        :key="index"
        :chat="chat"
        @selectChat="onChatSelect"
        :is-selected="selectedChatId === chat._id"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Emitters from '@/plugins/socket/emitters';
import ChatsListItem from '@/components/ChatsListItem.vue';

export default {
  name: 'ChatsList',
  components: {
    ChatsListItem
  },

  computed: {
    ...mapGetters('chats', ['publicChats', 'selectedChatId']),
    ...mapGetters('user', ['user'])
  },

  watch: {
    user: 'setChatOnGetUser'
  },

  methods: {
    ...mapActions('chats', ['getPublicChats', 'selectChat']),
    setChatId(id) {
      this.selectChat(id);
      this.$socket.emit(Emitters.SELECT_CHAT, { chatId: id });
    },
    onChatSelect(id) {
      if (id === this.selectedChatId) return;

      this.setChatId(id);
      this.$router.push({ query: { chatId: id } });
    },
    setChatOnGetUser(user) {
      if (!this.$route.query.chatId || !user._id) return;

      this.setChatId(this.$route.query.chatId);
    }
  },

  mounted() {
    this.getPublicChats();
  }
};
</script>
