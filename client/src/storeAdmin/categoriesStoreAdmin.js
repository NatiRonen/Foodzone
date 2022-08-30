import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import LottieAnimation from "../comps/misc/lottieAnimation";
import { FiTrash2 } from "react-icons/fi";
import { BiAddToQueue } from "react-icons/bi";
import "./css/categories.css";

function CategoriesStoreAdmin() {
  const [loading, setloading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const params = useParams();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    let url = API_URL + "/categories/" + params.id;
    let resp = await doApiGet(url);
    console.log(resp.data);
    setCategories(resp.data);
    setloading(false);
  };

  const addCategory = async () => {
    if (categories.includes(newCategory)) {
      toast.warning("Category already exists");
      return;
    }
    await addRemoveCat(newCategory);
  };

  const addRemoveCat = async (_cat) => {
    let url = API_URL + "/categories/" + params.id + "/" + _cat;
    let resp = await doApiMethod(url, "PATCH", {});
    if (resp.data.modifiedCount === 1) {
      getCategories();
    }
  };
  return (
    <div className="container">
      <h1 className="display-4 mb-5">Categories</h1>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-10">
            <div className="card">
              <div className="card-body p-5">
                {/* add categories */}
                <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                  <div className="input-group">
                    <input
                      type="search"
                      value={newCategory}
                      placeholder="Category Name ..."
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="form-control border-0 bg-light"
                    />
                    <div className="input-group-append">
                      <button
                        onClick={() => {
                          addCategory();
                          setNewCategory("");
                        }}
                        className="btn btn-link text-success bootstrap_no_border"
                      >
                        <BiAddToQueue size="1.5em" className="ms-1" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="cat_list">
                  <ul className="list-group cat_list mb-0">
                    {!loading && categories.length === 0 ? (
                      <h2 className="display-4 text-center mt-5 text-danger">
                        No categories found
                      </h2>
                    ) : (
                      ""
                    )}
                    {categories.map((category, idx) => {
                      return (
                        <li
                          key={idx}
                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded cat_item"
                        >
                          <button
                            onClick={() => {
                              addRemoveCat(category);
                            }}
                            className="btn text-danger bootstrap_no_border"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                          {category}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? <LottieAnimation /> : ""}
    </div>
  );
}

export default CategoriesStoreAdmin;
