import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cartItem";
import { Link } from "react-router-dom";
import { resetCart, toggleCart } from "../../redux/cartSlice";
import { Button, Modal } from "react-bootstrap";

function Cart(props) {
  const { cart_ar, showCart, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleCart());

  return (
    <Modal
      show={showCart}
      onHide={handleToggle}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "calc(100vh - 210px)",
          overflowY: "auto",
        }}
      >
        {cart_ar.length === 0 ? (
          <h3 className="display-5 text-muted text-center">No products found</h3>
        ) : (
          <div className="container">
            <h2 className="m-2 text-center">List of Products</h2>
            <div className="row">
              {cart_ar.map((item, i) => {
                return <CartItem key={item._id} i={i} item={item} />;
              })}
            </div>
            <div className="my-3">
              <small className="h3">Total:</small>
              <span className="h2 text-success"> ₪ {totalPrice}</span>
            </div>
            {cart_ar.length > 0 ? (
              <React.Fragment>
                <button
                  onClick={() => dispatch(resetCart())}
                  className="btn btn-outline-danger col-12 my-3 btn-item"
                >
                  delete all
                </button>
                <Link
                  onClick={handleToggle}
                  to="/checkout"
                  className="btn btn-success col-12 btn-item"
                >
                  Checkout
                </Link>
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleToggle}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Cart;
