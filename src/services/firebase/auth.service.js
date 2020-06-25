import firebase from '@/plugins/firebase';

const auth = firebase.auth();

export const firebaseLogin = async (email, password) => {
  try {
    const data = await auth.signInWithEmailAndPassword(email, password);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const firebaseLogout = async () => {
  try {
    const data = await auth.signOut();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const firebaseResetPassword = async email => {
  try {
    const data = await auth.sendPasswordResetEmail(email);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const firebaseRegister = async (email, password) => {
  try {
    const data = await auth.createUserWithEmailAndPassword(email, password);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
