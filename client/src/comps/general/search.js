import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../css/search.css";

function Search(props) {
  const shops_ar = props.shops_ar;
  const searchRef = useRef();
  const nav = useNavigate();

  const search = () => {
    let search = searchRef.current.value;
    let temp = shops_ar.filter(
      (item) =>
        item.name.toUpperCase().includes(search.toUpperCase()) ||
        item.info.toUpperCase().includes(search.toUpperCase())
    );
    props.setShops_temp(temp);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
      <div className="input-group">
        <input
          ref={searchRef}
          onKeyPress={handleKeyPress}
          type="search"
          placeholder={props.text}
          className="form-control border-0 bg-light"
        />
        <div className="input-group-append">
          <button
            onClick={search}
            className="btn btn-link text-primary searchBtn"
          >
            <BsSearch />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
