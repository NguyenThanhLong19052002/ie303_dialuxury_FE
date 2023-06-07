import axios from "axios";
// import jwt_decode from "jwt-decode";
axios.defaults.baseURL = "https://dialuxury.onrender.com";
export async function registerUser(credentials) {
  try {
    // console.log(credentials);
    const {
      data: { msg },
    } = await axios.post("http://localhost:3001/user/signup", credentials);

    //send email

    return Promise.resolve(msg);
  } catch (error) {
    if (
      error.response &&
      error.response.status === 500 &&
      error.response.data.error === "Email already exists"
    ) {
      throw new Error("Email already exists");
    } else if (
      error.response &&
      error.response.status === 500 &&
      error.response.data.error === "Phone already exists"
    ) {
      throw new Error("Phone already exists");
    } else {
      throw new Error("Could not register");
    }
  }
}

export async function verifyLogin({ email, password }) {
  try {
    const data = await axios.post("http://localhost:3001/user/login", {
      email,
      password,
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject({ error: "Password doesn't match" });
  }
}

export async function sentOTP(email) {
  try {
    const { data } = await axios.post(
      `http://localhost:3001/user/${email}/forgot`
    );
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Error when sent OTP" });
  }
}
export async function getUserbyId(_id) {
  try {
    const response = await axios.get(`http://localhost:3001/user/${_id}`);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject({ error: "Can not get user" });
  }
}
export async function getUserByEmail(email) {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/email/${email}`
    );
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject({ error: "Can not get user" });
  }
}
export async function getServiceType() {
  try {
    const { data } = await axios.get("/serviceType");
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Can not get user" });
  }
}
export async function verifyOTP(email, code) {
  try {
    // console.log(email);
    const { data, status } = await axios.get(
      `http://localhost:3001/user/${email}/reset?code=${code}`
    );
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function resetPassword(email, newPassword) {
  try {
    const { data, status } = await axios.put(
      `http://localhost:3001/user/${email}/recovery`,
      {
        newPassword,
      }
    );
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
export async function changePassword({ _id, currentPassword, newPassword }) {
  try {
    const { data, status } = await axios.put(
      `http://localhost:3001/user/${_id}/change-password`,
      {
        _id,
        currentPassword,
        newPassword,
      }
    );
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
export function myFunction() {
  console.log("click");
}
export async function updateUser(user, _id) {
  try {
    // const token = await localStorage.getItem("token");

    // console.log({ user });
    const { data, status } = await axios.patch(
      `http://localhost:3001/user/${_id}`,
      user
    );
    return Promise.resolve({ data });
  } catch (error) {
    if (
      error.response &&
      error.response.status === 409 &&
      error.response.data.error === "Email already exists"
    ) {
      throw new Error("Email already exists");
    }
    if (
      error.response &&
      error.response.status === 409 &&
      error.response.data.error === "Phone already exists"
    ) {
      throw new Error("Phone already exists");
    }
  }
}

export async function getAllOrders(_id) {
  try {
    const response = await axios.get(
      `http://localhost:3001/orders/user/${_id}`
    );
    let data = Object.values(response.data);

    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    return Promise.reject({ error: "can not get Orders" });
  }
}
export async function getAllOrdersByOrderId(_id) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/orders/order/${_id}`
    );
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    return Promise.reject({ error: "can not get Orders by OrderId" });
  }
}
export async function getAllOrdersAllUser() {
  try {
    const { data } = await axios.get("http://localhost:3001/orders");
    // console.log(await axios.get("/orderall"));
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    return Promise.reject({ error: "can not get Orders" });
  }
}
export async function getOrderbyId(_orderid) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/orders/${_orderid}/get`
    );
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "can not get order" });
  }
}
export async function cancelOrderbyId(_orderid) {
  try {
    // console.log(_orderid);
    const { data } = await axios.put(`http://localhost:3001/orders/${_orderid}/updateStatus`, {
      status: "Đã hủy"
    });
    return Promise.resolve({ data });
  } catch (error) {
    console.log(error);
    return Promise.reject({ error: "can not cancel order" });
  }
}

export async function deliveredOrderbyId(_orderid) {
  try {
    // console.log(_orderid);
    const { data } = await axios.put(`http://localhost:3001/orders/${_orderid}/updateStatus`, {
      status: "Đã giao hàng"
    });
    return Promise.resolve({ data });
  } catch (error) {
    console.log(error);
    return Promise.reject({ error: "Password doesnt match" });
  }
}
export async function confirmOrderbyId(_orderid) {
  try {
    // console.log(_orderid);
    const { data } = await axios.put(`http://localhost:3001/orders/${_orderid}/updateStatus`, {
      status: "Đang giao hàng"
    });
    return Promise.resolve({ data });
  } catch (error) {
    console.log(error);
    return Promise.reject({ error: "Password doesnt match" });
  }
}
export async function scheduleMail(date, email, body) {
  try {
    const { data } = await axios.post("/schedule", {
      date,
      email,
    });
    await axios.post("/service", {
      body,
    });
    return Promise.resolve({ data });
  } catch (error) {
    console.log(error);
    return Promise.reject({ error: "can not schedule" });
  }
}
