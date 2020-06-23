import mutations from '@/store/mutations';

const { SHOW_NOTIFY } = mutations;

const notifyStore = {
  state: {
    messagePool: []
  },

  getters: {
    lastMessage: ({ messagePool }) => messagePool[messagePool.length - 1]
  },

  actions: {
    loadMessage({ commit }, payload = {}) {
      commit(SHOW_NOTIFY, payload);
    }
  },

  mutations: {
    [SHOW_NOTIFY](state, msg) {
      state.messagePool.push(msg);
    }
  }
};

export default notifyStore;
