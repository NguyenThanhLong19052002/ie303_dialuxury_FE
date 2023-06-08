import { Container, Row, Image } from "react-bootstrap";
import ProductList from "../Products/Components/Products";
import ImageBanner from "../../../src/assets/images/Products/banner_search.jpg";
import { useState, useEffect } from "react";

import axios from "axios";

function ProductsPage() {
  const [products, productsSet] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("name"); // Lấy giá trị của param1: "value1"
  console.log({ query });

  //lấy thông tin sản phẩm
  useEffect(() => {
    axios
      .get(`http://localhost:3001/product/search?name=${query}`)
      .then((response) => {
        productsSet(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return (
    <>
      <Container fluid className="mb-5">
        <Row>
          <Image src={ImageBanner} className="px-0"></Image>
        </Row>
        <Row>
          <ProductList products={products} />;
        </Row>
      </Container>
    </>
  );
}

export default ProductsPage;
