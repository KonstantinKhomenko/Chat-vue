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
// import Emitters from '@/plugins/socket/emitters';
import ChatsListItem from '@/components/ChatsListItem.vue';

export default {
  name: 'ChatsList',
  components: {
    ChatsListItem
  },

  computed: {
    ...mapGetters('chats', ['publicChats', 'selectedChatId'])
  },

  methods: {
    ...mapActions('chats', ['getPublicChats', 'selectChat']),
    onChatSelect(id) {
      this.selectChat(id);
      // this.$socket.emit(Emitters.SELECT_CHAT, { chatId: id });
    }
  },

  mounted() {
    this.getPublicChats();
  }
};
</script>
