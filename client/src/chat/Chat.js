import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./sidebar";
import MessageForm from "./messageForm";
import "./css/newChat.css";

function Chat() {
  return (
    <div className="container-fluid p-4">
      <Container className="my-5 shadow_chat">
        <Row className="p-0">
          <Col md={4} className="border-end p-0">
            <Sidebar />
          </Col>
          <Col md={8} className="p-0">
            <MessageForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Chat;
