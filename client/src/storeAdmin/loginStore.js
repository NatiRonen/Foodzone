import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiStore } from "react-icons/bi";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "../admin-dashboard/style/adminLogin.css";
import { useLoginUserMutation } from "../redux/appApi";
import { encrypt } from "../utils/encryption";
import ResetPass from "../comps/general/resetPass";

function LoginStore(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [show, setShow] = useState(false);
  const nav = useNavigate();

  const handleToggle = () => setShow(!show);

  const handleLogin = async (e) => {
    e.preventDefault();
    let encryptPass = encrypt(password);
    let resp = await loginUser({ email, password: encryptPass });
    console.log(resp.data);
    if (resp.data) {
      if (resp.data.user) {
        nav("../");
      } else {
        toast.error("Unathorized user");
        nav("/");
      }
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage["tok"]) {
      nav("./home");
    }
  }, []);

  return (
    <div className="login_bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="login-dark"
      >
        <ResetPass handleToggle={handleToggle} show={show} />
        <Form onSubmit={handleLogin}>
          <h2 className="text-center">Admin Login</h2>
          <div className="illustration">
            <BiStore />
          </div>
          {error && (
            <p className="alert alert-danger">
              {error.data?.err ? error.data.err : "It's not you, it's up. Please thy again later."}
            </p>
          )}
          <Form.Group className="mb-3 text-start">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 text-start">
            <Form.Label className="text-left">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isLoading ? <Spinner animation="grow" /> : "Login"}
          </Button>
          <div className="py-4">
            {error?.status === 401 ? ( //403 - unauthorized
              <p className="text-center">
                Forgot your password?
                <span className="text-primary" style={{ cursor: "pointer" }} onClick={handleToggle}>
                  {" "}
                  resst password
                </span>
              </p>
            ) : (
              ""
            )}
          </div>
        </Form>
      </motion.div>
    </div>
  );
}

export default LoginStore;
