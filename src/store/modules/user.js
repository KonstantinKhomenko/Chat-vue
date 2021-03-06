import mutations from '@/store/mutations';
import axios from '@/plugins/axios';

const { USER } = mutations;

const userStore = {
  namespaced: true,
  state: {
    user: {}
  },

  getters: {
    user: ({ user }) => user,
    fullName: ({ user }) => `${user.firstName || ''} ${user.lastName || ''}`
  },

  mutations: {
    [USER](state, { data }) {
      state.user = data;
    }
  },

  actions: {
    setUserState: {
      handler({ dispatch }, user) {
        if (user) {
          dispatch('getUser', user);
        }
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
        const res = await axios.get(`/users/${email}`);
        commit(USER, res);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default userStore;
