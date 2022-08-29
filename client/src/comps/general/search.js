import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/search.css";

function Search(props) {
  let searchRef = useRef();
  let nav = useNavigate();

  const search = () => {
    let search = searchRef.current.value;
    {
      search
        ? nav(`/${props.to}/${search}`)
        : toast.error("Please enter a search term");
    }
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
