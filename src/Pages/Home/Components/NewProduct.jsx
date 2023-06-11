import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function NewProductHomepage({ products }) {
  const visibleProducts = products;
  return (
    <>
      <Container fluid>
        {/* Render các sản phẩm */}
        <Row className="mx-4 mt-5">
          {/* visibleProducts = 12 */}
          {visibleProducts.map((product) => (
            <Col key={product.productid} sm={6} md={4} lg={3}>
              <Link to={`/productsdetail/${product.productid}`}>
                <Card style={{ background: "#f7f7f7", marginBottom: "30px" }}>
                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Img src={product.image}></Card.Img>
                    <Card.Title style={{ fontWeight: "200" }}>
                      {product.name}
                    </Card.Title>
                    <Card.Text style={{ color: "#e7b475", fontWeight: "500" }}>
                      {product.price} đ
                    </Card.Text>
                    <Card.Text style={{ textAlign: "end", fontSize: "14px" }}>
                      {product.quantitySold} đã bán
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default NewProductHomepage;
