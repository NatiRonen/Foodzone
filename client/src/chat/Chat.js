import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import MessageForm from "./MessageForm";
import "./css/newChat.css";
import { AppContext } from "../context/appContext";

function Chat() {
  const { setDisplayFooter } = useContext(AppContext);
  useEffect(() => {
    setDisplayFooter(false);
    return () => {
      setDisplayFooter(true);
    };
  }, []);
  return (
    <div style={{ overflowX: "hidden" }} className="container-fluid mb-5 border">
      <Row>
        <Col md={4} className="border-end p-0">
          <Sidebar />
        </Col>
        <Col md={8} className="p-0">
          <MessageForm />
        </Col>
      </Row>
    </div>
  );
}

export default Chat;
