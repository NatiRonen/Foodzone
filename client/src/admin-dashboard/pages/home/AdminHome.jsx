import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../../services/apiService";
import { modifyChartData } from "../../components/chart/chatService";
import ListOrdersUser from "../../components/table/ListOrdersUser";
import AuthAdminComp from "../../../comps/auth/authAdminComp";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [salesToday, setSalesToday] = useState("");
  const [orderAmount, setOrderAmount] = useState();
  const [totalSales, settotalSales] = useState();
  const [auth, setAuth] = useState(false);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    main();
  }, []);

  const main = async () => {
    let allOrders = await getAllOrders();
    setAllOrders(allOrders);
    setOrderAmount(allOrders.length);
    let sum = sumTotalSalse(allOrders);
    settotalSales(sum);
    let ordersSixMonthsAgo = getOrdersSixMonthsAge(allOrders);
    setOrdersData(ordersSixMonthsAgo);
    let ordersToday = totalSalseToday(allOrders);
    setSalesToday(ordersToday);
  };

  const sumTotalSalse = (_ar) => {
    let sum = 0;
    _ar.forEach((item) => (sum += item.total_price));
    return sum;
  };

  const getOrdersSixMonthsAge = (data) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    data = data.filter(({ date_created }) => new Date(date_created) > sixMonthsAgo);
    data = data.map((item, idx) => {
      let nonth = String(new Date(item.date_created).getMonth() + 1).padStart(2, "0");
      return {
        name: nonth,
        Total: item.total_price,
      };
    });
    return modifyChartData(data);
  };

  const getAllOrders = async () => {
    let url = API_URL + "/orders/allOrders";
    let resp = await doApiGet(url);
    return resp.data;
  };
  const isToday = (someDate) => {
    const today = new Date();
    someDate = new Date(someDate);
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };

  const totalSalseToday = (data) => {
    // let data = await getAllOrders();
    let totalSalseToday = 0;
    data?.forEach((item) => {
      if (isToday(item.date_created)) {
        totalSalseToday += item.total_price;
      }
    });
    return totalSalseToday;
  };
  return (
    <>
      <AuthAdminComp setAuth={setAuth} />
      {auth && (
        <div className="home">
          <Sidebar />
          <div className="homeContainer">
            {<Navbar />}
            <div className="widgets">
              <Widget type="user" />
              <Widget type="sotre" amount={orderAmount} />
              <Widget type="order" amount={orderAmount} />
              <Widget type="sale" amount={totalSales} />
            </div>
            <div className="charts">
              <Featured salse={salesToday} />
              <Chart title="Last 6 Months (Total incomes)" aspect={2 / 1} data={ordersData} />
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Transactions</div>
              <ListOrdersUser ar={allOrders} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHome;
