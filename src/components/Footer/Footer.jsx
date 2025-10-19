import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
  return (
    <footer>
        <Container>
          <Row className="footer-row">
            <Col md={3} sm={5} className='box'>
              <div className="logo">
                  <ion-icon name="bag"></ion-icon>
                  <h1>SnapMart</h1>
              </div>
              <p>An e-commerce shop is a digital platform that facilitates the buying and selling of goods and services over the internet, offering customers 24/7 access and global reach.</p>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>About Us</h2>
              <ul>
                <li>Careers</li>
                <li>Our Stores</li>
                <li>Our Cares</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>Customer Care</h2>
              <ul>
                <li>Help Center </li>
                <li>How to Buy </li>
                <li>Track Your Order </li>
                <li>Corporate & Bulk Purchasing </li>
                <li>Returns & Refunds </li>
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>Contact Us</h2>
              <ul>
                <li>Ranchi, Jharkhand</li>
                <li>Email: snapmart@gmail.com</li>
                <li>Phone: +1 1123 456 780</li>
              </ul>
            </Col>
            copyright &copy; 2025 developed by Sanju. All rights reserved.
          </Row>
        </Container>
    </footer>
  )
}

export default Footer
