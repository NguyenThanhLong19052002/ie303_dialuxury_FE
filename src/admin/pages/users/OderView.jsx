import React, { useEffect, useState, CSSProperties } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getOrderbyId, getUserbyId } from "./helper";
import ClipLoader from "react-spinners/ClipLoader";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
const OrderView = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [date, setDate] = useState();
  const [address, setAddress] = useState();
  const [status, setStatus] = useState();
  const [total, setTotal] = useState(0);
  const [orderDetails, setOrderDetails] = useState([]);
  useEffect(() => {
    // This function will run once when the component mounts.

    let orderPromise = getOrderbyId(orderId);
    orderPromise.then(function (res) {
      setOrderDetails(res);
      let address = res[0].shippingAddress;
      let date = res[0].createdAt;
      let status = res[0].status;
      let total = res[0].totalPriceOrder;
      let userId = res[0].userId;
      setAddress(address);
      setDate(date);
      setStatus(status);
      setTotal(total);
      setIsLoading(false);
      let forgotPromise = getUserbyId(userId);
      forgotPromise.then(function (res) {
        let { email, name, phone } = res.data;
        setEmail(email);
        setPhone(phone);
        setName(name);
      });
    });
  }, []); // The empty array as the second argument means this effect will only run once.
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
  };

  function goBackClick() {
    navigate(-1);
  }
  return (
    <Container style={{ width: "1000px" }}>
      <ClipLoader
        color="#36d7b7"
        loading={isLoading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {isLoading ? (
        <div className="w-40 h-40"></div>
      ) : (
        <div>
          <div className="row mb-5 order-info-wrap">
            <div className="col-md-6 col-lg-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-user"> </i>{" "}
                </span>{" "}
                <div className="text">
                  <h6 className="mb-1"> Khách hàng </h6>{" "}
                  <p className="mb-1">
                    {name} <br />
                    <a href={`mailto:user@example.com`}> {email} </a> <br />
                    <p>{phone}</p>
                  </p>{" "}
                </div>{" "}
              </article>{" "}
            </div>{" "}
            <div className="col-md-6 col-lg-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-truck-moving"> </i>{" "}
                </span>{" "}
                <div className="text">
                  <h6 className="mb-1"> Ngày đặt hàng </h6>{" "}
                  <p className="mb-1">{date}</p>{" "}
                </div>{" "}
              </article>{" "}
            </div>{" "}
            <div className="col-md-6 col-lg-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-map-marker-alt"> </i>{" "}
                </span>{" "}
                <div className="text">
                  <h6 className="mb-1"> Địa chỉ giao hàng </h6>{" "}
                  <p className="mb-1">{address}</p>{" "}
                </div>{" "}
              </article>{" "}
            </div>{" "}
          </div>
          <table className="table border table-lg">
            <thead>
              <tr>
                <th
                  style={{
                    width: "40%",
                  }}
                >
                  {" "}
                  Sản phẩm{" "}
                </th>{" "}
                <th
                  style={{
                    width: "20%",
                  }}
                >
                  {" "}
                  Đơn giá{" "}
                </th>{" "}
                <th
                  style={{
                    width: "20%",
                  }}
                >
                  Số lượng
                </th>{" "}
                <th
                  style={{
                    width: "20%",
                  }}
                  className="text-end"
                >
                  Thành tiền{" "}
                </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {orderDetails?.map((data, index) => (
                <tr key={index}>
                  <td>
                    <Link className="itemside" to="#">
                      <div className="left">
                        <img
                          src={data.product.image}
                          alt="product"
                          style={{
                            width: "80px",
                            height: "80px",
                            margin: "0 10px 10px 0",
                          }}
                          className="img-xs"
                        />
                      </div>
                      <div className="info" style={{ marginLeft: "10px" }}>
                        {data.product.name}
                      </div>
                    </Link>
                  </td>
                  <td>{data.product.price.toLocaleString()} VND</td>
                  <td>
                    <div style={{ marginLeft: "20px" }}>{data.quantity}</div>{" "}
                  </td>
                  <td className="text-end">
                    {data.totalPrice.toLocaleString()} VND
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4">
                  <article className="float-end">
                    <dl className="dlist">
                      <dt> Tổng tiền : </dt>
                      <dd>
                        <b className="h5">{total.toLocaleString()} VND </b>
                      </dd>
                    </dl>
                    <dl className="dlist ">
                      <dt className="text-muted " style={{ marginTop: "10px" }}>
                        Trạng thái:
                      </dt>
                      <dd>
                        <span
                          className={
                            status === "Đã giao hàng"
                              ? "badge rounded-pill alert alert-success text-success"
                              : status === "Đang xử lý"
                              ? "badge rounded-pill alert alert-success text-info"
                              : status === "Đang giao hàng"
                              ? "badge rounded-pill alert alert-success text-warning"
                              : "badge rounded-pill alert alert-success text-danger"
                          }
                          style={{ marginTop: "20px" }}
                        >
                          {status}
                        </span>
                      </dd>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        onClick={goBackClick}
                      >
                        Quay lại
                      </button>
                    </dl>
                  </article>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default OrderView;
