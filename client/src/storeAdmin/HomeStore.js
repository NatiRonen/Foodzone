import React from "react";
import { motion } from "framer-motion";
import "../comps/css/homeStrip.css";
import AuthStoreAdminComp from "../comps/auth/authStoreAdminComp";

function HomeStore(props) {
  return (
    <div
      className="strip_home container-fluid d-flex align-items-center"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
      }}
    >
      <motion.div
        className="container text_bg text-center"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <h2 className="text-light">Welcome to your store</h2>
      </motion.div>
      <AuthStoreAdminComp />
    </div>
  );
}

export default HomeStore;
