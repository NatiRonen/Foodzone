import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { Form, Row, Col, FormGroup, FormControl, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { IoSend } from "react-icons/io5";
import InputEmoji from "react-input-emoji";
import "./css/message.css";

function MessageForm() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { socket, currentRoom, setMessages, messages, serviceMsg } = useContext(AppContext);
  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFromattedDate = () => {
    let date = new Date();
    // returns date in format of mm-dd-yyyy
    date = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(date);
    return date;
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const todayDate = getFromattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const time = today.toLocaleTimeString([], {
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
    });
    const roomId = currentRoom;
    console.log(roomId);
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")`,
          height: "100%",
        }}
      >
        <div className="settings-tray">
          <div className="friend-drawer no-gutters friend-drawer--grey">
            <img
              className="profile-image"
              src={
                serviceMsg
                  ? "/images/support.png"
                  : `https://avatars.dicebear.com/api/bottts/${currentRoom}.svg`
              }
              alt=""
            />
            <div className="">
              <h6>{!currentRoom ? "" : serviceMsg ? "Contact Us" : currentRoom}</h6>
              <p className="text-muted">
                {serviceMsg
                  ? "We are here for everything you need ❤"
                  : "Keep the conversation proper and enjoyable 😃"}
              </p>
            </div>
          </div>
        </div>
        {!user && <div className="alert alert-danger">Please login</div>}
        <div className="chat_panel mt-4">
          {user &&
            messages.map(({ _id: date, messagesByDate }, idx) => (
              <div key={idx}>
                <div className="chat_box touchscroll chat_box_colors_a">
                  <div className="d-flex justify-content-center">
                    <p className="text-center col-2 chat_date_indicator">{date}</p>
                  </div>

                  {messagesByDate.map(({ content, time, from: sender }, idx) => (
                    <div
                      key={idx}
                      className={
                        sender._id === user._id
                          ? "chat_message_wrapper"
                          : "chat_message_wrapper chat_message_right"
                      }
                    >
                      <div className="chat_user_avatar">
                        <img alt="profile pic" src={sender.picture} className="md-user-image" />
                      </div>
                      <ul className="chat_message">
                        <li>
                          <p>{content}</p>
                          <span className="chat_message_time">{time}</span>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          <div ref={messageEndRef} />
        </div>
        <Form onSubmit={handelSubmit}>
          <Row className="">
            <div className="col-12">
              <div className="chat-box-tray">
                <InputEmoji
                  value={message}
                  onChange={setMessage}
                  cleanOnEnter
                  borderColor="#93CAED"
                  disabled={!user}
                  placeholder="Type your message here..."
                />
                <button type="submit" disabled={!user}>
                  <IoSend size="2em" className="send_icon" />
                </button>
              </div>
            </div>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default MessageForm;
