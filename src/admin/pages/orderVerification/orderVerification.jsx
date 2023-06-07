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
const VerifyOrder = () => {
  // const [details, setDetails] = useState("");
  const [orders, setOrders] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false); //lưu trạng thái của Snackbar

  //hàm đóng Snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(function () {
    async function getData() {
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
  });

  const handleDeleteOrder = async (orderId) => {
    await axios
      .delete(`http://localhost:3001/orders/${orderId}/delete`)
      .then((res) => {
        console.log(res);
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
            <th scope="col"> Mã đơn hàng </th>
            <th scope="col"> Ngày đặt hàng </th>
            <th scope="col"> Phươnh thức thanh toán </th>
            <th scope="col"> Tổng tiền </th>
            <th scope="col"> Tình trạng giao hàng </th>
            <th scope="col" className="text-center">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td>
                <b>{order._id}</b>
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
                &nbsp;&nbsp;&nbsp;
                <i
                  className="fa fa-trash"
                  style={{ fontSize: "20px", color: "red", cursor: 'pointer' }}
                  onClick={() => handleDeleteOrder(order._id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
