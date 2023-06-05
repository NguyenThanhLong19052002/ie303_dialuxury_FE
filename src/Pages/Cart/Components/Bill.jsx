import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

import { Button, Alert } from "react-bootstrap";

function Bill({ cart, total }) {
  //Kiểm tra trạng thái đăng nhập
  const token = localStorage.getItem("token");
  //lấy id của người dùng trong localStorage
  const Id = localStorage.getItem("userId");

  const [showModal, setShowModal] = useState(false);
  const [thanhtoan, setThanhtoan] = useState(false);

  const handleThanhtoan = () => {
    setThanhtoan(true);
  };

  // const today = new Date(); // Lấy ngày tháng hiện tại
  // const date = today.getDate(); // Lấy ngày
  // const month = today.getMonth() + 1; // Lấy tháng (Lưu ý: Tháng bắt đầu từ 0, do đó cần phải cộng thêm 1)
  // const year = today.getFullYear(); // Lấy năm

  // let spList = cart.map((item) => {
  //   return {
  //     hinhanh: item.product.image,
  //     sanpham: item.product.name,
  //     loaisp: item.product.category,
  //     sl: item.quantity,
  //     dvt: item.product.dvt,
  //     dongia: item.product.price,
  //     thanhtien: item.product.price * item.quantity,
  //   };
  // });

  // let data = {
  //   hinhanh: "",
  //   ngaylap: date + "/" + month + "/" + year,
  //   tinhtrang: "Đang xử lý",
  //   diachigiaohang: "",
  //   userId: Id,
  //   sanphams: spList,
  // };

  const navigate = useNavigate();
  const addOrder = () => {
    if (cart.length > 0) {
      const item = cart[0];
      if (item.hasOwnProperty("product")) {
        // window.location.href = 'http://localhost:3000';
        navigate("/paymentinfo", {
          state: { cart, total },
        });
      }

      // setThanhtoan(false);
      // setShowModal(true);
      //refresh lại giỏ hàng (xóa tất cả các sản phẩm có trong giỏ hàng này)
      // axios
      //   .post("https://dialuxury.onrender.com/cart/refresh", { userId: Id })
      //   .then((response) => {})
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // tạo đơn hàng mới trong order
      // axios
      //   .post("https://dialuxury.onrender.com/order", data)
      //   .then((response) => {
      //     //chuyển hướng tới trang paymentinfo
      //     const mahd = response.data.mahd;
      //     navigate("/paymentinfo", {
      //       state: { mahd },
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  };

  //hàm fomat định dạng tiền
  const formatNumber = (value) => {
    const formattedValue = value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedValue}`;
  };

  return (
    <div className="">
      <div
        className="px-3 py-3 rounded mb-4"
        style={{ backgroundColor: "#ced4da" }}
      >
        <div className="d-flex justify-content-between">
          <label>Tổng tiền</label>
          <span style={{ color: "red" }}>
            {formatNumber(Number(total))} vnđ
          </span>
        </div>
      </div>
      <div className="text-center">
        {token !== null ? (
          <div>
            <Button
              variant="primary"
              onClick={handleThanhtoan}
              className="w-100"
            >
              Thanh toán
            </Button>
            <p className="mt-4">
              Hoặc <Link to="/">tiếp tục mua hàng</Link>
            </p>
          </div>
        ) : (
          <Alert variant="warning">Vui lòng đăng nhập để thanh toán!</Alert>
        )}
      </div>
      {/* <ConfirmationModal
        show={showModal}
        title={"Thông báo"}
        message="Giỏ hàng rỗng"
        onConfirm={() => {
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      /> */}
      <ConfirmationModal
        show={thanhtoan}
        title={"Xác nhận"}
        message="Bạn muốn thanh toán!"
        onConfirm={addOrder}
        onCancel={() => {
          setThanhtoan(false);
        }}
      />
    </div>
  );
}

export default Bill;
