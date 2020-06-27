import mutations from '@/store/mutations';
import {
  firebaseLogin,
  firebaseLogout,
  firebaseResetPassword,
  firebaseRegister
} from '@/services/firebase/auth.service';
import router from '@/router';

const { IS_LOGGED_IN, LOGIN_LOADER, IS_FIRST_LOGIN } = mutations;

const authStore = {
  namespaced: true,

  state: {
    isLoggedIn: Boolean(localStorage.getItem('vue_app_token')),
    loginInProgress: false,
    isFirstLogin: false
  },

  getters: {
    isLoggedIn: ({ isLoggedIn }) => isLoggedIn,
    loginInProgress: ({ loginInProgress }) => loginInProgress,
    isFirstLogin: ({ isFirstLogin }) => isFirstLogin
  },

  mutations: {
    [IS_LOGGED_IN](state, bool) {
      state.isLoggedIn = bool;
    },

    [LOGIN_LOADER](state, bool) {
      state.loginInProgress = bool;
    },

    [IS_FIRST_LOGIN](state, bool) {
      state.isFirstLogin = bool;
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
        const data = await firebaseRegister(email, password);
        commit(IS_FIRST_LOGIN, data.additionalUserInfo.isNewUser);
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
