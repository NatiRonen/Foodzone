import React, { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../../services/apiService";
import { getDayAndMonth } from "../../../utils/dateRormated";
import Chart from "./Chart";
import { modifyChartData } from "./chatService";

function UserChart({ short_id, setUserOrders }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/orders/allOrders?client=" + short_id;
    let resp = await doApiGet(url);
    setUserOrders(resp.data);
    let data = resp.data.map((item, idx) => {
      return {
        name: getDayAndMonth(item.date_created),
        Total: item.total_price,
      };
    });
    data = modifyChartData(data);
    setData(data);
  };
  return <Chart aspect={3 / 1} title="User Spending" data={data} />;
}

export default UserChart;
