import React from "react";
import { motion } from "framer-motion";
import "../css/homeStrip.css";

function HomeStrip(props) {
  let image = props.image;
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="strip_home container-fluid d-flex align-items-center"
    >
      <motion.div
        className="container text_bg text-center"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <h2>Welcome to ShipMarket</h2>
        <h4>Buy your meal from home</h4>
      </motion.div>
    </div>
  );
}

export default HomeStrip;
