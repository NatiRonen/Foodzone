import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { BsSearch } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";
import { PEXELS_API_KEY } from "../../services/apiService";
import { Button, Col, Modal, Row } from "react-bootstrap";
import LottieAnimation from "./lottieAnimation";
import "../css/search.css";
import "../css/imagesSearch.css";

function ImagesSearch(props) {
  const [images, setImages] = useState([]);
  const [pexels, setPexels] = useState([]);
  const [total_results, setTotal_results] = useState(0);
  const [results_num, setResults_num] = useState(0);
  const [loading, setLoading] = useState(false);
  let searchRef = useRef();

  let show = props.show;
  let handleToggle = props.handleToggle;
  let setImgUrl = props.setImgUrl;

  useEffect(() => {
    doApi("food");
  }, []);

  const search = () => {
    let search = searchRef.current.value;
    setImages([]);
    {
      search ? doApi(search) : toast.error("Please enter a search term");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const doApi = async (_SearchQ) => {
    setLoading(true);
    let url = `https://api.pexels.com/v1/search?query=${_SearchQ}&per_page=6`;
    let resp = await axios.get(url, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });
    setResults_num(10);
    setPexels(resp.data);
    setTotal_results(resp.data.total_results);
    setImages(resp.data.photos);
    setLoading(false);
  };

  const onClickLoadeMore = async () => {
    let url = pexels.next_page;
    let resp = await axios.get(url, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });
    setPexels(resp.data);
    setResults_num(results_num + 10);
    setImages((images) => [...images, ...resp.data.photos]);
  };

  return (
    <Modal
      show={show}
      onHide={handleToggle}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Find Store photo</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "calc(100vh - 210px)",
          overflowY: "auto",
        }}
      >
        {loading && <LottieAnimation />}

        <div className="inside_box px-4">
          {/* search */}
          <div className="p-1 bg-light rounded rounded-pill shadow mb-4 sticky-top">
            <div className="input-group">
              <input
                ref={searchRef}
                onKeyPress={handleKeyPress}
                type="search"
                placeholder="Search..."
                className="form-control border-0 bg-light"
              />
              <div className="input-group-append">
                <button onClick={search} className="btn btn-link text-primary searchBtn">
                  <BsSearch />
                </button>
              </div>
            </div>
          </div>
          {/* search */}
          {images.length === 0 ? (
            <p className="alert alert-danger">no results found</p>
          ) : (
            <Row>
              {images.map((item) => {
                return (
                  <Col
                    md={6}
                    key={item.id}
                    onClick={() => {
                      setImgUrl(item.src.landscape);
                      handleToggle();
                    }}
                  >
                    <img src={item.src.landscape} alt={item.alt} />
                  </Col>
                );
              })}
              <br />
              {total_results > results_num ? (
                <Button
                  onClick={() => {
                    onClickLoadeMore();
                  }}
                >
                  More <BiLoader className="mx-2" />
                </Button>
              ) : (
                ""
              )}
            </Row>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleToggle}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImagesSearch;
