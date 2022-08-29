import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import MessageForm from "./MessageForm";
import "./css/newChat.css";

function Chat() {
  return (
    <div className="container-fluid">
      <Row className="mt-2 shadow" style={{ height: "87.7vh" }}>
        <Col md={4} className="border-end p-0">
          <Sidebar />
        </Col>
        <Col md={8} className="p-0" style={{ height: "87.7vh" }}>
          <MessageForm />
        </Col>
      </Row>
    </div>
  );
}

export default Chat;
