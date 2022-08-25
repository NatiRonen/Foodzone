import React from "react";
import { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignupUserMutation } from "../redux/appApi";
import { motion } from "framer-motion";

import "./css/Signup.css";
import { encrypt } from "../utils/encryption";
import GetAddress from "../comps/misc/GetAddress";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  //image upload states
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const picUrl = image ? await uploadImage(image) : defaultImage;
    let encryptPass = encrypt(password);
    signupUser({ name, email, phone, address, password: encryptPass, picture: picUrl }).then(
      ({ data }) => {
        if (data) {
          console.log(data);
          toast.success("Account created successfully");
          nav("/");
        }
      }
    );
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
    <Container>
      {/* <GoogleMap /> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="register-photo"
      >
        <Row className="justify-content-between">
          <Col
            lg={5}
            className="d-flex shadow flex-direction-column align-items-center justify-content-center mt-3"
          >
            <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
              <p className="text-center display-6 mb-4">Create account</p>
              <div className="signup-profile-pic__container">
                <img src={imagePreview || defaultImage} className="signup-profile-pic" />
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
                {error && <p className="alert alert-danger">{error.data}</p>}
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Form.Group>
              <GetAddress setAddress={setAddress} currentAddress={address} />
              <Form.Group controlId="formBasicPhone" className="mb-3 ">
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
                {uploading || isLoading ? <Spinner animation="grow" /> : "Signup"}
              </Button>
              <div className="mt-4">
                <p className="text-center">
                  Already have an account?{" "}
                  <Link className="text-decoration-none" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
          <Col lg={6} className="signup__bg d-none d-lg-block"></Col>
        </Row>
      </motion.div>
    </Container>
  );
}

export default Signup;
