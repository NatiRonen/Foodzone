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

const AdminHome = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [salesToday, setSalesToday] = useState("");
  useEffect(() => {
    getOrdersSixMonthsAge();
    totalSalseToday();
  }, []);

  const getOrdersSixMonthsAge = async () => {
    let data = await getAllOrders();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    data = data.filter(
      ({ date_created }) => new Date(date_created) > sixMonthsAgo
    );
    data = data.map((item, idx) => {
      let nonth = String(new Date(item.date_created).getMonth() + 1).padStart(
        2,
        "0"
      );
      return {
        name: nonth,
        Total: item.total_price,
      };
    });
    data = modifyChartData(data);
    setOrdersData(data);
  };

  const getAllOrders = async () => {
    let url = API_URL + "/orders/allOrders";
    let resp = await doApiGet(url);
    return resp.data;
  };

  const totalSalseToday = async () => {
    let data = await getAllOrders();
    const today = new Date();
    const totalSalseToday = 0;
    data = data.forEach((item) => {
      if (item.date_created === today) {
        totalSalseToday += item.total_price;
      }
    });
    setSalesToday(totalSalseToday);
    console.log(totalSalseToday);
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured salse={totalSalseToday} />
          <Chart
            title="Last 6 Months (Total incomes)"
            aspect={2 / 1}
            data={ordersData}
          />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
