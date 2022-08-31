export const SHIPMARKET_TOKEN = "tok";
export const OPEN_SHIPMENT = "open_shipment";
export const STORE = "store";

//token
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

//open shipment
export const saveOpenShipmentLocal = (_data) => {
  let stringData = JSON.stringify(_data);
  localStorage.setItem(OPEN_SHIPMENT, stringData);
};
export const checkOpenShipmentLocal = () => {
  if (localStorage[OPEN_SHIPMENT]) {
    let objData = JSON.parse(localStorage[OPEN_SHIPMENT]);
    return objData;
  } else {
    return false;
  }
};

export const removeOpenShipmentLocal = () => {
  localStorage.removeItem(OPEN_SHIPMENT);
};
//store
export const saveStoreLocal = (_data) => {
  let stringData = JSON.stringify(_data);
  localStorage.setItem(STORE, stringData);
};

export const getStoreLocal = () => {
  if (localStorage[STORE]) {
    let objData = JSON.parse(localStorage[STORE]);
    return objData;
  } else {
    return false;
  }
};

export const remoneStoreLocal = () => {
  localStorage.removeItem(STORE);
};
