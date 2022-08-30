import React, { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../redux/appApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteAccount from "../comps/general/DeleteAccount";
import { encrypt } from "../utils/encryption";
import GetAddress from "../comps/misc/GetAddress";
import { FiSettings } from "react-icons/fi";
import "./css/updateAccount.css";

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
    let resp = await updateUser({
      name,
      email,
      password: encryptCurrentPass,
      picture: picUrl,
      newPassword: encryptNewPass,
      address,
      phone,
    });

    if (resp.data.data.modifiedCount === 0) {
      toast.warning("no changes were made");
    }
    if (resp.data.data.modifiedCount === 1) {
      toast.info("Accoutn details updated");

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
      const urlData = await res.json();
      setUploading(false);
      return urlData.url;
    } catch (err) {
      setUploading(false);
      console.log(err);
    }
  };

  return (
    <section className="py-5">
      <DeleteAccount show={show} handleToggle={handleToggle} />
      <div className="container">
        <h1 className="mb-5 animaLink">
          Account Settings <FiSettings className="ms-2" />
        </h1>
        <div className="bg-white shadow rounded-lg d-block d-sm-flex">
          <div className="profile-tab-nav border-end">
            <div className="p-4">
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
              <h4 className="mt-2 text-center capitalize_name">hello {name}</h4>
            </div>
            <p className="delete_account">
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
          <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
            <Form onSubmit={handleUpdate} className="tab-pane fade show active">
              <h3 className="mb-4">Account Details</h3>
              <div className="row">
                <Form.Group className="mb-3 col-md-6" controlId="formBasicName">
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
                <Form.Group className="mb-3 col-md-6 " controlId="formBasicEmail">
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
                <Form.Group className="mb-3 col-md-6" controlId="formBasicPassword">
                  <Form.Label>Current password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-6" controlId="formBasicPassword">
                  <Form.Label>New password (optional)</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-6">
                  <GetAddress setAddress={setAddress} currentAddress={address} />
                </Form.Group>
                <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone nuber"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    required
                  />
                </Form.Group>
              </div>
              <div>
                <Button variant="primary" type="submit">
                  {uploading || isLoading ? <Spinner animation="grow" /> : "Update"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateAccount;
