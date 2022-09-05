import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { BsPen, BsEraser } from "react-icons/bs";
import Table from "react-bootstrap/Table";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import LottieAnimation from "../comps/misc/lottieAnimation";
import { getFromattedDate } from "../utils/dateRormated";
import AuthStoreAdminComp from "../comps/auth/authStoreAdminComp";

function ProductsStoreAdmin(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  let params = useParams();
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/products/storeProducts/" + params.id;
    try {
      let resp = await doApiGet(url);
      //
      setProducts(resp.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const delProduct = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        let url = API_URL + "/products/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {}, params.id);
        //
        if (resp.data.deletedCount) {
          toast.info("Product deleted successfully");
        }
        // to show the new list without the product that we deleted
        doApi();
      } catch (err) {
        console.log(err.response);
        alert("there problem , try again later");
      }
    }
  };

  return (
    <div className="container overflow-scroll">
      <AuthStoreAdminComp />

      <h1 className="display-4">Products</h1>
      <button
        onClick={() => {
          nav("../");
        }}
        className="btn btn-outline-dark me-2"
      >
        Back <IoMdArrowRoundBack />
      </button>
      <Link className="btn btn-outline-success my-3" to="./addProduct">
        Add Product <MdAddShoppingCart />
      </Link>

      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Date Created</th>
            <th>Short_id</th>
            <th>Edit</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={item.imgUrl || "/images/no_image.png"}
                    alt={item.name + " image"}
                    height="50"
                    width="90"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item?.category}</td>
                <td>{getFromattedDate(item.date_created)}</td>
                <td>{item.short_id}</td>
                <td>
                  <Link
                    to={"./edit/" + item._id}
                    className="btn btn-outline-secondary mx-2"
                    title="Edit"
                  >
                    <BsPen />
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      delProduct(item._id);
                    }}
                    className="btn btn-outline-danger"
                    title="Delete"
                  >
                    <BsEraser />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {loading ? <LottieAnimation /> : ""}
      {!loading && products.length === 0 ? (
        <h2 className="display-4 text-center mt-5 text-danger">No products found</h2>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductsStoreAdmin;
