import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/productCard.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { borders } from "@mui/system";
import Box from "@mui/material/Box";
function StoreCard({ item }) {
  let nav = useNavigate();
  const commonStyles = {
    borderColor: "text.primary",
    m: 1,
    border: 1,
    width: "5rem",
    height: "5rem",
  };

  return (
    <Link to={"/store/" + item.short_id} className="text-decoration-none">
      <Card sx={{ minHeight: 400, borderRadius: "16px", boxShadow: 3 }} className="shadow">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={item.imgUrl || "/images/no_image.png"}
            alt={item.name}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.info}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
{
}
{
  /* <div className="col-lg-4 col-md-6 col-sm-12 p-2">
  <div
  onClick={() => {
    nav("/store/" + item.short_id);
  }}
  className="product-card bg-white mb-4 overflow-hidden d-lg-flex flex-column rounded-lg position-relative border store"
  >
    <div className="product-image overflow-hidden">
    <img
    src={item.imgUrl || "/images/no_image.png"}
    alt={item.name}
    className="product-thumbnail rounded-lg"
    />
    </div>
    <div className="p-4 product-details">
    <div className="display-5 fs-1">{item.name}</div>
    <div className="display-5 fs-5">{item.info}</div>
    </div>
    </div>
  </div> */
}

export default StoreCard;
