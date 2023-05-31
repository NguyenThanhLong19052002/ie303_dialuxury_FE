import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "./Components/Product";
import Bill from "./Components/Bill";
import axios from "axios";
import { useEffect, useState } from "react";
import images from "../../assets/images";

const CART_SESSION_ATTRIBUTE = "cart";

function Cart() {
    

  //lấy _id của người dùng trong localStorage
  const userId = localStorage.getItem("_id");

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  //lấy các sản phẩm từ trong giỏ hàng hiện ra
  useEffect(() => {
    //lấy dữ liệu các sp trong giỏ hàng
    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

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
    if (cart !== undefined) {
        cart.forEach((item) => {
          total += item.totalPrice;
        });
      }
    setTotalPrice(total);
  };

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/cart")
//       .then((response) => {
//         setCart(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });

  return (
    <div>
      <h1 className="m-4">Giỏ hàng</h1>
      <Container fluid>
        <Row>
          <Col xs="12" md="7">
            <hr />
            {cart !== undefined && Object.keys(cart.product).length > 0 ? (
              cart.map((item, index) => {
                return (
                  <Product
                    productid={item.product.productid}
                    image={item.product.image}
                    name={item.product.name}
                    price={item.product.price}
                    category={item.product.category}
                    soluong={item.product.soluong}
                    state={item.product.state}
                    key={item.product.productid}
                    index={index}
                  />
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
            {cart !== undefined && <Bill cart={cart} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cart;
