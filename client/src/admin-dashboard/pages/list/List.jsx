import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UsersData from "../../components/datatable/UsersData";
import StoresData from "../../components/datatable/StoresData";
import ProductsData from "../../components/datatable/productsData";
import OrdersData from "../../components/datatable/OrdersData";
import AuthAdminComp from "../../../comps/auth/authAdminComp";

const List = ({ data }) => {
  const getDataTable = () => {
    switch (data) {
      case "users":
        return <UsersData />;
      case "stores":
        return <StoresData />;
        break;
      case "products":
        return <ProductsData />;
        break;
      case "orders":
        return <OrdersData />;
        break;

      default:
        break;
    }
  };

  return (
    <div className="list">
      <AuthAdminComp />
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {getDataTable()}
      </div>
    </div>
  );
};

export default List;
