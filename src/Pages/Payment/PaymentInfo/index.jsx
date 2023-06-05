import QRImg from "../Component/QRImg";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import { getUserbyId } from "../../Login1/helpers/helper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


function PaymentInfo() {
  //lấy _id của người dùng trong localStorage
  const userId = localStorage.getItem("userId");

  // lưu dữ liệu truyền vào từ trang giỏ hàng
  const location = useLocation();

  //nếu không có dữ liệu truyền vào từ giỏ hàng thì chuyển hướng sang trang chủ
  if (!location.state) {
    window.location.replace("/");
  }

  var cart = location.state.cart.map((item) => {
    return {
      product: item.product,
      totalPrice: item.totalPrice,
      quantity: item.quantity
    };
  });

  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); //lưu trạng thái của Snackbar

  //hàm đóng Snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  

  //lấy tên user
  useEffect(() => {
    let userPromise = getUserbyId(userId);
    userPromise.then(function (res) {
      let { name } = res.data;
      setUserName(name);
    });
  }, []);

  //chọn phương thức thanh toán
  const [bank, setbank] = useState("CashImg");
  // const [method, setMethod] = useState("");
  const handleSelectChange = (event) => {
    setbank(event.target.value);
  };

  //chọn hình ảnh xác thực
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");
  const [ok, setOk] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const handleFileInput = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const fileType = file.type;
    if (fileType === "image/png" || fileType === "image/jpeg") {
      // File là file ảnh
      setOk(true);
    } else {
      // File không phải là file ảnh
      setOk(false);
      setShowErrorAlert(true);
    }
  };

  //xoá giỏ hàng khi thanh toán thành công
  const handleClearCart = async () => {
    try {
      await axios.delete("http://localhost:3001/cart/clear");
    } catch (error) {
      console.error(error);
    }
  };

  //xử lý xác nhận đơn hàng thanh toán (cập nhật lại đơn hàng)
  const navigate = useNavigate();
  const createOrder = async () => {
    // const updateData = new FormData();
    // updateData.append('diachigiaohang', user.address);
    // updateData.append('hinhanh', fileInputRef.current.files[0]);
    //cập nhật lại diachigiaohang và hinhanh của order có location.state.mahd này
    // axios.put(`https://dialuxury.onrender.com/order/${hd._id}`, updateData)
    //     .then((response) => {
    //         const mahd = location.state.mahd;
    //             navigate("/paymentfinish", {
    //                 state: { mahd },
    //             });
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    let method = '';
    if(bank === "CashImg"){
      method = 'Tiền mặt';
    }
    else if(bank === "MomoQR"){
      method = 'Momo';
    }
    else if(bank === "BIDVQR"){
      method = 'BIDV';
    }
    else {
      method = 'ZaloPay';
    }
    const data = {
      cart: cart,
      image: image,
      shippingAddress: address,
      paymentMethod: method,
      total: location.state.total
    };
    //gọi api thêm hoá đơn
    await axios
      .post(`http://localhost:3001/orders/${userId}/create`, data)
        .then((response) => {
          console.log(response.data);
          setOpenSnackbar(true);
          handleClearCart();
          setTimeout(() => {
            navigate("/paymentfinish");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return (
    <div className={" d-flex justify-content-center"}>
      <div className="w-75">
        <h1 className="text-center pt-4 pb-1">Thông tin thanh toán</h1>

        <div className="my-12 px-4 py-2">
          <p className="text-center">
            Quý khách vui lòng chọn phương thức thanh toán
          </p>
          <div className={" d-flex justify-content-center my-4 "}>
            <select
              className="text-center py-2 px-2 rounded"
              onChange={handleSelectChange}
            >
              <option key={1} value="CashImg">
                Cash
              </option>
              <option key={2} value="MomoQR">
                Momo
              </option>
              <option key={3} value="BIDVQR">
                BIDV
              </option>
              <option key={4} value="ZalopayQR">
                ZalopayQR
              </option>
            </select>
          </div>

          {(() => {
            if (bank === "CashImg")
              return (
                <QRImg
                  bank={"CashImg"}
                  total={location.state.total}
                  name={userName}
                ></QRImg>
              );
            else if (bank === "MomoQR")
              return (
                <QRImg
                  bank={"MomoQR"}
                  total={location.state.total}
                  name={userName}
                ></QRImg>
              );
            else if (bank === "ZalopayQR")
              return (
                <QRImg
                  bank={"ZalopayQR"}
                  total={location.state.total}
                  name={userName}
                ></QRImg>
              );
            else
              return (
                <QRImg
                  bank={"BIDVQR"}
                  total={location.state.total}
                  name={userName}
                ></QRImg>
              );
          })()}

          <div className="d-flex justify-content-center mt-4">
            {bank !== "CashImg" && (
              <div>
                <input
                  type="file"
                  accept=".png,.jpg"
                  onChange={handleFileInput}
                  ref={fileInputRef}
                />
                {showErrorAlert && (
                  <Alert
                    variant="danger"
                    onClose={() => setShowErrorAlert(false)}
                    dismissible
                  >
                    Đây không phải tệp hình ảnh!
                  </Alert>
                )}
              </div>
            )}
          </div>
          <div className="px-4 my-4 my-1 text-center" style={{ width: '50%', margin: 'auto' }}>
          <InputGroup>
            <InputGroup.Text>Địa chỉ giao hàng:</InputGroup.Text>
            <Form.Control as="textarea" aria-label="textarea" rows={4} onChange={(e) => setAddress(e.target.value)}/>
          </InputGroup>
          </div>
          <div className="px-4 my-4 my-1 text-center">
            <p>
              <b>Nếu có thông tin sai sót</b> xin vui lòng gọi số{" "}
              <b className="text-danger">0123456789</b> để được hỗ trợ miễn phí
            </p>
          </div>
        </div>
        <div className="text-center my-4">
          {(bank === "CashImg" || (bank !== "CashImg" && ok)) && (
            <Button onClick={createOrder} className="btn btn-primary">
              Xác nhận thanh toán
            </Button>
          )}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={1500} // Thời gian tự động đóng Snackbar (ms)
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }} // Vị trí hiển thị
          >
            <MuiAlert
              onClose={handleSnackbarClose}
              severity="success" // Loại thông báo (success, error, warning, info)
              sx={{ width: "100%" }}
              elevation={6}
              variant="filled"
            >
              Thanh toán thành công!
            </MuiAlert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
