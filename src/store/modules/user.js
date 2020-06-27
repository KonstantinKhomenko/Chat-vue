import mutations from '@/store/mutations';
import axios from '@/plugins/axios';

const { USER } = mutations;

const userStore = {
  namespaced: true,
  state: {
    user: null
  },

  getters: {
    user: ({ user }) => user
  },

  mutations: {
    [USER](state, obj) {
      state.user = obj;
    }
  },

  actions: {
    setUserState: {
      handler({ dispatch }, user) {
        dispatch('getUser', user);
      },
      root: true
    },

    async createUserInfo(context, data) {
      try {
        await axios.post('/users', data);
      } catch (err) {
        console.log(err);
      }
    },

    async getUser({ commit }, { email }) {
      try {
        const user = await axios.get(`/users/${email}`);
        commit(USER, user);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default userStore;
