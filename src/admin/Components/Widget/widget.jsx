import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DiamondIcon from "@mui/icons-material/Diamond";
import styles from "./widget.module.css";
import DataTable from "./dataTable";
import {
  getCountUser,
  getCountOrder,
  getCountProduct,
  getRevenue,
} from "../../pages/helpers/helper";

function Widget() {
  const [countUser, setCountUser] = useState(0);
  const [countOrder, setCountOrder] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    let countUserPromise = getCountUser();
    countUserPromise.then(function (res) {
      setCountUser(res.data);
    });
    let countOrderPromise = getCountOrder();
    countOrderPromise.then(function (res) {
      setCountOrder(res.data);
    });
    let countProductPromise = getCountProduct();
    countProductPromise.then(function (res) {
      setCountProduct(res.data);
    });
    let getRevenuePromise = getRevenue();
    getRevenuePromise.then(function (res) {
      setRevenue(res.data);
    });
  }, []);
  const products = [
    {
      id: "p1",
      statistics: countUser,
      title: "Người dùng",
      isMoney: false,
      icon: (
        <PersonOutlinedIcon
          className="icon"
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            fontSize: "28px",
            padding: "5px",
            borderRadius: "5px",
            alignSelf: "flex-end",
          }}
        />
      ),
    },
    {
      id: "p2",
      statistics: countOrder,
      title: "Đơn hàng",
      isMoney: false,
      icon: (
        <ShoppingCartOutlinedIcon
          className="icon"
          style={{
            backgroundColor: "rgba(218, 165, 32, 0.2)",
            color: "goldenrod",
            fontSize: "28px",
            padding: "5px",
            borderRadius: "5px",
            alignSelf: "flex-end",
          }}
        />
      ),
    },
    {
      id: "p3",
      statistics: countProduct,
      title: "Sản phẩm",
      isMoney: false,
      icon: (
        <DiamondIcon
          className="icon"
          style={{
            backgroundColor: "rgba(0, 128, 0, 0.2)",
            color: "green",
            fontSize: "28px",
            padding: "5px",
            borderRadius: "5px",
            alignSelf: "flex-end",
          }}
        />
      ),
    },
    {
      id: "p4",
      statistics: revenue,
      title: "Doanh thu",
      isMoney: true,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: "rgba(128, 0, 128, 0.2)",
            color: "purple",
            fontSize: "28px",
            padding: "5px",
            borderRadius: "5px",
            alignSelf: "flex-end",
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <Container fluid className={styles.myContainer}>
        <Row>
          <h4
            className="pb-3"
            style={{
              color: "rgb(189, 120, 189)",
              marginTop: "15px",
              textAlign: "center",
              fontSize: "27px",
            }}
          >
            Bảng Thống Kê Dữ Liệu
          </h4>
        </Row>
        <Row style={{ marginTop: "-50px" }}>
          <DataTable products={products} />
        </Row>
      </Container>
    </div>
  );
}

export default Widget;
