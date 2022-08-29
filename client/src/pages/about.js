import React from "react";
import { motion } from "framer-motion";
import Developers from "../comps/general/developers";
import "./css/about.css";

function About(props) {
  let dev1Info = {
    name: "Ariel Levi",
    job: "FullStack Developer",
    info: "Full Stack developer, gradutated practical course at Ort Singalovski. Autodidact and passionate about web development.",
    img: "https://media-exp1.licdn.com/dms/image/D4D35AQG7L6RPHp9gTA/profile-framedphoto-shrink_200_200/0/1658870066712?e=1662300000&v=beta&t=3OT9q_O0SzAlg2c_hbhiS9DWHc00tgqlyru57EZ9TI0",
    Facebook: "",
    Twitter: "",
    Instagram: "",
    Snapchat: "",
    Github: "https://github.com/Ariel-levi",
    Linkedin: "https://www.linkedin.com/in/ariel-levi1998",
    PdfFill: "/files/Ariel_Levi_cv.pdf",
  };

  let dev2Info = {
    name: "Nati Ronen",
    job: "FullStack Developer",
    info: "Full Stack developer, gradutated practical course at Ort Singalovski. Autodidact and passionate about web development.",
    img: "https://media-exp1.licdn.com/dms/image/D4D35AQFWJwQStA0bZA/profile-framedphoto-shrink_200_200/0/1655922199384?e=1662300000&v=beta&t=TPiNFjVgejlml_yyBqAghFxRBI1J5QuQyt76IIhBfVE",
    Facebook: "",
    Twitter: "",
    Instagram: "",
    Snapchat: "",
    Github: "https://github.com/NatiRonen",
    Linkedin: "https://www.linkedin.com/in/nati-ronen",
    PdfFill: "/files/Nati_Ronen_cv.pdf",
  };

  return (
    <div className="container d-flex align-items-center ">
      <div className="py-5 team4">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <motion.div
              initial={{ y: "-100vw" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="col-md-7 text-center"
            >
              <h3 className="mb-3">Experienced & Professional Team</h3>
              <h6 className="subtitle">
                A food delivery platform for creating stores, ordering food and
                managing deliveries. The client side consist of 4 panels:
                customers, store owners, couriers and admin, and authentications
                for each panel. System sets orders and route to the client
                address through the store. Technologies: client side: react |
                redux server side: node.js |express | jwt | soket.io DB: MongoDB
              </h6>
            </motion.div>
          </div>
          <div className="row">
            <Developers devInfo={dev1Info} />
            <Developers devInfo={dev2Info} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
