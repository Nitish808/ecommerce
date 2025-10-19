import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const Checkout = () => {
  const { cartList } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    upiId: ""
  });

  // Check if user is logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail");
    
    if (loggedIn !== "true") {
      // Redirect to home if not logged in
      alert("Please login first to place an order");
      navigate("/");
      return;
    }
    
    setIsLoggedIn(true);
    // Pre-fill email if available
    if (userEmail) {
      setFormData(prev => ({ ...prev, email: userEmail }));
    }
  }, [navigate]);

  // Calculate total price
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Validate UPI ID if UPI payment is selected
    if (paymentMethod === "upi" && !formData.upiId) {
      alert("Please enter your UPI ID");
      return;
    }

    // Process order
    const orderDetails = {
      ...formData,
      paymentMethod,
      items: cartList,
      totalPrice,
      orderDate: new Date().toISOString(),
      orderId: `ORD${Date.now()}`
    };

    // Save order to localStorage (in real app, send to backend)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    setOrderPlaced(true);

    // Redirect to success page after 2 seconds
    setTimeout(() => {
      navigate("/order-success", { state: { orderDetails } });
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <Container className="checkout-container">
        <Alert variant="warning" className="text-center mt-5">
          <h4>Please Login First</h4>
          <p>You need to be logged in to place an order.</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </Alert>
      </Container>
    );
  }

  if (cartList.length === 0) {
    return (
      <Container className="checkout-container">
        <Alert variant="warning" className="text-center mt-5">
          Your cart is empty. Please add items to cart first.
          <div className="mt-3">
            <Button variant="primary" onClick={() => navigate("/shop")}>
              Continue Shopping
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (orderPlaced) {
    return (
      <Container className="checkout-container">
        <Alert variant="success" className="text-center mt-5">
          <h4>Order Placed Successfully!</h4>
          <p>Redirecting to order confirmation page...</p>
        </Alert>
      </Container>
    );
  }

  return (
    <section className="checkout-section">
      <Container>
        <Row className="mt-5 pt-5">
          <Col lg={8}>
            <Card className="checkout-card mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3>Shipping Information</h3>
                  <span className="badge bg-success">Logged In</span>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your full name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          required
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid email.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number *</Form.Label>
                        <Form.Control
                          required
                          type="tel"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          pattern="[0-9]{10}"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid 10-digit phone number.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Pin Code *</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="pincode"
                          placeholder="Enter pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          pattern="[0-9]{6}"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid 6-digit pincode.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Address *</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={3}
                      name="address"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>City *</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="city"
                          placeholder="Enter your city"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your city.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>State *</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="state"
                          placeholder="Enter your state"
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your state.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr className="my-4" />

                  <h3 className="mb-4">Payment Method</h3>
                  
                  <div className="payment-methods mb-4">
                    <Form.Check
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      label={
                        <div className="payment-option">
                          <strong>Cash on Delivery (COD)</strong>
                          <p className="text-muted mb-0">Pay when you receive your order</p>
                        </div>
                      }
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mb-3"
                    />
                    
                    <Form.Check
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      label={
                        <div className="payment-option">
                          <strong>UPI Payment</strong>
                          <p className="text-muted mb-0">Pay using Google Pay, PhonePe, Paytm, etc.</p>
                        </div>
                      }
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mb-3"
                    />
                  </div>

                  {paymentMethod === "upi" && (
                    <Form.Group className="mb-3">
                      <Form.Label>UPI ID *</Form.Label>
                      <Form.Control
                        required={paymentMethod === "upi"}
                        type="text"
                        name="upiId"
                        placeholder="yourname@upi"
                        value={formData.upiId}
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted">
                        Enter your UPI ID (e.g., 9876543210@paytm)
                      </Form.Text>
                    </Form.Group>
                  )}

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 mt-3"
                    size="lg"
                  >
                    Place Order
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="order-summary-card sticky-top">
              <Card.Body>
                <h4 className="mb-4">Order Summary</h4>
                
                <div className="order-items mb-3">
                  {cartList.map((item) => (
                    <div key={item.id} className="order-item mb-3">
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.imgUrl} 
                          alt={item.productName}
                          className="order-item-img"
                        />
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">{item.productName}</h6>
                          <small className="text-muted">Qty: {item.qty}</small>
                        </div>
                        <div className="text-end">
                          <strong>₹{item.price * item.qty}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="order-totals">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <strong>₹{totalPrice}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <strong className="text-success">FREE</strong>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <h5>Total:</h5>
                    <h5>₹{totalPrice}</h5>
                  </div>
                </div>

                {paymentMethod === "cod" && (
                  <Alert variant="info" className="mt-3 mb-0">
                    <small>You will pay ₹{totalPrice} on delivery</small>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;