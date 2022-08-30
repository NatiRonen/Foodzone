import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { API_URL } from "../../services/apiService";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import { encrypt } from "../../utils/encryption";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SEND_EMAIL = "send email";
const SEND_CODE = "send send code";
const SEND_PASSWORD = "new password";

function ResetPass(props) {
  const [content, setContent] = useState(SEND_EMAIL);
  const [email, setEmail] = useState("ronennt@gmail.com");
  const [userEmail, setUserEmail] = useState("ronennt@gmail.com");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const nav = useNavigate();

  let show = props.show;
  let handleToggle = props.handleToggle;

  const handleClose = () => {
    setContent(SEND_EMAIL);
    setResetCode("");
    setEmail("");
    setNewPassword("");
    setError("");
    handleToggle();
  };

  const handelSubmit = () => {
    switch (content) {
      case SEND_EMAIL:
        sendEmail();
        break;
      case SEND_CODE:
        submitCode();
        break;
      case SEND_PASSWORD:
        submitPassword();
        break;
      default:
        return;
    }
  };

  const sendEmail = async () => {
    if (!isEmail(email)) {
      setError("invalid email");
      return;
    }
    let url = API_URL + "/users/sendResetEmail";
    try {
      let resp = await axios.get(url, {
        headers: {
          "x-api-key": email,
        },
      });
      if (resp.data.emailSent === true) {
        setUserEmail(email);
        setEmail("");
        setContent(SEND_CODE);
      } else if (resp.data.emailSent === false) {
        setError("Cannot send code. Plase check the email address and try again");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  const submitCode = async () => {
    let url = API_URL + "/users/checkResetCode";
    try {
      let resp = await axios.get(url, {
        headers: {
          "x-api-key": resetCode,
        },
      });
      setResetCode("");
      setContent(SEND_PASSWORD);
      setEmail(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  const submitPassword = async () => {
    let url = API_URL + "/users/resetCode";
    let encryptedPassword = encrypt(newPassword);
    let resp = await axios.get(url, {
      headers: {
        "x-api-key": encryptedPassword,
        "user-email": "ronennt@gmail.com",
      },
    });
    if (resp.data.modifiedCount === 1) {
      setNewPassword("");
      toast.success("Your password has been changed successfully");
      handleToggle();

      nav("/");
    } else {
      setError("wrong code");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset password</Modal.Title>
        </Modal.Header>
        {error && <p className="alert alert-danger">{error ? error : ""}</p>}
        {content === SEND_EMAIL && (
          <Modal.Body>
            <Form controlId="formBasicEmail">
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Please enter your email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  value={email}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
        )}
        {content === SEND_CODE && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Modal.Body>
              <Form>
                <Form.Label>Recet code sent to {userEmail}</Form.Label>
                <Form.Group className="mb-3 text-start" controlId="formBasicText">
                  <Form.Control
                    type="text"
                    placeholder="Enter reset code"
                    onChange={(e) => {
                      setResetCode(e.target.value);
                      setError("");
                    }}
                    value={resetCode}
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
          </motion.div>
        )}
        {content === SEND_PASSWORD && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Modal.Body>
              <Form>
                <Form.Label>Please enter new password</Form.Label>
                <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
          </motion.div>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handelSubmit}
            disabled={!email && !resetCode && !newPassword}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResetPass;
