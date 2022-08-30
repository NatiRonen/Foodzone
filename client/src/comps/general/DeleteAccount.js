import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputGroup, Spinner, Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDeleteUserMutation } from "../../redux/appApi";
import { toast } from "react-toastify";
import { encrypt } from "../../utils/encryption";

function DeleteAccount(props) {
  const [password, setPassword] = useState("");
  const [deleteUser, { Loading, error }] = useDeleteUserMutation();
  const nav = useNavigate();

  let show = props.show;
  let handleToggle = props.handleToggle;

  const onDeleteClick = async () => {
    if (password) {
      let encryptedPassword = encrypt(password);
      let resp = await deleteUser(encryptedPassword);
      if (resp.data.deletedCount === 1) {
        nav("/");
        toast.info("Your account has been deleted");
        handleToggle();
      }
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleToggle} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete your account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && <p className="alert alert-danger">{error.data.err}</p>}
          <p className="text-start">Please enter your password</p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              type="password"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit" onClick={handleToggle}>
            Close
          </Button>
          <Button variant="primary" onClick={onDeleteClick} disabled={!password}>
            {Loading ? <Spinner animation="grow" /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAccount;
