import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

import { Button } from "react-bootstrap";

function Bill({ cart, total }) {
  //lấy _id của người dùng trong localStorage
  const Id = localStorage.getItem("_id");

  const [showModal, setShowModal] = useState(false);
  const [thanhtoan, setThanhtoan] = useState(false);

  const handleThanhtoan = () => {
    setThanhtoan(true);
  };

  const today = new Date(); // Lấy ngày tháng hiện tại
  const date = today.getDate(); // Lấy ngày
  const month = today.getMonth() + 1; // Lấy tháng (Lưu ý: Tháng bắt đầu từ 0, do đó cần phải cộng thêm 1)
  const year = today.getFullYear(); // Lấy năm

  let spList = cart.map((item) => {
    return {
      hinhanh: item.product.image,
      sanpham: item.product.name,
      loaisp: item.product.category,
      sl: item.quantity,
      dvt: item.product.dvt,
      dongia: item.product.price,
      thanhtien: item.product.price * item.quantity,
    };
  });

  let data = {
    hinhanh: "",
    ngaylap: date + "/" + month + "/" + year,
    tinhtrang: "Đang xử lý",
    diachigiaohang: "",
    userId: Id,
    sanphams: spList,
  };

  const navigate = useNavigate();
  const addOrder = () => {
    if (!Array.isArray(cart.product)) {
      setThanhtoan(false);
      setShowModal(true);
    } else {
      //refresh lại giỏ hàng (xóa tất cả các sản phẩm có trong giỏ hàng này)
      axios
        .post("https://dialuxury.onrender.com/cart/refresh", { userId: Id })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
      // tạo đơn hàng mới trong order
      axios
        .post("https://dialuxury.onrender.com/order", data)
        .then((response) => {
          //chuyển hướng tới trang paymentinfo
          const mahd = response.data.mahd;
          navigate("/paymentinfo", {
            state: { mahd },
          });
        })
        .catch((error) => {
          console.log(error);
        });
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
        <Button variant="primary" onClick={handleThanhtoan} className="w-100" disabled>
          Thanh toán
        </Button>
        <p className="mt-4">
          Hoặc <Link to="/">tiếp tục mua hàng</Link>
        </p>
      </div>
      <ConfirmationModal
        show={showModal}
        title={"Thông báo"}
        message="Giỏ hàng rỗng"
        onConfirm={() => {
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      />
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
