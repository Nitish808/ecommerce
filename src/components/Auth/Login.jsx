import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import "./login.css";

const Login = ({ show, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [error, setError] = useState("");

  // Predefined credentials for easy login
  const validCredentials = {
    email: "user@multimart.com",
    password: "password123"
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login logic
      if (
        formData.email === validCredentials.email &&
        formData.password === validCredentials.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", formData.email);
        handleClose();
        window.location.reload();
      } else {
        setError("Invalid email or password");
      }
    } else {
      // Signup logic
      if (formData.name && formData.email && formData.password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", formData.email);
        handleClose();
        window.location.reload();
      } else {
        setError("Please fill all fields");
      }
    }
  };

  const handleQuickLogin = () => {
    setFormData({
      email: validCredentials.email,
      password: validCredentials.password,
      name: ""
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? "Login" : "Sign Up"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <div className="demo-credentials mb-3 p-2 bg-light rounded">
          <small className="text-muted">
            <strong>Demo Credentials:</strong><br />
            Email: user@multimart.com<br />
            Password: password123
            <Button 
              variant="link" 
              size="sm" 
              onClick={handleQuickLogin}
              className="p-0 ms-2"
            >
              (Auto-fill)
            </Button>
          </small>
        </div>

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            {isLogin ? "Login" : "Sign Up"}
          </Button>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setFormData({ email: "", password: "", name: "" });
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;