import axios from "axios";
// import jwt_decode from "jwt-decode";
axios.defaults.baseURL = "https://dialuxury.onrender.com";

export async function getCountUser() {
  try {
    const response = await axios.get("http://localhost:3001/admin/user/count");
    console.log(response.data);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject({ error: "Can not count user" });
  }
}

export async function getCountOrder() {
  try {
    const response = await axios.get("http://localhost:3001/admin/order/count");
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject({ error: "Can not count user" });
  }
}
export async function getCountProduct() {
  try {
    const response = await axios.get(
      "http://localhost:3001/admin/product/count"
    );
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject({ error: "Can not count user" });
  }
}
export async function getRevenue() {
  try {
    const response = await axios.get("http://localhost:3001/admin/revenue");
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject({ error: "Can not count user" });
  }
}
