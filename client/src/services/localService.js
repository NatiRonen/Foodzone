export const SHIPMARKET_TOKEN = "tok";
export const saveTokenLocal = (_token) => {
  localStorage.setItem(SHIPMARKET_TOKEN, _token);
};

export const checkTokenLocal = () => {
  if (localStorage[SHIPMARKET_TOKEN]) {
    return localStorage[SHIPMARKET_TOKEN];
  } else {
    return false;
  }
};

export const deleteToken = () => {
  localStorage.removeItem(SHIPMARKET_TOKEN);
};
