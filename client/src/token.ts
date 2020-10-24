let accessToken = "";

export const getAccessToken = () => {
  return accessToken || localStorage.getItem("token");
};

export const setAccessToken = (token: string) => {
  accessToken = token;
  localStorage.setItem("token", accessToken);
};

export const clearAccessToken = () => {
  accessToken = "";
  localStorage.clear();
};
