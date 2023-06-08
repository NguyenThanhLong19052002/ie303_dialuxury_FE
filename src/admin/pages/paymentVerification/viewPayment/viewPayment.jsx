import { useState, useEffect } from "react";
import styles from "./viewPayment.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { confirmOrderbyId } from "../../../../Pages/Login1/helpers/helper";
import axios from "axios";
import { maxWidth } from "@mui/system";

const ViewPayment = ({ inputs }) => {
  const [file, setFile] = useState("");
  // const [orderId, setOrderId] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  // lưu dữ liệu truyền vào từ trang giỏ hàng
  const location = useLocation();

  //nếu không có dữ liệu truyền vào thì chuyển hướng sang trang chủ
  if (!location.state) {
    window.location.replace("/orderVerification");
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/orders/${location.state._orderid}/getImage`, {
        responseType: "blob",
      })
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();

  function ConfirmOrder() {
    let confirmPromise = confirmOrderbyId(location.state._orderid);
    // window.location.href = "http://localhost:3000/ConfirmationNotification";
    navigate("/ConfirmationNotification", {
      state: {
        _orderid: location.state._orderid,
        email: location.state.email,
        name: location.state.name
      },
    });
  }

  // const navigateToConfirmationForm = () => {
  //   // 👇️ navigate to /contacts
  //   navigate("/ConfirmationNotification");
  // };

  return (
    <div className={styles.new}>
      <div
        className={styles.newContainer}
        style={{ width: "100vw", height: "fit-content" }}
      >
        <div>
          <h3>
            <b>Xác Nhận Thanh Toán</b>
          </h3>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            {imageSrc !== "" ? (
              <img
                src={imageSrc}
                alt="ảnh thanh toán hoá đơn"
                className={styles.img}
              />
            ) : (
              <img
                src="https://static.mservice.io/img/momo-upload-api-220530104935-637895045756411980.jpg"
                alt="ảnh thanh toán hoá đơn"
                className={styles.img}
              />
            )}
          </div>
          <div className={styles.right}>
            {/* <form>
              <div class={styles.formInput}>
                <div className="row my-2">
                  <div className="col text-end">
                    <label style={{ fontSize: "16px", fontWeight: "500" }}>
                      Mã TT: p01
                    </label>
                  </div>
                </div>
              </div>

              <div class={styles.formInput}>
                <div className="row my-2">
                  <div className="col text-end">
                    <label style={{ fontSize: "16px", fontWeight: "500" }}>
                      Mã KH:
                    </label>
                  </div>
                </div>
              </div>
              <div class={styles.formInput}>
                <div className="row my-2">
                  <div className="col text-end">
                    <label style={{ fontSize: "16px", fontWeight: "500" }}>
                      Tên KH:
                    </label>
                  </div>
                </div>
              </div>
              <div class={styles.formInput}>
                <div className="row my-2">
                  <div className="col text-end">
                    <label style={{ fontSize: "16px", fontWeight: "500" }}>
                      Ngày TT:
                    </label>
                  </div>
                </div>
              </div>
              <div class={styles.formInput}>
                <div className="row my-2">
                  <div className="col text-end">
                    <label style={{ fontSize: "16px", fontWeight: "500" }}>
                      Hình thức TT:
                    </label>
                  </div>
                </div>
              </div>

              <div class={styles.formInput}>
                <div className="row my-2">
                  <div className="col text-end">
                    <label style={{ fontSize: "16px", fontWeight: "500" }}>
                      Tổng số tiền:
                    </label>
                  </div>
                </div>
              </div>
            </form> */}
            <Button
              variant="primary"
              onClick={() => ConfirmOrder()}
              style={{ float: "right", margin: "30px" }}
            >
              Xác nhận giao hàng
            </Button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPayment;
