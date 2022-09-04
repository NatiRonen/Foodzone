import React from "react";
import { Col, Row } from "react-bootstrap";
import AuthAdminComp from "../../comps/auth/authAdminComp";
import MessageForm from "../../chat/MessageForm";
import SideBarAdmin from "./SideBarAdmin";
import "../../chat/css/newChat.css";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

function ChatAdmin() {
  return (
    <div style={{ overflowX: "hidden" }} className="container-fluid border list">
      {/* <AuthAdminComp /> */}
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <Row>
          <Col md={8} className="p-0">
            <MessageForm class="admin-form" height="76.3vh" />
          </Col>
          <Col md={4} className="border-end p-0">
            <SideBarAdmin />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ChatAdmin;
