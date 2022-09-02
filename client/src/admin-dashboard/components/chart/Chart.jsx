import "./chart.scss";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../../services/apiService";
import { getDayAndMonth } from "../../../utils/dateRormated";
import _ from "lodash";

const Chart = ({ aspect, title, user }) => {
  const [data2, setData] = useState([]);
  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/orders/allOrders?client=" + user.short_id;
    let resp = await doApiGet(url);
    let data = resp.data.map((item, idx) => {
      return { name: getDayAndMonth(item.date_created), Total: item.total_price };
    });
    data = _.orderBy(data, ["name"], ["asc"]);
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === data[i + 1].name) {
        data[i].Total += data[i + 1].Total;
        data.splice(i + 1, 1);
      }
    }
    setData(data);
    console.log(data);
  };
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data2}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
