import React from "react";
import { motion } from "framer-motion";
import AuthAdminComp from "../comps/auth/authAdminComp";
import "../comps/css/homeStrip.css";

function HomeAdmin(props) {
  return (
    <div
      className="strip_home container-fluid d-flex align-items-center"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
      }}
    >
      <AuthAdminComp />
      <motion.div
        className="container text_bg text-center"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <h2>Welcome to Admin panel</h2>
      </motion.div>
    </div>
  );
}
export default HomeAdmin;
