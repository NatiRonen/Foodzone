import { API_URL, doApiGet } from "../../../services/apiService";
import { getDayAndMonth } from "../../../utils/dateRormated";
import _ from "lodash";

export const modifyChartData = (_data) => {
  _data = _.orderBy(_data, ["name"], ["asc"]);
  for (let i = 0; i < _data.length; i++) {
    if (_data[i].name === _data[i + 1].name) {
      _data[i].Total += _data[i + 1].Total;
      _data.splice(i + 1, 1);
    }
  }
  return _data;
};
