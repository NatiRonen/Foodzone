import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MessageForm2 from "../../chat/messageForm2";
import AuthAdminComp from "../../comps/auth/authAdminComp";
import SideBarAdmin2 from "./SideBarAdmin2";
import "../../chat/css/newChat.css";

function ChatAdmin2() {
  return (
    <>
      <div className="container-fluid p-4">
        <AuthAdminComp />
        <Container className="my-5 shadow_chat">
          <Row className="p-0">
            <Col md={4} className="border-end p-0">
              <SideBarAdmin2 />
            </Col>
            <Col md={8} className="p-0">
              <MessageForm2 />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ChatAdmin2;
