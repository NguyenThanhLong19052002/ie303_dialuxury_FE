import { DataGrid } from "@mui/x-data-grid";
import { orderColumns, orderRows } from "./orderVerificationData";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import moment from "moment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./style.css";
import "bootstrap";
import { getAllOrdersAllUser } from "../../../Pages/Login1/helpers/helper";
import ConfirmationModal from "../../../Pages/Cart/Components/ConfirmationModal";

const VerifyOrder = () => {
  // const [details, setDetails] = useState("");
  const [orderIdDelete, setOrderIdDelete] = useState("");
  const [orders, setOrders] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false); //lưu trạng thái của Snackbar
  //tạo biến lưu trạng thái hiển thị hộp thoại thông báo
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    function getData() {
      let forgotPromise = getAllOrdersAllUser();
      forgotPromise.then(function (res) {
        console.log(res);
        const uniqueOrderIds = [];
        const uniqueData = [];
        res.forEach((item) => {
          if (!uniqueOrderIds.includes(item._id)) {
            uniqueOrderIds.push(item._id);
            uniqueData.push(item);
          }
        });
        setOrders(uniqueData);
      });
    }

    getData();

    // Reset form sau khi gửi thành công
  }, []);

  //hàm đóng Snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  //tắt hộp thoại khi nhấn nút Hủy
  const handleCancelDelete = () => {
    setShowModal(false);
  };

  //Hiện hộp thoại cảnh báo khi nhấn nút Xóa
  const handleDelete = (orderId) => {
    setShowModal(true);
    setOrderIdDelete(orderId);
  };

  const handleDeleteOrder = (orderId, index) => {
    axios
      .delete(`http://localhost:3001/orders/${orderId}/delete`)
      .then((res) => {
        console.log(res.data);
        setOrders((prevState) => {
          const updatedAllOrders = [...prevState];
          updatedAllOrders.splice(index, 1);
          return updatedAllOrders;
        });
        setShowModal(false);
        setOpenSnackbar(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <Container style={{ width: "1300px" }}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"> Đơn hàng </th>
            <th scope="col"> Ngày đặt hàng </th>
            <th scope="col"> Phươnh thức thanh toán </th>
            <th scope="col"> Tổng tiền </th>
            <th scope="col"> Tình trạng giao hàng </th>
            <th scope="col" className="text-center">
              Thao tác
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={order._id}>
              <td style={{ paddingLeft: "2rem" }}>
                <b>{index + 1 < 10 ? "0" + (index + 1) : index + 1}</b>
              </td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.totalPriceOrder.toLocaleString()} VND </td>
              <td>
                <span
                  className={
                    order.status === "Đã giao hàng"
                      ? "text-success"
                      : order.status === "Đang xử lý"
                      ? "text-info"
                      : order.status === "Đang giao hàng"
                      ? "text-warning"
                      : "text-danger"
                  }
                >
                  {order.status}
                </span>
              </td>
              <td className="d-flex justify-content-center align-item-center">
                <Link
                  to={`/order/detail/${order._id}`}
                  className="text-success"
                >
                  <i className="fas fa-eye" style={{ fontSize: "20px" }}></i>
                </Link>
              </td>
              <td>
                {order.status === "Đã hủy" && (
                  <i
                    className="fa fa-trash"
                    style={{
                      fontSize: "20px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteOrder(order._id, index)}
                  ></i>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <ConfirmationModal
        show={showModal}
        title={"Xác nhận"}
        message="Bạn có chắc chắn muốn xóa?"
        onConfirm={handleDeleteOrder(order._id, index)}
        onCancel={handleCancelDelete}
      /> */}

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
          Xoá hoá đơn thành công!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default VerifyOrder;
