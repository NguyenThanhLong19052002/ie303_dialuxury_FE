import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { ListGroup, ListGroupItem, Badge } from "react-bootstrap";
import { Form, FormControl } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Product() {
  let { id } = useParams(); //lấy id từ url
  console.log(id);

  const [product, setProduct] = useState(); //lấy sản phẩm từ api
  const [sl, setSL] = useState(1); //lấy số lượng sản phẩm người dùng muốn thêm vào giỏ hàng
  const [openSnackbar, setOpenSnackbar] = useState(false); //lưu trạng thái của Snackbar
  const idUserString = localStorage.getItem("productid");

  // const [cart, setCart] = useState([]);

  //hàm tăng số lượng sản phẩm
  const HandleIncreaseSL = () => {
    setSL((prevSL) => prevSL + 1);
  };

  //hàm giảm số lượng sản phẩm
  const HandleDecreaseSL = () => {
    if (sl !== 1) setSL((prevSL) => prevSL - 1);
  };

  //hàm đóng Snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  //lấy thông tin sản phẩm
  useEffect(() => {
    axios
      .get(`http://localhost:3001/product/${id}`)
      .then((response) => {
        setProduct(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // const fetchCartItems = async () => {
  //   await axios
  //     .get("http://localhost:3001/cart")
  //     .then((response) => {
  //       setCart(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  //thêm sản phẩm vào giỏ hàng
  const AddToCart = async () => {
    const cartItem = {
      product: {
        productid: product.productid,
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
        dvt: product.unit,
        quality: product.quality,
        color: product.color,
        mass: product.mass,
        size: product.size,
      },
      totalPrice: product.price * sl,
      quantity: sl,
    };
    await axios
      .post("http://localhost:3001/cart/add", cartItem)
      .then((res) => {
        console.log("Mua thành công");
        console.log(res.data);
        setOpenSnackbar(true); // Mở Snackbar khi thêm vào giỏ hàng thành công
        // fetchCartItems();
        // console.log(cart);
        // localStorage.setItem("cartItem", JSON.stringify(cart));
      })
      .catch((e) => {
        console.log("Mua thất bại");
        console.error(e);
      });
  };

  //Gửi bình luận
  const SendComment = async () => {
    console.log("Chưa làm");
  };

  //hàm fomat định dạng tiền việt nam
  const formatCurrency = (value) => {
    const formattedValue = value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedValue} đ`;
  };

  return (
    <Container>
      <Row className="align-items-center justify-content-center">
        <Col md={4}>
          <Image src={product?.image || ""} alt="Hình ảnh sản phẩm" fluid />
        </Col>
        <Col md={6}>
          <h2>{product?.name || "Product"}</h2>
          <p>Mã: {product?.productid || "Product"}</p>
          <Row>
            <Col md={2}>
              <p>Đã bán: 4</p>
            </Col>
            <Col>
              <p>Còn hàng</p>
            </Col>
          </Row>
          <h4>Giá: {formatCurrency(product?.price || 1000000)}</h4>
          <div className="d-flex align-items-center mb-3">
            <span className="me-3">Số lượng:</span>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={HandleDecreaseSL}
            >
              -
            </Button>
            <span className="mx-3">{sl}</span>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={HandleIncreaseSL}
            >
              +
            </Button>
          </div>
          <Button
            variant="primary"
            size="md"
            className="mb-3"
            onClick={AddToCart}
          >
            Mua hàng <br />
          </Button>
        </Col>
      </Row>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Thời gian tự động đóng Snackbar (ms)
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
          Đã thêm sản phẩm vào giỏ hàng!
        </MuiAlert>
      </Snackbar>
      <div>
        <h3>Thông số</h3>
        <Row>
          <Col md={4}>
            <ListGroup className="w-100">
              <ListGroupItem>
                <strong>Chất liệu: </strong>{" "}
                {product?.quality || "Chưa có thông số"}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Khối lượng: </strong>{" "}
                {product?.mass || "Chưa có thông số"}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Kích thước: </strong>{" "}
                {product?.size || "Chưa có thông số"}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Màu sắc: </strong>{" "}
                {product?.color || "Chưa có thông số"}
              </ListGroupItem>
              {/* <ListGroupItem>
            <strong>Giá:</strong> 1,200,000đ <Badge variant="danger">-10%</Badge>
          </ListGroupItem> */}
            </ListGroup>
          </Col>
        </Row>
      </div>
      {/* <h3 className="mt-3">Bình luận</h3> */}
      <Form>
        {/* <Form.Group controlId="formBasicEmail">
        <Form.Label>Nhập tên của bạn:</Form.Label>
        <FormControl type="text" placeholder="Nhập tên của bạn" />
      </Form.Group> */}

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="mt-4">Nhập bình luận của bạn:</Form.Label>
          <FormControl as="textarea" placeholder="Nhập bình luận của bạn" />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-3 mb-3"
          onClick={SendComment}
        >
          Gửi bình luận
        </Button>
      </Form>
    </Container>
  );
}

export default Product;
