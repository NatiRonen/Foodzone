import React from "react";
import AuthCourierComp from "../comps/auth/authCourierComp";
import { motion } from "framer-motion";
import "../comps/css/homeStrip.css";
function homeCourier(props) {
  return (
    <div
      className="strip_home container-fluid d-flex align-items-center"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/4604599/pexels-photo-4604599.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
      }}
    >
      <AuthCourierComp />
      <motion.div
        className="container text_bg text-center"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <h2>Welcome to couriers panel</h2>
      </motion.div>
    </div>
  );
}

export default homeCourier;
