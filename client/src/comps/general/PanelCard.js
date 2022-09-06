import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

export default function PanelCard({ type }) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const CLIENT = {
    email: "client@gmail.com",
    password: "2468",
  };
  const STORE_OWNNER = {
    email: "storeowner@gmail.com",
    password: "2468",
  };
  const COURIER = {
    email: "courier@gmail.com",
    password: "2468",
  };
  const ADMIN = {
    email: "admin@gmail.com",
    password: "2468",
  };
  let data = {};

  switch (type) {
    case "client":
      data = {
        title: "Client interface",
        img: "https://img.freepik.com/free-vector/young-people-standing-near-cashier-grocery-store-counter-payment-buyer-flat-vector-illustration-food-meal-products_74855-8742.jpg?w=1380&t=st=1662396988~exp=1662397588~hmac=cb5f5ac7385b36674eae06a97a2c0fff22d27791bc5fe10c3cb930c19169f4f1",
        info: "Click here to get the logged in client experience. Buy products (using unreal paypal account prepared in advance), and get the orders status apdatating on real time.",
        url: "/login",
        user: CLIENT,
      };
      break;
    case "courier":
      data = {
        title: "Courier interface",
        img: "https://img.freepik.com/free-vector/male-couriers-delivering-parcels_74855-14101.jpg?w=1380&t=st=1662391767~exp=1662392367~hmac=f9d30d01de4540e071a957369b88a7f6dac4fafe33aca4e4b3a38ed898d3f165",
        info: "Click here to get to courier interface. Get the opened orders on map (using google maps) with route distance and approximate route duration, take an order and get the route to client address through the store.",
        url: "/courier/login",
        user: COURIER,
      };
      break;
    case "storeOwner":
      data = {
        title: "Store management",
        img: "https://img.freepik.com/free-vector/shop-with-sign-we-are-open_52683-38687.jpg?w=1380&t=st=1662392131~exp=1662392731~hmac=e707bcdfbd9097c224330ba2801c01f2af30d2784fd01e2411aa01e307777c17",
        info: "Click here to get to store owner interface. manage your store, add edit and delete products, add categories. Get the incoming orders on real time and update the couriers when order is ready.",
        url: "/storeAdmin/24528/login",
        user: STORE_OWNNER,
      };
      break;
    case "admin":
      data = {
        title: "Back office",
        img: "https://img.freepik.com/free-vector/office-workers-organizing-data-storage-file-archive-server-computer-cartoon-illustration_74855-14465.jpg?w=1380&t=st=1662391904~exp=1662392504~hmac=7f235cd478b005e4f986ccdb8dc2ec508ad7f5f59ae91888ee6633be8bc584df",
        info: "Click here to get to back office interface. Get the information about all the users, stores, products and orders. Get graphs on each user and each store activity. Modified users role and approve new store requests and applications for a courier position.",
        url: "/admin-dashboard/login",
        user: ADMIN,
      };
      break;

    default:
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <Link
        to={data.url}
        state={{ user: data.user }}
        className="text-decoration-none"
        onClick={() => dispatch(logout())}
      >
        <Card sx={{ maxWidth: 345, minHeight: 400 }} className="shadow">
          <CardActionArea>
            <CardMedia component="img" height="140" image={data.img} alt={data.titel} />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.info}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </motion.div>
  );
}
