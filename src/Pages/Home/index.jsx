import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ProductHomepage from "./Components/Products";
import NewProductHomepage from "./Components/NewProduct";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";

function Home() {
  const [newProduct, setnewProduct] = useState([]);
  const [quantitySold, setQuantitySold] = useState([]);
  const [showMoreSold, setShowMoreSold] = useState(false);
  const [showMoreNew, setShowMoreNew] = useState(false);
  const [soldProductCount, setSoldProductCount] = useState(4);
  const [newProductCount, setNewProductCount] = useState(4);

  useEffect(() => {
    loadNewProduct();
    sortedQuantitySold();
  }, []);

  const loadNewProduct = async () => {
    axios
      .get("http://localhost:3001/product/new")
      .then((response) => {
        setnewProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sortedQuantitySold = async () => {
    axios
      .get("http://localhost:3001/product/sortedQuantitySold")
      .then((response) => {
        setQuantitySold(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowMoreSold = () => {
    setSoldProductCount((prevCount) => prevCount + 8);
    setShowMoreSold(true);
  };

  const handleShowLessSold = () => {
    setSoldProductCount(4);
    setShowMoreSold(false);
  };

  const handleShowMoreNew = () => {
    setNewProductCount((prevCount) => prevCount + 8);
    setShowMoreNew(true);
  };

  const handleShowLessNew = () => {
    setNewProductCount(4);
    setShowMoreNew(false);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <h4
            className="pb-3"
            style={{
              color: "rgb(189, 120, 189)",
              marginTop: "40px",
              textAlign: "center",
              fontSize: "27px",
            }}
          >
            Sản phẩm bán chạy
          </h4>
          <ProductHomepage products={quantitySold.slice(0, soldProductCount)} />
          {!showMoreSold && quantitySold.length > 4 && (
            <div className="text-center mt-3">
              <Button onClick={handleShowMoreSold} variant="secondary">
                Xem thêm
              </Button>
            </div>
          )}
          {showMoreSold && (
            <div className="text-center mt-3">
              <Button onClick={handleShowLessSold} variant="secondary">
                Ẩn bớt
              </Button>
            </div>
          )}
        </Row>
        <Row>
          <h4
            className="pb-3"
            style={{
              color: "rgb(189, 120, 189)",
              marginTop: "40px",
              textAlign: "center",
              fontSize: "27px",
            }}
          >
            Sản phẩm mới
          </h4>
          <NewProductHomepage products={newProduct.slice(0, newProductCount)} />
          {!showMoreNew && newProduct.length > 4 && (
            <div className="text-center mt-3">
              <Button onClick={handleShowMoreNew} variant="secondary">
                Xem thêm
              </Button>
            </div>
          )}
          {showMoreNew && (
            <div className="text-center mt-3">
              <Button onClick={handleShowLessNew} variant="secondary">
                Ẩn bớt
              </Button>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
