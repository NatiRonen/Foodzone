import React from "react";
import { Col, Row } from "react-bootstrap";
import AuthAdminComp from "../../comps/auth/authAdminComp";
import MessageForm from "../../chat/MessageForm";
import SideBarAdmin from "./SideBarAdmin";
import "../../chat/css/newChat.css";

function ChatAdmin() {
  return (
    <div style={{ overflowX: "hidden" }} className="container-fluid border">
      <AuthAdminComp />
      <Row>
        <Col md={4} className="border-end p-0">
          <SideBarAdmin />
        </Col>
        <Col md={8} className="p-0">
          <MessageForm />
        </Col>
      </Row>
    </div>
  );
}

export default ChatAdmin;
