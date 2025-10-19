import { useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../app/features/cart/cartSlice";
import "./orderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    // Clear cart after successful order
    dispatch(clearCart());
  }, [dispatch]);

  if (!orderDetails) {
    navigate("/");
    return null;
  }

  return (
    <section className="order-success-section">
      <Container>
        <div className="success-content">
          <div className="success-icon mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="check-icon"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          
          <h1 className="mb-3">Order Placed Successfully!</h1>
          <p className="lead text-muted mb-4">
            Thank you for your order. We've received it and will process it soon.
          </p>

          <Card className="order-details-card">
            <Card.Body>
              <h4 className="mb-3">Order Details</h4>
              
              <div className="detail-row">
                <span className="detail-label">Order ID:</span>
                <strong>{orderDetails.orderId}</strong>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span>{orderDetails.fullName}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span>{orderDetails.email}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span>{orderDetails.phone}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Delivery Address:</span>
                <span>
                  {orderDetails.address}, {orderDetails.city}, {orderDetails.state} - {orderDetails.pincode}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Payment Method:</span>
                <span className="text-uppercase">
                  {orderDetails.paymentMethod === "cod" ? "Cash on Delivery" : "UPI Payment"}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Total Amount:</span>
                <strong className="text-primary">₹{orderDetails.totalPrice}</strong>
              </div>
            </Card.Body>
          </Card>

          <div className="action-buttons mt-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate("/")}
              className="me-3"
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg"
              onClick={() => navigate("/shop")}
            >
              Browse Products
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OrderSuccess;