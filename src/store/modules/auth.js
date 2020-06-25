import mutations from '@/store/mutations';
import {
  firebaseLogin,
  firebaseLogout,
  firebaseResetPassword,
  firebaseRegister
} from '@/services/firebase/auth.service';
import router from '@/router';

const { IS_LOGGED_IN, LOGIN_LOADER } = mutations;

const authStore = {
  namespaced: true,

  state: {
    isLoggedIn: false,
    loginInProgress: false
  },

  getters: {
    isLoggedIn: ({ isLoggedIn }) => isLoggedIn,
    loginInProgress: ({ loginInProgress }) => loginInProgress
  },

  mutations: {
    [IS_LOGGED_IN](state, bool) {
      state.isLoggedIn = bool;
    },

    [LOGIN_LOADER](state, bool) {
      state.loginInProgress = bool;
    }
  },

  actions: {
    setIsLoggedInState: {
      handler({ commit }, bool) {
        commit(IS_LOGGED_IN, bool);
      },
      root: true
    },

    async login({ commit, dispatch }, { email, password }) {
      try {
        commit(LOGIN_LOADER, true);
        await firebaseLogin(email, password);
      } catch (err) {
        dispatch('loadMessage', { message: err.message, type: 'error' }, { root: true });
      } finally {
        commit(LOGIN_LOADER, false);
      }
    },

    async logout() {
      try {
        await firebaseLogout();
      } catch (err) {
        console.log(err);
      }
    },

    async resetPassword({ commit, dispatch }, email) {
      try {
        commit(LOGIN_LOADER, true);
        await firebaseResetPassword(email);
        dispatch(
          'loadMessage',
          { message: 'Password reset email sent successfully!', type: 'success' },
          { root: true }
        );
        router.push({ name: 'Login' });
      } catch (err) {
        dispatch('loadMessage', { message: err.message, type: 'error' }, { root: true });
      } finally {
        commit(LOGIN_LOADER, false);
      }
    },

    async register({ commit, dispatch }, { email, pass_1: password }) {
      try {
        commit(LOGIN_LOADER, true);
        await firebaseRegister(email, password);
        dispatch(
          'loadMessage',
          { message: 'User successfully registered!', type: 'success' },
          { root: true }
        );
      } catch (err) {
        dispatch('loadMessage', { message: err.message, type: 'error' }, { root: true });
      } finally {
        commit(LOGIN_LOADER, false);
      }
    }
  }
};

export default authStore;
