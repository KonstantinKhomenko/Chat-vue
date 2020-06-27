function setAuthToken(config) {
  const token = localStorage.getItem(process.env.VUE_APP_LS_TOKEN_KEY);
  const customConfig = { ...config };
  customConfig.headers.Authorization = `Bearer ${token}`;
  return customConfig;
}

export default function (axios) {
  axios.interceptors.request.use(setAuthToken);
}
