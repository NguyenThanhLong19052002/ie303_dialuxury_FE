import QRImg from "../Component/QRImg";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import { getUserbyId } from "../../Login1/helpers/helper";

function PaymentInfo() {
  //lấy _id của người dùng trong localStorage
  const userId = localStorage.getItem("userId");

  // lưu dữ liệu truyền vào từ trang giỏ hàng
  const location = useLocation();

  //nếu không có dữ liệu truyền vào từ giỏ hàng thì chuyển hướng sang trang chủ
  if (!location.state) {
    window.location.replace("/");
  }

  // let spList = location.state.cart.map((item) => {
  //   return {
  //     productid: item.product.image,
  //     name: item.product.name,
  //     image: item.product.category,
  //     price: item.quantity,
  //     category: item.product.dvt,
  //     dvt: item.product.price,
  //     quality: item.product.price * item.quantity, 
  //   };
  // });

  const [userName, setUserName] = useState("");

  //lấy _id của đơn hàng truyền vào từ URL
  const [hd, setHd] = useState("");
  useEffect(() => {
    // axios.get(`https://dialuxury.onrender.com/order/hd/${location.state.mahd}`)
    // .then((response) => {
    //     setHd(response.data[0]);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
  }, []);

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
  const handleSelectChange = (event) => {
    setbank(event.target.value);
  };

  //chọn hình ảnh xác thực
  const fileInputRef = useRef(null);
  const [ok, setOk] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const handleFileInput = (event) => {
    const file = event.target.files[0];
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

  //xử lý xác nhận đơn hàng thanh toán (cập nhật lại đơn hàng)
  const navigate = useNavigate();
  const createOrder = () => {
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
          <div className="px-4 my-4 my-1 text-center">
            <p>
              <b>Nếu có thông tin sai sót</b> xin vui lòng gọi số{" "}
              <b className="text-danger">0123456789</b> để được hỗ trợ miễn phí
            </p>
          </div>
        </div>
        <div className="text-center my-4">
          {(bank === 'CashImg' || (bank !== 'CashImg' && ok)) && (
            <Button onClick={createOrder} className="btn btn-primary">
              Xác nhận thanh toán
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
