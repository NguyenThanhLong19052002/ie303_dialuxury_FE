import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getOrderbyId } from "./users/helper";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { sendOrderConfirmEmail } from "../../Pages/Login1/helpers/helper";

const ConfirmationNotification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sentEmail, setSentEmail] = useState(false);
  const [orderData, setOrderData] = useState();
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("");
  const [total, setTotal] = useState(0);

  if (!location.state) {
    window.location.replace("orderVerification");
  }

  useEffect(() => {
    let orderPromise = getOrderbyId(location.state._orderid);
    orderPromise
      .then((res) => {
        let address = res[0].shippingAddress;
        let methodd = res[0].paymentMethod;
        let total = res[0].totalPriceOrder;

        setAddress(address);
        setMethod(methodd);
        setTotal(total);
        setOrderData(res);
        
      })
      .catch((e) => {
        console.log(e);
      });
    sendOrderConfirmationEmail();
  }, []);

  const sendOrderConfirmationEmail = async () => {
    var cart;
    if (orderData !== null) {
      cart = orderData.map((data) => {
        return {
          product: data.product,
          totalPrice: data.totalPrice,
          quantity: data.quantity,
        };
      });
    }

    const data = {
      cart: cart,
      image: "",
      shippingAddress: address,
      paymentMethod: method,
      total: total,
    };

    try {
      let sendOrderConfirmationEmailPromise = sendOrderConfirmEmail(
        location.state.email,
        data
      );
      await toast.promise(sendOrderConfirmationEmailPromise, {
        loading: "Đang gửi mail...",
        success: "Gửi mail thành công",
        error: <b>Gửi mail thất bại!</b>,
      });
      sendOrderConfirmationEmailPromise
        .then((res) => {
          setSentEmail(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {}

    // await axios
    //   .post(
    //     `http://localhost:3001/user/${location.state.email}/sendConfirmOrderEmail`,
    //     data
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     setSentEmail(true);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  const navigateToPaymentVerfication = () => {
    // 👇️ navigate to /contacts
    navigate("/paymentVerfication");
  };

  const navigateToOrderVerification = () => {
    // 👇️ navigate to /contacts
    navigate("/orderVerification");
  };

  return (
    <>
      {/* Header:  */}
      {/* Content: */}
      <Container>
        <Card className="text-center" style={{ width: "1300px" }}>
          <Card.Header style={{ fontSize: "20px" }}>
            <b>Bảng Thông Báo</b>
          </Card.Header>
          <Card.Body>
            <Card.Title style={{ color: "green" }}>
              Xác Nhận Thành Công
            </Card.Title>
            <Card.Text>
              Đơn hàng đã được xác nhận <br />
              <Toaster position="top-center" reverseOrder={false}></Toaster>
              {sentEmail && (
                <span>
                  Tin nhắn xác nhận đã được gửi vào email đăng ký của khách hàng
                  {location.state.name}!
                </span>
              )}
            </Card.Text>

            <Card.Text>
              {/* <Button variant="primary" onClick={navigateToPaymentVerfication} style={{margin:"20px", marginTop:"5px"}}>Quay Lại Xác Nhận Thanh Toán</Button> */}

              <Button
                variant="primary"
                onClick={navigateToOrderVerification}
                style={{ margin: "20px", marginTop: "5px" }}
              >
                Quay Lại Xác Nhận Đơn Hàng
              </Button>
            </Card.Text>
          </Card.Body>
          {/* <Card.Footer className="text-muted">1/1/2002</Card.Footer> */}
        </Card>
      </Container>
      {/* Footer: */}
    </>
  );
};

export default ConfirmationNotification;
