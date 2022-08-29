export const SHIPMARKET_TOKEN = "tok";
export const OPEN_SHIPMENT = "open_shipment";

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

export const remoneOpenShipment = () => {
  localStorage.removeItem(OPEN_SHIPMENT);
};
