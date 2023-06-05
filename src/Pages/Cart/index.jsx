import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Product from "./Components/Product";
import Bill from "./Components/Bill";
import axios from "axios";
import { useEffect, useState } from "react";
import images from "../../assets/images";
import ConfirmationModal from "./Components/ConfirmationModal";

function Cart() {
  //lấy _id của người dùng trong localStorage
  // const userId = localStorage.getItem("_id");

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  //tạo biến lưu trạng thái hiển thị hộp thoại thông báo
  const [showModal, setShowModal] = useState(false);

  //biến trạng thái cho nút xoá giỏ hàng
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  //lấy các sản phẩm từ trong giỏ hàng hiện ra
  useEffect(() => {
    if(cart.length == 0 ) setIsButtonDisabled(true);
    //lấy dữ liệu các sp trong giỏ hàng
    fetchCartItems();
    //tính tổng tiền tất cả sp trong giỏ hàng
    calculateTotalPrice();

    // localStorage.setItem("cartItem", JSON.stringify(cart));
  });

  // useEffect(() => {

  // });

  const fetchCartItems = async () => {
    await axios
      .get("http://localhost:3001/cart")
      .then((response) => {
        setCart(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (cart.length > 0) {
      setIsButtonDisabled(false);
      cart.forEach((item) => {
        total += item.totalPrice;
      });
    }
    setTotalPrice(total);
  };

  const handleClearCart = () => {
    setShowModal(true);
  };
  
  //gọi api xóa tất cả sản phẩm trong giỏ hàng
  const handleConfirmDelete = async () => {
    try {
      await axios.delete("http://localhost:3001/cart/clear");
      // setShowSuccessAlert(true);
      setIsButtonDisabled(true);
    } catch (error) {
      // setShowErrorAlert(true);
      console.error(error);
    }
    setShowModal(false);
  };

  //tắt hộp thoại khi nhấn nút Hủy
  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="d-flex-start justify-content-center">
            <h1 className="m-4">Giỏ hàng</h1>
          </Col>
          <Col xs={12} md={6} className="d-flex-start justify-content-center">
            <Button variant="danger" onClick={handleClearCart} disabled={isButtonDisabled}>
              Xoá giỏ hàng
            </Button>
            <ConfirmationModal
              show={showModal}
              title={"Xác nhận"}
              message="Bạn chắc chắn muốn xóa giỏ hàng?"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row>
          <Col xs="12" md="7">
            <hr />
            {cart.length > 0 ? (
              cart.map((item, index) => {
                return (
                  <Product product={item.product} soluong={item.quantity} />
                );
              })
            ) : (
              <div className="d-flex flex-column align-items-center">
                <strong>Giỏ hàng rỗng</strong>
                <img src={images.cartIsNull} width={500} alt="Giỏ hàng rỗng" />
              </div>
            )}
          </Col>
          <Col xs="12" md="5" className="px-5 px-md-3 mt-3">
            {cart.length > 0 && <Bill cart={cart} total={totalPrice} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cart;
