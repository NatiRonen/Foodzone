import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthAdminComp from "../../comps/auth/authAdminComp";
import MessageForm from "../../chat/MessageForm";
import SideBarAdmin from "./SideBarAdmin";
import "../../chat/css/newChat.css";

function ChatAdmin() {
  return (
    <>
      <AuthAdminComp />
      <Row className=" shadow_chat" style={{ height: "89.7vh" }}>
        <Col md={4} className="border-end p-0">
          <SideBarAdmin />
        </Col>
        <Col md={8} className="p-0">
          <MessageForm />
        </Col>
      </Row>
    </>
  );
}

export default ChatAdmin;
