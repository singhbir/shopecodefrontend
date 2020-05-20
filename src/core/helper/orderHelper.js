import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const findOrderbyUserId = async (userId, token) => {
  return await fetch(`${API}/order/find/${userId}`, {
    mode:"cors",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) =>  {
     let d = await response.json()
     console.log("D",d)
     return d
    })
    .catch((error) => console.log(error));
};