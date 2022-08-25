import React from "react";
import { BsFacebook, BsTwitter, BsSnapchat, BsInstagram } from "react-icons/bs";
import { motion } from "framer-motion";

function Developers(props) {
  let devInfo = props.devInfo;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="col-lg-6 mb-4"
    >
      <div className="row">
        <div className="">
          <img
            src={devInfo.img}
            alt="wrapkit"
            className="img-fluid rounded-circle mx-auto d-block"
          />
        </div>
        <div className=" text-center">
          <div className="pt-2">
            <h5 className="mt-4 font-weight-medium mb-0">{devInfo.name}</h5>
            <h6 className="subtitle mb-3">{devInfo.job}</h6>
            <p>{devInfo.info}</p>
            <ul className="list-inline">
              {devInfo.Facebook === "" ? (
                " "
              ) : (
                <li className="list-inline-item">
                  <a href="#" className="text-decoration-none d-block px-1">
                    <BsFacebook />
                  </a>
                </li>
              )}
              {devInfo.Twitter === "" ? (
                ""
              ) : (
                <li className="list-inline-item">
                  <a href="#" className="text-decoration-none d-block px-1">
                    <BsTwitter />
                  </a>
                </li>
              )}
              {devInfo.Instagram === "" ? (
                ""
              ) : (
                <li className="list-inline-item">
                  <a href="#" className="text-decoration-none d-block px-1">
                    <BsInstagram />
                  </a>
                </li>
              )}
              {devInfo.Snapchat === "" ? (
                ""
              ) : (
                <li className="list-inline-item">
                  <a href="#" className="text-decoration-none d-block px-1">
                    <BsSnapchat />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Developers;
