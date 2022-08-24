import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar2 from "./sidebar2";
import MessageForm2 from "./messageForm2";
import "./css/newChat.css";

function Chat2() {
  return (
    <div className="container-fluid p-4">
      <Container className="my-5 shadow_chat">
        <Row className="p-0">
          <Col md={4} className="border-end p-0">
            <Sidebar2 />
          </Col>
          <Col md={8} className="p-0">
            <MessageForm2 />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Chat2;
