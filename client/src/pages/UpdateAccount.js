import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../redux/appApi";
import { useSelector } from "react-redux";
import "./css/updateAccount.css";
import { toast } from "react-toastify";
import DeleteAccount from "../comps/general/DeleteAccount";
import { motion } from "framer-motion";
import { encrypt } from "../utils/encryption";
import GetAddress from "../comps/misc/GetAddress";

function UpdateAccount() {
  const user = useSelector((state) => state.user);
  //hooks
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const nav = useNavigate();
  //user details
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [show, setShow] = useState(false);
  //image upload states
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(user?.picture);

  useEffect(() => {
    if (!user) {
      toast.error(error?.data.err);
      nav("/login");
    }
  }, [user, error]);

  const handleToggle = () => setShow(!show);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const picUrl = image ? await uploadImage(image) : imagePreview;
    let encryptCurrentPass = encrypt(currentPassword);
    let encryptNewPass = newPassword ? encrypt(newPassword) : null;
    console.log(address);
    let resp = await updateUser({
      name,
      email,
      password: encryptCurrentPass,
      picture: picUrl,
      newPassword: encryptNewPass,
      address,
      phone,
    });
    console.log(resp.data);
    if (resp.data.data.modifiedCount === 0) {
      toast.warning("no changes were made");
    }
    if (resp.data.data.modifiedCount === 1) {
      toast.info("Accoutn details updated");
      console.log(resp.data);
      nav("/");
    }
  };

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file sizw is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ucq0egki");
    try {
      setUploading(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/nati5550558/image/upload", {
        method: "POST",
        body: data,
      });
      console.log(data);
      const urlData = await res.json();
      setUploading(false);
      return urlData.url;
    } catch (err) {
      setUploading(false);
      console.log(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <DeleteAccount show={show} handleToggle={handleToggle} />
      <div className="d-flex align-items-center h-100">
        <Container>
          <Row
            className="justify-content-between align-items-center"
            style={{ minHeight: "90.7vh" }}
          >
            <Col
              lg={5}
              className="d-flex shadow flex-direction-column align-items-center justify-content-center"
            >
              <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleUpdate}>
                <p className="text-center display-6 my-4">Account details</p>{" "}
                <div className="update-profile-pic__container">
                  <img src={imagePreview} className="update-profile-pic" />
                  <label htmlFor="image-upload" className="image-upload-label">
                    <i className="fas fa-plus-circle add-picture-icon"></i>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    hidden
                    accept="image/png, image/jpeg"
                    onChange={validateImg}
                  />
                </div>
                <Form.Group className="mb-3" controlId="formBasicName">
                  {error && <p className="alert alert-danger">{error.data.err}</p>}
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Current password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>New password (optional)</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                </Form.Group>
                <GetAddress setAddress={setAddress} currentAddress={address} />
                <Form.Group className="mb-5" controlId="formBasicEmail">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone nuber"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {uploading || isLoading ? <Spinner animation="grow" /> : "Update"}
                </Button>
                <div className="my-4">
                  <p className="text-center">
                    <span
                      className="text-primary color-info"
                      style={{ cursor: "pointer" }}
                      onClick={handleToggle}
                    >
                      Delete
                    </span>{" "}
                    my account
                  </p>
                </div>
              </Form>
            </Col>
            <Col lg={6} className="update__bg d-none d-lg-block"></Col>
          </Row>
        </Container>
      </div>
    </motion.div>
  );
}

export default UpdateAccount;
